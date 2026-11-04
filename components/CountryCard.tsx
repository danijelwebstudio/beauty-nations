"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram } from "lucide-react";
import type { NationalDirector } from "@/data/directors";

export default function CountryCard({
  countryName,
  countryCode,
  directorName,
  posterUrl,
  displayUrl,
  instagramUrl,
}: NationalDirector) {
  const countryFlag = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35 }}
      className="group h-full w-full"
    >
      {posterUrl && displayUrl ? (
        <a
          href={posterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View the full original poster for ${directorName}, national coordinator for ${countryName} (opens in a new tab)`}
          className="block w-full overflow-hidden border border-white/15 bg-black transition-colors duration-300 hover:border-gold/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <div className="relative aspect-[924/1329] w-full">
            <Image
              src={displayUrl}
              alt={`Beauty Nations national coordinator for ${countryName}: ${directorName}. Official Season 2027 poster.`}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 310px"
              className="object-contain"
              priority={["HR", "BA", "BG"].includes(countryCode)}
            />
          </div>
        </a>
      ) : (
        <div className="flex aspect-[924/1329] w-full flex-col items-center justify-center border border-white/10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),rgba(0,0,0,1)_65%)] px-4 text-center transition-colors duration-300 group-hover:border-gold/30">
          <div className="mb-7 font-display text-5xl uppercase leading-none text-gold/30">BN</div>
          <div className="mb-7 h-px w-16 bg-gold/35" />
          <Image
            src={countryFlag}
            alt={`${countryName} flag`}
            width={40}
            height={28}
            unoptimized
            className="mb-4 h-[24px] w-[36px] object-cover"
          />
          <p className="mb-3 font-heading text-[10px] uppercase tracking-wider text-gold">
            National Coordinator
          </p>
          <h3 className="max-w-full text-balance font-display text-2xl uppercase leading-tight text-white sm:text-3xl">
            {countryName}
          </h3>
          <p className="mt-3 font-body text-xs text-white/50">Details coming soon</p>
        </div>
      )}

      {/* All cards reserve the same footer space so the horizontal slider
          stays aligned. Never invent a link for countries without one. */}
      <div className="mt-2 flex h-10 w-full items-center justify-center">
        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the Instagram profile for ${countryName} (opens in a new tab)`}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-sm border border-gold/35 px-4 font-heading text-[10px] uppercase tracking-widest text-gold transition-colors duration-200 hover:border-gold hover:bg-gold/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            <Instagram size={15} strokeWidth={1.7} aria-hidden="true" />
            Instagram
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}
