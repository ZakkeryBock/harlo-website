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
    d: "Keep the freight you haul and the freight you broker on separate books, then cover brokered loads with your own trucks in one click.",
  },
  {
    t: "More than one authority",
    d: "Each MC number gets its own workspace, with its own drivers, equipment, compliance records and documents.",
  },
  {
    t: "Terminals and divisions",
    d: "Give each terminal or division its own board and its own dispatchers, while leadership can see across all of them.",
  },
  {
    t: "Dispatch services",
    d: "Running loads for several carriers? Give each client their own workspace and switch between them without logging out.",
  },
];

const SEPARATE = ["Loads, customers and carriers", "Drivers, trucks and trailers", "Documents and compliance records", "Roles, settings and dashboards"];
const SHARED = ["One login for every workspace", "A different role in each one", "Switch in a click, no sign-out", "Hand loads between workspaces"];

const FAQ: QA[] = [
  {
    q: "Can people in one workspace see another?",
    a: "Only if you invite them to it. Each workspace's data is kept separate, and a person sees only the workspaces they belong to, with the role you gave them in each.",
  },
  {
    q: "Can one person have different roles in different workspaces?",
    a: "Yes. Your dispatch lead can be an admin in the carrier workspace and a read-only viewer in the brokerage, for example.",
  },
  {
    q: "How does a load move from my brokerage to my fleet?",
    a: "Tender it to your own carrier workspace like you would any carrier. It shows up there as a booked load with the rate confirmation attached, and both sides keep their own copy of the money.",
  },
  {
    q: "Can I start with one workspace and add more later?",
    a: "Yes. Every account starts with one. Add another whenever you start a new authority, terminal or brokerage.",
  },
];

export default function WorkspacesPage() {
  return (
    <main>
      <PageHero
        title="One login. Every operation you run."
        lead={
          <p>
            Carrier, brokerage, a second authority, a new terminal. Harlo gives each one its own workspace
            with its own loads, people and settings, and lets you move between them in a click.
          </p>
        }
        visual={<WorkspaceSwitcher className="mx-auto max-w-md" />}
        cta={{ href: LINKS.signupBoth, label: "Start my free trial" }}
        secondary={{ href: "/pricing#both", label: "Carrier + Broker pricing" }}
      />

      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Built for how trucking companies are actually shaped.</h2>
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
              When your brokerage covers a load with your own fleet, the load crosses over with everything
              attached. The brokerage books its margin, the carrier books its pay, and nobody types it twice.
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
        body="Set up your first carrier or brokerage workspace in minutes, free for 14 days."
      />
    </main>
  );
}
