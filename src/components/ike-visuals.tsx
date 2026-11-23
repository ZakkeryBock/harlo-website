import { Peak } from "./logo";

/**
 * Pictures for the Ike page. Pure HTML/CSS (motion lives in globals.css under
 * "ike page", and stops under reduced motion). All names and numbers made up.
 */

const SOURCES = ["Loads and stops", "Drivers and trucks", "Rate cons, BOLs, PODs", "Email and texts", "ELD positions", "Rates and money"];

const OUTPUTS = [
  { tone: "rust", sig: "NL-88430 running 40 min late", act: "Customer update drafted", btn: "Send" },
  { tone: "amber", sig: "Unit 204 insurance lapses Friday", act: "Swap to Unit 118?", btn: "Approve" },
  { tone: "go", sig: "POD filed to NL-88412", act: "Invoice ready", btn: "Send invoice" },
];

const dot: Record<string, string> = { rust: "bg-rust-light", amber: "bg-[#e0b25a]", go: "bg-[#7fb08a]" };

/** Sources flow into Ike; proposals flow out. */
export function IkeOrbit() {
  return (
    <div
      className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-[1fr_auto_1.25fr] lg:gap-0"
      role="img"
      aria-label="Ike reads loads, drivers, documents, messages, ELD positions and money, and turns them into proposals: a customer update for a late load, a truck swap before insurance lapses, and an invoice once the POD is filed."
    >
      <ul aria-hidden="true" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-2.5">
        {SOURCES.map((s, i) => (
          <li
            key={s}
            className="ike-src flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm font-medium text-on-pine"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span className="size-1.5 shrink-0 rounded-full bg-rust-light/80" />
            {s}
            <span className="ike-wire ml-auto hidden h-px w-10 lg:block" />
          </li>
        ))}
      </ul>

      <div aria-hidden="true" className="flex items-center justify-center lg:px-8">
        <span className="ike-flow hidden h-px w-12 lg:block" />
        <div className="relative grid size-32 place-items-center sm:size-36">
          <span className="ike-halo absolute inset-0 rounded-full" />
          <span className="absolute inset-3 rounded-full bg-[radial-gradient(circle,rgb(202_107_68/0.35),transparent_70%)]" />
          <span className="relative grid size-20 place-items-center rounded-full bg-pine-2 ring-1 ring-white/15 shadow-[0_0_60px_-10px_rgb(202_107_68/0.7)]">
            <Peak className="h-5 w-auto" />
          </span>
        </div>
        <span className="ike-flow hidden h-px w-12 lg:block" />
      </div>

      <ul aria-hidden="true" className="grid gap-3">
        {OUTPUTS.map((o, i) => (
          <li
            key={o.sig}
            className="ike-out rounded-2xl bg-paper p-4 shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)]"
            style={{ "--i": i } as React.CSSProperties}
          >
            <p className="flex items-center gap-2 text-xs font-medium text-muted">
              <span className={`size-2 rounded-full ${dot[o.tone]}`} />
              {o.sig}
            </p>
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-ink">{o.act}</p>
              <span className="shrink-0 rounded-md bg-rust-ink px-2.5 py-1 text-xs font-semibold text-white">{o.btn}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const panel = "rounded-2xl bg-paper p-4 shadow-[0_18px_40px_-28px_rgb(28_34_30/0.55)]";

export function IkeWatches() {
  const rows = [
    { tone: "rust", t: "NL-88430 behind schedule", s: "ETA 2:40 PM vs 2:00 window", when: "now" },
    { tone: "amber", t: "COI expires Friday", s: "Midwest Haulers LLC", when: "4m" },
    { tone: "amber", t: "Margin under 12%", s: "Joliet to Columbus lane", when: "18m" },
  ];
  return (
    <div className={panel} role="img" aria-label="Three signals Ike raised: a load behind schedule, a certificate expiring Friday and a lane with thin margin.">
      <div aria-hidden="true">
        <p className="flex items-center justify-between text-xs font-semibold text-muted">
          <span className="flex items-center gap-1.5">
            <Peak className="h-2 w-auto" /> Needs you
          </span>
          <span className="flex items-center gap-1.5 text-[#3f7a4f]">
            <span className="ike-live size-1.5 rounded-full bg-[#3f7a4f]" /> Watching 214 loads
          </span>
        </p>
        <ul className="mt-3 divide-y divide-line">
          {rows.map((r) => (
            <li key={r.t} className="flex items-center gap-3 py-2.5">
              <span className={`size-2 shrink-0 rounded-full ${dot[r.tone]}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-ink">{r.t}</span>
                <span className="block truncate text-xs text-muted">{r.s}</span>
              </span>
              <span className="font-mono text-[0.6875rem] text-muted">{r.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IkeReads() {
  const fields = [
    ["Shipper", "Midwest Paper Co."],
    ["Pickup", "Thu 07:00, Joliet IL"],
    ["Rate", "$2,450.00"],
    ["Reference", "PO-88412"],
  ];
  return (
    <div className="grid grid-cols-[0.8fr_1.2fr] items-center gap-4" role="img" aria-label="A rate confirmation PDF read into a load: shipper, pickup, rate and reference filled in.">
      <div aria-hidden="true" className="relative overflow-hidden rounded-xl bg-paper p-3 shadow-[0_18px_40px_-28px_rgb(28_34_30/0.55)]">
        <p className="flex items-center gap-1.5 text-[0.6875rem] font-semibold text-ink">
          <span className="rounded bg-rust-ink px-1 py-px text-[0.5625rem] text-white">PDF</span>
          RateCon.pdf
        </p>
        <div className="mt-3 grid gap-1.5">
          {[90, 70, 82, 55, 76, 64, 48].map((w, i) => (
            <span key={i} className="h-1.5 rounded-full bg-line" style={{ width: `${w}%` }} />
          ))}
        </div>
        <span className="ike-scan absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-rust/0 via-rust/20 to-rust/0" />
      </div>
      <div aria-hidden="true" className={panel}>
        <p className="text-xs font-semibold text-muted">Load NL-88412</p>
        <dl className="mt-2 grid gap-1.5 text-xs">
          {fields.map(([k, v], i) => (
            <div key={k} className="ike-fill flex justify-between gap-2" style={{ "--i": i } as React.CSSProperties}>
              <dt className="text-muted">{k}</dt>
              <dd className="font-semibold text-ink tabular-nums">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

export function IkeAnswers() {
  const bars = [
    { l: "Joliet → Columbus", v: 92, m: "$612" },
    { l: "Gary → Louisville", v: 71, m: "$488" },
    { l: "Elk Grove → Detroit", v: 58, m: "$401" },
  ];
  return (
    <div className="grid gap-3" role="img" aria-label="Asked which lanes made the most this month, Ike answers with the top three lanes by margin per load.">
      <p aria-hidden="true" className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-pine px-4 py-2.5 text-sm text-white">
        Which lanes made the most this month?
      </p>
      <div aria-hidden="true" className={panel}>
        <p className="text-sm text-ink">
          Your top three lanes brought in <span className="font-semibold">31% of margin</span>.
        </p>
        <ul className="mt-3 grid gap-2">
          {bars.map((b, i) => (
            <li key={b.l} className="grid grid-cols-[7.5rem_1fr_auto] items-center gap-2 text-xs">
              <span className="truncate text-muted">{b.l}</span>
              <span className="h-2 overflow-hidden rounded-full bg-mist">
                <span
                  className="ike-bar block h-full rounded-full bg-rust"
                  style={{ width: `${b.v}%`, "--i": i } as React.CSSProperties}
                />
              </span>
              <span className="font-semibold text-ink tabular-nums">{b.m}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IkeDrafts() {
  return (
    <div className={panel} role="img" aria-label="Ike drafted a customer update for a late load, with its reason, waiting for approval.">
      <div aria-hidden="true">
        <p className="flex items-center justify-between text-xs font-semibold text-muted">
          <span className="flex items-center gap-1.5">
            <Peak className="h-2 w-auto" /> Drafted by Ike
          </span>
          <span className="font-mono font-normal">just now</span>
        </p>
        <p className="mt-3 text-sm font-semibold text-ink">Update to Midwest Paper Co.</p>
        <p className="mt-1.5 rounded-lg bg-mist p-3 text-xs leading-relaxed text-body">
          Hi Dana, NL-88430 is running about 40 minutes behind after a closure on I-65. New ETA 2:40 PM. We&apos;ll
          confirm at arrival.
        </p>
        <p className="mt-2 text-[0.6875rem] text-muted">Why: ELD position is 31 mi out at 1:55 PM, 2:00 PM window.</p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md bg-rust-ink px-3 py-1.5 text-xs font-semibold text-white">Approve and send</span>
          <span className="rounded-md px-3 py-1.5 text-xs font-semibold text-ink ring-1 ring-line">Edit</span>
        </div>
      </div>
    </div>
  );
}
