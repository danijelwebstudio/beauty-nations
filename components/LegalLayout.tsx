import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  // Enable only in an access-protected review deployment. Public release requires
  // the responsible party's approval and a reviewed code change, not an env toggle.
  const showDraft = process.env.LEGAL_REVIEW_MODE === "true";
  return (
    <main className="min-h-screen bg-black px-5 py-12 font-body text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-heading text-xs uppercase tracking-[0.2em] text-gold hover:underline">← Back to Beauty Nations</Link>
        <p className="mt-10 font-heading text-xs uppercase tracking-[0.2em] text-gold">Beauty Nations · Legal information</p>
        <h1 className="mt-3 font-heading text-4xl uppercase leading-tight sm:text-5xl">{title}</h1>
        {showDraft ? (
          <>
            <p className="my-7 border border-gold/40 p-4 text-sm text-gold">Draft for review — not approved for public publication.</p>
            <div className="space-y-7 text-sm leading-7 text-white/80 sm:text-base">{children}</div>
          </>
        ) : (
          <p className="mt-7 text-sm leading-7 text-white/80">Legal information is under review. Please contact the organiser using the email below for information about this website and the handling of personal data.</p>
        )}
        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/60">
          Questions? <a className="text-gold hover:underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>
        </div>
      </div>
    </main>
  );
}
