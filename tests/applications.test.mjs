import test, { beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/applications/route.ts";

const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
let serial = 0;
let calls;
let verification;
let providerStatus;
let action;

beforeEach(() => {
  Object.assign(process.env, {
    FORMS_PROVIDER: "formspree", FORMSPREE_FORM_ID: "xqppnpgo",
    DEPLOYMENT_ENV: "production", TURNSTILE_SECRET_KEY: "mock-secret",
    TURNSTILE_ALLOWED_HOSTNAMES: "review.example", TRUSTED_CLIENT_IP_HEADER: "x-real-ip",
  });
  calls = [];
  verification = {};
  providerStatus = 200;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    if (url === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
      return Response.json({ success: true, action, hostname: "review.example", ...verification });
    }
    assert.equal(url, "https://formspree.io/f/xqppnpgo", "Only the production destination is allowed");
    return Response.json({}, { status: providerStatus });
  };
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

function body(type = "competitor", extra = {}) {
  serial += 1;
  return {
    type, name: "Mock Applicant", email: `mock-${serial}@example.org`, country: "North Macedonia",
    turnstileToken: "mock-token", message: "Test inquiry", consent: true,
    brand: "Mock Brand", instagram: "@mock", experience: "3", position: "Educator", reason: "Mock reason",
    ...extra,
  };
}
function request(data, headers = {}) {
  serial += 1;
  action = data?.type;
  return new Request("https://review.example/api/applications", {
    method: "POST", headers: { "Content-Type": "application/json", "x-real-ip": `2001:db8::${serial.toString(16)}`, ...headers },
    body: JSON.stringify(data),
  });
}

for (const type of ["tickets", "partner", "coordinator", "competitor"]) {
  test(`${type}: valid CAPTCHA delivers once to production Formspree`, async () => {
    const response = await POST(request(body(type)));
    assert.equal(response.status, 200);
    assert.equal(calls.length, 2);
    const payload = new URLSearchParams(calls[1].init.body);
    assert.equal(payload.get("country"), "North Macedonia");
    assert.equal(payload.has("turnstileToken"), false, "Consumed token is never sent to Formspree");
    assert.equal(response.headers.get("cache-control"), "no-store");
  });
}
test("missing CAPTCHA, consent, invalid fields and unconfirmed country never call a provider", async () => {
  for (const data of [body("competitor", { turnstileToken: "" }), body("tickets", { consent: false }),
    body("competitor", { email: "invalid" }), body("competitor", { country: "Montenegro" }),
    body("coordinator", { experience: "81" }), body("coordinator", { position: "Invalid" }),
    body("unknown"), body("partner", { website_check: "bot" })]) {
    assert.equal((await POST(request(data))).status, 400);
  }
  assert.equal(calls.length, 0);
});
test("invalid/replayed token, wrong action and wrong hostname are rejected with 403", async () => {
  for (const invalid of [{ success: false }, { action: "wrong" }, { hostname: "attacker.example" }, { hostname: null }]) {
    verification = invalid;
    assert.equal((await POST(request(body()))).status, 403);
  }
  assert.ok(calls.every((call) => call.url.includes("siteverify")));
});
test("missing secret or hostname configuration fails closed", async () => {
  delete process.env.TURNSTILE_SECRET_KEY;
  assert.equal((await POST(request(body()))).status, 503);
  process.env.TURNSTILE_SECRET_KEY = "mock-secret";
  delete process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  delete process.env.NEXT_PUBLIC_SITE_URL;
  assert.equal((await POST(request(body()))).status, 503);
  assert.equal(calls.length, 0);
});
test("configured site URL supplies the allowed hostname when the explicit list is absent", async () => {
  delete process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  process.env.NEXT_PUBLIC_SITE_URL = "https://review.example";
  assert.equal((await POST(request(body()))).status, 200);
});
test("production refuses the test Formspree recipient", async () => {
  process.env.FORMSPREE_FORM_ID = "xwllyrnz";
  assert.equal((await POST(request(body()))).status, 503);
  assert.equal(calls.length, 1);
});
test("provider failures are not reported as success", async () => {
  for (const [upstream, expected] of [[429, 429], [500, 502], [403, 403]]) {
    providerStatus = upstream;
    assert.equal((await POST(request(body()))).status, expected);
  }
});
test("Siteverify network failure returns 503 without sending mail", async () => {
  globalThis.fetch = async () => { throw new Error("Mock network failure"); };
  assert.equal((await POST(request(body()))).status, 503);
});
test("sixth request from the same trusted IP returns 429 and Retry-After", async () => {
  for (let i = 0; i < 6; i++) {
    const response = await POST(request(body("competitor", { turnstileToken: "" }), { "x-real-ip": "192.0.2.100" }));
    assert.equal(response.status, i < 5 ? 400 : 429);
    if (i === 5) assert.ok(Number(response.headers.get("retry-after")) > 0);
  }
  assert.equal(calls.length, 0);
});
test("rotating forged headers without a configured proxy cannot reset the fallback quota", async () => {
  delete process.env.TRUSTED_CLIENT_IP_HEADER;
  for (let i = 0; i < 6; i++) {
    const response = await POST(request(body("competitor", { turnstileToken: "" }), { "cf-connecting-ip": `192.0.2.${i}` }));
    assert.equal(response.status, i < 5 ? 400 : 429);
  }
  assert.equal(calls.length, 0);
});
test("fourth submission for a normalized email returns 429 across different IPs", async () => {
  for (let i = 0; i < 4; i++) {
    const response = await POST(request(body("competitor", { email: i % 2 ? "Quota@EXAMPLE.org" : "quota@example.org" })));
    assert.equal(response.status, i < 3 ? 200 : 429);
  }
  assert.equal(calls.filter((call) => call.url.includes("formspree")).length, 3);
});
test("malformed and oversized payloads are rejected before upstream requests", async () => {
  const malformed = new Request("https://review.example/api/applications", { method: "POST", body: "{", headers: { "x-real-ip": "192.0.2.220" } });
  assert.equal((await POST(malformed)).status, 400);
  assert.equal((await POST(request(body("partner", { message: "x".repeat(13000) })))).status, 413);
  assert.equal(calls.length, 0);
});
