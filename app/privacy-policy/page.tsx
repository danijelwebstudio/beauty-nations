import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Beauty Nations",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <section>
        <h2 className="font-heading text-xl uppercase text-white">1. Who is responsible for your data?</h2>
        <p>Beauty Nations is an international beauty competition initiative led by Lela Pantelić in Lausanne, Switzerland. Beauty Nations is not currently a registered company. Lela Pantelić is responsible for the personal data processed through https://beauty-nations.com. For privacy enquiries, contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">2. What information do we collect?</h2>
        <p>Depending on the form you choose, you may give us your name, email address, country, brand or organisation, website or Instagram profile, professional experience, position, enquiry or application details, and preferences about ticket-sale notifications. We also process technical information necessary to operate the website and prevent abuse, such as limited security and request data.</p>
        <p>Please do not include sensitive personal information in free-text fields.</p>
        <p>Submitting an enquiry or joining the ticket-notification list is voluntary. The fields marked as required are needed to process the form you choose; if you do not provide them, that form cannot be submitted. The website does not sell tickets or collect payments.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">3. Why do we use the information?</h2>
        <p>We use submitted data to respond to competitor, national coordinator and partnership enquiries; organise and evaluate expressions of interest; and, where you expressly opt in, send updates about Grand Final ticket sales. Signing up for a ticket notification is free and does not reserve or purchase a seat.</p>
        <p>Ticket-sale notification emails depend on your consent. You can withdraw that consent and request removal from the list at any time by emailing <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">4. Who helps us process data?</h2>
        <p>The website is hosted on Hetzner infrastructure and deployed and managed using Coolify. Formspree processes form submissions. Cloudflare Turnstile checks for automated abuse, and Cloudflare WAF helps protect the website from malicious traffic. These services process submission or technical data as needed for their respective functions. Email providers also process messages when enquiries and notifications are delivered or answered.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">5. How long do we keep information?</h2>
        <p>We intend to keep enquiry and application information only as long as needed for the relevant request, competition activities or legal obligations. Ticket-notification contacts should be removed when no longer needed or when a person withdraws from the list, subject to applicable retention requirements.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">6. Your choices and rights</h2>
        <p>Depending on the law that applies, you may request access to your personal data, correction, deletion, restriction, portability or object to certain processing. Where processing depends on consent, you may withdraw that consent at any time without affecting the lawfulness of processing before withdrawal. Contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a> to make a request. You may also have a right to complain to a relevant data protection authority, including the Swiss Federal Data Protection and Information Commissioner (FDPIC).</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">7. Cookies, analytics and security</h2>
        <p>Cloudflare Turnstile and WAF may process technical request and browser information to distinguish automated activity from genuine visitors and protect the website. Our application also uses hashed IP address and email identifiers to limit repeated form submissions.</p>
        <p>If optional analytics or marketing technologies are enabled, their purpose, data handling and any required consent choices must be described before activation.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">8. Changes and contact</h2>
        <p>We may update this notice when our services or the way we process information changes. For questions about this notice, contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
        <p>Last updated: 5 November 2026.</p>
      </section>
    </LegalLayout>
  );
}
