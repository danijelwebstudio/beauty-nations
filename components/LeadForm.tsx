"use client";

import { useState, type FormEvent } from "react";

type LeadKind = "tickets" | "partner" | "coordinator" | "competitor";
type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "url" | "number" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
  maxLength?: number;
};

interface Props {
  kind: LeadKind;
  fields: Field[];
  buttonText: string;
  defaults?: Record<string, string>;
  consentText?: string;
}

const control =
  "w-full min-w-0 rounded-sm border border-white/25 bg-[#090909] px-4 py-3 font-body text-sm text-white placeholder:text-white/40 transition-colors focus:border-gold focus:outline-none";

export default function LeadForm({ kind, fields, buttonText, defaults = {}, consentText }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: kind, ...defaults, ...raw, consent: raw.consent === "on" }),
      });
      const data: { message?: string } = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || "We couldn't send your request. Please try again later.");
      }
      setStatus("success");
      setFeedback(data.message || "Thank you! Your request has been submitted.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" aria-label={`${kind} form`}>
      {/* A simple spam trap; people should never fill this field. */}
      <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${kind}-website-check`}>Leave this empty</label>
        <input type="text" name="website_check" id={`${kind}-website-check`} autoComplete="off" tabIndex={-1} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const wide = field.type === "textarea" || field.type === "select";
          return (
            <div key={field.name} className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
              <label htmlFor={`${kind}-${field.name}`} className="font-heading text-xs uppercase tracking-[0.12em] text-white/80">
                {field.label}{field.required ? " *" : ""}
              </label>
              {field.type === "textarea" ? (
                <textarea id={`${kind}-${field.name}`} name={field.name} required={field.required} maxLength={field.maxLength || 1500} rows={4} placeholder={field.placeholder} className={`${control} resize-y`} />
              ) : field.type === "select" ? (
                <select id={`${kind}-${field.name}`} name={field.name} required={field.required} defaultValue={defaults[field.name] || ""} className={control}>
                  <option value="" disabled>Select an option</option>
                  {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input id={`${kind}-${field.name}`} name={field.name} type={field.type || "text"} required={field.required} maxLength={field.maxLength || 180} min={field.type === "number" ? "0" : undefined} max={field.type === "number" ? "80" : undefined} defaultValue={defaults[field.name] || ""} placeholder={field.placeholder} className={control} />
              )}
            </div>
          );
        })}
      </div>
      {consentText ? (
        <label className="flex cursor-pointer items-start gap-3 font-body text-xs leading-relaxed text-white/70">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-[#d4af37]" />
          <span>{consentText}</span>
        </label>
      ) : null}
      <button disabled={status === "sending"} type="submit" className="mt-2 w-full rounded-sm bg-gold px-6 py-3.5 font-heading text-sm uppercase tracking-[0.12em] text-black transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:self-start">
        {status === "sending" ? "SENDING..." : buttonText}
      </button>
      {feedback && (
        <p role={status === "error" ? "alert" : "status"} aria-live="polite" className={`rounded-sm border px-4 py-3 font-body text-sm ${status === "success" ? "border-gold/40 text-white" : "border-red-400/40 text-red-200"}`}>
          {feedback}
        </p>
      )}
    </form>
  );
}
