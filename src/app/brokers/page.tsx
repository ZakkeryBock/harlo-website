import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Workflow } from "@/components/workflow";
import { BROKER_STEPS } from "@/components/broker-steps";
import { EndCta } from "@/components/end-cta";
import { Handoff } from "@/components/workspaces";
import { Panel, Row } from "@/components/panels";
import { Button, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

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
    d: "The same engine that keeps an unfit driver off a carrier's truck keeps an uninsured carrier off your load.",
  },
  {
    t: "An assistant that reads like a broker",
    d: "Tenders, carrier rate cons, BOLs, PODs and insurance certificates, read and filed on the load they belong to.",
  },
  {
    t: "Your whole desk, one price",
    d: "Every rep, every ops person, every billing clerk. Harlo never charges per seat.",
  },
];

export default function BrokersPage() {
  return (
    <main>
      <PageHero
        title="Book, cover and bill every load from one board."
        lead={
          <p>
            Harlo gives your brokerage a modern, AI-native home for every customer, carrier and load. Ike
            turns tenders into loads, vets carriers before you book them and chases the paperwork, so your
            reps spend the day selling and covering freight.
          </p>
        }
        visual={<Board />}
        cta={{ href: LINKS.signupBroker, label: "Start my free trial" }}
        secondary={{ href: "/pricing#broker", label: "See broker pricing" }}
      />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-extrabold">From tender to settlement, on one record.</h2>
            <p className="mt-5 text-lead">
              No more copying a load from the customer email to the board, the board to the rate con and the
              rate con to the invoice.
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
              Many brokerages grew out of a carrier, or grew a fleet of their own. With Harlo workspaces your
              brokerage and your carrier each get their own space, and a load you broker to your own trucks
              lands in the carrier workspace with the rate con already attached.
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
              Free for up to 25 loads a month. Broker is $299 a month with 200 loads included, and Broker Scale
              is $749 with 750. Every rep, ops and billing user is included on every plan.
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
        body="Start free, drop in a customer tender and watch Ike build the load, then cover it with a carrier Harlo has already checked."
      />
    </main>
  );
}
