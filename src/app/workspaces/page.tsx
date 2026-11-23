import type { Metadata } from "next";
import { EndCta } from "@/components/end-cta";
import { Faq, type QA } from "@/components/faq";
import { CompanyMap, Handoff, RolesCard, WorkspaceSwitcher } from "@/components/workspaces";
import { Button, Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";
import { TRIAL_NOTE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Workspaces",
  description:
    "Run every carrier, brokerage, authority and terminal you operate from one Harlo login. Each workspace keeps its own loads, people and settings.",
  alternates: { canonical: "/workspaces" },
};

const USES = [
  {
    t: "A carrier with a brokerage arm",
    d: "Separate books for what you haul and what you broker. Cover brokered loads with your own trucks in one click.",
    chips: ["Reyes Trucking", "Reyes Logistics"],
    icon: "M3 10h14M12 5l5 5-5 5M8 15l-5-5 5-5",
  },
  {
    t: "More than one authority",
    d: "Each MC number gets its own drivers, equipment and compliance records.",
    chips: ["MC 1104562", "MC 1188430"],
    icon: "M10 2.5l6 2.2v4.6c0 3.8-2.6 6.7-6 8.2-3.4-1.5-6-4.4-6-8.2V4.7z",
  },
  {
    t: "Terminals and divisions",
    d: "Each terminal gets its own board and dispatchers. Leadership sees across all of them.",
    chips: ["Chicago · 12 trucks", "Reno · 6 trucks"],
    icon: "M3 17V8l7-5 7 5v9M8 17v-5h4v5",
  },
  {
    t: "Dispatch services",
    d: "Give each client carrier a workspace. Switch without logging out.",
    chips: ["Client A", "Client B", "Client C"],
    icon: "M4 6h12M4 10h12M4 14h8",
  },
];

const SEPARATE = ["Loads, customers and carriers", "Drivers, trucks and trailers", "Documents and compliance records", "Settings and dashboards"];
const SHARED = ["One login and one user list", "A different role in each workspace", "Switch in a click, no sign-out", "Hand loads between workspaces", "One bill for the company"];

const FAQ: QA[] = [
  {
    q: "Can people in one workspace see another?",
    a: "Only if their role opens it. People see only their workspaces, with the role you give them in each.",
  },
  {
    q: "Can one person have different roles in different workspaces?",
    a: "Yes. An admin in one, a viewer in another.",
  },
  {
    q: "How does a load move from my brokerage to my fleet?",
    a: "Tender it to your own carrier workspace. It arrives booked, with the rate con attached, and each side keeps its own money.",
  },
  {
    q: "Can I start with one workspace and add more later?",
    a: "Yes. Add one whenever you start a new authority, terminal or brokerage.",
  },
];

export default function WorkspacesPage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-mist" />
        <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-display font-extrabold">
              One login.
              <span className="block text-rust-ink">Every operation.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lead">
              Carrier, brokerage, a second authority, a new terminal. Each gets its own workspace, under one company and
              one login.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={LINKS.signupBoth} size="lg">
                Start free trial
              </Button>
              <Button href="/pricing#both" size="lg" variant="secondary">
                Carrier + Broker pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{TRIAL_NOTE}</p>
          </div>
          <CompanyMap className="mx-auto mt-14 max-w-4xl" />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- uses */}
      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Built for how trucking companies are shaped.</h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {USES.map((u) => (
              <article key={u.t} className="flex flex-col rounded-3xl bg-mist p-7 sm:p-8">
                <span className="grid size-10 place-items-center rounded-xl bg-paper text-rust-ink shadow-[0_6px_18px_-12px_rgb(28_34_30/0.5)]">
                  <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
                    <path d={u.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-6 text-h3 font-bold">{u.t}</h3>
                <p className="mt-2 max-w-md">{u.d}</p>
                <div aria-hidden="true" className="mt-6 flex flex-wrap gap-2">
                  {u.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg bg-paper px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_6px_18px_-12px_rgb(28_34_30/0.5)]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------- separate / connected */}
      <section className="pb-20 sm:pb-28">
        <Container className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-line p-8 sm:p-10">
            <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted uppercase">Each workspace</p>
            <h2 className="mt-3 text-h2 font-extrabold">Separate where it matters.</h2>
            <ul className="mt-8 grid gap-3">
              {SEPARATE.map((s) => (
                <li key={s} className="flex gap-3">
                  <Check className="mt-1 text-rust-ink" />
                  <span className="text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="on-pine relative overflow-hidden rounded-3xl bg-pine p-8 text-on-pine-muted sm:p-10">
            <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0 opacity-60" />
            <div className="relative">
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-rust-light uppercase">Across all of them</p>
              <h2 className="mt-3 text-h2 font-extrabold text-white">Connected where it helps.</h2>
              <ul className="mt-8 grid gap-3">
                {SHARED.map((s) => (
                  <li key={s} className="flex gap-3">
                    <Check className="mt-1 text-rust-light" />
                    <span className="text-white">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- people/roles */}
      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">One list of people. A role in each workspace.</h2>
            <p className="mt-5 text-lead">
              Add someone once. Their role decides which workspaces they open and what they can do there. Switch from the
              top bar without signing out.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:mx-auto lg:w-full lg:max-w-md lg:grid-cols-1">
            <RolesCard />
            <WorkspaceSwitcher />
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- handoff */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-extrabold">Broker it. Haul it. Never re-key it.</h2>
            <p className="mt-5 text-lead">
              The load crosses over with everything attached. The brokerage books its margin, the carrier its pay.
            </p>
          </div>
          <div className="mt-12 rounded-3xl bg-mist p-5 sm:p-8">
            <Handoff />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <h2 className="text-h2 font-extrabold">Workspace questions</h2>
          <Faq items={FAQ} />
        </Container>
      </section>

      <EndCta
        href={LINKS.signupBoth}
        title="Start with one workspace. Add the rest when you're ready."
        body="Set up your first workspace in minutes."
      />
    </main>
  );
}
