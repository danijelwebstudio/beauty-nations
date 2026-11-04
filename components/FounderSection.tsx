"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function FounderSection() {
  const titles = [
    "Founder & CEO",
    "International Educator",
    "Founder of Balkans Beauty Championship",
    "Founder of Beauty Nations",
    "Founder & Publisher of ICONIQUE Magazine",
  ];

  return (
    <section id="founder" className="relative border-t border-white/10 bg-black py-14 md:py-24">
      {/* Zamijenjeno sa flex-col-reverse - Tekst gore, slika dole na mobilnom */}
      <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-8 px-5 md:px-6 md:grid md:grid-cols-2 md:items-center md:gap-16">
        
        {/* Slika - smanjena za telefon (w-3/4 max-w-xs) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mx-auto aspect-square w-4/5 max-w-sm overflow-hidden rounded-sm border border-gold/30 bg-zinc-900 md:w-full md:max-w-[420px]"
        >
          <Image 
            src="/founder/LelaSlika2.png"
            alt="Lela Pantelić, Founder & CEO of Beauty Nations" 
            fill 
            sizes="(max-width: 768px) 80vw, 420px"
            className="object-contain grayscale contrast-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20" />
        </motion.div>

        {/* Tekst */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className="mb-6 font-display text-4xl uppercase text-white md:text-5xl">
            MEET THE FOUNDER
          </h2>
          <div className="mb-8 h-px w-20 bg-gold" />
          
          {/* Ime i luksuzna lista titula */}
          <div className="mb-10">
            <h3 className="mb-4 font-heading text-2xl uppercase tracking-widest text-gold">
              LELA PANTELIĆ
            </h3>
            <ul className="flex flex-col gap-3 font-heading text-xs uppercase tracking-widest2 text-white/70">
              {titles.map((title, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="h-1 w-1 rounded-full bg-gold/70" />
                  {title}
                </li>
              ))}
            </ul>
          </div>

          <p className="mb-5 font-body text-base leading-relaxed text-white/70 md:text-lg">
            After years of organizing international beauty competitions, educating professionals and building media platforms within the beauty industry, Lela Pantelić created Beauty Nations with one vision:
          </p>
          <p className="font-body text-base font-medium leading-relaxed text-white md:text-lg">
            To unite countries, talents and beauty professionals through a platform built on excellence, creativity and international collaboration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}