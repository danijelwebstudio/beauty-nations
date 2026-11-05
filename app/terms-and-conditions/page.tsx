import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Beauty Nations",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions">
      <section>
        <h2 className="font-heading text-xl uppercase text-white">1. About this website</h2>
        <p>The website https://beauty-nations.com introduces Beauty Nations, an international beauty competition initiative led by Lela Pantelić in Lausanne, Switzerland. Beauty Nations is not currently a registered company. Lela Pantelić operates the website and can be contacted at <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
        <p>The website provides ways to contact the organiser about competitions, national coordination, partnerships and Grand Final ticket-sale notifications. It does not sell tickets or accept payments. These terms cover use of the website and its enquiry and notification forms.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">2. Enquiries and expressions of interest</h2>
        <p>Submitting a competitor, national coordinator or partnership enquiry does not automatically mean acceptance, appointment, sponsorship or a contractual commitment. The Beauty Nations team may contact applicants for further information and communicate any applicable selection or participation terms separately.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">3. Grand Final ticket updates</h2>
        <p>Joining the priority ticket-notification list is free. It is a request to receive information when ticket sales become available. It does not reserve a seat, constitute a purchase or guarantee ticket availability. Ticket prices and purchasing conditions are not yet published.</p>
        <p>Any future ticket sales will be subject to separate purchasing, cancellation and refund terms made available before payment is accepted.</p>
        <p>You can withdraw your consent to ticket-sale notification emails and request removal from the list at any time by emailing <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
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
        <p>Nothing in these terms limits any rights you have under applicable law that cannot be excluded or restricted.</p>
        <p>Last updated: 5 November 2026.</p>
      </section>
    </LegalLayout>
  );
}
