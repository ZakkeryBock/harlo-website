import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList } from "@/components/legal/legal-page";
import {
  ADDRESS,
  COMPANY,
  GOVERNING_STATE,
  LEGAL_ENTITY,
  PRIVACY_EMAIL,
  SUPPORT_EMAIL,
} from "@/lib/legal";

/**
 * ⚠ Not reviewed by counsel. Written to describe what Harlo actually does.
 * Privacy law is jurisdictional and this product touches driver personal data,
 * DOT compliance records, and A2P messaging. Have counsel read it before it is
 * relied on.
 *
 * Section 6 commits Harlo to masking direct identifiers (names, phones, emails,
 * licence numbers) before training its own models: any training pipeline must
 * do that, or this text must change first (owner decision 2026-11-20).
 *
 * Keep it truthful as the product changes: if Harlo starts sending data to a
 * new processor, that processor belongs in section 7 in the same PR. Section 5
 * (aggregated data) is a promise, not marketing — do not let the product drift
 * past it.
 *
 * Section 7 names the processors in use (checked 2026-11-21 against the cloud
 * setup). Section 8: advertising pixels are allowed on the marketing website
 * ONLY, loaded by harlo-website's AdPixels, which stays off under Global Privacy
 * Control or an opt-out at goharlo.com/privacy-choices. Never put one in an app.
 * Section 9's deletion promise is enforced by harlo-infra 107 (Close workspace +
 * the daily account-retention job).
 *
 * Copied verbatim to harlo-website (src/app/privacy) apart from the metadata
 * title and the absolute /sms-consent links — change both together.
 */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${COMPANY} collects, uses, and protects information in the Harlo platform.`,
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={
        <p>
          {LEGAL_ENTITY} (&ldquo;{COMPANY}&rdquo;, &ldquo;we&rdquo;) provides operational software to
          trucking companies. This policy explains what information the Harlo platform handles, why,
          who it is shared with, and what we do and do not do with it. It covers our website
          (goharlo.com), the Harlo web application, the Harlo Go and Harlo Driver apps, and the Harlo
          API.
        </p>
      }
    >
      <LegalSection title="1. Our role: carriers control their own data">
        <p>
          Almost everything in Harlo is entered by a motor carrier about its own business — its
          drivers, its equipment, its customers, its loads. For that information the carrier is the
          controller and {COMPANY} is a processor: we hold and process it on the carrier&apos;s
          instructions, under our agreement with them, and we do not use it for unrelated purposes.
        </p>
        <p>
          If you are a driver, employee, or contact of a carrier that uses Harlo and you want to see,
          correct, or delete information about you,{" "}
          <strong className="text-foreground">contact that carrier first</strong> — they decide what
          their records say. That includes drivers who sign in to Harlo Driver: the carrier that
          invited you controls what is recorded about you there. We will help the carrier respond,
          and we will pass along requests we receive directly.
        </p>
        <p>
          We are the controller for a smaller set of data: the accounts of the people who sign in,
          billing records, support correspondence, inquiries sent through our website, the
          operational logs we keep to run the service, the aggregated statistics described in
          section 5, and the de-identified data we use to train and improve Harlo&apos;s own models
          (section 6).
        </p>
      </LegalSection>

      <LegalSection title="2. Information in the platform">
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Account and sign-in data</strong> — name, work
              email, role and permissions, authentication records, and sign-in activity.
            </>,
            <>
              <strong className="text-foreground">Carrier operational data</strong> — customers,
              facilities, loads, routes, dispatch, equipment, financial records, and the event
              history of changes to them.
            </>,
            <>
              <strong className="text-foreground">Driver information</strong> — name, date of birth,
              contact details, address, employment records, pay terms, commercial driver&apos;s
              licence and endorsements, medical examiner&apos;s certificates, incidents, and duty and
              schedule records. Some of this is personal and sensitive; it is in Harlo because DOT and
              FMCSA rules require a carrier to keep it.
            </>,
            <>
              <strong className="text-foreground">Documents</strong> — files uploaded by the carrier,
              such as rate confirmations, bills of lading, licences, and certificates, together with
              the data extracted from them.
            </>,
            <>
              <strong className="text-foreground">Mobile numbers and messaging consent</strong> —
              where a carrier enables text notifications, the driver&apos;s mobile number, whether
              they consented, the exact wording they agreed to, when, and from where. See our{" "}
              <a className="underline" href="https://app.goharlo.com/sms-consent">
                SMS consent disclosure
              </a>
              .
            </>,
            <>
              <strong className="text-foreground">Harlo Driver</strong> — the phone number a driver
              signs in with, the one-time codes sent to it, and what the driver records in the app:
              arrivals and departures at stops (with the time), photos or files of paperwork such as
              a bill of lading or proof of delivery, and messages with the carrier&apos;s dispatchers.
            </>,
            <>
              <strong className="text-foreground">Notifications</strong> — if you turn on push
              notifications, your browser or device&apos;s push address and encryption keys and a
              short browser description, so we can deliver them.
            </>,
            <>
              <strong className="text-foreground">Connected services and the API</strong> — where a
              carrier connects a service such as a telematics provider, the data we retrieve from it
              for that carrier and the access credential, which we store encrypted. For the API, a
              hash of each key (never the key itself) and a log of requests: time, endpoint, IP
              address, and browser or client string.
            </>,
            <>
              <strong className="text-foreground">Website inquiries</strong> — if you contact us
              through goharlo.com (for example the partner form), the name, email, company, and
              message you send.
            </>,
            <>
              <strong className="text-foreground">Technical and usage data</strong> — IP address,
              browser and device information, pages and features used, and error and performance logs.
              When someone files a problem report from inside Harlo, we may attach a recording of
              their session to it (see section 8).
            </>,
            <>
              <strong className="text-foreground">Billing data</strong> — plan, metered usage, and
              invoices. Card details go directly to our payment processor; we do not store full card
              numbers.
            </>,
          ]}
        />
        <p>
          <strong className="text-foreground">What we do not collect.</strong> Harlo does not collect
          biometric identifiers or biometric information — no fingerprints, no face or voice
          templates, no retina or iris scans — and does not use facial recognition. We do not run
          background checks, pull motor vehicle records, or act as a consumer reporting agency. We do
          not collect government identifiers beyond what a carrier enters for its own DOT
          recordkeeping. We do not track a driver&apos;s personal device location unless the driver
          turns on &ldquo;Share my location&rdquo; in Harlo Driver. Then the phone sends its position
          only while the app is open, Harlo keeps only the latest one, only that driver&apos;s own
          fleet sees it, and turning sharing off deletes it.
        </p>
        <p>
          We do not knowingly collect information from anyone under 16. Harlo is business software and
          is not directed at children.
        </p>
      </LegalSection>

      <LegalSection title="3. How the information is used">
        <LegalList
          items={[
            "Running the platform: showing a carrier its own operation, and recording the facts it enters.",
            "Producing the analysis Harlo exists for — compliance and fitness conclusions, risk and exception signals, document understanding, and the assistant's answers.",
            "Sending operational notifications, including text messages to drivers who have consented.",
            "Keeping an audit trail of changes, which we retain because carriers are subject to audit.",
            "Security, abuse prevention (including bot protection on sign-up and website forms), troubleshooting, and support.",
            "Replying to inquiries, and sending service and account emails — sign-in links, invitations, billing notices, and notices of changes to our terms or this policy.",
            "Billing, and measuring usage against a subscription.",
            "Improving Harlo, building the cross-carrier statistics described in section 5, and training Harlo's own models as described in section 6.",
            "Meeting our own legal obligations, and establishing or defending legal claims.",
          ]}
        />
        <p>
          <strong className="text-foreground">
            We do not sell personal information, and nothing in the Harlo apps is used for
            advertising.
          </strong>{" "}
          We do not use carrier data to advertise to anyone, and we do not send marketing texts. The
          one place we use advertising technology is our marketing website, as section 8 describes,
          and you can opt out of it.
        </p>
      </LegalSection>

      <LegalSection title="4. Legal bases (where GDPR or similar law applies)">
        <p>
          Where we act as a processor, the carrier determines the legal basis. Where we act as a
          controller, we rely on: performance of a contract, for accounts, billing, and delivering the
          service; our legitimate interests, for security, abuse prevention, support, product
          improvement, training Harlo&apos;s own models, and the aggregated statistics in section 5, balanced against the rights of the
          people concerned; consent, where the law requires it, such as for messaging; and legal
          obligation, where we must keep or disclose something.
        </p>
      </LegalSection>

      <LegalSection title="5. Cross-carrier statistics — what we build, and the limits on it">
        <p>
          This is the section carriers should read closely, because it describes something we do
          deliberately.
        </p>
        <p>
          <strong className="text-foreground">
            Harlo uses platform activity to build aggregated, de-identified intelligence about how
            freight moves.
          </strong>{" "}
          For example: typical dwell time at a given facility, how a lane behaves by season, how often
          a class of exception turns into a real problem, how long a document type takes to clear.
          That intelligence is what lets Harlo tell any carrier that a shipper runs four hours late on
          Fridays — a thing no single carrier can see from its own data alone. We use it to improve the
          product, and we may publish or commercialise it as industry benchmarks and statistics.
        </p>
        <p>
          Aggregated data means data combined across customers and de-identified, so it does not
          identify — and cannot reasonably be used to identify — a carrier, a driver, an employee, a
          broker, a shipper, or an individual load, rate, or transaction.
        </p>
        <p>These limits are commitments, and they also appear in our Terms of Service:</p>
        <LegalList
          items={[
            "We never publish, sell, or disclose a carrier's rates, margins, financial records, customer or broker relationships, driver records, or load-level detail in identifiable form.",
            "We never identify which carriers contributed to a statistic, and nothing we publish is designed to expose or disadvantage any carrier.",
            "We do not attempt to re-identify aggregated data, and we require the same of anyone we provide it to.",
            "We do not publish a statistic drawn from too few contributing carriers or records to be meaningfully anonymous.",
            "We do not use one carrier's data to give another carrier a targeted advantage against it.",
            "Personal information about drivers and individuals is not part of what we publish. Dwell time is about a facility, not about the person who waited there.",
          ]}
        />
        <p>
          Because aggregated data no longer identifies anyone, it is not personal information, and
          deleting a carrier&apos;s data does not require us to unwind statistics already derived from
          it. If you have a question about how a benchmark was built, ask us at{" "}
          <a className="underline" href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="6. Automated analysis and AI">
        <p>
          Harlo interprets operational data — it reads uploaded documents, derives compliance
          conclusions, and answers questions about a carrier&apos;s operation. Some of that runs on
          models we host ourselves, and some runs on third-party model providers we contract with
          (currently Anthropic). Conversations with Harlo&apos;s assistant are saved in the
          carrier&apos;s workspace so it can pick up where it left off.
        </p>
        <p>
          Where a third-party provider is used, it processes the content only to return a result to us
          and under contractual restrictions.{" "}
          <strong className="text-foreground">
            Third-party model providers do not train their models on carrier data.
          </strong>
        </p>
        <p>
          <strong className="text-foreground">
            We use carrier data to train and improve Harlo&apos;s own models
          </strong>
          , including the Harlo Intelligence Engine behind Ike, document reading, alerts and
          benchmarks. That is how Harlo learns to read a new broker&apos;s rate confirmation, notice a
          load going late, or show a carrier how its lanes compare. We do this for our own purpose of
          making Harlo better for every customer, so for this use we act on our own account rather than
          on a carrier&apos;s instructions. These limits apply:
        </p>
        <LegalList
          items={[
            "We never sell carrier data, and we never sell or license access to it.",
            "Before data is used for training, we remove or mask what identifies individual people (names, phone numbers, email addresses, licence numbers) wherever the model does not need it to learn.",
            "What a model tells one customer never reveals another customer's rates, margins, customers, drivers or loads.",
            "Everything section 5 promises about aggregated data applies to what our models learn.",
            "Trained models belong to Harlo. As with section 5, deleting a carrier's data does not require us to retrain models already built from it.",
          ]}
        />
        <p>
          Harlo&apos;s conclusions are decision support, not decisions. Nothing in Harlo makes a
          decision with legal or similarly significant effect on a person on its own: anything that
          changes a carrier&apos;s records is proposed to a person and applied only once they approve
          it, and the approval is logged. Conclusions can be wrong, and a carrier is expected to verify
          them.
        </p>
      </LegalSection>

      <LegalSection title="7. Who we share information with">
        <p>We share information only as described here:</p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Service providers</strong> who help us run Harlo,
              under contracts limiting them to that purpose. Today those are: Supabase (database,
              sign-in, file storage, and background functions), Vercel and Railway (application
              hosting), Cloudflare (network, security, and bot protection), Hostinger (hosting for
              our marketing website), Twilio (text messages and sign-in codes), Resend (email
              delivery), Stripe (payments), PostHog (product analytics, error tracking, and masked
              session recordings), Stadia Maps (address search and routing — addresses entered for
              stops and facilities are sent to it), and Anthropic (AI model provider, section 6).
              Where we add or replace a provider that processes personal information, we update
              this list.
            </>,
            <>
              <strong className="text-foreground">Parties the carrier directs us to share with</strong>{" "}
              — for example when a carrier emails a rate confirmation to a carrier or broker, books
              a load to another workspace it controls, connects a third-party service, or points
              the API or a webhook at its own system. We share only what that action needs.
            </>,
            <>
              <strong className="text-foreground">Advertising platforms, from our marketing website only</strong>{" "}
              — when we run ads, Google, Meta, and LinkedIn may receive the pages you visit on
              goharlo.com and identifiers from your browser, so we can measure those ads and show
              Harlo ads to people who visited. Nothing from the Harlo apps or from any carrier&apos;s
              data is ever sent to them. See section 8 to opt out.
            </>,
            <>
              <strong className="text-foreground">The carrier</strong> whose account the data belongs
              to, and the users it has authorised.
            </>,
            <>
              <strong className="text-foreground">Legal and safety</strong> — where we are required by
              law, or where it is necessary to protect rights, safety, or the integrity of the service.
              Where we may lawfully do so, we will tell the affected carrier first, so it can object.
            </>,
            <>
              <strong className="text-foreground">A successor</strong>, if the business is acquired,
              merged, or reorganised. This policy continues to apply to information transferred that
              way.
            </>,
            <>
              <strong className="text-foreground">Aggregated statistics</strong> as described in section
              5, which are not personal information and do not identify a carrier.
            </>,
          ]}
        />
        <p>
          A current list of the providers that process carrier data is available on request. If a
          carrier needs a data processing agreement, email{" "}
          <a className="underline" href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies and tracking">
        <p>
          Harlo uses cookies and similar storage that are strictly necessary to run the application:
          keeping you signed in, keeping your session secure, and remembering interface preferences.
          We also use PostHog, an analytics provider acting as our processor, to understand which
          features are used and to find errors. It can record a session so we can see a problem
          someone reports; those recordings mask all text and form fields, so names, addresses,
          documents, and what you type are not captured, and we use them only to fix and improve
          Harlo. The Harlo apps never use advertising cookies or pixels.
        </p>
        <p>
          <strong className="text-foreground">Our marketing website</strong> (goharlo.com) may use
          advertising cookies and pixels from Google, Meta, and LinkedIn to measure our ads and to
          show Harlo ads to people who have visited. Under some state laws that counts as
          &ldquo;sharing&rdquo; for advertising. We do not load them if your browser sends a Global
          Privacy Control signal, and you can turn them off at{" "}
          <a className="underline" href="https://goharlo.com/privacy-choices">
            Your privacy choices
          </a>
          . The website&apos;s partner form also loads Cloudflare Turnstile, which checks that a
          visitor is a person and may set a cookie or read browser signals to do so.
        </p>
        <p>
          Blocking necessary cookies in your browser will stop the application from working.
        </p>
      </LegalSection>

      <LegalSection title="9. Retention">
        <p>
          Operational and audit records are kept for as long as the carrier&apos;s account is active,
          because the carrier needs them and is often required by DOT and FMCSA rules to keep them. When
          an admin closes a workspace (in its settings, or by asking us), the carrier may export its
          data for 30 days; we then delete it — records, uploaded files, and logins that belong to no
          other workspace — and in every case within 90 days of closure, except where we must keep
          something longer to meet a legal, tax, or regulatory obligation, or to resolve a dispute.
          A carrier may ask us to delete its data sooner at{" "}
          <a className="underline" href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </a>
          . Statistics and models covered by sections 5 and 6 are not deleted, because they no
          longer identify anyone.
        </p>
        <p>
          Proof-of-consent records for text messaging are kept for at least four years after consent is
          withdrawn, because that is what defending a TCPA claim requires. Billing and tax records are
          kept for as long as accounting and tax law require. Website inquiries and support
          correspondence are kept for as long as needed to answer them and for our records. Backups
          are held by our hosting provider and age out on its schedule, so deleted data can remain in
          a backup until then.
        </p>
      </LegalSection>

      <LegalSection title="10. Security">
        <p>
          Access to a carrier&apos;s data is restricted at the database level, so one carrier cannot read
          another&apos;s. Data is encrypted in transit and at rest. Access is limited by role, changes
          are recorded in an audit trail, and administrative access is limited to staff who need it.
          When our staff sign in to a carrier&apos;s account to support it, that access is written to
          the carrier&apos;s own audit trail, where its administrators can see it.
        </p>
        <p>
          No system is perfectly secure. If a breach affects your information we will notify you and the
          relevant regulators as the law requires, without undue delay.
        </p>
      </LegalSection>

      <LegalSection title="11. Your rights">
        <p>
          Depending on where you live you may have the right to access, correct, delete, or receive a
          portable copy of your personal information, to limit the use of sensitive information, to opt
          out of its sale (we do not sell it) or its sharing for advertising (see section 8), to
          withdraw consent, and not to be discriminated
          against for exercising these rights. Residents of California, Colorado, Connecticut, Virginia,
          Texas, and other states with comparable laws have these rights; so do people covered by the UK
          and EU GDPR.
        </p>
        <p>
          Write to{" "}
          <a className="underline" href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </a>{" "}
          and we will respond within the time the applicable law allows. We may need to verify your
          identity first, and an authorised agent must show they are authorised. If we decline a request,
          you may appeal by replying to our response; we will answer the appeal within the statutory
          period and tell you how to contact your state attorney general or supervisory authority.
        </p>
        <p>
          Where the request concerns data a carrier controls — most driver and operational records — we
          will forward it to that carrier and support their response rather than altering their records
          ourselves.
        </p>
      </LegalSection>

      <LegalSection title="12. Text messages">
        <p>
          Mobile numbers collected for driver notifications are used only to send that driver operational
          messages from their own carrier.{" "}
          <strong className="text-foreground">
            Mobile information collected for SMS consent will not be shared or sold to third parties
            or lead generators for marketing or promotional purposes.
          </strong>{" "}
          Mobile numbers and opt-in data are never sold or rented, and are not shared with any third
          party for that party&apos;s own purposes. The only third parties that ever see a number are
          the messaging providers that carry the message and the carrier that employs the driver.
          Consent can be withdrawn at any time by replying STOP to any message, or by asking the carrier
          to switch notifications off. Message and data rates may apply. Our full disclosure is at{" "}
          <a className="underline" href="https://app.goharlo.com/sms-consent">
            /sms-consent
          </a>
          .
        </p>
        <p>
          Harlo Driver sign-in: when a carrier invites a driver to the Harlo Driver app, we text a
          one-time sign-in code to that number. These codes are for security only, are never used for
          marketing, and are sent only to a number a carrier has given us for one of its own drivers.
        </p>
      </LegalSection>

      <LegalSection title="13. Where data is held">
        <p>
          Harlo is operated from the United States and information is processed there. If you use it from
          elsewhere, you are sending information to the United States, where privacy law differs from your
          own. Where we transfer personal data out of the UK or EEA, we rely on the European
          Commission&apos;s standard contractual clauses.
        </p>
      </LegalSection>

      <LegalSection title="14. Changes">
        <p>
          We will update this policy as Harlo changes, and revise the effective date above. If a change
          materially affects how we handle personal information we will tell account administrators before
          it takes effect.
        </p>
      </LegalSection>

      <LegalSection title="15. Contact">
        <p>
          {LEGAL_ENTITY}
          <br />
          {ADDRESS}
          <br />
          Privacy:{" "}
          <a className="underline" href={`mailto:${PRIVACY_EMAIL}`}>
            {PRIVACY_EMAIL}
          </a>
          <br />
          Support:{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
        </p>
        <p>This policy is governed by the laws of the State of {GOVERNING_STATE}.</p>
      </LegalSection>
    </LegalPage>
  );
}
