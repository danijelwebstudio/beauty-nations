import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

// Drafts stay out of search results until the organiser approves the final text.
export const metadata: Metadata = {
  title: "Privacy Policy | Beauty Nations — Draft",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <section>
        <h2 className="font-heading text-xl uppercase text-white">1. Who is responsible for your data?</h2>
        <p>Beauty Nations is an international beauty competition initiative represented by Lela Pantelić. For privacy enquiries, contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a>.</p>
        <p className="text-amber-100">[TO CONFIRM BEFORE PUBLICATION: full legal name and postal address of the person or registered entity acting as data controller; any applicable EU/Swiss representative.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">2. What information do we collect?</h2>
        <p>Depending on the form you choose, you may give us your name, email address, country, brand or organisation, website or Instagram profile, professional experience, position, enquiry or application details, and preferences about ticket-sale notifications. We also process technical information necessary to operate the website and prevent abuse, such as limited security and request data.</p>
        <p>Please do not include sensitive personal information in free-text fields.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">3. Why do we use the information?</h2>
        <p>We use submitted data to respond to competitor, national coordinator and partnership enquiries; organise and evaluate expressions of interest; and, where you expressly opt in, send updates about Grand Final ticket sales. Signing up for a ticket notification is free and does not reserve or purchase a seat.</p>
        <p className="text-amber-100">[TO CONFIRM: appropriate legal basis for each purpose, including enquiry handling, selection processes and marketing communications; any mailing-list provider and unsubscribe workflow.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">4. Who helps us process data?</h2>
        <p>Form submissions are processed through Formspree, and automated-abuse checks use Cloudflare Turnstile. The website is intended to be hosted using infrastructure managed by the Beauty Nations website operator; the production hosting provider must be confirmed before launch. Email services may also process enquiries when notifications are delivered.</p>
        <p className="text-amber-100">[TO CONFIRM: final hosting and email providers, applicable data-processing agreements, processing locations and cross-border transfer safeguards.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">5. How long do we keep information?</h2>
        <p>We intend to keep enquiry and application information only as long as needed for the relevant request, competition activities or legal obligations. Ticket-notification contacts should be removed when no longer needed or when a person withdraws from the list, subject to applicable retention requirements.</p>
        <p className="text-amber-100">[TO CONFIRM: actual retention periods, deletion schedule and treatment of unsuccessful coordinator or competitor enquiries.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">6. Your choices and rights</h2>
        <p>Depending on the law that applies, you may request access to your personal data, correction, deletion, restriction, portability or object to certain processing. Where processing depends on consent, you may withdraw that consent. Contact <a className="text-gold underline" href="mailto:info.lelapantelic@gmail.com">info.lelapantelic@gmail.com</a> to make a request. You may also have a right to complain to a relevant data protection authority.</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">7. Cookies, analytics and security</h2>
        <p>Security services may use limited browser information to distinguish automated activity from genuine visitors. If optional analytics or marketing technologies are enabled, their purpose, data handling and any required consent choices must be described before activation.</p>
        <p className="text-amber-100">[TO CONFIRM: actual cookie and tracking inventory, including whether Google Analytics is active in production and whether a consent tool is required.]</p>
      </section>
      <section>
        <h2 className="font-heading text-xl uppercase text-white">8. Changes and contact</h2>
        <p>We may update this notice when our services or the way we process information changes. The approved notice will include its effective date.</p>
        <p className="text-amber-100">[TO CONFIRM: effective date after organiser approval.]</p>
      </section>
    </LegalLayout>
  );
}
