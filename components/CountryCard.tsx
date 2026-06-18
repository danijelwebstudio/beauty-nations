"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import type { NationalDirector } from "@/data/directors";

export default function CountryCard({
  countryName,
  countryCode,
  directorName,
  photoUrl,
  instagramUrl,
}: NationalDirector) {
  const hasDirector = Boolean(directorName);
  
  // Osiguravamo da je kod države malim slovima, jer CDN tako zahtijeva (npr. "rs", "ba")
  const lowerCaseCode = countryCode.toLowerCase();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group flex h-44 w-40 flex-shrink-0 snap-center flex-col items-center justify-center rounded-sm border border-white/10 bg-graphite/60 px-4 transition-all duration-300 hover:border-gold/50 hover:shadow-gold-glow md:h-52 md:w-48"
    >
      {/* Ako nekad u budućnosti bude slike direktora */}
      {hasDirector && photoUrl ? (
        <div className="mb-3 h-16 w-16 rounded-full border border-gold/40 bg-black/40" />
      ) : null}

      {/* PRAVOUGAONA, ELEGANTNA ZASTAVA SA DRUGOG CDN-A */}
      <div className="relative mb-4 h-7 w-10 overflow-hidden rounded-[2px] border border-white/20 shadow-md transition-all duration-300 group-hover:border-gold/50">
        <img
          src={`https://flagcdn.com/${lowerCaseCode}.svg`}
          alt={`${countryName} flag`}
          className="h-full w-full object-cover opacity-70 grayscale-[20%] transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
        />
      </div>

      <span className="text-center font-heading text-sm uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-gold">
        {countryName}
      </span>

      {hasDirector ? (
        <>
          <span className="mt-1 text-center font-body text-xs text-white/60">
            {directorName}
          </span>
          {instagramUrl ? (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-gold/70 transition-colors hover:text-gold"
              aria-label={`${directorName} on Instagram`}
            >
              <Instagram size={16} />
            </a>
          ) : null}
        </>
      ) : null}
    </motion.div>
  );
}