"use client";

import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: "easeOut" },
};

export default function FoundationSection() {
  return (
    <section id="foundation" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          {...fadeUp}
          className="mb-4 font-heading text-xs uppercase tracking-widest2 text-gold"
        >
          The Foundation
        </motion.p>

        <motion.h2
          {...fadeUp}
          className="mb-12 font-display text-4xl uppercase text-white md:text-6xl"
        >
          Vision &amp; Mission
        </motion.h2>

        {/* Exact intro copy as provided by the CEO — do not paraphrase */}
        <motion.p
          {...fadeUp}
          className="mx-auto max-w-2xl font-body text-lg leading-relaxed text-white/70 md:text-xl"
        >
          “After years of organizing international beauty competitions and
          educating professionals across Europe, I created Beauty Nations
          with one vision: to unite countries, talents and beauty
          professionals through a platform that celebrates excellence,
          creativity and international collaboration.”
        </motion.p>

        <div className="mx-auto my-16 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div {...fadeUp} className="border-t border-gold/30 pt-8">
            <h3 className="mb-4 font-heading text-sm uppercase tracking-widest2 text-gold">
              Vision
            </h3>
            <p className="font-body text-base leading-relaxed text-white/80 md:text-lg">
              To become the world’s leading platform connecting beauty
              professionals through national representation, creativity and
              excellence.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="border-t border-gold/30 pt-8">
            <h3 className="mb-4 font-heading text-sm uppercase tracking-widest2 text-gold">
              Mission
            </h3>
            <p className="font-body text-base leading-relaxed text-white/80 md:text-lg">
              To create opportunities, build international connections and
              provide a stage where every nation can proudly showcase its
              talent.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
