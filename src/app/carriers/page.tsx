import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Briefing, CARRIER_BRIEF } from "@/components/briefing";
import { Workflow } from "@/components/workflow";
import { CARRIER_STEPS } from "@/components/carrier-steps";
import { EndCta } from "@/components/end-cta";
import { Button, Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "For carriers",
  description:
    "Harlo for carriers running 1 to 100 trucks: loads from rate cons, compliance-checked dispatch, driver texts and margin on every load.",
  alternates: { canonical: "/carriers" },
};

const FLEETS = [
  {
    size: "1 or 2 trucks",
    who: "Owner-operators running from the cab with Harlo Go.",
    plan: "Free, with no time limit",
    href: "/go",
    link: "See Harlo Go",
  },
  {
    size: "4 to 25 trucks",
    who: "Growing fleets that have outgrown the spreadsheet.",
    plan: "Pro, $39 per truck, Harlo Driver included",
    href: "/pricing",
    link: "See Pro pricing",
  },
  {
    size: "26 to 100 trucks",
    who: "Established carriers with a dispatch floor and a safety team.",
    plan: "Fleet, $32 per truck, Harlo Driver included",
    href: "/pricing",
    link: "See Fleet pricing",
  },
];

const COMPLIANCE = [
  "CDLs, medical cards and registrations, with expiry dates",
  "Inspections and maintenance per unit",
  "Unfit drivers and out-of-service trucks blocked from dispatch",
  "Warnings before anything lapses",
];

export default function CarriersPage() {
  return (
    <main>
      <PageHero
        title="Every truck legal. Every load profitable."
        lead={
          <p>
            Booking, dispatch, compliance and margin in one place. Unfit drivers and trucks can&apos;t be
            dispatched.
          </p>
        }
        visual={
          <Briefing
            items={CARRIER_BRIEF}
            workspace="Reyes Trucking"
            kind="carrier"
            greeting="Good morning, Ray"
            watching="Ike is watching 18 trucks"
          />
        }
        cta={{ href: LINKS.signupCarrier, label: "Start free trial" }}
        secondary={{ href: "/pricing#carrier", label: "See carrier pricing" }}
      />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-extrabold">Book it, dispatch it, run it, get paid.</h2>
            <p className="mt-5 text-lead">
              One load, one record, from rate con to payment.
            </p>
          </div>
          <div className="mt-12">
            <Workflow steps={CARRIER_STEPS} label="A carrier load, start to finish" />
          </div>
        </Container>
      </section>

      <section className="on-pine bg-pine py-20 text-on-pine-muted sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="max-w-xl text-h2 font-extrabold text-white">
              Compliance that enforces itself.
            </h2>
            <p className="mt-5 max-w-xl text-lead text-on-pine">
              Most software reminds you. Harlo blocks it. A driver or truck with a lapsed card or
              registration can&apos;t be dispatched until it&apos;s fixed.
            </p>
          </div>
          <ul className="grid content-start gap-5 text-lead">
            {COMPLIANCE.map((c) => (
              <li key={c} className="flex gap-3">
                <Check className="mt-1.5 text-rust-light" />
                <span className="text-on-pine">{c}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Built for every fleet size.</h2>
          <p className="mt-5 max-w-2xl text-lead">
            Grow from one truck to a hundred without switching systems.
          </p>
          <div className="mt-12 divide-y divide-line border-y border-line">
            {FLEETS.map((f) => (
              <div key={f.size} className="grid gap-2 py-7 md:grid-cols-[14rem_1fr_auto] md:items-center md:gap-10">
                <p className="text-2xl font-extrabold tracking-tight text-ink">{f.size}</p>
                <div>
                  <p>{f.who}</p>
                  <p className="mt-1 font-semibold text-ink">{f.plan}</p>
                </div>
                <Link href={f.href} className="mt-2 font-semibold text-rust-ink underline-offset-4 hover:underline md:mt-0">
                  {f.link}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Booking your own freight too?</h2>
            <p className="mt-5 max-w-2xl text-lead">
              Add a brokerage workspace. Cover brokered loads with your own trucks in one click.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Button href="/workspaces" variant="secondary" size="lg">
              How workspaces work
            </Button>
            <Button href="/brokers" variant="ghost" size="lg">
              Harlo for brokers
            </Button>
          </div>
        </Container>
      </section>

      <EndCta href={LINKS.signupCarrier} />
    </main>
  );
}
