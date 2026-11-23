import type { Metadata } from "next";
import Link from "next/link";
import { EndCta } from "@/components/end-cta";
import { Phone } from "@/components/devices";
import { Button, Check, Container } from "@/components/ui";
import { LINKS, plan, usd } from "@/lib/site";

const GO_PLUS = plan("go_plus");

export const metadata: Metadata = {
  title: "Harlo Go: Harlo on your phone",
  description:
    "Harlo Go is the Harlo phone app, included with every plan, Free included. Go+ adds Ike, auto check-in and detention billing for $30 a month.",
  alternates: { canonical: "/go" },
};

const JOBS = [
  {
    t: "Ike in your pocket",
    d: "The morning brief, alerts and one-tap approvals, wherever you are.",
  },
  {
    t: "Every load, live",
    d: "Stops, documents and money on every load. Same records as the office, same second.",
  },
  {
    t: "Paperwork from the camera",
    d: "Snap a rate con, BOL or receipt and it lands on the right load.",
  },
  {
    t: "Know what you made",
    d: "This week's deliveries, margin per load, and what's left to invoice.",
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
              The Harlo phone app, included on every plan. Pick up at the desk where you left off.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={LINKS.goSignup} size="lg">
                Start free on your phone
              </Button>
              <Button href="/apps" size="lg" variant="secondary">
                See all Harlo apps
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">
              Free for up to 2 trucks, Go+ free for 14 days. Same account on phone and desktop.
            </p>
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
              Free covers up to 2 trucks, with no time limit. The desktop is there when you want a bigger screen.
            </p>
          </div>
          <ul className="grid content-start gap-4 text-lead">
            {[
              "Up to 2 trucks, 3 users and 30 loads a month",
              "Harlo Go on your phone and Harlo on any desktop",
              "25 AI credits a month for Ike",
              `Go+ for ${usd(GO_PLUS.month!)} a month: Ike, unlimited loads and ${GO_PLUS.ai.replace(" a month", "")}`,
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

      <section className="border-t border-line py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold text-rust-ink">Go+ · {usd(GO_PLUS.month!)} a month</p>
            <h2 className="mt-3 text-h2 font-extrabold">It logs your stops. It catches your detention.</h2>
            <p className="mt-5 text-lead">
              Pull into the dock and your arrival is already on the load. Sit past free time and your phone tells you,
              with the broker one tap away. Pull out and the detention is ready to bill.
            </p>
            <div className="mt-8">
              <Button href={LINKS.goSignup}>Try Go+ free for 14 days</Button>
            </div>
          </div>
          <ul className="grid content-start gap-4 text-lead">
            {GO_PLUS.includes.slice(1).map((x) => (
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
              On Pro and up, drivers get their own app for load plans, stops and dispatch messages.{" "}
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
        body="Sign up on your phone in two minutes."
        href={LINKS.goSignup}
        label="Start free on your phone"
        note="Try Go+ free for 14 days. No card required."
      />
    </main>
  );
}
