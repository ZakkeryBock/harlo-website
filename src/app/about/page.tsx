import type { Metadata } from "next";
import { EndCta } from "@/components/end-cta";
import { Peak } from "@/components/logo";
import { Container } from "@/components/ui";
import { ADDRESS, LEGAL_ENTITY } from "@/lib/legal";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Harlo started as the system that ran a small trucking company. Now it runs other carriers' operations too.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  {
    when: "Before Harlo",
    what: "Fat Cat Freight, a small carrier, runs on Loadbar: a system pieced together in Bubble and Airtable because nothing on the market fit.",
  },
  {
    when: "2023",
    what: "Fat Cat Freight closes. The lessons from running it, and Loadbar itself, don't.",
  },
  {
    when: "Rebuild",
    what: "Loadbar is rebuilt from scratch for other carriers and becomes Harlo, with an assistant that reads the paperwork.",
  },
  {
    when: "Today",
    what: "Harlo is open to every carrier, free for up to two trucks, with Harlo Go for owner-operators running from their phone.",
  },
];

const BELIEFS = [
  {
    t: "Software should do the reading",
    d: "If a document has the answer in it, Harlo should find it. Nobody should re-type a PDF.",
  },
  {
    t: "People approve, Harlo proposes",
    d: "Ike suggests and shows what it read. A person decides. On every plan.",
  },
  {
    t: "A small fleet deserves the same tools",
    d: "One Harlo. A two-truck carrier gets the same tools as a hundred-truck fleet.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20">
        <Peak className="pointer-events-none absolute -top-10 -right-40 hidden w-[40rem] max-w-none opacity-[0.07] lg:block" />
        <Container className="relative">
          <h1 className="max-w-[16ch] text-display font-extrabold">We ran a trucking company first.</h1>
          <p className="mt-6 max-w-2xl text-lead">
            Harlo started as the system that ran a small carrier, built by the people doing its dispatch and
            paperwork. Now it gives every carrier that edge.
          </p>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ol className="relative grid gap-10 border-l-2 border-line pl-8 md:grid-cols-4 md:gap-8 md:border-t-2 md:border-l-0 md:pt-8 md:pl-0">
            {TIMELINE.map((t) => (
              <li key={t.when} className="relative">
                <span className="absolute top-1.5 -left-[2.4rem] size-3.5 rounded-full border-2 border-paper bg-rust md:top-[-2.45rem] md:left-0" />
                <p className="text-lg font-bold text-ink">{t.when}</p>
                <p className="mt-2">{t.what}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <Container>
          <h2 className="text-h2 font-extrabold">What we hold to</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            {BELIEFS.map((b) => (
              <div key={b.t}>
                <h3 className="text-h3 font-bold">{b.t}</h3>
                <p className="mt-3">{b.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <h2 className="text-h2 font-extrabold">Talk to the people who build it</h2>
          <div className="grid gap-4 text-lead">
            <p>
              {LEGAL_ENTITY} is based in Illinois. Email us and you reach the team that builds Harlo.
            </p>
            <p className="text-base">
              Sales:{" "}
              <a className="font-semibold text-ink underline underline-offset-2" href={LINKS.sales}>
                sales@goharlo.com
              </a>
              <br />
              Support:{" "}
              <a className="font-semibold text-ink underline underline-offset-2" href={LINKS.support}>
                support@goharlo.com
              </a>
              <br />
              <span className="text-muted">{ADDRESS}</span>
            </p>
          </div>
        </Container>
      </section>

      <EndCta />
    </main>
  );
}
