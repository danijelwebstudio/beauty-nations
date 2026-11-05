import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Beauty Nations — Draft",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <section>
        <h2 className="font-heading text-xl uppercase text-white">1. About this website</h2>
        <p>This website introduces Beauty Nations and provides ways to contact the organisers about competitions, national coordination, partnerships and Grand Final ticket-sale notifications.</p>
        <p className="text-amber-100">[TO CONFIRM: identity, address and legal status of the website operator. Do not describe an unregistered company as a registered entity.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">2. Enquiries and expressions of interest</h2>
        <p>Submitting a competitor, national coordinator or partnership enquiry does not automatically mean acceptance, appointment, sponsorship or a contractual commitment. The Beauty Nations team may contact applicants for further information and communicate any applicable selection or participation terms separately.</p>
        <p className="text-amber-100">[TO CONFIRM: final application eligibility, age rules, selection conditions, deadlines and decision-making process.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">3. Grand Final ticket updates</h2>
        <p>Joining the priority ticket-notification list is free. It is a request to receive information when ticket sales become available. It does not reserve a seat, constitute a purchase or guarantee ticket availability. Ticket prices and purchasing conditions are not yet published.</p>
        <p>When ticket sales are launched, separate purchasing, cancellation and refund terms should be provided before payment is accepted.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">4. Website information</h2>
        <p>Event information, participating territories, coordinators and programme details may be updated. We aim to keep the website accurate, but information describing future events may change. Confirm important details with the organiser before making travel commitments.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">5. Content and intellectual property</h2>
        <p>Beauty Nations branding, photographs, artwork and website content may be protected by intellectual property rights held by their respective owners. Do not reproduce protected material without the necessary permission, except as permitted by law.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">6. Acceptable use and third-party services</h2>
        <p>Please do not submit false or unlawful information, attempt to disrupt the website or automate abusive submissions. Links to external services or social networks are subject to those services&apos; own terms and privacy practices.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">7. Privacy and contact</h2>
        <p>Read our <a className="text-gold underline" href="/privacy-policy">Privacy Policy</a> for details about personal information. For general enquiries contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
        <p className="text-amber-100">[TO CONFIRM: any appropriate governing-law and dispute resolution terms. Mandatory consumer rights cannot be overridden by website terms.]</p>
      </section>
    </LegalLayout>
  );
}
