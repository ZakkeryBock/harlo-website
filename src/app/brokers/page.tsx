import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Workflow } from "@/components/workflow";
import { BROKER_STEPS } from "@/components/broker-steps";
import { EndCta } from "@/components/end-cta";
import { Handoff } from "@/components/workspaces";
import { Panel, Row } from "@/components/panels";
import { Button, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";
import { BROKER_TRIAL_NOTE } from "@/lib/content";

export const metadata: Metadata = {
  title: "For brokers",
  description:
    "Harlo for freight brokers: customer tenders read by AI, carriers vetted before you book, loads tracked without check calls, and margin on every load.",
  alternates: { canonical: "/brokers" },
};

const BOARD = [
  { id: "HB-20417", lane: "Elk Grove, IL to Nashville, TN", state: "In transit", tone: "go" as const },
  { id: "HB-20421", lane: "Gary, IN to Memphis, TN", state: "Needs a carrier", tone: "warn" as const },
  { id: "HB-20425", lane: "Joliet, IL to Columbus, OH", state: "Covered", tone: "go" as const },
  { id: "HB-20409", lane: "Aurora, IL to St. Louis, MO", state: "POD missing", tone: "stop" as const },
];

function Board() {
  return (
    <div role="img" aria-label="A brokerage load board with four loads: one in transit, one that needs a carrier, one covered, and one delivered but missing its proof of delivery.">
      <div aria-hidden="true">
        <Panel title="Today's board" meta="Reyes Logistics">
          {BOARD.map((b) => (
            <Row key={b.id} k={`${b.id}, ${b.lane}`} v={b.state} tone={b.tone} />
          ))}
        </Panel>
      </div>
    </div>
  );
}

const WHY = [
  {
    t: "Carrier vetting that blocks, not just warns",
    d: "An uninsured carrier can't be booked.",
  },
  {
    t: "An assistant that reads like a broker",
    d: "Tenders, rate cons, BOLs, PODs and certificates, read and filed on the right load.",
  },
  {
    t: "Your whole desk, one price",
    d: "Every rep, ops and billing user. Never per seat.",
  },
];

export default function BrokersPage() {
  return (
    <main>
      <PageHero
        title="Book, cover and bill every load from one board."
        lead={
          <p>
            Tenders become loads, carriers are vetted before you book, and the paperwork gets filed. Your reps
            sell and cover freight.
          </p>
        }
        visual={<Board />}
        cta={{ href: LINKS.signupBroker, label: "Start free trial" }}
        secondary={{ href: "/pricing#broker", label: "See broker pricing" }}
        note={BROKER_TRIAL_NOTE}
      />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-extrabold">From tender to settlement, on one record.</h2>
            <p className="mt-5 text-lead">
              No more copying a load from email to board to rate con to invoice.
            </p>
          </div>
          <div className="mt-12">
            <Workflow steps={BROKER_STEPS} label="A brokered load, start to finish" />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Why brokers switch to Harlo.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {WHY.map((w) => (
              <div key={w.t} className="border-t-2 border-ink pt-5">
                <h3 className="text-lg font-bold">{w.t}</h3>
                <p className="mt-2">{w.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Run trucks too? Keep both under one login.</h2>
            <p className="mt-5 text-lead">
              Your brokerage and your fleet each get a workspace. A load you broker to your own trucks lands
              there with the rate con attached.
            </p>
            <div className="mt-8">
              <Button href="/workspaces" variant="secondary">
                How workspaces work
              </Button>
            </div>
          </div>
          <Handoff />
        </Container>
      </section>

      <section className="border-t border-line py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-h3 font-bold">Priced by loads, never by seats</h2>
            <p className="mt-2 max-w-2xl">
              Free up to 25 loads a month. Broker: $299 for 200 loads. Broker Scale: $749 for 750. Every user included.
            </p>
          </div>
          <Button href="/pricing#broker" variant="secondary">
            See broker pricing
          </Button>
        </Container>
      </section>

      <EndCta
        href={LINKS.signupBroker}
        title="Put your next tender into Harlo."
        body="Drop in a tender and watch Ike build the load."
        note={BROKER_TRIAL_NOTE}
      />
    </main>
  );
}
