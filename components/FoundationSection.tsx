"use client";

import { motion } from "framer-motion";

export default function FoundationSection() {
  return (
    <section id="foundation" className="relative bg-black py-20 md:py-28 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-heading text-xs uppercase tracking-widest2 text-gold">
            The Foundation
          </h2>
          <p className="font-display text-4xl uppercase text-white md:text-5xl">
            Vision & Mission
          </p>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="border-l border-gold/30 pl-8"
          >
            <h3 className="mb-4 font-heading text-2xl uppercase tracking-wide text-white">
              Our Vision
            </h3>
            <p className="font-body text-white/70 leading-relaxed">
              To create a unified global stage where beauty transcends borders. We aim to empower representatives from every nation to showcase their unique heritage, talent, and grace on an internationally recognized platform.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-l border-gold/30 pl-8"
          >
            <h3 className="mb-4 font-heading text-2xl uppercase tracking-wide text-white">
              Our Mission
            </h3>
            <p className="font-body text-white/70 leading-relaxed">
              To provide a fair, transparent, and highly professional environment for national directors and participants. We foster international collaboration, cultural exchange, and lifelong opportunities for our global ambassadors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}