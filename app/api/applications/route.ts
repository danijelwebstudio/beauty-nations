import { NextResponse } from "next/server";
import { directors } from "@/data/directors";
import { checkRateLimit, opaqueId } from "@/lib/rate-limit";

export const runtime = "nodejs";

const CONFIRMED = new Set(directors.filter((d) => d.posterUrl).map((d) => d.countryName));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED: Record<string, string[]> = {
  tickets: ["name", "email", "country"],
  partner: ["name", "email", "brand", "country", "message"],
  competitor: ["name", "email", "country", "message"],
  coordinator: ["name", "email", "country", "instagram", "experience", "position", "reason"],
};
const ALLOWED: Record<string, string[]> = {
  tickets: ["name", "email", "country"],
  partner: ["name", "email", "brand", "country", "website", "message"],
  competitor: ["name", "email", "country", "message"],
  coordinator: ["name", "email", "country", "instagram", "experience", "position", "reason"],
};
const LABELS: Record<string, string> = {
  tickets: "Ticket Priority List",
  partner: "Partner Inquiry",
  competitor: "Competitor Inquiry",
  coordinator: "National Coordinator Application",
};

function safeText(value: unknown, max = 200): string {
  // Prevent accidental control characters in the recipient's email.
  return typeof value === "string"
    ? value.trim().replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").slice(0, max)
    : "";
}

function failure(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

type TurnstileVerification = {
  success?: boolean;
  action?: string;
  hostname?: string;
};

/**
 * Verify once on our server before sending any data to the mail provider.
 * Turnstile tokens cannot be verified twice.
 */
async function verifyTurnstile(token: string, expectedAction: string): Promise<"valid" | "invalid" | "unavailable"> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Beauty Nations forms: TURNSTILE_SECRET_KEY is missing");
    return "unavailable";
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return "unavailable";

    const result: TurnstileVerification = await response.json();
    if (!result.success || result.action !== expectedAction || !result.hostname) {
      return "invalid";
    }
    return "valid";
  } catch (error) {
    console.error("Beauty Nations forms: Turnstile service unavailable", error instanceof Error ? error.name : "Unknown error");
    return "unavailable";
  }
}

/**
 * Mail providers:
 * - formspree: works with a recipient's verified existing Gmail, without a custom domain.
 * - resend: use test inbox with onboarding@resend.dev, or verified sender domain for Lela.
 * Neither option will pretend that an unconfigured form has succeeded.
 */
async function deliver(subject: string, data: Record<string, string>, type: string) {
  const provider = (process.env.FORMS_PROVIDER || "resend").toLowerCase();
  const submitted = new Date().toISOString();
  const lines = [
    subject,
    "",
    `Submission time (UTC): ${submitted}`,
    `Submission category: ${type}`,
    ...Object.entries(data).map(([key, value]) => `${key}: ${value}`),
    ...(type === "tickets" ? ["Ticket notifications consent: Yes", "No ticket has been reserved or purchased."] : []),
  ];

  if (provider === "formspree") {
    // The destination email is set in Formspree's dashboard, NOT in the URL.
    const formId = process.env.FORMSPREE_FORM_ID?.trim();
    if (!formId || !/^[A-Za-z0-9]{6,32}$/.test(formId)) {
      console.error("Beauty Nations forms: FORMSPREE_FORM_ID is missing or invalid");
      return { ok: false, status: 503 };
    }
    const payload = new URLSearchParams({
      subject,
      email: data.email,
      name: data.name,
      form_type: LABELS[type],
      submitted_at: submitted,
      message: lines.join("\n"),
    });
    // Include structured fields for viewing in the Formspree submissions dashboard.
    for (const [key, value] of Object.entries(data)) {
      if (key !== "email" && key !== "name" && key !== "message") payload.append(key, value);
    }
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: payload.toString(),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    // 2xx means provider accepted the submission; inbox delivery still needs a real test.
    if (!response.ok) console.error("Beauty Nations / Formspree returned HTTP", response.status);
    return { ok: response.ok, status: response.status };
  }

  if (provider === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.APPLICATIONS_TO_EMAIL;
    const sender = process.env.RESEND_FROM_EMAIL;
    if (!apiKey || !recipient || !sender) {
      console.error("Beauty Nations forms: Resend email configuration is incomplete");
      return { ok: false, status: 503 };
    }
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: sender, to: [recipient], reply_to: [data.email], subject, text: lines.join("\n") }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) console.error("Beauty Nations / Resend returned HTTP", response.status);
    return { ok: response.ok, status: response.status };
  }

  console.error("Beauty Nations forms: Unknown FORMS_PROVIDER");
  return { ok: false, status: 503 };
}

export async function POST(request: Request) {
  // Supplemental, best-effort limit. Cloudflare WAF will enforce the edge limit in production.
  // These proxy headers must be overwritten by a trusted proxy, never trusted from direct client traffic.
  const clientIp = (request.headers.get("x-real-ip") || request.headers.get("cf-connecting-ip") || "").trim();
  if (clientIp) {
    const ipLimit = checkRateLimit(`ip:${opaqueId(clientIp)}`, 5, 10 * 60 * 1000);
    if (!ipLimit.allowed) return failure("Too many requests. Please try again later.", 429);
  }

  const size = Number(request.headers.get("content-length") || 0);
  if (size > 12_000) return failure("Request is too large.", 413);

  let incoming: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 12_000) return failure("Request is too large.", 413);
    const body: unknown = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid payload");
    incoming = body as Record<string, unknown>;
  } catch {
    return failure("Invalid form data.", 400);
  }

  if (safeText(incoming.website_check)) return failure("Unable to submit this request.", 400);
  const turnstileToken = safeText(incoming.turnstileToken, 2048);
  if (!turnstileToken) return failure("Please complete the security verification.", 400);
  const type = safeText(incoming.type, 30);
  if (!Object.hasOwn(REQUIRED, type)) return failure("Unknown form type.", 400);

  const data: Record<string, string> = {};
  for (const key of ALLOWED[type]) data[key] = safeText(incoming[key], key === "message" || key === "reason" ? 1500 : 200);
  if (REQUIRED[type].some((key) => !data[key])) return failure("Please fill in all required fields.", 400);
  if (!EMAIL_RE.test(data.email)) return failure("Please enter a valid email address.", 400);
  if (type === "tickets" && incoming.consent !== true) return failure("Please confirm notification consent.", 400);
  if (type === "competitor" && !CONFIRMED.has(data.country)) return failure("Please choose an available country.", 400);
  if (type === "coordinator" && (!/^\d+$/.test(data.experience) || Number(data.experience) > 80)) return failure("Please check your years of experience.", 400);
  if (type === "coordinator" && !["Educator", "Brand Owner", "Organizer", "Other"].includes(data.position)) return failure("Please select a current position.", 400);

  const subject = `Beauty Nations — ${LABELS[type]}`;
  const verification = await verifyTurnstile(turnstileToken, type);
  if (verification === "invalid") return failure("Security verification failed or expired. Please try again.", 403);
  if (verification === "unavailable") return failure("Security verification is temporarily unavailable. Please try again later.", 503);

  const emailLimit = checkRateLimit(`email:${opaqueId(data.email)}`, 3, 60 * 60 * 1000);
  if (!emailLimit.allowed) return failure("Too many submissions for this email. Please try again later.", 429);

  try {
    const result = await deliver(subject, data, type);
    if (!result.ok) {
      return failure(
        result.status === 503
          ? "Forms are not configured yet. Please contact the Beauty Nations team by email."
          : result.status === 429
            ? "Too many submissions. Please wait a few minutes and try again."
            : result.status === 403 || result.status === 400
              ? "Security verification failed or expired. Please try again."
              : "We couldn't send your request right now. Please try again later.",
        result.status === 503 ? 503 : result.status === 429 ? 429 : result.status === 403 || result.status === 400 ? 403 : 502,
      );
    }
    return NextResponse.json({
      message:
        type === "tickets"
          ? "Thank you! Your request for priority ticket-sale notification has been submitted. No seat has been reserved or purchased."
          : "Thank you! Your request has been submitted to the Beauty Nations team.",
    }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    // Do not log personal form data or provider credentials.
    console.error("Beauty Nations forms: delivery request failed", error instanceof Error ? error.name : "Unknown error");
    return failure("The submission service is temporarily unavailable. Please try again later.", 502);
  }
}
