import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Beauty Nations",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <section>
        <h2 className="font-heading text-xl uppercase text-white">1. Who is responsible for your data?</h2>
        <p>Beauty Nations is an international beauty competition initiative led by Lela Pantelić, based in Lausanne, Switzerland. Lela Pantelić is responsible for the personal data processed through this website. For questions regarding the processing of personal data, please contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
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
        <p>Formspree processes form submissions sent by this website. Cloudflare Turnstile processes technical browser and request information to check for automated abuse. Email providers process messages when enquiries and ticket-sale notifications are delivered or answered. Hosting providers process technical request data needed to serve and secure the website.</p>
        <p>The production hosting provider, processing locations, provider retention settings and any applicable international transfer safeguards must be confirmed before this draft is approved.</p>
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
        <p>Cloudflare Turnstile processes technical request and browser information to distinguish automated activity from genuine visitors. Our application temporarily uses keyed identifiers derived from email addresses and, when a trusted proxy is configured, IP addresses to limit repeated submissions. The application rate-limit windows are ten minutes for IP addresses and one hour for email addresses; these are separate from provider and email retention periods.</p>
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
