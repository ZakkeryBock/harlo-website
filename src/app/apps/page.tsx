import type { Metadata } from "next";
import Link from "next/link";
import { EndCta } from "@/components/end-cta";
import { DesktopScreen, DriverTablet, Phone } from "@/components/devices";
import { Button, Check, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";
import { TRIAL_NOTE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Apps: Harlo on every screen",
  description:
    "One Harlo account on every device: the full system on desktop, Harlo Go on your phone, and Harlo Driver on your drivers' phones and truck tablets. Same records, always in sync.",
  alternates: { canonical: "/apps" },
};

const ICONS = {
  desktop: "M2.5 4.5h15v9h-15zM7 16.5h6M10 13.5v3",
  go: "M6.5 2.5h7a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1zM9 15h2",
  driver: "M3 5.5h14v10H3zM6 18h8M8 9l2 2 3-3",
} as const;

const LINEUP = [
  {
    key: "desktop" as const,
    name: "Harlo for desktop",
    who: "The office",
    plan: "Every plan",
    d: "The full system in any browser. Where the operation is built and run.",
    href: "#desktop",
    cta: "What it does",
  },
  {
    key: "go" as const,
    name: "Harlo Go",
    who: "Owners, dispatchers and reps",
    plan: "Every plan",
    d: "Harlo on your phone. Run a small fleet from the cab, or keep the office in reach.",
    href: "/go",
    cta: "Explore Harlo Go",
  },
  {
    key: "driver" as const,
    name: "Harlo Driver",
    who: "Your drivers",
    plan: "Pro and up",
    d: "Load plans, stops and dispatch messages on a phone or the truck's tablet.",
    href: "#driver",
    cta: "What drivers get",
  },
];

const FLOWS = [
  {
    from: "Phone",
    to: "Desk",
    t: "Start on your phone, finish at your desk.",
    d: "Snap a rate con with Harlo Go. At your desk, it's already on the board.",
  },
  {
    from: "Desk",
    to: "Cab",
    t: "Dispatch from the desk, it's in the cab.",
    d: "Assign Unit 118 and the load plan lands on Marcus's tablet.",
  },
  {
    from: "Cab",
    to: "Everyone",
    t: "One tap from the driver, everyone knows.",
    d: "Marcus taps Arrived. The stop time and the customer's ETA update. No check call.",
  },
  {
    from: "Ike",
    to: "Anywhere",
    t: "Ike tells you once, wherever you are.",
    d: "Approve an alert on your phone and it's handled everywhere.",
  },
];

const DESKTOP = ["Dispatch board and load planning", "Compliance, maintenance and settlement", "Roles, workspaces, dashboards and reports"];
const GO = ["Ike's brief, alerts and one-tap approvals", "Every load, document and dollar", "Snap a rate con or BOL with the camera"];
const DRIVER = [
  "Load plans, stops and appointment details",
  "Messages with dispatch, tied to the load",
  "One tap for arrivals and departures; the camera for BOLs and PODs",
  "Shared truck tablets: drivers sign in with a PIN at the start of a shift",
  "Locked to Harlo Driver, so the tablet is a work screen and nothing else",
  "Drivers without the app still get every update by text",
];

type Cell = boolean | string;
const MATRIX: [string, Cell, Cell, Cell][] = [
  ["Dispatch board and load planning", true, "View and reassign", false],
  ["Book loads and snap documents", true, true, "BOL and POD"],
  ["Ike's brief and approvals", true, true, false],
  ["Driver load plans and stops", true, "View", true],
  ["Messages between dispatch and driver", true, true, true],
  ["Compliance, maintenance and settlement", true, "Alerts", false],
  ["Money: margin, pay and invoices", true, "At a glance", false],
  ["Settings, roles and workspaces", true, false, false],
];

const PLANS: { plan: string; apps: string }[] = [
  { plan: "Free", apps: "Desktop and Harlo Go, within Free's limits" },
  { plan: "Pro and Fleet", apps: "Desktop, Harlo Go as your companion, and Harlo Driver for every driver" },
  { plan: "Enterprise", apps: "Everything, plus help rolling Harlo Driver out to your truck tablets" },
];

function Icon({ d, dark = false }: { d: string; dark?: boolean }) {
  return (
    <span
      className={`grid size-11 place-items-center rounded-xl ${
        dark ? "bg-white/10 text-rust-light" : "bg-paper text-rust-ink shadow-[0_6px_18px_-12px_rgb(28_34_30/0.5)]"
      }`}
    >
      <svg viewBox="0 0 20 20" className="size-5" fill="none" aria-hidden="true">
        <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="mt-7 grid gap-3">
      {items.map((p) => (
        <li key={p} className="flex gap-3">
          <Check className="mt-1 text-rust-ink" />
          <span className="text-ink">{p}</span>
        </li>
      ))}
    </ul>
  );
}

function Mark({ v }: { v: Cell }) {
  if (typeof v === "string") return <span className="text-sm text-ink">{v}</span>;
  return v ? (
    <svg viewBox="0 0 16 16" className="mx-auto size-4 text-go" role="img" aria-label="Yes">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <span className="text-muted" aria-label="No">
      –
    </span>
  );
}

const eyebrow = "font-mono text-xs font-semibold tracking-[0.14em] text-rust-ink uppercase";

export default function AppsPage() {
  return (
    <main>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-mist" />
        <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className={eyebrow}>Harlo apps</p>
            <h1 className="mt-4 text-display font-extrabold">
              One Harlo.
              <span className="block text-rust-ink">Every screen.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lead">
              The office, your phone and the cab. One account, the same records, always in sync.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={LINKS.signup} size="lg">
                Start free trial
              </Button>
              <Button href="/go" size="lg" variant="secondary">
                Explore Harlo Go
              </Button>
            </div>
            <p className="mt-4 text-sm text-muted">{TRIAL_NOTE}</p>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl pb-6 sm:pb-10">
            <DesktopScreen large className="mx-auto w-full sm:w-[72%]" />
            <div className="absolute bottom-0 left-0 hidden w-[26rem] origin-bottom-left scale-[0.66] lg:block">
              <DriverTablet />
            </div>
            <Phone compact size="absolute right-2 bottom-0 hidden w-[15%] sm:block" />
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- lineup */}
      <section className="py-20 sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">Three apps. One account.</h2>
          <p className="mt-4 max-w-2xl text-lead">Sign in once. Each app shows the person in front of it what they need.</p>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {LINEUP.map((a) => {
              const dark = a.key === "go";
              return (
                <article
                  key={a.key}
                  className={`flex flex-col rounded-3xl p-7 sm:p-8 ${dark ? "on-pine bg-pine text-on-pine-muted" : "bg-mist"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon d={ICONS[a.key]} dark={dark} />
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        dark ? "bg-white/10 text-on-pine" : "bg-paper text-ink ring-1 ring-line"
                      }`}
                    >
                      {a.plan}
                    </span>
                  </div>
                  <h3 className={`mt-6 text-h3 font-bold ${dark ? "text-white" : ""}`}>{a.name}</h3>
                  <p
                    className={`mt-1 font-mono text-xs font-semibold tracking-[0.12em] uppercase ${
                      dark ? "text-rust-light" : "text-muted"
                    }`}
                  >
                    {a.who}
                  </p>
                  <p className={`mt-4 flex-1 ${dark ? "text-on-pine" : ""}`}>{a.d}</p>
                  <Link
                    href={a.href}
                    className={`mt-6 text-sm font-semibold underline-offset-4 hover:underline ${
                      dark ? "text-white" : "text-rust-ink"
                    }`}
                  >
                    {a.cta} &rarr;
                  </Link>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- desktop */}
      <section id="desktop" className="scroll-mt-20 border-t border-line py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Harlo for desktop</p>
            <h2 className="mt-3 text-h2 font-extrabold">The command center.</h2>
            <p className="mt-5 text-lead">
              The full system in any browser, on every plan. Free shows you all of it; your plan decides what&apos;s
              unlocked.
            </p>
            <Points items={DESKTOP} />
          </div>
          <div className="rounded-3xl bg-mist p-5 sm:p-8">
            <DesktopScreen />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------------ go */}
      <section id="go" className="scroll-mt-20 bg-mist py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="order-2 lg:order-1">
            <Phone size="mx-auto w-full max-w-[17rem]" />
          </div>
          <div className="order-1 lg:order-2">
            <p className={eyebrow}>Harlo Go</p>
            <h2 className="mt-3 text-h2 font-extrabold">Your operation, in your pocket.</h2>
            <p className="mt-5 text-lead">
              On one or two trucks, it runs the business. On Pro and up, it&apos;s your desk when you&apos;re away from it.
            </p>
            <Points items={GO} />
            <div className="mt-8">
              <Button href="/go">Explore Harlo Go</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- driver */}
      <section id="driver" className="scroll-mt-20 py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className={eyebrow}>Harlo Driver · Pro and up</p>
            <h2 className="mt-3 text-h2 font-extrabold">A dedicated screen in every cab.</h2>
            <p className="mt-5 text-lead">
              On the driver&apos;s phone or the truck&apos;s tablet. Already have tablets in your trucks? Put them to work.
            </p>
            <Points items={DRIVER} />
          </div>
          <div className="rounded-3xl bg-mist p-5 sm:p-8">
            <DriverTablet />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- continuity */}
      <section className="on-pine relative overflow-hidden bg-pine py-20 text-on-pine-muted sm:py-28">
        <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0" />
        <Container className="relative">
          <h2 className="max-w-2xl text-h2 font-extrabold text-white">It just works, from the desk to the dock.</h2>
          <p className="mt-5 max-w-2xl text-lead text-on-pine">Three windows onto the same live operation.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {FLOWS.map((f) => (
              <div key={f.t} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <p className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.12em] text-rust-light uppercase">
                  {f.from}
                  <span className="ike-flow h-px w-8" aria-hidden="true" />
                  {f.to}
                </p>
                <h3 className="mt-4 text-lg font-bold text-white">{f.t}</h3>
                <p className="mt-2">{f.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------------- matrix */}
      <section className="py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">What each screen is for.</h2>
          <p className="mt-4 max-w-2xl">The desktop does everything. The apps do what that person needs.</p>
          <div className="mt-10 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem]">
              <caption className="sr-only">What you can do in each Harlo app</caption>
              <thead>
                <tr className="border-b border-ink">
                  <th scope="col" className="w-[40%] py-4">
                    <span className="sr-only">Task</span>
                  </th>
                  {["Desktop", "Harlo Go", "Harlo Driver"].map((h) => (
                    <th key={h} scope="col" className="py-4 text-center text-lg font-bold text-ink">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map(([label, ...cells]) => (
                  <tr key={label} className="border-b border-line">
                    <th scope="row" className="py-3.5 pr-4 font-normal text-body">
                      {label}
                    </th>
                    {cells.map((c, i) => (
                      <td key={i} className="py-3.5 text-center">
                        <Mark v={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* --------------------------------------------------------------- plans */}
      <section className="bg-mist py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Every plan, every device.</h2>
            <p className="mt-4 text-lead">
              There&apos;s no separate app subscription. Your plan decides what&apos;s inside, not where you can use it.
            </p>
            <p className="mt-6 rounded-2xl bg-paper p-5 text-[0.9375rem]">
              <span className="font-semibold text-ink">Install in one tap.</span> Open Harlo Go or Harlo Driver in your
              phone&apos;s browser and add it to your home screen. App Store and Google Play versions are on the way.
            </p>
          </div>
          <dl className="divide-y divide-line border-y border-line">
            {PLANS.map((p) => (
              <div key={p.plan} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <dt className="font-bold text-ink">{p.plan}</dt>
                <dd>{p.apps}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <EndCta
        title="Download nothing. Start in your browser."
        body="Sign up on any device. Harlo Go and Harlo Driver use the same account."
      />
    </main>
  );
}
