import type { Metadata } from "next";
import Link from "next/link";
import { Accent, BoldHero, FloatStage, type Float } from "@/components/bold-hero";
import { Peak } from "@/components/logo";
import { LoadJourney } from "@/components/load-journey";
import { ArrowBadge } from "@/components/platform";
import { EnterpriseCard } from "@/components/enterprise-card";
import { EndCta } from "@/components/end-cta";
import { Button, Check, Container } from "@/components/ui";
import { LINKS, plan } from "@/lib/site";

export const metadata: Metadata = {
  title: "For carriers",
  description:
    "Harlo for carriers running 1 to 100 trucks: loads from rate cons, compliance-checked dispatch, driver texts and margin on every load.",
  alternates: { canonical: "/carriers" },
};

/** Things that just happened on their own, drifting around the morning brief. */
const FLOATS: Float[] = [
  { pos: "-left-10 top-[6%]", tilt: -4, delay: 0, tone: "go", label: "Dispatch", text: "Unit 118 cleared to roll" },
  { pos: "-left-12 top-[62%]", tilt: 3, delay: 1.3, tone: "ink", label: "Paperwork", text: "Signed POD filed" },
  { pos: "-right-10 top-[10%]", tilt: 4, delay: 0.9, tone: "go", label: "Margin", text: "NL-88412 made $695" },
  { pos: "-right-8 top-[64%]", tilt: 3, delay: 0.3, tone: "go", label: "Billing", text: "Invoice sent" },
];

const FLEETS = [
  {
    n: "1–2",
    who: "Owner-operators running from the cab.",
    plan: "Free",
    sub: "No time limit, with Harlo Go",
    href: "/go",
    cta: "See Harlo Go",
    dark: false,
  },
  {
    n: "3–25",
    who: "Growing fleets done with the spreadsheet.",
    plan: "$39",
    sub: "per truck at launch ($49 list), Harlo Driver included",
    href: "/pricing#carrier",
    cta: "See Pro",
    dark: true,
  },
  {
    n: "26–100",
    who: "Established carriers with a dispatch floor.",
    plan: "$32",
    sub: "per truck from truck 26 at launch ($40 list)",
    href: "/pricing#carrier",
    cta: "See Fleet",
    dark: false,
  },
];

export default function CarriersPage() {
  return (
    <main>
      <BoldHero
        title={
          <>
            Your fleet,
            <br className="hidden sm:block" /> <Accent>in perfect sync.</Accent>
          </>
        }
        lead={
          <p>
            Drivers, trucks, loads and money in one place, with an AI that keeps watch around the clock. You
            drive the business. Harlo handles the rest.
          </p>
        }
        visual={
          <FloatStage floats={FLOATS}>
            <FleetGlance />
          </FloatStage>
        }
        cta={{ href: LINKS.signupCarrier, label: "Start free trial" }}
        secondary={{ href: "/pricing#carrier", label: "See carrier pricing" }}
      />

      {/* ------------------------------------------------------------ the load */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">
              Book it. Dispatch it.
              <br /> Run it. <span className="text-rust-ink">Get paid.</span>
            </h2>
            <p className="max-w-xl text-lead">One load, one record, from the rate con to the money in the bank.</p>
          </div>
          <div className="mt-12 sm:rounded-[2rem] sm:bg-mist sm:p-10">
            <LoadJourney />
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- compliance */}
      <section className="on-pine relative overflow-hidden bg-pine py-20 text-on-pine-muted sm:py-28">
        <div aria-hidden="true" className="ike-field pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="ike-glow pointer-events-none absolute top-[20%] right-[-10%] h-[30rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(202_107_68/0.25),transparent)] blur-2xl"
        />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <h2 className="text-[clamp(2.25rem,1.5rem+3vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white">
              Compliance that{" "}
              <span className="bg-gradient-to-r from-rust-light via-[#f0b394] to-cream bg-clip-text text-transparent">
                enforces itself.
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-lead text-on-pine">
              Other software sends a reminder. Harlo holds the line. If a driver or truck isn&apos;t legal, it
              doesn&apos;t get dispatched.
            </p>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                ["24/7", "Watching every file"],
                ["Early", "Warnings before anything lapses"],
                ["1 click", "To fix it and roll"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-2xl font-extrabold tracking-tight text-white">{k}</dt>
                  <dd className="mt-1 text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <DispatchGate />
        </Container>
      </section>

      {/* -------------------------------------------------------------- fleets */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">One truck or a hundred.</h2>
            <p className="max-w-xl text-lead">Start where you are. Grow without ever switching systems.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {FLEETS.map((f) => (
              <Link
                key={f.n}
                href={f.href}
                className={`group relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-8 ${
                  f.dark ? "on-pine bg-pine text-on-pine-muted" : "bg-mist"
                }`}
              >
                {f.dark && (
                  <div aria-hidden="true" className="blob-field pointer-events-none absolute inset-0">
                    <span className="blob blob-a" />
                    <span className="blob blob-b" />
                    <span className="blob blob-c" />
                  </div>
                )}
                <p
                  className={`relative text-[clamp(3.25rem,2.2rem+2.4vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] whitespace-nowrap ${
                    f.dark ? "text-white" : "text-ink"
                  }`}
                >
                  {f.n}
                </p>
                <p className={`relative mt-2 font-semibold ${f.dark ? "text-rust-light" : "text-rust-ink"}`}>trucks</p>
                <p className={`relative mt-6 mb-10 ${f.dark ? "text-on-pine" : ""}`}>{f.who}</p>
                <div className={`relative mt-auto border-t pt-6 ${f.dark ? "border-white/10" : "border-line"}`}>
                  {/* price and arrow share a line; the note sits under both, so the
                      arrow opening on hover never rewraps anything */}
                  <div className="flex items-center justify-between gap-4">
                    <p className={`text-3xl font-extrabold tracking-tight tabular-nums ${f.dark ? "text-white" : "text-ink"}`}>
                      {f.plan}
                    </p>
                    <ArrowBadge label={f.cta} dark={f.dark} />
                  </div>
                  <p className="mt-1 text-sm">{f.sub}</p>
                </div>
              </Link>
            ))}
          </div>
          <EnterpriseCard
            n="100+"
            unit="trucks"
            body="Large fleets and multi-terminal operations. Pricing built around your contract, and a team to move you over."
            perks={[...plan("enterprise").includes, plan("enterprise").ai, plan("enterprise").users]}
            href={plan("enterprise").cta.href}
          />
        </Container>
      </section>

      {/* ----------------------------------------------------------- brokerage */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-mist p-8 sm:p-12">
            <div className="pointer-events-none absolute -bottom-32 -left-20 size-80 rounded-full bg-rust/15 blur-3xl" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              <div>
                <h2 className="text-h2 font-extrabold">Booking your own freight too?</h2>
                <p className="mt-5 max-w-xl text-lead">
                  Add a brokerage next door. Cover your own loads with your own trucks in one click.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button href="/workspaces" variant="secondary" size="lg">
                  How workspaces work
                </Button>
                <Button href="/brokers" variant="ghost" size="lg">
                  Harlo for brokers
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <EndCta title="Put your fleet in sync." href={LINKS.signupCarrier} />
    </main>
  );
}

/** Two dispatches meeting the gate: one clears, one is held until it's fixed. */
function DispatchGate() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#202723]/90 p-5 shadow-[0_40px_120px_-40px_rgb(202_107_68/0.45)] backdrop-blur sm:p-6">
        <div className="gate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-rust/15 to-transparent" />
        <div className="relative flex items-center justify-between">
          <p className="text-xs font-semibold tracking-wide text-on-pine-muted uppercase">Dispatch check</p>
          <span className="flex items-center gap-1.5 text-[0.6875rem] text-on-pine-muted">
            <span className="ops-live size-1.5 rounded-full bg-go" />
            Live
          </span>
        </div>
        <GateRow who="Marcus Reyes" unit="Unit 118 · NL-88412" failing={null} />
        <GateRow who="Dana Whitfield" unit="Unit 204 · NL-88430" failing="Medical card" />
      </div>
    </div>
  );
}

function GateRow({ who, unit, failing }: { who: string; unit: string; failing: string | null }) {
  const checks = ["CDL", "Medical card", "Inspection", "Registration"];
  const ok = failing === null;
  return (
    <div className="relative mt-4 rounded-2xl bg-paper p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-pine text-xs font-bold text-cream">
          {who
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">{who}</p>
          <p className="text-[0.6875rem] text-muted">{unit}</p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-[0.6875rem] font-bold ${
            ok ? "bg-go-soft text-go" : "bg-stop-soft text-stop"
          }`}
        >
          {ok ? "Cleared" : "Held"}
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {checks.map((c) => {
          const pass = c !== failing;
          return (
            <span
              key={c}
              className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[0.6875rem] font-semibold ${
                pass ? "bg-mist text-ink" : "bg-stop-soft text-stop"
              }`}
            >
              {pass ? (
                <Check className="size-3 text-go" />
              ) : (
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
                </svg>
              )}
              {c}
            </span>
          );
        })}
      </div>
      {!ok && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-stop/20 px-3 py-2">
          <p className="text-xs text-ink">Medical card expired Nov 3. Ike sent Dana the renewal link.</p>
          <span className="shrink-0 rounded-md bg-rust-ink px-2.5 py-1 text-[0.6875rem] font-bold text-white">
            Swap driver
          </span>
        </div>
      )}
    </div>
  );
}

/** The carriers hero picture: a fleet at a glance. Kept deliberately sparse. */
function FleetGlance() {
  const trucks = [
    { unit: "118", who: "Marcus R.", lane: "Joliet → Columbus", state: "On time", cls: "bg-go-soft text-go" },
    { unit: "122", who: "Luis O.", lane: "Gary → Louisville", state: "Loading", cls: "bg-rust-soft text-rust-deep" },
    { unit: "131", who: "Ana K.", lane: "Rockford → Detroit", state: "Delivered", cls: "bg-mist-2 text-ink" },
  ];
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-paper text-left shadow-[0_1px_0_rgb(28_34_30/0.04),0_24px_60px_-28px_rgb(28_34_30/0.35)]"
      role="img"
      aria-label="Harlo for a carrier: trucks rolling, on-time rate and this week's revenue, one suggestion from Ike, and three trucks with their status."
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-mist-2" />
          <span className="size-2.5 rounded-full bg-mist-2" />
          <span className="size-2.5 rounded-full bg-mist-2" />
        </div>
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              ["Rolling", "16"],
              ["On time", "97%"],
              ["This week", "$24.3k"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-mist px-3 py-2.5 sm:px-4 sm:py-3">
                <p className="text-[0.6875rem] font-medium text-muted">{k}</p>
                <p className="text-xl font-extrabold tracking-tight text-ink tabular-nums sm:text-2xl">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-rust/20 bg-rust-soft/50 px-3 py-3 sm:px-4">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rust-ink">
              <Peak className="h-2.5 w-auto" color="#fff" />
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium text-ink">Unit 204 is due for inspection. Swap in 118?</p>
            <span className="shrink-0 rounded-lg bg-rust-ink px-3 py-1.5 text-xs font-bold text-white">Swap</span>
          </div>

          <ul className="mt-4 divide-y divide-line">
            {trucks.map((t) => (
              <li key={t.unit} className="flex items-center gap-3 py-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-pine text-xs font-bold text-cream tabular-nums">
                  {t.unit}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{t.who}</p>
                  <p className="truncate text-xs text-muted">{t.lane}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${t.cls}`}>{t.state}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

