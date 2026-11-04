import { Instagram, Mail } from "lucide-react";
import LeadForm from "./LeadForm";

export default function ContactSection() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info.lelapantelic@gmail.com";
  return (
    <section id="coordinator-application" className="scroll-mt-20 border-t border-white/10 bg-black py-14 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-6">
        <p className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold">Represent your country</p>
        <h2 className="text-center font-display text-4xl uppercase text-white md:text-5xl">BECOME A NATIONAL COORDINATOR</h2>
        <p className="mx-auto mt-4 mb-8 max-w-2xl text-center font-body text-sm text-white/70 md:text-base">Apply to represent your country as a Beauty Nations National Coordinator.</p>
        <div className="border border-white/10 p-5 sm:p-8">
          <LeadForm kind="coordinator" buttonText="APPLY AS NATIONAL COORDINATOR" fields={[
            { name: "name", label: "Full name", required: true },
            { name: "email", label: "Email", type: "email", required: true },
            { name: "country", label: "Country", required: true },
            { name: "instagram", label: "Instagram profile", placeholder: "@username", required: true },
            { name: "experience", label: "Years of experience", type: "number", required: true },
            { name: "position", label: "Current position", type: "select", required: true, options: ["Educator", "Brand Owner", "Organizer", "Other"] },
            { name: "reason", label: "Why would you like to become a national coordinator?", type: "textarea", required: true, maxLength: 1500 },
          ]} />
        </div>
        <div id="contact" className="mt-12 text-center">
          <p className="mb-4 font-heading text-xs uppercase tracking-widest2 text-gold">Follow Beauty Nations</p>
          <div className="flex items-center justify-center gap-8 text-white/70">
            <a href="https://www.instagram.com/beautynations.world/" target="_blank" rel="noopener noreferrer" className="hover:text-gold" aria-label="Beauty Nations Instagram"><Instagram size={25} /></a>
            {contactEmail ? <a href={`mailto:${contactEmail}`} className="hover:text-gold" aria-label="Beauty Nations email"><Mail size={25} /></a> : null}
          </div>
          <p className="mt-3 font-body text-xs text-white/50">For all official enquiries: Lela Pantelić, Founder of Beauty Nations.</p>
        </div>
      </div>
    </section>
  );
}
