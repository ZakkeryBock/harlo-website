import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { EndCta } from "@/components/end-cta";
import { Faq, type QA } from "@/components/faq";
import { Handoff, WorkspaceSwitcher } from "@/components/workspaces";
import { Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

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
  },
  {
    t: "More than one authority",
    d: "Each MC number gets its own drivers, equipment and compliance records.",
  },
  {
    t: "Terminals and divisions",
    d: "Each terminal gets its own board and dispatchers. Leadership sees across all of them.",
  },
  {
    t: "Dispatch services",
    d: "Give each client carrier a workspace. Switch without logging out.",
  },
];

const SEPARATE = ["Loads, customers and carriers", "Drivers, trucks and trailers", "Documents and compliance records", "Roles, settings and dashboards"];
const SHARED = ["One login for every workspace", "A different role in each one", "Switch in a click, no sign-out", "Hand loads between workspaces"];

const FAQ: QA[] = [
  {
    q: "Can people in one workspace see another?",
    a: "Only if they're invited. People see only their workspaces, with the role you give them in each.",
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
      <PageHero
        title="One login. Every operation."
        lead={
          <p>
            Carrier, brokerage, a second authority, a new terminal. Each gets its own workspace. Switch in a click.
          </p>
        }
        visual={<WorkspaceSwitcher className="mx-auto max-w-md" />}
        cta={{ href: LINKS.signupBoth, label: "Start free trial" }}
        secondary={{ href: "/pricing#both", label: "Carrier + Broker pricing" }}
      />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Built for how trucking companies are shaped.</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-12">
            {USES.map((u) => (
              <div key={u.t} className="border-t-2 border-ink pt-5">
                <h3 className="text-h3 font-bold">{u.t}</h3>
                <p className="mt-3 max-w-lg">{u.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Separate where it matters.</h2>
            <p className="mt-5 text-lead">Every workspace keeps its own:</p>
            <ul className="mt-6 grid gap-3">
              {SEPARATE.map((s) => (
                <li key={s} className="flex gap-3">
                  <Check className="mt-1 text-rust-ink" />
                  <span className="text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h2 font-extrabold">Connected where it helps.</h2>
            <p className="mt-5 text-lead">Across all of them, you get:</p>
            <ul className="mt-6 grid gap-3">
              {SHARED.map((s) => (
                <li key={s} className="flex gap-3">
                  <Check className="mt-1 text-rust-ink" />
                  <span className="text-ink">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-h2 font-extrabold">Broker it. Haul it. Never re-key it.</h2>
            <p className="mt-5 text-lead">
              The load crosses over with everything attached. The brokerage books its margin, the carrier its pay.
            </p>
          </div>
          <div className="mt-12">
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
