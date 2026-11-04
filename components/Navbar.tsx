"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Compete", href: "#compete" },
  { label: "Attend Final", href: "#grand-final" },
  { label: "Partners", href: "#partner-enquiry" },
  { label: "The Structure", href: "#how-it-works" },
  { label: "National Coordinators", href: "#directors" },
  { label: "Become a Coordinator", href: "#coordinator-application" },
  { label: "Founder", href: "#founder" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${scrolled || isMobileMenuOpen ? "border-b border-gold/20 bg-black/95 backdrop-blur-md" : "bg-black/75 backdrop-blur-sm"}`}>
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:h-[88px] md:px-8" aria-label="Main navigation">
        <a href="#top" className="relative z-50 flex shrink-0 items-center transition-opacity hover:opacity-80" onClick={() => setIsMobileMenuOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/BeautyNationLogo.webp" alt="Beauty Nations" className="h-[58px] w-auto object-contain invert md:h-[78px]" />
        </a>
        <ul className="hidden items-center gap-4 lg:flex xl:gap-6">
          {NAV_LINKS.map((link) => <li key={link.href}><a href={link.href} className="font-heading text-[11px] uppercase tracking-wide text-white/80 transition-colors hover:text-gold xl:text-xs">{link.label}</a></li>)}
        </ul>
        <a href="#coordinator-application" className="hidden rounded-sm border border-gold px-3 py-2 font-heading text-[11px] uppercase tracking-wide text-gold hover:bg-gold hover:text-black md:block lg:hidden">Coordinator application</a>
        <button type="button" aria-expanded={isMobileMenuOpen} aria-controls="mobile-main-menu" aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"} className="z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px] border border-white/20 lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <span className={`block h-[2px] w-5 bg-gold transition-transform ${isMobileMenuOpen ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-5 bg-gold ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-5 bg-gold transition-transform ${isMobileMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div id="mobile-main-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }} className="max-h-[calc(100dvh-68px)] overflow-y-auto border-b border-gold/20 bg-black/95 px-6 py-4 shadow-2xl lg:hidden">
            <ul className="flex flex-col">
              {NAV_LINKS.map((link) => <li key={link.href}><a href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="block border-b border-white/10 py-3 font-heading text-sm uppercase tracking-widest text-white/90 hover:text-gold">{link.label}</a></li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
