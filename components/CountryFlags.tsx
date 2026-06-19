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
    <section className="bg-black py-8 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Naslov iznad zastava */}
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

        {/* Mreža sa zastavama - sada sa kaskadnom animacijom */}
        <div className="grid grid-cols-3 gap-y-10 gap-x-4 md:grid-cols-5 md:gap-y-12">
          {countries.map((country, index) => (
            <motion.div 
              key={country.code} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }} // OVO PRAVI KASKADNI EFEKAT
              className="group flex flex-col items-center gap-3"
            >
              <div className="relative h-8 w-12 overflow-hidden rounded-sm shadow-md transition-transform duration-300 group-hover:scale-110">
                <img
                  src={`https://flagcdn.com/${country.code}.svg`}
                  alt={`${country.name} flag`}
                  className="h-full w-full object-cover opacity-80 grayscale-[30%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </div>
              <span className="text-center font-heading text-[10px] uppercase tracking-widest text-white/60 transition-colors duration-300 group-hover:text-gold leading-none">
                {country.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}