"use client";

import { motion } from "framer-motion";

// Phase 1: no sponsor/partner logos have been supplied yet.
// This component is fully built and ready to use, but it is intentionally
// NOT imported/rendered in app/page.tsx. Once the client provides logo
// assets, fill in PLACEHOLDER_PARTNERS (or fetch them from a CMS) and
// uncomment the <PartnersSection /> line in app/page.tsx.

export interface Partner {
  name: string;
  logoUrl: string;
  href?: string;
}

const PLACEHOLDER_PARTNERS: Partner[] = [
  // { name: "Partner Name", logoUrl: "/images/partners/partner-1.png", href: "https://partner-site.com" },
];

export default function PartnersSection() {
  return (
    <section id="partners" className="relative bg-black py-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-12 text-center font-heading text-xs uppercase tracking-widest2 text-gold">
          Partners &amp; Sponsors
        </p>

        <div className="flex flex-wrap items-center justify-center gap-12 opacity-80">
          {PLACEHOLDER_PARTNERS.map((partner, i) => (
            <motion.a
              key={partner.name}
              href={partner.href ?? "#"}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="grayscale transition-all duration-300 hover:grayscale-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-10 w-auto"
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
