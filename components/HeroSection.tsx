"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const stats = [
    { label: "10 NATIONS", sub: "Officially represented countries" },
    { label: "1 GLOBAL STAGE", sub: "One international final" },
    { label: "2027 SWITZERLAND", sub: "First World Final" },
  ];

  return (
    <section className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden bg-black pb-12 pt-32 md:min-h-[85vh] md:py-20">
      
      {/* Zlatni sjaj i animacije */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-black/80 to-black" />
        <div className="absolute h-[60vmin] w-[60vmin] animate-spin-slow rounded-full border border-gold/20" />
        <div className="absolute h-[80vmin] w-[80vmin] rounded-full border border-gold/10" />
        <div className="absolute h-[40vmin] w-[40vmin] animate-pulse-slow rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* POPRAVLJENO: leading-none na telefonu da se NATIONS odvoji od BEAUTY, a na desktopu ostaje md:leading-[0.85] */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="font-display text-6xl uppercase leading-none text-white drop-shadow-[0_0_40px_rgba(212,175,55,0.15)] sm:text-7xl md:text-[8rem] md:leading-[0.85]"
        >
          Beauty Nations
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 font-heading text-lg uppercase tracking-widest2 text-gold sm:text-xl md:text-3xl"
        >
          One World. One Beauty Stage.
        </motion.h2>

        {/* VRAĆENO NA STARO KAKO SI TRAŽIO (mt-12) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="mb-8 font-heading text-xs uppercase tracking-widest text-white/60 md:text-sm">
            10 NATIONS ALREADY JOINED
          </p>
          
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {stats.map((item, i) => (
              <div key={i} className="border-l border-gold/30 px-6 text-left">
                <h3 className="font-heading text-base text-white md:text-lg">{item.label}</h3>
                <p className="mt-1 font-body text-xs text-white/50">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}