"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  return (
    <section id="founder" className="relative bg-charcoal py-28 md:py-36">
      <div className="mx-auto grid max-w-5xl items-center gap-16 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-sm border border-gold/30 bg-black"
        >
          {/* TODO: Add Lela Portrait Image here */}
          {/* <Image src="/images/lela-pantelic.jpg" alt="Lela Pantelić, Founder & CEO of Beauty Nations" fill className="object-cover" /> */}
          {/* Ovdje je ubačena slika umjesto placeholdera */}
          <Image 
            src="/LelaPantelić portret.webp" 
            alt="Lela Pantelić, Founder & CEO of Beauty Nations" 
            fill 
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover" 
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="mb-3 font-heading text-xs uppercase tracking-widest2 text-gold">
            Founder &amp; CEO
          </p>
          <h2 className="mb-6 font-display text-4xl uppercase text-white md:text-5xl">
            Lela Pantelić
          </h2>
          <div className="mb-6 h-px w-20 bg-gold" />
          <p className="font-body text-base leading-relaxed text-white/70 md:text-lg">
            With years spent organizing international beauty competitions
            and educating professionals across Europe, Lela built Beauty
            Nations to give every country a stage worthy of its talent.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
