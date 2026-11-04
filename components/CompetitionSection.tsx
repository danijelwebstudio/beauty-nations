"use client";

import { useState } from "react";
import { Instagram } from "lucide-react";
import { directors } from "@/data/directors";
import LeadForm from "./LeadForm";

const confirmed = directors.filter((director) => director.posterUrl).sort((a, b) => a.countryName.localeCompare(b.countryName));

export default function CompetitionSection() {
  const [country, setCountry] = useState("");
  const selected = confirmed.find((director) => director.countryName === country);

  return (
    <section id="compete" className="scroll-mt-20 border-t border-white/10 bg-charcoal py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <p className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold">Your journey begins here</p>
        <h2 className="text-center font-display text-4xl uppercase text-white md:text-5xl">COMPETE</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-sm leading-relaxed text-white/70 md:text-base">Choose your country to find its official National Coordinator and ask about entering the competition.</p>
        <div className="mx-auto mt-8 max-w-2xl border border-gold/20 bg-black/50 p-5 sm:p-7">
          <label htmlFor="competitor-country" className="mb-2 block font-heading text-xs uppercase tracking-widest text-white/80">Select your country</label>
          <select id="competitor-country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full border border-white/25 bg-[#0a0a0a] px-4 py-3 font-body text-white focus:border-gold focus:outline-none">
            <option value="">Choose a represented nation</option>
            {confirmed.map((director) => <option key={director.countryCode} value={director.countryName}>{director.countryName}</option>)}
          </select>
          {selected ? (
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="font-heading text-xs uppercase tracking-widest text-gold">National Coordinator</p>
              <h3 className="mt-2 font-heading text-xl text-white">{selected.directorName}</h3>
              {selected.instagramUrl ? (
                <a href={selected.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 border border-gold/50 px-4 py-3 font-heading text-xs uppercase tracking-wider text-gold hover:bg-gold/10"><Instagram size={17} /> Contact via Instagram</a>
              ) : (
                <p className="mt-3 font-body text-sm text-white/70">Direct Instagram contact has not been provided yet. Send the inquiry below to the Beauty Nations organizing team for forwarding.</p>
              )}
              <p className="mb-5 mt-5 font-body text-sm text-white/70">You may also send your question to the organizing team:</p>
              <LeadForm key={selected.countryCode} kind="competitor" defaults={{ country: selected.countryName }} buttonText="SEND COMPETITION ENQUIRY" fields={[
                { name: "name", label: "Full name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "message", label: "Your question", type: "textarea", required: true, maxLength: 1500 },
              ]} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
