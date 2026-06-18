"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "The Foundation", href: "#foundation" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "National Directors", href: "#directors" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-500 ${
        scrolled || isMobileMenuOpen
          ? "border-b border-gold/10 bg-black/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        
        {/* LOGO SEKCIJA */}
        <a href="#" className="relative z-50 flex items-center transition-opacity hover:opacity-80">
          <Image 
            src="/BeautyNationLogo.webp" 
            alt="Beauty Nations Logo" 
            width={160} 
            height={50} 
            className="object-contain invert grayscale contrast-200 mix-blend-screen"
            priority
          />
        </a>

        {/* DESKTOP MENI (SKRIVEN NA MOBILNOM) */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-heading text-sm uppercase tracking-wide text-white/80 transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* DESKTOP DUGME */}
        <a
          href="#contact"
          className="hidden rounded-sm border border-gold px-5 py-2 font-heading text-xs uppercase tracking-widest2 text-gold transition-all hover:bg-gold hover:text-black md:inline-block"
        >
          Join Us
        </a>

        {/* MOBILNO DUGME (HAMBURGER / X ANIMACIJA) */}
        <button 
          className="z-50 p-2 focus:outline-none md:hidden" 
          aria-label="Toggle menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`mb-1.5 block h-px bg-gold transition-transform duration-300 ${isMobileMenuOpen ? "w-6 translate-y-2.5 rotate-45" : "w-6"}`} />
          <span className={`mb-1.5 block h-px w-6 bg-gold transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
          <span className={`block h-px bg-gold transition-transform duration-300 ${isMobileMenuOpen ? "w-6 -translate-y-1 -rotate-45" : "w-4"}`} />
        </button>
      </nav>

      {/* MOBILNI PADAJUĆI MENI */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full w-full border-b border-gold/10 bg-black/95 px-6 py-8 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-heading text-xl uppercase tracking-wide text-white/90 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-4 border-t border-white/10 pt-6">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-block w-full rounded-sm border border-gold px-6 py-4 text-center font-heading text-sm uppercase tracking-widest2 text-gold transition-all hover:bg-gold hover:text-black"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}