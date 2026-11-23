import type { Metadata } from "next";
import Link from "next/link";
import { EndCta } from "@/components/end-cta";
import { IkeOrbit, IkeAnswers, IkeDrafts, IkeReads, IkeWatches } from "@/components/ike-visuals";
import { Peak } from "@/components/logo";
import { Button, Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";
import { GUARDRAILS, TRIAL_NOTE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ike, the AI built into Harlo",
  description:
    "Ike reads rate cons, tenders, BOLs and PODs, answers questions about your operation, flags what needs attention and drafts the fix for your team to approve.",
  alternates: { canonical: "/ike" },
};

const JOBS = [
  {
    k: "Watches",
    t: "Sees trouble while there's time to act.",
    d: "Late loads, lapsing cards and thin margins surface on their own, ranked by what matters.",
    visual: <IkeWatches />,
  },
  {
    k: "Reads",
    t: "Turns paperwork into records.",
    d: "Rate cons, tenders, BOLs, PODs and certificates, read and filed on the right load.",
    visual: <IkeReads />,
  },
  {
    k: "Answers",
    t: "Knows your numbers.",
    d: "Ask in plain English. Answers come from your live records, with the source one click away.",
    visual: <IkeAnswers />,
  },
  {
    k: "Drafts",
    t: "Gets the next step ready.",
    d: "The customer update, the truck swap, the reminder. Drafted with the reasoning, waiting for your yes.",
    visual: <IkeDrafts />,
  },
];

const STEPS = [
  { n: "01", t: "Reads", d: "Every load, stop, document, message and position." },
  { n: "02", t: "Connects", d: "Ties them to the right customer, driver and truck." },
  { n: "03", t: "Notices", d: "Spots what's late, missing, expiring or off." },
  { n: "04", t: "Proposes", d: "Drafts the fix and shows why." },
  { n: "05", t: "Logs", d: "You approve. It's done and recorded." },
];

const CREDITS = [
  { plan: "Free", n: "25", unit: "a month" },
  { plan: "Pro", n: "75", unit: "per truck, a month" },
  { plan: "Fleet", n: "100", unit: "per truck, a month" },
];

export default function IkePage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- hero */}
      <section className="on-pine relative overflow-hidden bg-pine text-on-pine-muted">
        <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="ike-glow pointer-events-none absolute top-[30%] left-1/2 h-[30rem] w-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(202_107_68/0.3),transparent)] blur-2xl"
        />
        <Container className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-on-pine">
              <Peak className="h-2.5 w-auto" />
              The AI built into Harlo
            </p>
            <h1 className="mt-6 text-[clamp(2.75rem,1.6rem+4.6vw,5.25rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-white">
              Meet Ike.
              <span className="block bg-gradient-to-r from-rust-light via-[#f0b394] to-cream bg-clip-text text-transparent">
                It knows your operation.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lead text-on-pine">
              Ike watches every load, reads every document and spots what doesn&apos;t add up. Then it drafts the fix.
              Your team makes the call.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={LINKS.signup} size="lg">
                Start free trial
              </Button>
              <Button href="/pricing" size="lg" variant="outline-light">
                See pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-on-pine-muted">{TRIAL_NOTE}</p>
          </div>

          <div className="mt-16 sm:mt-20">
            <IkeOrbit />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- jobs */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
            <h2 className="max-w-xl text-h2 font-extrabold">Four jobs. All day. Every load.</h2>
            <p className="max-w-lg text-lead lg:justify-self-end">
              The work that eats a dispatcher&apos;s day, handled in the background.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {JOBS.map((j) => (
              <article key={j.k} className="flex flex-col overflow-hidden rounded-3xl bg-mist p-7 sm:p-8">
                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-rust-ink uppercase">{j.k}</p>
                <h3 className="mt-3 text-h3 font-bold">{j.t}</h3>
                <p className="mt-2 max-w-md">{j.d}</p>
                <div className="mt-8 flex-1">{j.visual}</div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- how it works */}
      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">From signal to done.</h2>
          <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            <span
              aria-hidden="true"
              className="absolute top-[1.1rem] right-[10%] left-[2%] hidden h-px bg-gradient-to-r from-rust/0 via-rust/50 to-rust/0 lg:block"
            />
            {STEPS.map((s, i) => (
              <li key={s.n} className="relative">
                <span
                  className={`relative grid size-9 place-items-center rounded-full font-mono text-xs font-bold ${
                    i === STEPS.length - 1 ? "bg-rust-ink text-white" : "bg-paper text-ink ring-1 ring-line"
                  }`}
                >
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{s.t}</h3>
                <p className="mt-1 text-[0.9375rem]">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ------------------------------------------------------------ guardrails */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="on-pine relative overflow-hidden rounded-[2rem] bg-pine p-8 text-on-pine-muted sm:p-12 lg:p-16">
            <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0 opacity-70" />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div>
                <h2 className="text-h2 font-extrabold text-white">AI you can put in charge of real freight.</h2>
                <p className="mt-5 text-lead text-on-pine">
                  Ike never changes a load on its own, and every answer traces back to its source.
                </p>
              </div>
              <div className="grid content-start gap-4">
                {GUARDRAILS.map((g) => (
                  <div key={g.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <p className="flex items-center gap-2.5 font-semibold text-white">
                      <Check className="text-rust-light" />
                      {g.t}
                    </p>
                    <p className="mt-1.5 pl-[1.6rem] text-[0.9375rem]">{g.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- credits */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <h2 className="text-h2 font-extrabold">On every plan.</h2>
            <p className="mt-5 text-lead">
              Ike runs on monthly AI credits. One credit is one task: reading a document or answering a question.
            </p>
            <p className="mt-4">
              Pro and up can go past the allowance at a few cents a credit, up to a hard ceiling.{" "}
              <Link href="/pricing" className="font-semibold text-rust-ink underline-offset-4 hover:underline">
                See plans
              </Link>
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {CREDITS.map((c) => (
              <div key={c.plan} className="rounded-2xl border border-line p-6">
                <p className="text-sm font-semibold text-muted">{c.plan}</p>
                <p className="mt-3 text-5xl font-extrabold tracking-tight text-ink tabular-nums">{c.n}</p>
                <p className="mt-1 text-sm">credits {c.unit}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <EndCta title="Put Ike to work." body="Add your first loads and see what Ike notices." />
    </main>
  );
}
