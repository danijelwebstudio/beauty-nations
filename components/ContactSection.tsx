"use client";

import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-black py-20 md:py-28 border-t border-white/10">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 font-display text-4xl uppercase text-white md:text-5xl">
            BECOME A NATIONAL DIRECTOR
          </h2>
          <p className="font-body text-white/70">
            Apply to exclusively represent your country on the global stage.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="font-heading text-xs uppercase tracking-widest text-white/70">
                Full Name
              </label>
              <input 
                type="text" 
                id="fullName" 
                className="rounded-sm border border-white/20 bg-transparent px-4 py-3 font-body text-white transition-colors focus:border-gold focus:outline-none" 
                required 
              />
            </div>
            
            {/* Country */}
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className="font-heading text-xs uppercase tracking-widest text-white/70">
                Country
              </label>
              <input 
                type="text" 
                id="country" 
                className="rounded-sm border border-white/20 bg-transparent px-4 py-3 font-body text-white transition-colors focus:border-gold focus:outline-none" 
                required 
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Instagram Profile */}
            <div className="flex flex-col gap-2">
              <label htmlFor="instagram" className="font-heading text-xs uppercase tracking-widest text-white/70">
                Instagram Profile
              </label>
              <input 
                type="text" 
                id="instagram" 
                placeholder="@username" 
                className="rounded-sm border border-white/20 bg-transparent px-4 py-3 font-body text-white transition-colors focus:border-gold focus:outline-none" 
                required 
              />
            </div>
            
            {/* Years of Experience */}
            <div className="flex flex-col gap-2">
              <label htmlFor="experience" className="font-heading text-xs uppercase tracking-widest text-white/70">
                Years of Experience
              </label>
              <input 
                type="number" 
                id="experience" 
                min="0" 
                className="rounded-sm border border-white/20 bg-transparent px-4 py-3 font-body text-white transition-colors focus:border-gold focus:outline-none" 
                required 
              />
            </div>
          </div>

          {/* Current Position (Dropdown) */}
          <div className="flex flex-col gap-2">
            <label htmlFor="position" className="font-heading text-xs uppercase tracking-widest text-white/70">
              Current Position
            </label>
            <select 
              id="position" 
              defaultValue=""
              className="cursor-pointer appearance-none rounded-sm border border-white/20 bg-black px-4 py-3 font-body text-white transition-colors focus:border-gold focus:outline-none" 
              required
            >
              <option value="" disabled>Select your position</option>
              <option value="Educator">Educator</option>
              <option value="Brand Owner">Brand Owner</option>
              <option value="Organizer">Organizer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Why would you like to represent your country? */}
          <div className="flex flex-col gap-2">
            <label htmlFor="reason" className="font-heading text-xs uppercase tracking-widest text-white/70">
              Why would you like to represent your country?
            </label>
            <textarea 
              id="reason" 
              rows={5} 
              className="resize-none rounded-sm border border-white/20 bg-transparent px-4 py-3 font-body text-white transition-colors focus:border-gold focus:outline-none" 
              required
            ></textarea>
          </div>

          {/* Apply Now Button */}
          <button 
            type="submit" 
            className="mt-4 rounded-sm bg-gold px-8 py-4 font-heading text-sm uppercase tracking-widest2 text-black transition-transform duration-300 hover:scale-[1.02]"
          >
            APPLY NOW
          </button>
        </motion.form>

        {/* --- DODAT FOLLOW BEAUTY NATIONS DIO OVDJE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="mb-6 font-heading text-sm uppercase tracking-widest2 text-gold">
            FOLLOW BEAUTY NATIONS
          </h3>
          <div className="flex justify-center gap-6 text-white/70">
            {/* Možeš kasnije zamijeniti # sa pravim Instagram linkom */}
            <a href="https://www.instagram.com/beautynations.world/" className="transition-all  hover:text-gold" aria-label="Instagram">
              <Instagram size={28} strokeWidth={1.5} />
            </a>
            {/* Možeš kasnije zamijeniti # sa pravim mailom */}
            <a href="mailto:info@beautynations.world" className="transition-all hover:text-gold" aria-label="Email">
              <Mail size={28} strokeWidth={1.5} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}