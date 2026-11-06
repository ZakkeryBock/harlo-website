import type { Metadata } from "next";
import Link from "next/link";
import { EndCta } from "@/components/end-cta";
import { Phone } from "@/components/devices";
import { Button, Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Harlo Go: Harlo on your phone",
  description:
    "Harlo Go is the Harlo phone app, included with every plan, Free included. Approve what Ike flags, check any load and snap paperwork from anywhere.",
  alternates: { canonical: "/go" },
};

const JOBS = [
  {
    t: "Ike in your pocket",
    d: "The morning brief, alerts as they happen, and one-tap approvals. Swap the truck, send the customer update, chase the POD, from wherever you are.",
  },
  {
    t: "Every load, live",
    d: "Booked, on the road and delivered, with stops, documents and money attached. The same records your office sees, updated the same second.",
  },
  {
    t: "Paperwork from the camera",
    d: "Photograph a rate con, BOL or receipt and it lands on the right load. Ike does the typing, you check it.",
  },
  {
    t: "Know what you made",
    d: "Delivered this week, margin per load and what's still waiting to be invoiced, at a glance.",
  },
];

export default function GoPage() {
  return (
    <main>
      <section className="overflow-hidden">
        <Container className="grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <h1 className="max-w-[12ch] text-display font-extrabold">Harlo, in your pocket.</h1>
            <p className="mt-6 max-w-[32rem] text-lead">
              Harlo Go is the Harlo phone app, included with every plan. Run your day from the cab, the dock or
              the couch, and pick up right where you left off when you sit down at the desk.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={LINKS.goSignup} size="lg">
                Start free on your phone
              </Button>
              <Button href="/apps" size="lg" variant="secondary">
                See all Harlo apps
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">Free for up to 2 trucks. Same account on phone and desktop.</p>
          </div>
          <Phone />
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-20 sm:py-24">
        <Container>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12">
            {JOBS.map((j) => (
              <div key={j.t} className="border-t-2 border-ink pt-5">
                <h2 className="text-h3 font-bold">{j.t}</h2>
                <p className="mt-3 max-w-lg">{j.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Running one or two trucks? Start here, free.</h2>
            <p className="mt-5 text-lead">
              Most owner-operators run the business from their phone, so that&apos;s where Harlo starts. Free
              covers up to 2 trucks with no time limit, and the desktop is always there when you want the bigger
              screen.
            </p>
          </div>
          <ul className="grid content-start gap-4 text-lead">
            {[
              "Up to 2 trucks, 3 users and 30 loads a month",
              "Harlo Go on your phone and Harlo on any desktop",
              "25 AI credits a month for Ike",
              "Grow into Pro: same apps, same records, more of the system",
            ].map((x) => (
              <li key={x} className="flex gap-3">
                <Check className="mt-1.5 text-rust-ink" />
                <span className="text-ink">{x}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-16">
        <Container className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-h3 font-bold">Have drivers? Give them Harlo Driver.</h2>
            <p className="mt-2 max-w-2xl">
              On Pro and up, your drivers get their own app for load plans, stops and messages with dispatch, on
              their phone or the truck&apos;s tablet.{" "}
              <Link href="/apps" className="font-semibold text-rust-ink underline-offset-4 hover:underline">
                How the apps work together
              </Link>
            </p>
          </div>
          <Button href="/pricing#carrier" variant="secondary">
            See Pro
          </Button>
        </Container>
      </section>

      <EndCta
        title="Book your next load from the cab."
        body="Sign up on your phone in a couple of minutes and see your operation in Harlo Go."
        href={LINKS.goSignup}
        label="Start free on your phone"
      />
    </main>
  );
}
