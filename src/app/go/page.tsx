import type { Metadata } from "next";
import Link from "next/link";
import { EndCta } from "@/components/end-cta";
import { Phone } from "@/components/devices";
import { Button, Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Harlo Go: Harlo on your phone",
  description:
    "Harlo Go is the Harlo phone app, on every plan, Free included. Run a one or two truck operation from the cab, or take your desk with you when you're away from it.",
  alternates: { canonical: "/go" },
};

const JOBS = [
  {
    k: "Book",
    t: "Book a load from the cab.",
    d: "Snap the rate con. The load fills itself in: stops, times, rate and reference.",
  },
  {
    k: "Run",
    t: "Every load, live.",
    d: "Stops, check-ins, documents and messages. The same records as the office, the same second.",
  },
  {
    k: "Paperwork",
    t: "BOLs and PODs from the camera.",
    d: "Photograph it at the dock and it lands on the right load, ready to bill.",
  },
  {
    k: "Money",
    t: "Know what you made.",
    d: "This week's deliveries, margin per load and what's left to invoice.",
  },
];

const MODES = [
  {
    tag: "One or two trucks",
    t: "Your whole business, on your phone.",
    d: "Book loads, dispatch your driver, get paid. Free for up to 2 trucks, with no time limit. The desktop is there when you want a bigger screen.",
    points: ["Up to 2 trucks, 3 users and 30 loads a month", "Rate con scanning with Ike", "Harlo on any desktop, same account"],
    cta: { href: LINKS.goSignup, label: "Start free on your phone" },
    dark: false,
  },
  {
    tag: "Pro and up",
    t: "Your desk, when you're away from it.",
    d: "Go becomes the companion to the full system. Alerts follow you, Ike's suggestions wait for one tap, and any load is a search away.",
    points: ["Alerts that follow you out of the office", "Approve what Ike drafts in one tap", "Find any load, driver or customer"],
    cta: { href: "/pricing#carrier", label: "See Pro" },
    dark: true,
  },
];

export default function GoPage() {
  return (
    <main>
      <section className="overflow-hidden">
        <Container className="grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
          <div>
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-rust-ink uppercase">Harlo Go</p>
            <h1 className="mt-4 max-w-[12ch] text-display font-extrabold">Harlo, in your pocket.</h1>
            <p className="mt-6 max-w-[32rem] text-lead">
              The Harlo phone app, on every plan. Run your trucks from the cab, or keep your operation in reach when
              you&apos;re out of the office. One account, the same records everywhere.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={LINKS.goSignup} size="lg">
                Start free on your phone
              </Button>
              <Button href="/apps" size="lg" variant="secondary">
                See all Harlo apps
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">Free for up to 2 trucks. No card required.</p>
          </div>
          <Phone />
        </Container>
      </section>

      <section className="border-t border-line bg-mist py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Everything a load needs, in one hand.</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {JOBS.map((j) => (
              <article key={j.k} className="rounded-3xl bg-paper p-6">
                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-rust-ink uppercase">{j.k}</p>
                <h3 className="mt-3 text-lg font-bold text-ink">{j.t}</h3>
                <p className="mt-2 text-[0.9375rem]">{j.d}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-extrabold">One app. Two jobs.</h2>
            <p className="mt-5 text-lead">Harlo Go changes with your plan. Your account, records and login stay the same.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {MODES.map((m) => (
              <article
                key={m.tag}
                className={`flex flex-col rounded-3xl p-8 sm:p-10 ${
                  m.dark ? "on-pine bg-pine text-on-pine-muted" : "border border-line"
                }`}
              >
                <p
                  className={`font-mono text-xs font-semibold tracking-[0.14em] uppercase ${
                    m.dark ? "text-rust-light" : "text-muted"
                  }`}
                >
                  {m.tag}
                </p>
                <h3 className={`mt-3 text-h3 font-bold ${m.dark ? "text-white" : ""}`}>{m.t}</h3>
                <p className={`mt-3 max-w-md ${m.dark ? "text-on-pine" : ""}`}>{m.d}</p>
                <ul className="mt-6 grid gap-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <Check className={`mt-1 ${m.dark ? "text-rust-light" : "text-rust-ink"}`} />
                      <span className={m.dark ? "text-white" : "text-ink"}>{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href={m.cta.href} variant={m.dark ? "light" : "primary"}>
                    {m.cta.label}
                  </Button>
                </div>
              </article>
            ))}
          </div>
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
        note="Free for up to 2 trucks. No card required."
      />
    </main>
  );
}
