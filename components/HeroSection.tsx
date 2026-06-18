"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      {/* TODO: Add cinematic glowing earth image here */}
      {/* <Image src="/images/hero-earth.jpg" alt="" fill priority className="object-cover opacity-60" /> */}

      {/*
        Signature element: slow-rotating gold orbit rings standing in for the
        globe/stage spotlight until the cinematic photo is dropped in above.
        Once the image is added, keep this layer at low opacity behind it
        for the "glowing earth" effect rather than removing it outright.
      */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[140vmax] w-[140vmax] rounded-full bg-radial-fade" />
        <div className="absolute h-[60vmin] w-[60vmin] animate-spin-slow rounded-full border border-gold/20" />
        <div className="absolute h-[80vmin] w-[80vmin] rounded-full border border-gold/10" />
        <div className="absolute h-[40vmin] w-[40vmin] animate-pulse-slow rounded-full bg-gold/5 blur-3xl" />
      </div>

      {/* Vignette to keep text legible over any future background image */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 font-heading text-xs uppercase tracking-widest2 text-gold/80 md:text-sm"
        >
          International Beauty Platform
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="font-display text-[14vw] uppercase leading-[0.85] text-white drop-shadow-[0_0_40px_rgba(212,175,55,0.15)] md:text-[9rem]"
        >
          {/* TODO: Replace with official Beauty Nations wordmark/logo if available */}
          Beauty Nations
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="my-6 h-px w-24 bg-gold"
        />

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-heading text-2xl uppercase tracking-widest2 text-white md:text-4xl"
        >
          One World. <span className="text-gold">One Beauty Stage.</span>
        </motion.h2>

        <motion.a
          href="#foundation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-12 font-heading text-xs uppercase tracking-widest2 text-white/50 transition-colors hover:text-gold"
        >
          Scroll to discover ↓
        </motion.a>
      </div>
    </section>
  );
}
