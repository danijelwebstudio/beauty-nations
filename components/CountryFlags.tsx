"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { confirmedDirectors } from "@/data/directors";

// Preserve the approved ordering; all content comes from confirmed records.
const flagOrder = ["CH", "DE", "HR", "RS", "BA", "SI", "BG", "MK"];
const countries = [...confirmedDirectors]
  .sort((a, b) => {
    const rank = (code: string) => flagOrder.includes(code) ? flagOrder.indexOf(code) : flagOrder.length;
    return rank(a.countryCode) - rank(b.countryCode);
  })
  .map((director) => ({ name: director.countryName, code: director.countryCode.toLowerCase() }));

export default function CountryFlags() {
  return (
    <section className="relative border-b border-white/10 bg-black pb-8 pt-2 md:py-12">
      {/* Match the original understated black-and-gold background. */}
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-black/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <p className="font-heading text-xs uppercase tracking-widest2 text-gold">
            The World is Joining
          </p>
          <h2 className="font-body text-sm font-medium uppercase tracking-widest text-white/70">
            Currently Represented Nations
          </h2>
        </motion.div>

        {/*
          Flex items are sized to fit 2/3/4 per row (mobile/tablet/desktop).
          Centering keeps wrapped rows balanced as countries are confirmed.
        */}
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-y-6 lg:max-w-5xl lg:gap-y-7">
          {countries.map((country, index) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: index * 0.07 }}
              whileHover={{ y: -4 }}
              className="group flex min-h-[102px] md:min-h-[138px] w-[44%] flex-col items-center justify-center gap-2 md:gap-4 rounded-sm border border-white/10 bg-white/[0.02] px-2 py-3 md:py-5 text-center transition-[border-color,background-color,box-shadow] duration-300 hover:border-gold/40 hover:bg-gold/[0.04] hover:shadow-[0_0_24px_rgba(212,175,55,0.08)] sm:w-[190px] lg:w-[220px]"
            >
              <div className="flex h-12 w-[76px] items-center justify-center">
                <img
                  src={`https://flagcdn.com/${country.code}.svg`}
                  alt={`${country.name} flag`}
                  className="h-10 w-[66px] object-contain md:h-12 md:w-[76px] opacity-90 drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <span className="max-w-full font-heading text-[10px] uppercase leading-relaxed tracking-[0.14em] text-white/70 transition-colors duration-300 group-hover:text-gold sm:text-[11px]">
                {country.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
