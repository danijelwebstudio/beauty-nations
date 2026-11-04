"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Globe2 } from "lucide-react";

const PILLARS = [
  {
    icon: Users,
    title: "NATIONAL COMPETITIONS",
    description:
      "Each country selects its official representative through a national competition.",
  },
  {
    icon: Globe2,
    title: "INTERNATIONAL FINAL",
    description:
      "Official representatives compete on one international stage.",
  },
  {
    icon: Trophy,
    title: "WORLD TITLE",
    description: "One winner earns the Beauty Nations World Title.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-charcoal py-14 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold"
        >
          How It Works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-9 text-center font-display text-4xl uppercase text-white md:text-5xl"
        >
          The Structure
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-3 md:gap-8">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group flex flex-col items-center rounded-sm border border-white/10 bg-black/40 px-6 py-6 md:px-8 md:py-10 text-center transition-colors hover:border-gold/40"
              >
                <div className="mb-4 flex h-12 w-12 md:mb-6 md:h-16 md:w-16 items-center justify-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:shadow-gold-glow">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="mb-3 font-heading text-xl uppercase tracking-wide text-white">
                  {pillar.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-white/60">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Grand Final details, discreetly integrated below the structure. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 border-t border-gold/25 pt-8 md:mt-14"
        >
          <p className="mb-6 text-center font-heading text-xs uppercase tracking-widest2 text-gold">
            Grand Final · Zagreb 2027
          </p>
          <div className="mx-auto max-w-2xl border-l border-gold/40 pl-5">
            <h3 className="mb-2 font-heading text-sm uppercase tracking-wide text-white md:text-base">
              International judging &amp; live country connections
            </h3>
            <p className="font-body text-sm leading-relaxed text-white/65">
              Alongside international judges, each participating country will cast its vote through a live connection during the Grand Final.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
