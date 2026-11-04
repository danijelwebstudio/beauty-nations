import LeadForm from "./LeadForm";

export default function PartnerEnquirySection() {
  return (
    <section id="partner-enquiry" className="scroll-mt-20 border-t border-white/10 bg-charcoal py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <p className="mb-3 text-center font-heading text-xs uppercase tracking-widest2 text-gold">For brands & sponsors</p>
        <h2 className="text-center font-display text-4xl uppercase text-white md:text-5xl">BECOME A PARTNER</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-sm leading-relaxed text-white/70 md:text-base">Connect your brand with creative talent across seven represented nations. Tell us about your partnership interests.</p>
        <div className="mx-auto mt-8 max-w-2xl border border-gold/20 bg-black/50 p-5 sm:p-8">
          <LeadForm kind="partner" buttonText="SEND PARTNERSHIP ENQUIRY" fields={[
            { name: "name", label: "Contact name", required: true },
            { name: "email", label: "Business email", type: "email", required: true },
            { name: "brand", label: "Brand / organization", required: true },
            { name: "country", label: "Country", required: true },
            { name: "website", label: "Website or Instagram (optional)", type: "text" },
            { name: "message", label: "How would you like to collaborate?", type: "textarea", required: true, maxLength: 1500 },
          ]} />
        </div>
      </div>
    </section>
  );
}
