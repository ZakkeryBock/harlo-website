"use client";

import { useEffect, useState } from "react";
import { Button, Check } from "./ui";
import {
  BROKER_MAX_LOADS,
  BROKER_PLANS,
  BUNDLE_BROKER_DISCOUNT,
  INTRO,
  type BrokerPlan,
  type Interval,
  LINKS,
  PLANS,
  type Plan,
  brokerPlan,
  bundleCost,
  introPrice,
  monthlyCost,
  plan,
  recommend,
  recommendBroker,
  usd,
} from "@/lib/site";

export type Side = "carrier" | "broker" | "both";

const SIDES: { key: Side; label: string; sub: string }[] = [
  { key: "carrier", label: "Carriers", sub: "Priced per truck" },
  { key: "broker", label: "Brokers", sub: "Priced by loads" },
  { key: "both", label: "Both", sub: "Carrier and brokerage" },
];

const money = (n: number) => usd(Math.round(n));

/* ---------------------------------------------------------------- controls */

function SidePicker({ value, onChange }: { value: Side; onChange: (s: Side) => void }) {
  return (
    <div role="radiogroup" aria-label="What kind of operation do you run?" className="grid gap-2 sm:grid-cols-3">
      {SIDES.map((s) => {
        const on = value === s.key;
        return (
          <button
            key={s.key}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(s.key)}
            className={`rounded-2xl border-2 px-5 py-4 text-left transition-colors ${
              on ? "border-ink bg-ink text-white" : "border-line bg-paper hover:border-ink/40"
            }`}
          >
            <span className={`block text-lg font-bold ${on ? "text-white" : "text-ink"}`}>{s.label}</span>
            <span className={`mt-0.5 block text-sm ${on ? "text-white/75" : "text-muted"}`}>{s.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

function IntervalToggle({ value, onChange }: { value: Interval; onChange: (v: Interval) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-lg border border-line bg-paper p-1">
      {(["month", "year"] as const).map((iv) => (
        <button
          key={iv}
          type="button"
          role="radio"
          aria-checked={value === iv}
          onClick={() => onChange(iv)}
          className={`rounded-md px-3.5 py-1.5 text-sm font-semibold transition-colors ${
            value === iv ? "bg-ink text-white" : "text-body hover:text-ink"
          }`}
        >
          {iv === "month" ? "Monthly" : "Yearly, 2 months free"}
        </button>
      ))}
    </div>
  );
}

function Slider({
  id,
  label,
  value,
  set,
  min,
  max,
  step = 1,
  hardMax,
}: {
  id: string;
  label: string;
  value: number;
  set: (n: number) => void;
  min: number;
  max: number;
  step?: number;
  hardMax: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-lg font-semibold text-white">
        {label}
      </label>
      <div className="mt-4 flex items-center gap-5">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={Math.min(value, max)}
          onChange={(e) => set(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-rust"
        />
        <input
          type="number"
          min={min}
          max={hardMax}
          value={value}
          aria-label={label}
          onChange={(e) => set(Math.max(min, Math.min(hardMax, Number(e.target.value) || min)))}
          className="h-11 w-24 shrink-0 rounded-lg border border-pine-3 bg-pine-2 text-center text-lg font-bold text-white tabular-nums"
        />
      </div>
    </div>
  );
}

function CalcShell({ inputs, result }: { inputs: React.ReactNode; result: React.ReactNode }) {
  return (
    <div className="on-pine grid gap-8 rounded-3xl bg-pine p-6 text-on-pine sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
      <div className="grid gap-8">{inputs}</div>
      <div className="rounded-2xl bg-pine-2 p-6" aria-live="polite">
        {result}
      </div>
    </div>
  );
}

function Price({ value }: { value: number }) {
  return (
    <p className="mt-4 text-4xl font-extrabold tracking-tight text-white tabular-nums">
      {money(value)}
      <span className="ml-1 text-base font-medium text-on-pine-muted">/ mo</span>
    </p>
  );
}

function Contract({ text }: { text: string }) {
  return (
    <>
      <p className="mt-4 text-on-pine">{text}</p>
      <div className="mt-6">
        <Button href={LINKS.sales} variant="light">
          Talk to us
        </Button>
      </div>
    </>
  );
}

/* ------------------------------------------------------------- calculators */

function CarrierCalc({ interval }: { interval: Interval }) {
  const [trucks, setTrucks] = useState(8);
  const rec = recommend(trucks, interval);
  const p = rec.plan;
  const billed = p.perTruck ? Math.max(trucks, p.minTrucks) : null;
  const list = monthlyCost(p, trucks, interval);
  const listMonthly = monthlyCost(p, trucks, "month");
  const saved = interval === "year" && listMonthly != null && list != null ? (listMonthly - list) * 12 : 0;

  return (
    <CalcShell
      inputs={
        <>
          <Slider id="trucks" label="How many trucks do you run?" value={trucks} set={setTrucks} min={1} max={150} hardMax={999} />
          <p className="-mt-4 text-sm text-on-pine-muted">Only active trucks count. Users, loads and drivers are never billed.</p>
        </>
      }
      result={
        <>
          <p className="text-sm text-on-pine-muted">
            Best fit for {trucks} {trucks === 1 ? "truck" : "trucks"}
          </p>
          <p className="mt-1 text-2xl font-bold text-white">{p.name}</p>
          {rec.cost != null ? (
            <>
              <Price value={rec.cost} />
              <p className="mt-2 text-sm text-on-pine-muted">
                {billed != null
                  ? p.graduated && billed > p.graduated.upto
                    ? `${p.graduated.upto} trucks at the Pro rate, ${billed - p.graduated.upto} at the Fleet rate`
                    : `${billed} trucks${billed > trucks ? `, billed on the ${p.minTrucks}-truck minimum` : ""}`
                  : "Up to 2 trucks, 3 users and 30 loads a month, with no time limit"}
                {p.intro && list != null &&
                  `. Launch price for your first ${INTRO.months} months, then ${money(list)}`}
                {interval === "year" && saved > 0 && `. Yearly saves ${money(saved)} on list.`}
              </p>
              <div className="mt-6">
                <Button href={p.cta.href} variant="light" className="w-full sm:w-auto">
                  {p.code === "free" ? "Start free" : "Start free trial"}
                </Button>
              </div>
              {p.code === "free" && (
                <p className="mt-4 text-sm text-on-pine">
                  Running from the cab?{" "}
                  <a href="/go" className="font-semibold text-white underline underline-offset-4">
                    See Harlo Go
                  </a>
                  , Harlo on your phone.
                </p>
              )}
              <p className="mt-4 text-sm text-on-pine-muted">
                Every plan includes Harlo on desktop and the Harlo Go phone app.
              </p>
            </>
          ) : (
            <Contract text="Above 100 trucks we price by contract, with onboarding and data migration included." />
          )}
        </>
      }
    />
  );
}

function BrokerCalc({ interval }: { interval: Interval }) {
  const [loads, setLoads] = useState(250);
  const rec = recommendBroker(loads, interval);
  const p = rec.plan;
  const over = p.loads != null ? Math.max(0, loads - p.loads) : 0;

  return (
    <CalcShell
      inputs={
        <>
          <Slider
            id="loads"
            label="How many loads do you broker a month?"
            value={loads}
            set={setLoads}
            min={1}
            max={3000}
            step={5}
            hardMax={99999}
          />
          <p className="-mt-4 text-sm text-on-pine-muted">
            Every rep, ops and billing user is included. Cancelled loads don&apos;t count.
          </p>
        </>
      }
      result={
        <>
          <p className="text-sm text-on-pine-muted">Best fit for {loads.toLocaleString()} loads a month</p>
          <p className="mt-1 text-2xl font-bold text-white">{p.name}</p>
          {rec.cost != null ? (
            <>
              <Price value={rec.cost} />
              <p className="mt-2 text-sm text-on-pine-muted">
                {p.code === "bfree" ? (
                  `Free for up to ${p.loads} loads a month, with no time limit. Start with 14 days of Broker.`
                ) : (
                  <>
                    {usd(interval === "year" ? Math.round(p.year! / 12) : p.month!)} for {p.loads} loads
                    {over > 0 && `, plus ${over.toLocaleString()} more at ${usd(p.overage!)} each`}
                    {interval === "year" && ", base billed yearly"}. That&apos;s{" "}
                    {usd(Math.round((rec.cost / loads) * 100) / 100)} a load.
                  </>
                )}
              </p>
              <div className="mt-6">
                <Button href={LINKS.signupBroker} variant="light" className="w-full sm:w-auto">
                  Start free trial
                </Button>
              </div>
            </>
          ) : (
            <Contract
              text={`Above ${BROKER_MAX_LOADS.toLocaleString()} loads a month we price by contract, with onboarding and migration included.`}
            />
          )}
        </>
      }
    />
  );
}

function BothCalc({ interval }: { interval: Interval }) {
  const [trucks, setTrucks] = useState(10);
  const [loads, setLoads] = useState(200);
  const b = bundleCost(trucks, loads, interval);

  return (
    <CalcShell
      inputs={
        <>
          <Slider id="b-trucks" label="Trucks in your fleet" value={trucks} set={setTrucks} min={1} max={150} hardMax={999} />
          <Slider
            id="b-loads"
            label="Loads brokered to outside carriers a month"
            value={loads}
            set={setLoads}
            min={1}
            max={3000}
            step={5}
            hardMax={99999}
          />
          <p className="-mt-4 text-sm text-on-pine-muted">
            Loads your brokerage covers with your own trucks are never counted.
          </p>
        </>
      }
      result={
        b ? (
          <>
            <p className="text-sm text-on-pine-muted">Carrier + Broker</p>
            <p className="mt-1 text-2xl font-bold text-white">One login, two workspaces</p>
            <Price value={b.total} />
            <dl className="mt-4 grid gap-1.5 text-sm">
              <div className="flex justify-between gap-4">
                <dt>
                  Carrier, {trucks} × {usd(Math.round(b.perTruck * 100) / 100)}
                </dt>
                <dd className="font-semibold text-white tabular-nums">{money(b.carrier)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>
                  {b.brokerPlan.name}, <s className="opacity-70">{money(b.brokerFull)}</s> less{" "}
                  {BUNDLE_BROKER_DISCOUNT * 100}%
                </dt>
                <dd className="font-semibold text-white tabular-nums">{money(b.broker)}</dd>
              </div>
            </dl>
            <div className="mt-6">
              <Button href={LINKS.signupBoth} variant="light" className="w-full sm:w-auto">
                Start free trial
              </Button>
            </div>
          </>
        ) : (
          <Contract text="Above 100 trucks or 2,500 brokered loads a month we price by contract, across both workspaces." />
        )
      }
    />
  );
}

/* ------------------------------------------------------------------- cards */

function Card({
  name,
  band,
  amount,
  unit,
  note,
  features,
  cta,
  featured,
  badge,
  was,
  more,
}: {
  name: string;
  band: string;
  amount: string;
  unit: string;
  note: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
  /** The list price, struck through beside a launch price. */
  was?: string;
  more?: { label: string; href: string };
}) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        featured ? "border-ink bg-paper shadow-[0_24px_50px_-30px_rgb(28_34_30/0.45)]" : "border-line bg-paper"
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-6 rounded-md bg-rust-ink px-2.5 py-0.5 text-xs font-semibold text-white">
          {badge}
        </span>
      )}
      <h3 className="text-h3 font-bold">{name}</h3>
      <p className="mt-1 text-sm text-muted">{band}</p>
      <p className="mt-6 flex items-baseline gap-1.5">
        <span className="text-4xl font-extrabold tracking-tight text-ink tabular-nums">{amount}</span>
        {was && <s className="text-lg font-semibold text-muted tabular-nums">{was}</s>}
        <span className="text-sm text-muted">{unit}</span>
      </p>
      <p className="mt-1 min-h-5 text-sm text-muted">{note}</p>
      <Button href={cta.href} variant={featured ? "primary" : "secondary"} className="mt-6 w-full">
        {cta.label}
      </Button>
      {more && (
        <a
          href={more.href}
          className="mt-3 text-center text-sm font-semibold text-rust-ink underline-offset-4 hover:underline"
        >
          {more.label} →
        </a>
      )}
      <ul className="mt-6 grid gap-2.5 border-t border-line pt-6 text-[0.9375rem]">
        {features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <Check className="mt-1 text-rust-ink" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function carrierCard(p: Plan, interval: Interval) {
  const custom = p.month == null;
  const per = interval === "year" ? 12 : 1;
  const listRaw = custom || p.month === 0 ? 0 : interval === "year" ? p.year! : p.month!;
  const list = listRaw / per;
  const v = (p.intro ? introPrice(listRaw, interval) : listRaw) / per;
  const cents = (n: number) => usd(Math.round(n * 100) / 100);
  const firstRaw = p.graduated ? (interval === "year" ? p.graduated.year : p.graduated.month) : null;
  const firstRate = firstRaw == null ? null : (p.intro ? introPrice(firstRaw, interval) : firstRaw) / per;
  return (
    <Card
      key={p.code}
      name={p.name}
      band={p.band}
      amount={custom ? "Custom" : p.month === 0 ? "$0" : cents(v)}
      was={p.intro && !custom ? cents(list) : undefined}
      unit={custom ? "" : p.month === 0 ? "forever" : p.perTruck ? "per truck / mo" : "/ mo"}
      note={
        custom
          ? "Contract pricing"
          : p.graduated && firstRate != null
            ? `From truck ${p.graduated.upto + 1}. Trucks 1–${p.graduated.upto} at ${cents(firstRate)}.`
            : p.intro
              ? `Launch price for your first ${INTRO.months} months. Minimum ${p.minTrucks} trucks.`
              : p.code === "free"
                ? "No time limit"
                : ""
      }
      features={[p.users, p.loads, p.ai, ...p.includes]}
      cta={p.cta}
      more={p.more}
      featured={p.code === "pro"}
      badge={p.code === "pro" ? "Your 14-day trial" : undefined}
    />
  );
}

function brokerCard(p: BrokerPlan, interval: Interval) {
  const per = interval === "year" ? 12 : 1;
  const listRaw = p.month === 0 ? 0 : interval === "year" ? p.year! : p.month!;
  const list = listRaw / per;
  const v = (p.intro ? introPrice(listRaw, interval) : listRaw) / per;
  return (
    <Card
      key={p.code}
      name={p.name}
      band={p.band}
      amount={p.month === 0 ? "$0" : usd(Math.round(v))}
      was={p.intro ? usd(Math.round(list)) : undefined}
      unit={p.month === 0 ? "forever" : "/ mo"}
      note={
        p.overage
          ? `Then ${usd(p.overage)} a load.${p.intro ? ` Launch price for ${INTRO.months} months.` : ""}`
          : "No time limit"
      }
      features={[p.users, `${p.loads} loads a month included`, p.ai, ...p.includes]}
      cta={p.cta}
      featured={p.code === "broker"}
      badge={p.code === "broker" ? "Your 14-day trial" : undefined}
    />
  );
}

function EnterpriseRow({ body }: { body: string }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-mist p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-h3 font-bold">Enterprise</h3>
        <p className="mt-1 max-w-2xl">{body}</p>
      </div>
      <Button href={LINKS.sales} variant="secondary" className="shrink-0">
        Talk to us
      </Button>
    </div>
  );
}

const BUNDLE_POINTS = [
  "A carrier workspace and a brokerage workspace under one login",
  "The carrier side at the per-truck rate, with no truck minimum",
  `${BUNDLE_BROKER_DISCOUNT * 100}% off whichever broker plan fits your volume`,
  "Loads you broker to your own fleet are free and never re-keyed",
  "One bill, one AI credit pool across both workspaces",
];

/* --------------------------------------------------------------------- main */

export function Pricing({ extra }: { extra?: Partial<Record<Side, React.ReactNode>> }) {
  const [side, setSide] = useState<Side>("carrier");
  const [interval, setInterval_] = useState<Interval>("month");

  // Pages link straight to a side with /pricing#broker or /pricing#both.
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.slice(1);
      if (h === "carrier" || h === "broker" || h === "both") setSide(h);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const choose = (s: Side) => {
    setSide(s);
    history.replaceState(null, "", `#${s}`);
  };

  return (
    <div className="grid gap-10 [&>*]:min-w-0">
      <SidePicker value={side} onChange={choose} />
      <div className="flex justify-start">
        <IntervalToggle value={interval} onChange={setInterval_} />
      </div>

      {side === "carrier" && (
        <>
          <CarrierCalc interval={interval} />
          <div className="grid gap-4 md:grid-cols-3">
            {PLANS.filter((p) => p.code !== "enterprise").map((p) => carrierCard(p, interval))}
          </div>
          <EnterpriseRow body="More than 100 trucks. Contract pricing and invoicing, a custom AI allowance, onboarding and data migration." />
          <p className="text-sm text-muted">
            Launch pricing: about {INTRO.percent}% off list for your first {INTRO.months} months on Pro, Fleet, Broker
            and Broker Scale when you start before {INTRO.endsLabel}. Then list price, with 60 days&apos; notice.
          </p>
        </>
      )}

      {side === "broker" && (
        <>
          <BrokerCalc interval={interval} />
          <div className="grid gap-4 md:grid-cols-3">
            {BROKER_PLANS.filter((p) => p.code !== "benterprise").map((p) => brokerCard(p, interval))}
          </div>
          <EnterpriseRow
            body={`More than ${BROKER_MAX_LOADS.toLocaleString()} loads a month, agent networks or multiple offices. Contract pricing, invoicing, a custom AI allowance and migration from your current TMS.`}
          />
        </>
      )}

      {side === "both" && (
        <>
          <BothCalc interval={interval} />
          <div className="grid gap-8 rounded-3xl border border-line p-6 sm:p-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div>
              <h3 className="text-h3 font-bold">Carrier + Broker</h3>
              <p className="mt-3">
                For carriers with a brokerage arm and brokerages with trucks of their own. Each side gets every
                feature of its plan, and the two work together.
              </p>
              <p className="mt-5 text-sm text-muted">
                From {usd(introPrice(plan("pro").month!))} per truck at launch, plus{" "}
                {usd(brokerPlan("broker").month! * (1 - BUNDLE_BROKER_DISCOUNT))} a month for the brokerage.
              </p>
            </div>
            <ul className="grid content-start gap-3">
              {BUNDLE_POINTS.map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-1 text-rust-ink" />
                  <span className="text-ink">{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {extra?.[side]}
    </div>
  );
}
