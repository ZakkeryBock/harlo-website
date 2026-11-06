import type { Metadata } from "next";
import { LegalPage, LegalSection, LegalList } from "@/components/legal/legal-page";
import {
  ADDRESS,
  COMPANY,
  GOVERNING_STATE,
  GOVERNING_VENUE,
  LEGAL_EMAIL,
  LEGAL_ENTITY,
  SUPPORT_EMAIL,
} from "@/lib/legal";

/**
 * ⚠ Not reviewed by counsel. Written to describe how Harlo is actually sold
 * and used. Sections 19–22 (warranty, liability, indemnity, arbitration)
 * decide who pays when something goes wrong — have a lawyer read those before
 * relying on them.
 *
 * Keep it truthful as the product changes. If billing starts metering
 * something new, section 6 says so in the same PR.
 */

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The agreement governing use of the Harlo platform from ${COMPANY}.`,
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={
        <p>
          These terms govern use of the Harlo platform provided by {LEGAL_ENTITY} (&ldquo;{COMPANY}
          &rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By signing up, signing in, or using Harlo,
          the customer and its users agree to them. If you are agreeing on behalf of a company, you
          confirm you are authorised to bind it. If you do not agree, do not use Harlo.
        </p>
      }
    >
      <LegalSection title="1. The agreement">
        <p>
          &ldquo;Customer&rdquo; is the company that subscribes. &ldquo;Order&rdquo; is the plan,
          quote, or online sign-up flow the customer accepts, including its pricing and term.
          &ldquo;User&rdquo; is a person the customer authorises to use its account.
          &ldquo;Customer Data&rdquo; is what the customer and its users enter into or upload to
          Harlo.
        </p>
        <p>
          These terms plus the applicable Order are the agreement. If they conflict, the Order wins
          on commercial terms — price, term, quantities — and these terms win on everything else,
          unless the Order is signed by both parties and says otherwise. Purchase-order terms, vendor
          portals, and boilerplate on a customer&apos;s own paperwork have no effect on this
          agreement, even if we acknowledge or invoice against them.
        </p>
      </LegalSection>

      <LegalSection title="2. The service">
        <p>
          Harlo is operational intelligence software for motor carriers: it records a carrier&apos;s
          operation, interprets it, and surfaces conclusions and exceptions. We provide it as a
          subscription and may improve or change features over time. We will not materially reduce
          core functionality during a paid term without notice.
        </p>
        <p>
          Subject to these terms and to payment of fees, we grant the customer a non-exclusive,
          non-transferable, non-sublicensable right to access and use Harlo during the term, for its
          own internal business operations. We reserve every right not expressly granted. Harlo is
          licensed, not sold, and we retain all right, title, and interest in the platform, its
          software, models, designs, and documentation, and in every improvement to them.
        </p>
      </LegalSection>

      <LegalSection title="3. What Harlo is not">
        <p>
          This section matters more than most. Read it before relying on Harlo for anything a
          regulator cares about.
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Not a carrier or broker.</strong> Harlo is
              software. We are not a motor carrier, freight broker, freight forwarder, or shipper; we
              hold no operating authority; and we are not a party to any transportation contract the
              customer enters. We do not arrange, procure, or perform transportation, and we are not
              responsible for the freight, the equipment, or the conduct of anyone in the
              customer&apos;s operation.
            </>,
            <>
              <strong className="text-foreground">Not an ELD.</strong> Harlo is not a registered
              electronic logging device under 49 CFR Part 395 and is not a substitute for one. Duty,
              hours, and schedule information in Harlo is for the customer&apos;s own planning and
              management. The customer remains responsible for operating a compliant ELD and for the
              accuracy of its records of duty status.
            </>,
            <>
              <strong className="text-foreground">Not a professional adviser.</strong> We are not a
              law firm, accounting firm, insurance producer, payroll provider, or safety consultancy.
              Nothing Harlo produces is legal, tax, accounting, insurance, or regulatory advice.
            </>,
            <>
              <strong className="text-foreground">Not a consumer reporting agency.</strong> Harlo is
              not a consumer reporting agency and its outputs are not consumer reports under the Fair
              Credit Reporting Act. The customer must not use a Harlo conclusion as the basis for an
              adverse action affecting a driver&apos;s employment, insurance, or credit without
              independently verifying the underlying facts through a lawful source.
            </>,
            <>
              <strong className="text-foreground">
                Not a filing agent for the government.
              </strong>{" "}
              Filings, registrations, and reports required by FMCSA, DOT, IFTA, IRP, state agencies,
              or any tax authority remain the customer&apos;s to prepare, verify, and submit.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Accounts and users">
        <p>
          The customer is responsible for its account: for the users it invites, the permissions it
          grants them, the accuracy of what they enter, and everything done under their credentials.
          Credentials must not be shared, and a login must belong to one identified person. Tell us
          promptly at{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          if you believe an account has been compromised.
        </p>
        <p>
          The customer is responsible for its users&apos; compliance with this agreement, and a
          user&apos;s breach is the customer&apos;s breach. Users must be at least 18 and use Harlo
          for business purposes only.
        </p>
        <p>
          Harlo may be used only by and for the legal entity named in the Order. A separate operating
          authority, a subsidiary, or an affiliate that runs its own freight needs its own
          subscription.
        </p>
      </LegalSection>

      <LegalSection title="5. Fees and billing">
        <p>
          Subscription pricing is set out in the Order and may combine a recurring fee based on fleet
          size, per-load or per-volume charges, and usage-based allowances for AI-assisted features.
          Usage above an included allowance is billed as the plan describes.
        </p>
        <p>
          Fees are billed in advance, are payable in US dollars, and are non-refundable except where
          these terms or the law say otherwise — including where the customer stops using Harlo,
          removes users, or reduces volume mid-term. The customer authorises us and our payment
          processor to charge the payment method on file for all amounts due, including true-ups
          under section 6.
        </p>
        <p>
          Invoices are due on receipt unless the Order says otherwise. Overdue amounts accrue
          interest at 1.5% per month or the maximum the law allows, whichever is lower, and the
          customer is responsible for the reasonable costs of collection, including attorneys&apos;
          fees. We may suspend the service on ten days&apos; notice of non-payment. Fees exclude
          taxes; the customer is responsible for all taxes other than those on our income, and will
          gross up any amount it is required to withhold.
        </p>
        <p>
          Fees may not be set off, withheld, or reduced against any claim the customer has or
          believes it has. Invoices not disputed in writing within 30 days are final. We may change
          pricing on 30 days&apos; notice, effective at the next renewal.
        </p>
        <p>
          If the customer&apos;s fleet or usage grows mid-term, the applicable tier applies from the
          point it is exceeded, prorated for the remainder of the term. Downgrades take effect at
          renewal.
        </p>
      </LegalSection>

      <LegalSection title="6. Usage measurement, and no circumvention">
        <p>
          Harlo meters what it bills — fleet size, loads and volume, users, and AI usage. Our
          measurement records are the authoritative basis for billing, absent demonstrable error.
        </p>
        <p>
          <strong className="text-foreground">
            Billable usage is counted when it occurs, and a later deletion does not undo it.
          </strong>{" "}
          Deleting, voiding, archiving, merging, or editing a record after the underlying work has
          happened does not reverse a charge already incurred for it.
        </p>
        <p>
          The customer must use Harlo as intended, and must not structure or manipulate its use to
          understate what it owes. Without limiting that, the customer must not:
        </p>
        <LegalList
          items={[
            "create a load, order, route, or other billable record and then delete, void, or reclassify it in order to avoid or reduce the charge for work that actually happened;",
            "keep real operational activity out of Harlo, or record it in a way designed to escape metering, while otherwise relying on Harlo to run that operation;",
            "under-report fleet size, driver count, or seats, or misrepresent the facts a pricing tier is based on;",
            "split one operation across multiple accounts, or run affiliated entities through a single account, to sit in a lower tier or reuse an allowance;",
            "share credentials, use one seat for several people, or use generic or shared logins where the plan is priced per user;",
            "interfere with, disable, circumvent, or falsify metering, logging, the event history, or any usage record;",
            "obtain trials, promotional pricing, credits, or free allowances repeatedly, or through related entities, to get what would otherwise be paid usage; or",
            "automate the creation, mutation, or deletion of records for any purpose other than genuinely operating the business.",
          ]}
        />
        <p>
          <strong className="text-foreground">Audit.</strong> We may verify usage. On ten days&apos;
          notice, and not more than once in twelve months unless a prior check found an
          understatement, the customer will provide the records we reasonably need — dispatch,
          settlement, payroll, ELD, or IFTA summaries sufficient to reconcile volume. We will treat
          them as the customer&apos;s confidential information and use them only to verify usage.
        </p>
        <p>
          If our logs or an audit show usage was understated, we may invoice the difference for the
          affected periods, up to 24 months back, with interest. Where the understatement was
          deliberate, the customer also reimburses the reasonable cost of the audit.{" "}
          <strong className="text-foreground">Deliberate circumvention is a material breach</strong>{" "}
          for which we may suspend or terminate immediately, without a cure period, and paying the
          shortfall does not cure it.
        </p>
        <p>
          Nothing here stops the customer from correcting a genuine mistake. Fixing a typo, removing
          a duplicate, cancelling a load that never ran, or reversing a test record is ordinary use —
          and if metering gets something wrong, tell us at{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>{" "}
          and we will fix it.
        </p>
      </LegalSection>

      <LegalSection title="7. Customer Data">
        <p>
          <strong className="text-foreground">The customer owns its Customer Data.</strong> We claim
          no ownership of what a carrier enters or uploads. The customer grants us a worldwide,
          non-exclusive licence to host, process, transmit, back up, display, and otherwise use
          Customer Data as needed to provide, secure, support, and improve the service — including
          processing it through the automated analysis described in section 12, and deriving
          Aggregated Data under section 8.
        </p>
        <p>
          The customer is responsible for having the right to provide the data it puts into Harlo —
          including personal information about its drivers, employees, and contacts — for the
          accuracy of that data, and for giving those people whatever notice, or obtaining whatever
          consent, the law requires. Our handling of personal information is described in the{" "}
          <a className="underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
        <p>
          The customer must not upload data it is prohibited from disclosing, and must not put into
          Harlo information subject to regimes we do not support: payment card data outside our
          payment processor&apos;s flow, protected health information under HIPAA, government
          classified information, or the personal information of children. DOT medical
          examiner&apos;s certificates and the driver qualification records a carrier is required to
          keep are expected and fine.
        </p>
        <p>
          While the subscription is active the customer can export its Customer Data. On termination
          we make it available for export for 30 days, after which we may delete it.
        </p>
      </LegalSection>

      <LegalSection title="8. Aggregated Data and platform intelligence">
        <p>
          Harlo gets better by learning how freight actually moves. We compile statistics, models,
          and benchmarks from activity across the platform — how long trucks really sit at a given
          facility, how a lane behaves by season, how often a class of exception turns into a real
          problem, how long a document type takes to clear.
        </p>
        <p>
          <strong className="text-foreground">Aggregated Data</strong> means information derived from
          Customer Data that has been combined with data from other customers and de-identified, so
          that it does not identify, and cannot reasonably be used to identify, a customer, a driver,
          an employee, a broker, a shipper, or an individual load, rate, or transaction.
        </p>
        <p>
          The customer grants us a perpetual, irrevocable, worldwide, royalty-free right to use
          Customer Data to create Aggregated Data, and to use, retain, publish, and commercialise
          that Aggregated Data — in benchmarks, industry statistics, product features, and models —
          during the term and after it ends. Aggregated Data is not Customer Data; as between the
          parties it is ours.
        </p>
        <p>These limits bind us, and they are the point of the section:</p>
        <LegalList
          items={[
            "We do not publish, sell, or disclose a customer's rates, margins, financial records, customer or broker relationships, driver records, or load-level detail in identifiable form to anyone.",
            "We do not attempt to re-identify Aggregated Data, and we contractually require the same of anyone we provide it to.",
            "We do not publish a statistic drawn from too few contributing carriers or records to be meaningfully anonymous.",
            "We do not use one customer's data to give another customer a targeted advantage against it, and nothing in this section permits us to act against a customer's interests.",
            "Because Aggregated Data no longer identifies anyone, deleting Customer Data does not require us to unwind statistics or models already derived from it.",
          ]}
        />
      </LegalSection>

      <LegalSection title="9. Feedback">
        <p>
          If the customer or a user sends us ideas, suggestions, or requests about Harlo, we may use
          them without restriction or obligation. Feedback is given voluntarily, is not the
          customer&apos;s confidential information, and creates no ownership interest in anything we
          build.
        </p>
      </LegalSection>

      <LegalSection title="10. Text messages to drivers">
        <p>
          Where the customer enables text notifications, it is the sender of those messages and{" "}
          <strong className="text-foreground">
            is responsible for obtaining and maintaining each recipient&apos;s consent
          </strong>{" "}
          before enabling them, in the manner described at{" "}
          <a className="underline" href="https://app.goharlo.com/sms-consent">
            /sms-consent
          </a>
          . The customer must not enable notifications for a person who has not agreed, must record
          consent truthfully, must keep proof of it, and must switch notifications off promptly when
          consent is withdrawn.
        </p>
        <p>
          Messaging is subject to the Telephone Consumer Protection Act, state messaging and
          telemarketing laws, carrier and industry (CTIA and A2P) rules, and our messaging
          provider&apos;s policies. Messages must be operational — no marketing, no third-party
          content, no prohibited categories. We may suspend messaging for an account we reasonably
          believe is sending without valid consent, and we may disclose consent records to a
          messaging provider or regulator that requires them.
        </p>
        <p>
          The customer indemnifies us for claims arising from messages sent to recipients it enabled
          without valid consent, and that indemnity is not subject to the cap in section 20.
        </p>
      </LegalSection>

      <LegalSection title="11. Availability and support">
        <p>
          We aim to keep Harlo available and will use commercially reasonable efforts to do so, but
          we do not commit to an uptime percentage unless a separate service level agreement says so.
          Planned maintenance, emergency maintenance, and outages at a provider we depend on will
          happen. Support is provided by email during US business hours at{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
        <p>
          The customer is responsible for its own internet access, devices, and backups of anything
          it cannot afford to lose, and must be able to keep operating — safely and legally — during
          a period when Harlo is unavailable.
        </p>
      </LegalSection>

      <LegalSection title="12. Automated analysis, and what it is not">
        <p>
          Harlo derives conclusions from a carrier&apos;s data: compliance and fitness assessments,
          risk and exception signals, extracted document contents, and answers from the assistant.
          These are produced automatically and{" "}
          <strong className="text-foreground">may be incomplete or wrong.</strong>
        </p>
        <p>
          They are decision support. They are not legal, safety, tax, insurance, or regulatory
          advice, and they do not discharge the customer&apos;s obligations. Compliance with FMCSA,
          DOT, hours-of-service, drug and alcohol testing, driver qualification, hazardous materials,
          and every other regulatory regime remains the customer&apos;s responsibility, and the
          customer must verify anything it relies on.{" "}
          <strong className="text-foreground">
            Do not treat a Harlo conclusion as proof that a driver, vehicle, or load is compliant, or
            as a reason to dispatch something you would not otherwise dispatch.
          </strong>
        </p>
        <p>
          Where Harlo proposes a change to a customer&apos;s records, it takes effect only when a
          user approves it, and the approval is logged. The person who approves it is accountable for
          it.
        </p>
      </LegalSection>

      <LegalSection title="13. Acceptable use">
        <p>The customer and its users must not:</p>
        <LegalList
          items={[
            "break the law, or infringe anyone's rights, using Harlo;",
            "upload malware, or anything they lack the right to upload;",
            "attempt to access another customer's data, or probe, scan, or test the security of the service without our written permission;",
            "reverse engineer, decompile, disassemble, or attempt to derive the source code, models, or prompts behind Harlo, except to the extent the law forbids that restriction;",
            "copy, frame, mirror, or create a derivative work of the service, or use it to build, train, or benchmark a competing product;",
            "access the service to publish a competitive analysis, or on behalf of a competitor;",
            "resell, rent, timeshare, or provide the service to a third party except as the Order permits;",
            "scrape, crawl, or extract data by automated means outside the documented interfaces, or exceed published rate limits;",
            "remove or obscure proprietary notices; or",
            "interfere with the operation of the service, circumvent a technical limit, or place an unreasonable load on it.",
          ]}
        />
        <p>
          We may investigate suspected misuse and cooperate with law enforcement. We do not routinely
          monitor Customer Data, but we may act on what we learn.
        </p>
      </LegalSection>

      <LegalSection title="14. Trials and beta features">
        <p>
          Trials, evaluation accounts, and features marked beta, preview, or early access are
          provided as-is and as-available, may be changed or withdrawn at any time, carry no
          warranty, support commitment, or indemnity, and are excluded from any service level. Data
          entered in a trial or a beta feature may be deleted when it ends. We may set usage limits
          on them, and section 6 applies to their use.
        </p>
      </LegalSection>

      <LegalSection title="15. Confidentiality">
        <p>
          Each party may receive information the other treats as confidential. Each will protect the
          other&apos;s confidential information with at least reasonable care, use it only for this
          agreement, and disclose it only to people who need it and are bound to keep it
          confidential. Customer Data is the customer&apos;s confidential information; the platform,
          non-public pricing, and our roadmap are ours.
        </p>
        <p>
          This does not cover information that is public, already known, independently developed, or
          lawfully received from someone else. Disclosure required by law is permitted, with notice
          where lawful. These obligations survive for three years after termination, and indefinitely
          for trade secrets.
        </p>
      </LegalSection>

      <LegalSection title="16. Security">
        <p>
          We maintain administrative, technical, and physical safeguards designed to protect Customer
          Data, including tenant isolation enforced at the database level, encryption in transit,
          role-based access, and an audit trail of changes. No system is perfectly secure.
        </p>
        <p>
          We will notify the customer without undue delay after confirming a security incident
          affecting its Customer Data, and will provide the information it reasonably needs to meet
          its own notification obligations. The customer is responsible for the security of its
          credentials, devices, and users, and for promptly removing access for people who leave.
        </p>
      </LegalSection>

      <LegalSection title="17. Third-party services">
        <p>
          Harlo relies on third parties — hosting, messaging, mapping, model providers, payments.
          Their availability is outside our control, and their own terms may apply to the parts of
          the service they support. Where the customer connects Harlo to a third-party service of its
          own, it authorises the resulting exchange of data, and we are not responsible for what that
          service does with it.
        </p>
      </LegalSection>

      <LegalSection title="18. Term, suspension, and termination">
        <p>
          The subscription runs for the term in the Order and renews for successive terms of the same
          length unless either party gives notice of non-renewal before the renewal date. Either
          party may terminate for a material breach the other has not cured within 30 days of notice.
        </p>
        <p>
          We may suspend an account immediately — with notice as soon as practicable — for
          non-payment after notice, for a security risk, for a legal requirement, for conduct that
          breaches section 6 or section 13, or where continued use threatens the service or another
          customer. Suspension does not relieve the customer of fees, and we will restore access once
          the cause is resolved.
        </p>
        <p>
          On termination, access ends and all accrued fees become due. Fees for the remaining term
          stay payable except where we terminated without cause or the customer terminated for our
          uncured breach, in which case we refund prepaid fees for the unused term. Where we
          terminate for the customer&apos;s material breach, no refund is due. Section 7&apos;s
          export window applies either way.
        </p>
      </LegalSection>

      <LegalSection title="19. Warranties and disclaimer">
        <p>
          Each party warrants that it has the authority to enter this agreement. The customer
          warrants that it holds the operating authority, registrations, and insurance its operation
          requires, that it has the rights and consents needed for the data it provides, and that its
          use of Harlo will comply with applicable law.
        </p>
        <p>
          We warrant that we will provide the service with reasonable skill and care. Otherwise, to
          the fullest extent the law allows, the service is provided{" "}
          <strong className="text-foreground">
            &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
          </strong>{" "}
          and we disclaim all other warranties, express, implied, or statutory, including
          merchantability, fitness for a particular purpose, title, non-infringement, and any
          warranty arising from course of dealing or usage of trade. We do not warrant that the
          service will be uninterrupted, secure, or error-free, that defects will be corrected, or
          that any automated conclusion, extraction, estimate, or prediction will be accurate,
          complete, or current.
        </p>
      </LegalSection>

      <LegalSection title="20. Limitation of liability">
        <p>
          To the fullest extent the law allows, neither party is liable for indirect, incidental,
          special, consequential, exemplary, or punitive damages, or for lost profits, revenue,
          business, goodwill, or data, or for the cost of substitute services, however caused and on
          any theory of liability, even if told such damages were possible.
        </p>
        <p>
          Each party&apos;s total aggregate liability arising out of or relating to this agreement is
          limited to the fees the customer paid or owed to us in the 12 months before the event
          giving rise to the claim.
        </p>
        <p>
          These limits do not apply to the customer&apos;s payment obligations, to either
          party&apos;s indemnity obligations, to a breach of confidentiality, to the customer&apos;s
          breach of section 6 or section 13, or to liability that cannot lawfully be limited. They
          apply in the aggregate across all claims and are an essential basis of the bargain: the
          pricing reflects them.
        </p>
        <p>
          <strong className="text-foreground">
            We are not liable for the operation of the customer&apos;s business.
          </strong>{" "}
          That includes decisions to dispatch, hire, retain, or remove a driver or vehicle;
          regulatory violations, fines, penalties, out-of-service orders, or safety scores; accidents,
          cargo loss or damage, and detention or layover costs; missed filings or deadlines; and
          amounts owed to a broker, shipper, insurer, or driver.
        </p>
      </LegalSection>

      <LegalSection title="21. Indemnity">
        <p>
          The customer will defend and indemnify us against third-party claims arising from its
          Customer Data, its use of the service in breach of this agreement, its messaging to
          drivers, its transportation operations, an employment or contractor claim by one of its
          drivers or staff, or its failure to meet a regulatory obligation.
        </p>
        <p>
          We will defend and indemnify the customer against third-party claims that the service, as
          provided by us and used in accordance with this agreement, infringes a US patent,
          copyright, or trademark. This does not cover claims arising from Customer Data,
          modifications we did not make, combination with anything we did not supply, or use after we
          asked the customer to stop. If the service becomes the subject of such a claim, we may
          modify it, procure the right to continue, or terminate and refund prepaid fees for the
          unused term — and that is our entire liability for infringement.
        </p>
        <p>
          Each indemnity is conditional on prompt written notice, reasonable cooperation, and sole
          control of the defence and settlement by the indemnifying party, which will not settle in a
          way that imposes an obligation or admission on the other without consent.
        </p>
      </LegalSection>

      <LegalSection title="22. Disputes">
        <p>
          Before filing anything, the parties will try to resolve a dispute informally: written
          notice to{" "}
          <a className="underline" href={`mailto:${LEGAL_EMAIL}`}>
            {LEGAL_EMAIL}
          </a>{" "}
          describing the dispute and the relief sought, then 30 days of good-faith discussion.
        </p>
        <p>
          If that fails, the dispute will be resolved by final and binding arbitration administered
          by the American Arbitration Association under its Commercial Arbitration Rules, before one
          arbitrator, seated in {GOVERNING_VENUE}, conducted in English, under the Federal
          Arbitration Act. The arbitrator may award only the relief a court could award to that party
          individually. Judgment on the award may be entered in any court of competent jurisdiction.
        </p>
        <p>
          <strong className="text-foreground">
            Claims are brought individually. Class, collective, consolidated, and representative
            proceedings are waived,
          </strong>{" "}
          and the arbitrator has no authority to hear one. If that waiver is held unenforceable for a
          claim, that claim proceeds in court and the rest stays in arbitration. Each party waives
          any right to a jury trial.
        </p>
        <p>
          Either party may bring an action in the courts of {GOVERNING_VENUE} for injunctive or
          equitable relief to protect intellectual property or confidential information, and we may
          sue there to collect unpaid fees. The parties consent to that jurisdiction and venue.
        </p>
        <p>
          Any claim under this agreement must be brought within one year after it accrues, or it is
          permanently barred, except where the law does not permit that limit.
        </p>
      </LegalSection>

      <LegalSection title="23. Publicity">
        <p>
          We may identify the customer as a Harlo customer by name and logo on our website and in
          materials describing our business. The customer may decline, or withdraw that permission,
          by emailing{" "}
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
          . Anything more — a quote, a case study, a joint announcement — needs the customer&apos;s
          approval first.
        </p>
      </LegalSection>

      <LegalSection title="24. Changes to these terms">
        <p>
          We may update these terms. For material changes we will give account administrators notice
          before they take effect, and continued use after that date is acceptance. If the customer
          does not accept a material change, it may terminate before the change takes effect and
          receive a pro-rata refund of prepaid fees for the unused term. Changes required by law, or
          by a provider we depend on, may take effect immediately.
        </p>
      </LegalSection>

      <LegalSection title="25. General">
        <p>
          <strong className="text-foreground">Governing law.</strong> This agreement is governed by
          the laws of the State of {GOVERNING_STATE}, without regard to its conflict-of-laws rules.
          The UN Convention on Contracts for the International Sale of Goods does not apply.
        </p>
        <p>
          <strong className="text-foreground">Entire agreement.</strong> These terms with the
          applicable Order are the whole agreement on this subject and supersede prior discussions,
          proposals, and representations. Neither party relied on anything not stated here.
        </p>
        <p>
          <strong className="text-foreground">Assignment.</strong> Neither party may assign this
          agreement without the other&apos;s consent, except to a successor of substantially all of
          its business or assets; an attempted assignment otherwise is void. We may use
          subcontractors and remain responsible for their performance.
        </p>
        <p>
          <strong className="text-foreground">Notices.</strong> Notices to the customer go to the
          email addresses of its account administrators; notices to us go to{" "}
          <a className="underline" href={`mailto:${LEGAL_EMAIL}`}>
            {LEGAL_EMAIL}
          </a>{" "}
          and, for legal notices, to the address in section 26. Email notice is effective when sent,
          absent a bounce.
        </p>
        <p>
          <strong className="text-foreground">Export and sanctions.</strong> The customer will comply
          with US export control and sanctions laws, and represents that it is not located in, or
          controlled by anyone located in, an embargoed country, and is not on a restricted-party
          list.
        </p>
        <p>
          <strong className="text-foreground">Survival.</strong> Sections 1, 3, 5, 6, 7, 8, 9, 15,
          and 19 through 26 survive termination, along with any provision that by its nature should.
        </p>
        <p>
          <strong className="text-foreground">Miscellaneous.</strong> If a provision is
          unenforceable, it is limited to the minimum extent necessary and the rest stands. Failure
          to enforce a right is not a waiver of it. Nothing creates a partnership, joint venture,
          agency, franchise, or employment relationship, and there are no third-party beneficiaries.
          Neither party is liable for a delay caused by events beyond its reasonable control, though
          this does not excuse payment. The parties may sign and give notices electronically.
        </p>
      </LegalSection>

      <LegalSection title="26. Contact">
        <p>
          {LEGAL_ENTITY}
          <br />
          {ADDRESS}
          <br />
          <a className="underline" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
