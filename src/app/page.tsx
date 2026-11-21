import Link from "next/link";
import { OpsBoard } from "@/components/ops-board";
import { Faq, FAQ_TRIAL, type QA } from "@/components/faq";
import { EndCta } from "@/components/end-cta";
import { WorkspaceSwitcher } from "@/components/workspaces";
import { DesktopScreen, DriverTablet, Phone } from "@/components/devices";
import { Button, Check, Container } from "@/components/ui";
import { BUNDLE_BROKER_DISCOUNT, LINKS, brokerPlan, plan, usd } from "@/lib/site";
import { GUARDRAILS, TRIAL_NOTE } from "@/lib/content";

const PROMISES = ["Live the day you sign up", "Carriers, brokers, or both", "Desktop, phone and driver apps"];

/** What Ike does all day. Jobs, not features. */
const JOBS = [
  {
    t: "Watches every load",
    d: "Late loads, lapsing insurance and lanes losing money, flagged before anyone goes looking.",
    eg: "“Unit 204's inspection lapses before Thursday's load.”",
  },
  {
    t: "Reads the paperwork",
    d: "Rate cons, PODs, certificates and driver texts become updates on the right record.",
    eg: "“Renewed certificate filed. Lakeshore is cleared to book.”",
  },
  {
    t: "Answers in plain English",
    d: "What's at risk today, who's open tomorrow, which lanes made money.",
    eg: "“Which loads delivered without a POD this week?”",
  },
  {
    t: "Drafts the next step",
    d: "The customer update, the truck swap, the reminder. One click to send.",
    eg: "“I drafted a heads-up to Midwest Paper. Send it?”",
  },
];

const SIDES = [
  {
    who: "Carriers",
    title: "Every truck legal. Every load profitable.",
    points: ["Dispatch that blocks unfit drivers and trucks", "Driver updates by text", "Margin on every load"],
    href: "/carriers",
    link: "Harlo for carriers",
  },
  {
    who: "Brokers",
    title: "Book, cover and bill from one board.",
    points: ["Carriers vetted before you book", "Late loads flagged early", "Rate, carrier pay and margin on one record"],
    href: "/brokers",
    link: "Harlo for brokers",
  },
];

/** The platform, module by module. Everything here is on every paid plan. */
const MODULES = [
  {
    group: "Operations",
    items: ["Orders and loads", "Dispatch board", "Multi-stop routes", "Tracking and stop times", "Truck-routed miles", "Dashboards"],
  },
  {
    group: "Fleet and safety",
    items: ["Drivers", "Equipment and trailers", "CDL and medical cards", "Registrations and inspections", "Maintenance", "Dispatch fitness checks"],
  },
  {
    group: "Brokerage",
    items: ["Customers and tenders", "Carrier onboarding", "Authority and insurance checks", "Rate confirmations", "Customer updates", "Brokerage to fleet handoff"],
  },
  {
    group: "Money",
    items: ["Rates and accessorials", "Driver pay", "Fuel and advances", "Margin by load and lane", "POD before billing", "Settlement"],
  },
  {
    group: "Team",
    items: ["Unlimited users", "Roles and permissions", "Multiple workspaces", "Audit trail", "Single sign-on", "Desktop, phone and driver apps"],
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
  { who: "Carriers", price: usd(plan("pro").month!), unit: "per truck / mo", note: "Free up to 2 trucks", href: "/pricing#carrier" },
  { who: "Brokers", price: usd(brokerPlan("broker").month!), unit: "/ mo, 200 loads", note: "Free up to 25 loads a month", href: "/pricing#broker" },
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
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] bg-mist lg:block" />
        <Container className="relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-20 lg:pb-24">
          <div>
            <h1 className="max-w-[12ch] text-display font-extrabold">
              Run freight, <span className="text-rust-ink">not spreadsheets.</span>
            </h1>
            <p className="mt-6 max-w-[30rem] text-lead">
              The TMS for carriers and brokers. Free to start, built to grow with you.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={LINKS.signup} size="lg">
                Start free trial
              </Button>
              <Button href="/pricing" size="lg" variant="secondary">
                See pricing
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{TRIAL_NOTE}</p>
          </div>
          <div className="lg:pl-2">
            <OpsBoard />
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
                  className={`flex flex-col rounded-3xl p-7 sm:p-10 ${dark ? "on-pine bg-pine text-on-pine-muted" : "bg-mist"}`}
                >
                  <p className={`font-semibold ${dark ? "text-rust-light" : "text-rust-ink"}`}>{s.who}</p>
                  <h3
                    className={`mt-3 max-w-md text-[1.75rem] leading-tight font-bold tracking-[-0.02em] ${dark ? "text-white" : ""}`}
                  >
                    {s.title}
                  </h3>
                  <ul className="mt-7 grid gap-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
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

      {/* ------------------------------------------------------------ modules */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">Everything to run freight. Already connected.</h2>
            <p className="max-w-xl text-lead">Every paid plan gets the whole platform. Nothing to bolt on.</p>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {MODULES.map((m) => (
              <div key={m.group} className="border-t-2 border-ink pt-5">
                <h3 className="text-lg font-bold">{m.group}</h3>
                <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
                  {m.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- ecosystem */}
      <section className="on-pine overflow-hidden bg-pine py-20 text-on-pine-muted sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold text-white">One account. Every screen.</h2>
            <p className="max-w-xl text-lead text-on-pine">
              Desktop for the office, Harlo Go for your phone, Harlo Driver for the cab. Same live records on all
              three.
            </p>
          </div>
          <div className="mt-14 grid items-end gap-8 md:grid-cols-[1.5fr_1fr] lg:grid-cols-[1.6fr_0.9fr_1.3fr]">
            <figure>
              <DesktopScreen />
              <figcaption className="mt-4">
                <span className="font-semibold text-white">Harlo.</span> The command center.
              </figcaption>
            </figure>
            <figure>
              <Phone className="max-w-[14rem]" />
              <figcaption className="mt-4 text-center md:text-left">
                <span className="font-semibold text-white">Harlo Go.</span> In your pocket.
              </figcaption>
            </figure>
            <figure className="md:col-span-2 lg:col-span-1">
              <DriverTablet />
              <figcaption className="mt-4">
                <span className="font-semibold text-white">Harlo Driver.</span> In every cab.
              </figcaption>
            </figure>
          </div>
          <div className="mt-12">
            <Button href="/apps" variant="outline-light">
              See the apps
            </Button>
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
      <section id="ike" className="on-pine bg-pine py-20 text-on-pine-muted sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold text-white">Ike does the busywork.</h2>
            <p className="max-w-xl text-lead text-on-pine">
              The assistant built into Harlo. It drafts, your team decides.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pine-3 sm:grid-cols-2">
            {JOBS.map((j) => (
              <div key={j.t} className="flex flex-col bg-pine-2 p-7 sm:p-9">
                <h3 className="text-h3 font-bold text-white">{j.t}</h3>
                <p className="mt-3">{j.d}</p>
                <p className="mt-6 border-l-2 border-rust pl-4 text-[0.9375rem] text-on-pine">{j.eg}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-8 border-t border-pine-3 pt-10 md:grid-cols-[1fr_auto] md:items-start">
            <dl className="grid gap-6 sm:grid-cols-3 sm:gap-8">
              {GUARDRAILS.map((g) => (
                <div key={g.t}>
                  <dt className="font-semibold text-white">{g.t}</dt>
                  <dd className="mt-1 text-[0.9375rem]">{g.d}</dd>
                </div>
              ))}
            </dl>
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
