import Link from "next/link";
import { HeroStage } from "@/components/hero-stage";
import { Faq, FAQ_TRIAL, type QA } from "@/components/faq";
import { EndCta } from "@/components/end-cta";
import { WorkspaceSwitcher } from "@/components/workspaces";
import { PlatformGrid } from "@/components/platform";
import { IkeConsole } from "@/components/ike-console";
import { Button, Check, Container } from "@/components/ui";
import { BUNDLE_BROKER_DISCOUNT, LINKS, brokerPlan, introPrice, plan, usd } from "@/lib/site";
import { GUARDRAILS, TRIAL_NOTE } from "@/lib/content";

const PROMISES = ["Live the day you sign up", "Carriers, brokers, or both", "Desktop, phone and driver apps"];

const SIDES = [
  {
    who: "Carriers",
    points: ["Dispatch the right drivers", "Keep equipment accounted for", "Track every load from pickup to payment"],
    href: "/carriers",
    link: "Harlo for carriers",
  },
  {
    who: "Brokers",
    points: ["Book with confidence", "Stay ahead of delays", "Know where every load stands"],
    href: "/brokers",
    link: "Harlo for brokers",
  },
];

type Cmp = { k: string; harlo: string; legacy: string; enterprise: string };
const COMPARE: Cmp[] = [
  { k: "Up and running", harlo: "Same day", legacy: "6+ months", enterprise: "About 90 days" },
  { k: "Starting price", harlo: "$0, published", legacy: "Quote only", enterprise: "~$2,000 / mo" },
  { k: "Try it first", harlo: "14 days, no card", legacy: "Sales demo", enterprise: "Sales demo" },
  { k: "Users", harlo: "Unlimited", legacy: "Per seat", enterprise: "Unlimited" },
  { k: "Carriers and brokers", harlo: "Both, linked", legacy: "Usually one", enterprise: "Both" },
  { k: "Right size for", harlo: "1 truck to enterprise", legacy: "Mid-size fleets", enterprise: "Mid-size and up" },
];

const EASY = [
  { t: "Pick your side", d: "Carrier, brokerage, or both. No sales call." },
  { t: "Bring your data", d: "Add trucks, drivers and customers, or import your spreadsheets." },
  { t: "Invite your team", d: "Every user is included." },
];

const HOME_FAQ: QA[] = [
  {
    q: "Is Harlo for carriers or brokers?",
    a: "Both. Run either one, or both side by side as separate workspaces under one login.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams run their first load the same day. There's no implementation project.",
  },
  {
    q: "What's a workspace?",
    a: "One operation — a carrier, a brokerage, an authority or a terminal — with its own loads, people and settings. Switch between them in a click.",
  },
  ...FAQ_TRIAL.slice(0, 2),
];

const TEASER = [
  {
    who: "Carriers",
    price: usd(introPrice(plan("pro").month!)),
    unit: "per truck / mo at launch",
    note: "Free up to 2 trucks",
    href: "/pricing#carrier",
  },
  {
    who: "Brokers",
    price: usd(introPrice(brokerPlan("broker").month!)),
    unit: "/ mo at launch, 200 loads",
    note: "Free up to 25 loads a month",
    href: "/pricing#broker",
  },
  {
    who: "Carrier + Broker",
    price: `${BUNDLE_BROKER_DISCOUNT * 100}% off`,
    unit: "the brokerage side",
    note: "One login, one bill",
    href: "/pricing#both",
  },
];

export default function Home() {
  return (
    <main>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        {/* the board sits half on paper, half on mist */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-mist sm:h-[38%]" />
        <Container className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 lg:pt-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h1 className="text-[clamp(2.75rem,1.6rem+4.6vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
              Harmonize your<br className="hidden sm:block" />{" "}
              <span className="relative inline-block text-rust-ink">
                operation.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 16"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-full"
                >
                  <path
                    className="hero-line"
                    pathLength={100}
                    d="M3 11 C 70 4, 150 4, 297 8"
                    fill="none"
                    stroke="var(--color-rust)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-8 max-w-[38rem] text-lead">
              Enterprise TMS, built for everyone. Powered by AI that knows your operation inside and out. Break free
              from busywork.
            </p>
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button href={LINKS.signup} size="lg">
                Start free trial
              </Button>
              <Button href="/pricing" size="lg" variant="secondary">
                See pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{TRIAL_NOTE}</p>
          </div>
          <div className="mt-14 sm:mt-16">
            <HeroStage />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- promises */}
      <section className="border-y border-line">
        <Container>
          <ul className="grid divide-line py-5 sm:grid-cols-3 sm:divide-x sm:py-0">
            {PROMISES.map((p) => (
              <li key={p} className="flex items-center gap-3 py-2 sm:justify-center sm:px-4 sm:py-6">
                <Check className="text-rust-ink" />
                <span className="font-medium text-ink">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* -------------------------------------------------------------- sides */}
      <section id="product" className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Both sides of the load. One platform.</h2>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {SIDES.map((s, i) => {
              const dark = i === 0;
              return (
                <div
                  key={s.who}
                  className={`side-card group flex flex-col rounded-3xl p-7 sm:p-10 ${dark ? "on-pine bg-pine text-on-pine-muted" : "bg-mist"}`}
                >
                  <h3
                    className={`text-[clamp(2.75rem,2rem+3vw,4.25rem)] leading-none font-extrabold tracking-[-0.04em] ${dark ? "text-white" : ""}`}
                  >
                    {s.who}
                  </h3>
                  <span
                    className={`mt-5 block h-1 w-14 rounded-full transition-[width] duration-500 ease-out group-hover:w-28 ${dark ? "bg-rust-light" : "bg-rust"}`}
                  />
                  <ul className="mt-8 grid gap-3">
                    {s.points.map((p, n) => (
                      <li
                        key={p}
                        style={{ transitionDelay: `${n * 60}ms` }}
                        className="flex gap-3 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      >
                        <Check className={`mt-1 ${dark ? "text-rust-light" : "text-rust-ink"}`} />
                        <span className={dark ? "text-on-pine" : "text-ink"}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-9">
                    <Button href={s.href} variant={dark ? "light" : "primary"}>
                      {s.link}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------- platform */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">One platform. Every screen.</h2>
            <p className="max-w-xl text-lead">Every part of the operation, working as one. Wherever you are.</p>
          </div>
          <div className="mt-14">
            <PlatformGrid />
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------- workspaces */}
      <section className="bg-mist py-20 sm:py-28">
        <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div>
            <h2 className="max-w-xl text-h2 font-extrabold">One login. Every operation.</h2>
            <p className="mt-5 max-w-xl text-lead">
              A carrier, a brokerage, a second authority — each in its own workspace. Switch in a click.
            </p>
            <div className="mt-8">
              <Button href="/workspaces" variant="secondary">
                How workspaces work
              </Button>
            </div>
          </div>
          <WorkspaceSwitcher className="mx-auto w-full max-w-md" />
        </Container>
      </section>

      {/* ---------------------------------------------------------------- ike */}
      <section id="ike" className="on-pine relative overflow-hidden bg-pine py-20 text-on-pine-muted sm:py-28">
        <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="ike-glow pointer-events-none absolute top-[18%] left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(202_107_68/0.28),transparent)] blur-2xl"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
              The teammate that{" "}
              <span className="bg-gradient-to-r from-rust-light via-[#f0b394] to-cream bg-clip-text text-transparent">
                never logs off.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lead text-on-pine">
              Ike is the AI built into Harlo. It watches, reads and answers in plain English. It drafts the next
              step. You make the call.
            </p>
          </div>

          <div className="mt-14">
            <IkeConsole />
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            {GUARDRAILS.map((g) => (
              <div key={g.t}>
                <p className="flex items-center gap-2 font-semibold text-white">
                  <Check className="text-rust-light" />
                  {g.t}
                </p>
                <p className="mt-1.5 text-[0.9375rem]">{g.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button href="/ike" variant="outline-light">
              Meet Ike
            </Button>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ compare */}
      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Enterprise power. No enterprise rollout.</h2>
          <div className="mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[44rem] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">Harlo compared with traditional TMS software and enterprise platforms</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="w-[22%] py-4">
                    <span className="sr-only">Compared on</span>
                  </th>
                  <th scope="col" className="w-[26%] rounded-t-xl bg-pine px-4 py-4 text-lg font-bold text-white">
                    Harlo
                  </th>
                  <th scope="col" className="px-4 py-4 text-lg font-bold text-ink">
                    Traditional TMS
                  </th>
                  <th scope="col" className="px-4 py-4 text-lg font-bold text-ink">
                    Enterprise platforms
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r, i) => (
                  <tr key={r.k} className="border-b border-line">
                    <th scope="row" className="py-4 pr-4 font-semibold text-ink">
                      {r.k}
                    </th>
                    <td
                      className={`bg-pine px-4 py-4 font-semibold text-white ${i === COMPARE.length - 1 ? "rounded-b-xl" : ""}`}
                    >
                      {r.harlo}
                    </td>
                    <td className="px-4 py-4">{r.legacy}</td>
                    <td className="px-4 py-4">{r.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- easy */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Live this afternoon.</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {EASY.map((e, i) => (
              <li key={e.t} className="border-t-2 border-ink pt-5">
                <span className="grid size-8 place-items-center rounded-full bg-rust-ink text-sm font-bold text-white tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-h3 font-bold">{e.t}</h3>
                <p className="mt-2">{e.d}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href={LINKS.signup} size="lg">
              Start free trial
            </Button>
            <p className="text-sm text-muted">{TRIAL_NOTE}</p>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- story */}
      <section className="bg-mist py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <h2 className="text-h2 font-extrabold">Built by people who&apos;ve moved freight.</h2>
          <div className="grid gap-5 text-lead">
            <p>
              Harlo started as the system behind Fat Cat Freight, a small trucking company. What running it taught
              us about dispatch, driver files, brokers and getting paid is what Harlo is built on.
            </p>
            <Link href="/about" className="font-semibold text-rust-ink underline-offset-4 hover:underline">
              Our story
            </Link>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ pricing */}
      <section id="pricing" className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-h2 font-extrabold">Never priced per seat.</h2>
              <p className="mt-5 text-lead">Carriers pay per truck. Brokers pay by volume. Every user included.</p>
            </div>
            <Button href="/pricing" variant="secondary">
              See all pricing
            </Button>
          </div>
          <div className="mt-12 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {TEASER.map((t) => (
              <Link key={t.who} href={t.href} className="group py-8 md:px-8 md:first:pl-0">
                <p className="font-semibold text-ink">{t.who}</p>
                <p className="mt-2 text-3xl font-extrabold tracking-tight text-ink tabular-nums">
                  {t.price} <span className="text-base font-medium text-muted">{t.unit}</span>
                </p>
                <p className="mt-2 text-sm">{t.note}</p>
                <p className="mt-4 text-sm font-semibold text-rust-ink group-hover:underline">See plans</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------------- faq */}
      <section className="border-t border-line py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Questions</h2>
            <p className="mt-4">
              Anything else:{" "}
              <a className="font-semibold text-ink underline underline-offset-2" href={LINKS.support}>
                support@goharlo.com
              </a>
            </p>
          </div>
          <Faq items={HOME_FAQ} />
        </Container>
      </section>

      <EndCta title="Start running on Harlo." body="Free to start. No card, no sales call." />
    </main>
  );
}
