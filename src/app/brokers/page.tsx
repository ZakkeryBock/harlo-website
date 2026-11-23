import type { Metadata } from "next";
import Link from "next/link";
import { Accent, BoldHero, FloatStage, type Float } from "@/components/bold-hero";
import { BrokerJourney } from "@/components/broker-journey";
import { ArrowBadge, Card, Ico } from "@/components/platform";
import { EndCta } from "@/components/end-cta";
import { EnterpriseCard } from "@/components/enterprise-card";
import { Handoff } from "@/components/workspaces";
import { Peak } from "@/components/logo";
import { Button, Check, Container } from "@/components/ui";
import { LINKS, brokerPlan, usd } from "@/lib/site";
import { BROKER_TRIAL_NOTE } from "@/lib/content";

export const metadata: Metadata = {
  title: "For brokers",
  description:
    "Harlo for freight brokers: customer tenders read by AI, carriers vetted before you book, loads tracked without check calls, and margin on every load.",
  alternates: { canonical: "/brokers" },
};

/** Follow-up that happened without anyone chasing it, drifting around the board. */
const FLOATS: Float[] = [
  { pos: "-left-10 top-[6%]", tilt: -4, delay: 0, tone: "ink", label: "Tender", text: "HB-20425 built from email" },
  { pos: "-left-12 top-[62%]", tilt: 3, delay: 1.3, tone: "go", label: "Carrier", text: "Lakeshore approved" },
  { pos: "-right-10 top-[10%]", tilt: 4, delay: 0.9, tone: "rust", label: "Customer", text: "Update sent to Midwest Paper" },
  { pos: "-right-8 top-[64%]", tilt: 3, delay: 0.3, tone: "go", label: "Margin", text: "HB-20417 kept $405" },
];

const TIERS = (["bfree", "broker", "scale"] as const).map((code) => {
  const p = brokerPlan(code);
  return {
    code,
    loads: p.loads!,
    name: p.name,
    price: p.month === 0 ? "Free" : usd(p.month!),
    sub: p.month === 0 ? p.users : `a month · ${p.users.toLowerCase()}`,
    dark: code === "broker",
  };
});

export default function BrokersPage() {
  return (
    <main>
      <BoldHero
        title={
          <>
            Book more.
            <br className="hidden sm:block" /> <Accent>Chase less.</Accent>
          </>
        }
        lead={
          <p>
            Tenders, carriers, tracking and billing in one place, with an AI that handles the follow-up. Your team
            sells and covers freight. Harlo keeps it moving.
          </p>
        }
        visual={
          <FloatStage floats={FLOATS}>
            <BrokerGlance />
          </FloatStage>
        }
        cta={{ href: LINKS.signupBroker, label: "Start free trial" }}
        secondary={{ href: "/pricing#broker", label: "See broker pricing" }}
        note={BROKER_TRIAL_NOTE}
      />

      {/* ------------------------------------------------------------ the load */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">
              Tender to spread.
              <br /> <span className="text-rust-ink">One record.</span>
            </h2>
            <p className="max-w-xl text-lead">No more copying a load from email to board to rate con to invoice.</p>
          </div>
          <div className="mt-12 sm:rounded-[2rem] sm:bg-mist sm:p-10">
            <BrokerJourney />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- why */}
      <section className="border-t border-line py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">Why brokers switch.</h2>
            <p className="max-w-xl text-lead">Less time in the inbox. More time on the phone with customers.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            <Card
              dark
              href="/ike"
              cta="Meet Ike"
              icon={<Peak className="h-3 w-auto" />}
              title="Reads like a broker"
              body="Tenders, rate cons, PODs and certificates, read and filed on the right load."
              visual={<ReadsVisual />}
            />
            <Card
              icon={<Ico d="M10 2.5l6 2.2v4.6c0 3.8-2.6 6.7-6 8.2-3.4-1.5-6-4.4-6-8.2V4.7zM7.2 10l2 2 3.8-4" />}
              title="Vetting that blocks"
              body="Other tools warn you. Harlo won't let an unqualified carrier be booked."
              visual={<BlockVisual />}
            />
            <Card
              icon={<Ico d="M7 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2.5 17c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5M13.5 9a2.5 2.5 0 1 0 0-5M14.5 12.6c1.8.4 3 1.9 3 4.4" />}
              title="Your whole desk"
              body="Reps, ops and billing on one board. Paid plans include every user."
              visual={<DeskVisual />}
            />
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- pricing */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-20">
            <h2 className="max-w-xl text-h2 font-extrabold">
              Priced by loads.
              <br /> <span className="text-rust-ink">Never by seats.</span>
            </h2>
            <p className="max-w-xl text-lead">Start free. Pay for the freight you move, not the people who move it.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TIERS.map((t) => (
              <Link
                key={t.code}
                href="/pricing#broker"
                className={`group relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-8 ${
                  t.dark ? "on-pine bg-pine text-on-pine-muted" : "bg-mist"
                }`}
              >
                {t.dark && (
                  <div aria-hidden="true" className="blob-field pointer-events-none absolute inset-0">
                    <span className="blob blob-a" />
                    <span className="blob blob-b" />
                    <span className="blob blob-c" />
                  </div>
                )}
                <div className="relative flex items-start justify-between gap-4">
                  <p
                    className={`text-[clamp(3.25rem,2.2rem+2.4vw,4.5rem)] leading-none font-extrabold tracking-[-0.05em] tabular-nums ${
                      t.dark ? "text-white" : "text-ink"
                    }`}
                  >
                    {t.loads}
                  </p>
                  <ArrowBadge label={`See ${t.name}`} dark={t.dark} />
                </div>
                <p className={`relative mt-2 font-semibold ${t.dark ? "text-rust-light" : "text-rust-ink"}`}>
                  loads a month
                </p>
                <div className={`relative mt-10 border-t pt-6 ${t.dark ? "border-white/10" : "border-line"}`}>
                  {t.name !== t.price && (
                    <p className={`text-sm font-semibold ${t.dark ? "text-on-pine" : "text-ink"}`}>{t.name}</p>
                  )}
                  <p className={`mt-1 text-3xl font-extrabold tracking-tight tabular-nums ${t.dark ? "text-white" : "text-ink"}`}>
                    {t.price}
                  </p>
                  <p className="mt-1 text-sm">{t.sub}</p>
                </div>
              </Link>
            ))}
          </div>
          <EnterpriseCard
            n="2,500+"
            unit="loads a month"
            body="High-volume brokerages and multi-office desks. Pricing built around your contract, and a team to move you over."
            perks={[...brokerPlan("benterprise").includes, brokerPlan("benterprise").ai, brokerPlan("benterprise").users]}
            href={brokerPlan("benterprise").cta.href}
          />
        </Container>
      </section>

      {/* -------------------------------------------------------------- trucks */}
      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-mist p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -bottom-32 size-80 rounded-full bg-rust/15 blur-3xl" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
              <div>
                <h2 className="text-h2 font-extrabold">Run trucks too?</h2>
                <p className="mt-5 max-w-md text-lead">
                  Your brokerage and your fleet side by side. Cover a load with your own truck and it lands there,
                  rate con attached.
                </p>
                <div className="mt-8">
                  <Button href="/workspaces" variant="secondary">
                    How workspaces work
                  </Button>
                </div>
              </div>
              <Handoff />
            </div>
          </div>
        </Container>
      </section>

      <EndCta
        href={LINKS.signupBroker}
        title="Book more. Chase less."
        body="Drop in a tender and watch Ike build the load."
        note={BROKER_TRIAL_NOTE}
      />
    </main>
  );
}

/* --------------------------------------------------------------- pictures */

/** The brokers hero picture: today's desk at a glance. Kept deliberately sparse. */
function BrokerGlance() {
  const loads = [
    { id: "HB-20417", lane: "Elk Grove → Nashville", state: "In transit", cls: "bg-rust-soft text-rust-deep" },
    { id: "HB-20421", lane: "Gary → Memphis", state: "Needs a carrier", cls: "bg-warn-soft text-warn" },
    { id: "HB-20425", lane: "Joliet → Columbus", state: "Covered", cls: "bg-go-soft text-go" },
  ];
  return (
    <div
      className="overflow-hidden rounded-2xl border border-line bg-paper text-left shadow-[0_1px_0_rgb(28_34_30/0.04),0_24px_60px_-28px_rgb(28_34_30/0.35)]"
      role="img"
      aria-label="Harlo for a brokerage: loads booked today, coverage and margin this week, one suggestion from Ike, and three loads with their status."
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
              ["Booked today", "24"],
              ["Covered", "92%"],
              ["Margin, week", "$18.4k"],
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
            <p className="min-w-0 flex-1 text-sm font-medium text-ink">3 vetted carriers fit HB-20421.</p>
            <span className="shrink-0 rounded-lg bg-rust-ink px-3 py-1.5 text-xs font-bold text-white">Review</span>
          </div>

          <ul className="mt-4 divide-y divide-line">
            {loads.map((l) => (
              <li key={l.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink">{l.id}</p>
                  <p className="truncate text-xs text-muted">{l.lane}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold ${l.cls}`}>{l.state}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const tile = "rounded-xl bg-paper shadow-[0_10px_30px_-18px_rgb(28_34_30/0.45)]";

function ReadsVisual() {
  const docs = [
    ["Tender", "Load created"],
    ["Rate con", "Filed to HB-20417"],
    ["POD", "Ready to bill"],
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <div className="grid gap-2">
        {docs.map(([k, v]) => (
          <div key={k} className="flex items-center gap-3 rounded-lg bg-paper px-3 py-2.5">
            <span className="rounded bg-mist-2 px-1.5 py-0.5 text-[0.625rem] font-bold text-ink uppercase">{k}</span>
            <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-go">
              <Check className="size-3.5" />
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockVisual() {
  return (
    <div className={`${tile} p-4`}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Blue Ridge Haulers</p>
          <p className="text-[0.6875rem] text-muted">MC 640118</p>
        </div>
        <span className="rounded-full bg-stop-soft px-2 py-0.5 text-[0.6875rem] font-semibold text-stop">Blocked</span>
      </div>
      <div className="mt-3 rounded-lg bg-stop-soft/60 px-3 py-2 text-xs text-ink">Insurance expired Oct 30</div>
      <div className="mt-3 grid h-9 place-items-center rounded-lg bg-mist-2 text-xs font-bold text-muted line-through">
        Book carrier
      </div>
    </div>
  );
}

function DeskVisual() {
  const people = [
    ["JR", "bg-pine text-cream"],
    ["AM", "bg-rust-ink text-white"],
    ["TK", "bg-go text-white"],
    ["LS", "bg-warn text-white"],
    ["DP", "bg-ink text-white"],
  ];
  return (
    <div className={`${tile} p-4`}>
      <div className="flex -space-x-2">
        {people.map(([i, c]) => (
          <span key={i} className={`grid size-10 place-items-center rounded-full text-xs font-bold ring-2 ring-paper ${c}`}>
            {i}
          </span>
        ))}
        <span className="grid size-10 place-items-center rounded-full bg-mist text-xs font-bold text-ink ring-2 ring-paper">+</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {["Sales", "Ops", "Billing"].map((x) => (
          <span key={x} className="rounded-lg bg-mist py-2 text-xs font-semibold text-ink">
            {x}
          </span>
        ))}
      </div>
      <p className="mt-3 text-center text-xs font-semibold text-go">$0 per seat</p>
    </div>
  );
}
