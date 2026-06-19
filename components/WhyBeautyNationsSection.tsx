"use client";

import { motion } from "framer-motion";
import { Globe, Flag, Users } from "lucide-react";

const REASONS = [
  {
    icon: Globe,
    title: "GLOBAL RECOGNITION",
    description: "Represent your country on an international stage.",
  },
  {
    icon: Flag,
    title: "NATIONAL PRIDE",
    description: "Compete under your national flag.",
  },
  {
    icon: Users,
    title: "INTERNATIONAL NETWORK",
    description: "Connect with professionals from around the world.",
  },
];

export default function WhyBeautyNationsSection() {
  return (
    <section id="why-beauty-nations" className="relative bg-charcoal py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold"
        >
          The Platform
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center font-display text-4xl uppercase text-white md:text-5xl"
        >
          Why Beauty Nations?
        </motion.h2>

        <div className="grid gap-8 md:grid-cols-3">
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="group flex flex-col items-center rounded-sm border border-gold/10 bg-black/30 px-8 py-10 text-center transition-colors hover:border-gold/30"
              >
                <div className="mb-5 text-gold/70 transition-colors group-hover:text-gold">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-heading text-lg uppercase tracking-wide text-white">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-white/60">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}