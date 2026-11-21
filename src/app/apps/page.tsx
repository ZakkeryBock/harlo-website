import type { Metadata } from "next";
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

const APPS = [
  {
    key: "desktop",
    name: "Harlo for desktop",
    who: "For the office. Every plan.",
    title: "The command center.",
    body: "The full system in any browser. Where the operation is built and run.",
    points: ["Dispatch board and load planning", "Compliance, maintenance and settlement", "Roles, workspaces, dashboards and reports"],
    visual: <DesktopScreen />,
  },
  {
    key: "go",
    name: "Harlo Go",
    who: "For owners, dispatchers and reps. Every plan.",
    title: "Your operation, in your pocket.",
    body: "Approve what Ike flagged, check any load, snap paperwork, and see what you made this week. For a one-truck carrier, it's all you need to run the business.",
    points: ["Ike's brief, alerts and one-tap approvals", "Every load, document and dollar", "Snap a rate con or BOL with the camera"],
    visual: <Phone size="mx-auto w-full max-w-[17rem]" />,
  },
  {
    key: "driver",
    name: "Harlo Driver",
    who: "For your drivers. Pro and up.",
    title: "A dedicated screen in every cab.",
    body: "Load plans, stops, appointments and dispatch messages on a phone or the truck's tablet. One tap logs an arrival; the camera captures the BOL and POD.",
    points: ["Load plans, stops and appointment details", "Messages with dispatch, tied to the load", "Arrivals, departures, BOLs and PODs in one tap"],
    visual: <DriverTablet />,
  },
];

const CONTINUITY = [
  {
    t: "Start on your phone, finish at your desk",
    d: "Snap a rate con with Harlo Go. At your desk, it's on the board.",
  },
  {
    t: "Dispatch from the desk, it's in the cab",
    d: "Assign Unit 118 and the load plan lands on Marcus's tablet.",
  },
  {
    t: "One tap from the driver, everyone knows",
    d: "Marcus taps Arrived. The stop time and the customer's ETA update. No check call.",
  },
  {
    t: "Ike tells you once, wherever you are",
    d: "Approve an alert on your phone and it's handled everywhere.",
  },
];

const TABLET = [
  "The tablet stays with the truck. Drivers sign in with a PIN when they start their shift.",
  "Locked to Harlo Driver, so it's a work screen and nothing else.",
  "Big buttons and short screens, made to be used at a dock, not a desk.",
  "Drivers without the app still get every update by text.",
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
  { plan: "Pro and Fleet", apps: "Desktop, Harlo Go, and Harlo Driver for every driver" },
  { plan: "Enterprise", apps: "Everything, plus help rolling Harlo Driver out to your truck tablets" },
];

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

export default function AppsPage() {
  return (
    <main>
      <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-display font-extrabold">One Harlo. Every screen.</h1>
            <p className="mt-6 max-w-2xl text-lead">
              Desktop, phone and cab. One account, the same records, always in sync.
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
          <div className="relative mt-16 grid items-end gap-6 lg:grid-cols-[1.6fr_1fr_1.2fr]">
            <DesktopScreen />
            <Phone size="mx-auto w-full max-w-[15rem]" />
            <DriverTablet className="hidden lg:block" />
          </div>
        </Container>
      </section>

      {APPS.map((a, i) => (
        <section key={a.key} className={`py-20 sm:py-24 ${i % 2 === 0 ? "border-t border-line" : "bg-mist"}`}>
          <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <p className="font-semibold text-rust-ink">{a.name}</p>
              <h2 className="mt-2 text-h2 font-extrabold">{a.title}</h2>
              <p className="mt-2 text-sm text-muted">{a.who}</p>
              <p className="mt-5 text-lead">{a.body}</p>
              <ul className="mt-7 grid gap-3">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="mt-1 text-rust-ink" />
                    <span className="text-ink">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : ""}>{a.visual}</div>
          </Container>
        </section>
      ))}

      <section className="on-pine bg-pine py-20 text-on-pine-muted sm:py-28">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold text-white">It just works, from the desk to the dock.</h2>
          <p className="mt-5 max-w-2xl text-lead text-on-pine">
            Three windows onto the same live operation.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-pine-3 sm:grid-cols-2">
            {CONTINUITY.map((c) => (
              <div key={c.t} className="bg-pine-2 p-7 sm:p-9">
                <h3 className="text-h3 font-bold text-white">{c.t}</h3>
                <p className="mt-3">{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Already have tablets in your trucks? Put them to work.</h2>
            <p className="mt-5 text-lead">
              Harlo Driver turns them into the driver&apos;s link to dispatch, with a mode for shared, mounted devices.
            </p>
            <ul className="mt-7 grid gap-3">
              {TABLET.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-1 text-rust-ink" />
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <DriverTablet />
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container>
          <h2 className="max-w-2xl text-h2 font-extrabold">What each screen is for.</h2>
          <p className="mt-4 max-w-2xl">
            The desktop does everything. The apps do what that person needs.
          </p>
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

      <section className="bg-mist py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-h2 font-extrabold">Every plan, every device.</h2>
            <p className="mt-4 text-lead">There&apos;s no separate app subscription. Your plan decides what&apos;s inside, not where you can use it.</p>
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
        body="Sign up on any device. Go and Driver use the same account."
      />
    </main>
  );
}
