import type { Metadata } from "next";
import Link from "next/link";
import { IkeChat } from "@/components/ike";
import { EndCta } from "@/components/end-cta";
import { Button, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";
import { GUARDRAILS, TRIAL_NOTE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ike, the AI built into Harlo",
  description:
    "Ike reads rate cons, tenders, BOLs and PODs, answers questions about your operation, flags what needs attention and drafts the fix for your team to approve.",
  alternates: { canonical: "/ike" },
};

const ABILITIES = [
  {
    t: "Watches the whole operation",
    d: "Loads, stops, drivers, trucks, carriers, customers and money, all the time. A load trending late, a medical card about to lapse, a lane quietly losing margin: Ike surfaces it while there's still time to act.",
  },
  {
    t: "Gets the next step ready",
    d: "The customer update, the truck swap, the driver reminder, the note on the load. Ike prepares it with the reasoning attached, and one click from your team makes it happen.",
  },
  {
    t: "Answers from your live data",
    d: "Ask what's at risk today, who's open tomorrow, which customers pay late or which lanes made money last quarter. Ike answers from your records, inside the workspace you're in.",
  },
  {
    t: "Clears the inbox and the paperwork",
    d: "Tenders, carrier packets, insurance certificates, BOLs and PODs. Ike reads what arrives, files it on the right record and tells you what changed, so nobody spends the morning re-typing.",
  },
];

export default function IkePage() {
  return (
    <main>
      <section className="on-pine bg-pine text-on-pine-muted">
        <PageHeroDark />
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">What Ike does all day.</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14">
            {ABILITIES.map((a) => (
              <div key={a.t} className="border-t-2 border-ink pt-5">
                <h3 className="text-h3 font-bold">{a.t}</h3>
                <p className="mt-3 max-w-lg">{a.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">AI you can put in charge of real freight.</h2>
            <p className="mt-5 text-lead">
              Ike is powerful because it&apos;s careful. It never changes a load on its own, and every
              answer can be traced back to where it came from.
            </p>
          </div>
          <dl className="grid content-start gap-8">
            {GUARDRAILS.map((g) => (
              <div key={g.t} className="border-l-2 border-rust pl-5">
                <dt className="text-lg font-bold text-ink">{g.t}</dt>
                <dd className="mt-1">{g.d}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <h2 className="text-h2 font-extrabold">Included on every plan.</h2>
          <div className="grid gap-4 text-lead">
            <p>
              Every plan comes with a monthly allowance of AI credits, from 25 on Free up to 100 per truck on
              Fleet. One credit is one task, like reading a document or answering a question.
            </p>
            <p>
              Paid plans can keep going past the allowance at a few cents a credit, with a hard ceiling so a
              busy month never becomes a surprise.{" "}
              <Link href="/pricing" className="font-semibold text-rust-ink underline-offset-4 hover:underline">
                See credits by plan
              </Link>
            </p>
          </div>
        </Container>
      </section>

      <EndCta
        title="Give your team an AI teammate today."
        body="Start free, add your first loads and see what Ike notices. No card, no sales call."
      />
    </main>
  );
}

function PageHeroDark() {
  return (
    <Container className="grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:pb-28">
      <div>
        <h1 className="max-w-[14ch] text-display font-extrabold text-white">Meet Ike, your AI operations teammate.</h1>
        <p className="mt-6 max-w-[34rem] text-lead text-on-pine">
          Ike is built into the core of Harlo, not stuck on the side. It understands your operation, watches
          every load in motion, spots what doesn&apos;t add up and gets the fix ready. Your team makes the call.
        </p>
        <HeroButtons />
      </div>
      <IkeChat />
    </Container>
  );
}

function HeroButtons() {
  return (
    <>
      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <Button href={LINKS.signup} size="lg">
          Start my free trial
        </Button>
        <Button href="/pricing" size="lg" variant="outline-light">
          See pricing
        </Button>
      </div>
      <p className="mt-4 text-sm text-on-pine-muted">{TRIAL_NOTE}</p>
    </>
  );
}
