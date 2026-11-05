"use client";

import { motion } from "framer-motion";
import { confirmedCountryCount } from "@/data/directors";

const buttons = [
  { label: "COMPETE", href: "#compete" },
  { label: "ATTEND THE FINAL", href: "#grand-final" },
  { label: "BECOME A PARTNER", href: "#partner-enquiry" },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[620px] w-full flex-col items-center justify-center overflow-hidden bg-black px-5 pb-12 pt-28 sm:pt-32 md:min-h-[85vh] md:px-6 md:pb-16 md:pt-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/20 via-black/80 to-black" />
        <div className="absolute h-[60vmin] w-[60vmin] animate-spin-slow rounded-full border border-gold/20" />
        <div className="absolute h-[80vmin] w-[80vmin] rounded-full border border-gold/10" />
        <div className="absolute h-[40vmin] w-[40vmin] animate-pulse-slow rounded-full bg-gold/5 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.h1 initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="font-display text-[clamp(3rem,10vw,8rem)] uppercase leading-[1.02] text-white drop-shadow-[0_0_40px_rgba(212,175,55,0.15)] md:leading-[0.9]">
          Beauty Nations
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 font-heading text-sm uppercase tracking-[0.16em] text-gold sm:text-lg md:text-2xl md:tracking-widest2">
          One World. One Beauty Stage.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }} className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
          An international competition combining nail artistry, makeup, costume and photography through one creative theme.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-5 font-heading text-xs uppercase tracking-[0.12em] text-gold sm:text-sm">
          GRAND FINAL · 18 SEPTEMBER 2027 · ZAGREB
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-7 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {buttons.map((button, index) => (
            <a key={button.href} href={button.href} className={`flex min-h-12 items-center justify-center rounded-sm border px-4 py-3 text-center font-heading text-xs uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${index === 0 ? "border-gold bg-gold text-black hover:bg-[#edd377]" : "border-gold/65 bg-black/60 text-gold hover:border-gold hover:bg-gold/10"}`}>
              {button.label}
            </a>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-9 hidden w-full max-w-2xl justify-center gap-8 text-left md:flex">
          <div className="border-l border-gold/40 pl-4"><strong className="font-heading text-base uppercase text-white">{confirmedCountryCount} Nations</strong><p className="font-body text-xs text-white/60">Represented countries</p></div>
          <div className="border-l border-gold/40 pl-4"><strong className="font-heading text-base uppercase text-white">1 Global Stage</strong><p className="font-body text-xs text-white/60">An international final</p></div>
          <div className="border-l border-gold/40 pl-4"><strong className="font-heading text-base uppercase text-white">Roots</strong><p className="font-body text-xs text-white/60">2027 creative theme</p></div>
        </motion.div>
      </div>
    </section>
  );
}
