import type { Metadata } from "next";
import { EndCta } from "@/components/end-cta";
import { Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Harlo keeps each company's and each workspace's data separate: isolation enforced in the database, roles and permissions, a full audit trail and single sign-on.",
  alternates: { canonical: "/security" },
};

const POINTS = [
  {
    t: "Isolation enforced by the database",
    d: "Every row of data belongs to one company and one workspace, and the database itself refuses to return it to anyone else. It isn't left to the app to remember.",
  },
  {
    t: "Roles and permissions",
    d: "Decide who can see money, who can dispatch and who can change settings, per person and per workspace.",
  },
  {
    t: "A full audit trail",
    d: "Who changed what, when, and what it was before. That includes every change Ike proposed and the person who approved it.",
  },
  {
    t: "Single sign-on",
    d: "Fleet and Enterprise teams can sign in with their company identity provider, so access ends the day someone leaves.",
  },
  {
    t: "AI that asks permission",
    d: "Ike reads and drafts, but a person approves every change before it touches a load.",
  },
  {
    t: "Used to make Harlo smarter, never sold",
    d: "Harlo trains its own models on activity across the platform, with people's names and contact details removed, so it reads documents better and spots trouble sooner for everyone. Your data is never sold, outside AI providers don't train on it, and no other customer sees your rates, customers or loads.",
  },
  {
    t: "Consent on record",
    d: "Drivers opt in before Harlo ever texts them, and the proof of consent is kept with their record.",
  },
];

export default function SecurityPage() {
  return (
    <main>
      <section className="pt-14 pb-16 sm:pt-20">
        <Container>
          <h1 className="max-w-[18ch] text-display font-extrabold">Your data stays yours, workspace by workspace.</h1>
          <p className="mt-6 max-w-2xl text-lead">
            Rates, customers, drivers and margins are the most sensitive numbers in your business. Harlo is
            built so they reach only the people you choose.
          </p>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:grid-cols-3">
          {POINTS.map((p) => (
            <div key={p.t} className="border-t-2 border-ink pt-5">
              <h2 className="text-lg font-bold">{p.t}</h2>
              <p className="mt-2">{p.d}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="bg-mist py-16">
        <Container>
          <p className="max-w-2xl text-lead">
            Security review or questionnaire for your team? Email{" "}
            <a className="font-semibold text-ink underline underline-offset-2" href={LINKS.sales}>
              sales@goharlo.com
            </a>{" "}
            and we&apos;ll answer it directly.
          </p>
        </Container>
      </section>

      <EndCta />
    </main>
  );
}
