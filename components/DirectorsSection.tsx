"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { directors } from "@/data/directors";
import CountryCard from "./CountryCard";

export default function DirectorsSection() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return directors;
    const q = query.trim().toLowerCase();
    return directors.filter((d) => d.countryName.toLowerCase().includes(q));
  }, [query]);

  return (
    <section id="directors" className="relative bg-black py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold"
        >
          Representing The World
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-center font-display text-4xl uppercase text-white md:text-5xl"
        >
          OFFICIAL NATIONAL DIRECTORS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 max-w-2xl text-center font-body text-sm text-white/70 md:text-base"
        >
          Each country is represented by one exclusive National Director responsible for developing Beauty Nations within their territory.
        </motion.p>

        <div className="mx-auto mb-12 max-w-md">
          <div className="flex items-center gap-3 border-b border-gold/40 px-2 py-3 transition-colors focus-within:border-gold">
            <Search size={18} className="text-gold/70" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a country..."
              className="w-full bg-transparent font-body text-sm text-white placeholder:text-white/40 focus:outline-none"
              aria-label="Search national directors by country"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center font-body text-white/50">
            No country found. New nations are announced regularly — check
            back soon.
          </p>
        ) : (
         <div className="flex snap-x gap-5 overflow-x-auto pb-6 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-gold/40 hover:[&::-webkit-scrollbar-thumb]:bg-gold/80 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {filtered.map((director) => (
              <CountryCard key={director.countryCode} {...director} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}