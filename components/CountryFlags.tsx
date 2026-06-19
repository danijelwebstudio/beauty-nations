"use client";

import { motion } from "framer-motion";

const countries = [
  { name: "Switzerland", code: "ch" },
  { name: "Germany", code: "de" },
  { name: "Croatia", code: "hr" },
  { name: "Serbia", code: "rs" },
  { name: "Bosnia & Herzegovina", code: "ba" },
  { name: "Slovenia", code: "si" },
  { name: "Austria", code: "at" },
  { name: "Ireland", code: "ie" },
  { name: "Bulgaria", code: "bg" },
  { name: "North Macedonia", code: "mk" },
];

export default function CountryFlags() {
  return (
    // Uklonjen tvrdi border-top ako ga je bilo, dodata relative klasa
    <section className="relative border-b border-white/10 bg-black pb-12 pt-4 md:py-12">
        
      {/* OVO JE TAJ BEŠAVNI PRELAZ ZA DESKTOP: Blijedi zlatni gradijent na vrhu koji se utapa u crno */}
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-black/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center"
        >
          <p className="font-heading text-xs uppercase tracking-widest2 text-gold">
            The World is Joining
          </p>
          <h2 className="font-body text-sm font-medium uppercase tracking-widest text-white/70">
            Currently Represented Nations
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5 md:gap-x-4 md:gap-y-12">
          {countries.map((country, index) => (
            <motion.div 
              key={country.code} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative h-8 w-12 overflow-hidden rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110">
                <img
                  src={`https://flagcdn.com/${country.code}.svg`}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover opacity-80 grayscale-[30%] transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
              <span className="text-center font-heading text-[10px] uppercase leading-snug tracking-widest text-white/60 transition-colors duration-300 group-hover:text-gold">
                {country.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}