import LeadForm from "./LeadForm";

export default function GrandFinalSection() {
  return (
    <section id="grand-final" className="scroll-mt-20 border-y border-gold/15 bg-black py-14 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <p className="text-center font-heading text-xs uppercase tracking-widest2 text-gold">18 September 2027 · Zagreb</p>
        <h2 className="mt-3 text-center font-display text-4xl uppercase leading-tight text-white md:text-5xl">EXPERIENCE THE GRAND FINAL</h2>
        <p className="mx-auto mt-5 max-w-3xl text-center font-body text-sm leading-relaxed text-white/75 md:text-base">Meet the national delegations, discover the stories behind the finalist creations and experience live country connections, international judging and the announcement of the Beauty Nations winner.</p>
        <div className="mx-auto mt-9 max-w-2xl border border-gold/25 bg-[#0b0b0b] p-5 sm:p-8" id="ticket-notifications">
          <h3 className="mb-2 font-heading text-lg uppercase tracking-wide text-white">PRIORITY TICKET NOTIFICATION LIST</h3>
          <p className="mb-6 font-body text-sm leading-relaxed text-white/70">Join our free list to be among the first to hear when tickets go on sale and receive priority access to the sale. Registration does not reserve or purchase a seat; a place is confirmed only after a completed ticket purchase. Ticket prices are not published yet.</p>
          <LeadForm
            kind="tickets"
            buttonText="NOTIFY ME WHEN TICKETS GO ON SALE"
            consentText="I agree to receive Beauty Nations emails about the Grand Final ticket sale. I understand that signing up is free and does not reserve a seat."
            fields={[
              { name: "name", label: "Full name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "country", label: "Country you are coming from", required: true },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
