import Link from "next/link";
import type { ReactNode } from "react";

export default function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-black px-5 py-12 font-body text-white sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="font-heading text-xs uppercase tracking-[0.2em] text-gold hover:underline">← Back to Beauty Nations</Link>
        <p className="mt-10 font-heading text-xs uppercase tracking-[0.2em] text-gold">Beauty Nations · Legal information</p>
        <h1 className="mt-3 font-heading text-4xl uppercase leading-tight sm:text-5xl">{title}</h1>
        <div className="my-8 border border-amber-400/50 bg-amber-300/10 p-5 text-sm leading-relaxed text-amber-100" role="note">
          <strong>DRAFT — NOT APPROVED FOR PUBLICATION.</strong> Legal identity, address, retention periods,
          service-provider agreements and governing-law details must be confirmed by the organiser before launch.
        </div>
        <div className="space-y-7 text-sm leading-7 text-white/80 sm:text-base">{children}</div>
        <div className="mt-12 border-t border-white/15 pt-6 text-sm text-white/60">
          Questions? <a className="text-gold hover:underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>
        </div>
      </div>
    </main>
  );
}
