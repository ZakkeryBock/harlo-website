import { Check } from "./ui";

/**
 * Mocks for the multiple-workspaces story: the switcher, and a brokered load
 * handed to the same company's carrier workspace. All names are made up.
 */

const WORKSPACES = [
  { name: "Reyes Trucking", kind: "Carrier", detail: "18 trucks, MC 1104562", initials: "RT", active: true },
  { name: "Reyes Logistics", kind: "Brokerage", detail: "41 loads this week", initials: "RL" },
  { name: "Reyes Trucking West", kind: "Carrier", detail: "Reno terminal, 6 trucks", initials: "RW" },
];

export function WorkspaceSwitcher({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_60px_-28px_rgb(28_34_30/0.4)] ${className}`}
      role="img"
      aria-label="The workspace switcher. One login holds three workspaces: Reyes Trucking, a carrier; Reyes Logistics, a brokerage; and Reyes Trucking West, a second carrier terminal."
    >
      <div aria-hidden="true">
        <p className="px-3 pt-2 pb-2 text-xs font-medium text-muted">Your workspaces</p>
        <ul className="grid gap-1">
          {WORKSPACES.map((w) => (
            <li
              key={w.name}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${w.active ? "bg-mist" : ""}`}
            >
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-lg text-xs font-bold ${
                  w.kind === "Brokerage" ? "bg-rust-ink text-white" : "bg-pine text-cream"
                }`}
              >
                {w.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-ink">{w.name}</span>
                  <span className="shrink-0 rounded bg-paper px-1.5 py-0.5 text-[0.6875rem] font-medium text-body ring-1 ring-line">
                    {w.kind}
                  </span>
                </span>
                <span className="block truncate text-xs text-muted">{w.detail}</span>
              </span>
              {w.active && <Check className="size-4 shrink-0 text-rust-ink" />}
            </li>
          ))}
        </ul>
        <div className="mt-1 border-t border-line px-3 pt-2.5 pb-1.5 text-sm font-semibold text-rust-ink">
          + New workspace
        </div>
      </div>
    </div>
  );
}

/** A load booked by the brokerage and covered by the company's own trucks. */
export function Handoff() {
  return (
    <div
      className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center"
      role="img"
      aria-label="Load HB-20417 in the Reyes Logistics brokerage workspace is covered by Reyes Trucking. It appears in the Reyes Trucking carrier workspace as a booked load with the rate confirmation already attached."
    >
      <div aria-hidden="true" className="rounded-2xl border border-line bg-paper p-5">
        <p className="text-xs font-medium text-muted">Reyes Logistics, brokerage</p>
        <p className="mt-1 font-semibold text-ink">HB-20417, Elk Grove to Nashville</p>
        <div className="mt-3 grid gap-1.5 text-sm">
          <p className="flex justify-between">
            <span>Customer rate</span>
            <span className="font-semibold text-ink tabular-nums">$1,900</span>
          </p>
          <p className="flex justify-between">
            <span>Covered by</span>
            <span className="font-semibold text-ink">Reyes Trucking</span>
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="flex justify-center text-rust">
        <svg viewBox="0 0 24 24" className="size-7 rotate-90 md:rotate-0" fill="none">
          <path d="M4 12h15m-5-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div aria-hidden="true" className="rounded-2xl border border-go/30 bg-paper p-5">
        <p className="text-xs font-medium text-muted">Reyes Trucking, carrier</p>
        <p className="mt-1 font-semibold text-ink">New load from Reyes Logistics</p>
        <div className="mt-3 grid gap-1.5 text-sm">
          <p className="flex justify-between">
            <span>Carrier pay</span>
            <span className="font-semibold text-ink tabular-nums">$1,520</span>
          </p>
          <p className="flex justify-between">
            <span>Rate confirmation</span>
            <span className="font-semibold text-go">Attached</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const MAP = [
  { name: "Reyes Trucking", kind: "Carrier", initials: "RT", stats: [["Trucks", "18"], ["On the road", "11"]] },
  { name: "Reyes Logistics", kind: "Brokerage", initials: "RL", stats: [["Loads this week", "41"], ["Margin", "14.2%"]] },
  { name: "Reyes West", kind: "Terminal", initials: "RW", stats: [["Trucks", "6"], ["On the road", "4"]] },
];

/** One company, one login, three workspaces under it. */
export function CompanyMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="Reyes Group signs in once and runs three workspaces: Reyes Trucking, a carrier with 18 trucks; Reyes Logistics, a brokerage with 41 loads this week; and Reyes West, a terminal with 6 trucks."
    >
      <div aria-hidden="true">
        <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-pine px-4 py-3 text-white shadow-[0_24px_50px_-26px_rgb(28_34_30/0.7)]">
          <span className="grid size-9 place-items-center rounded-lg bg-rust-ink text-xs font-bold">RG</span>
          <span>
            <span className="block text-sm font-semibold">Reyes Group</span>
            <span className="block text-xs text-on-pine-muted">One login · 14 people</span>
          </span>
        </div>
        <svg className="mx-auto block h-12 w-full max-w-[44rem]" viewBox="0 0 600 48" preserveAspectRatio="none" fill="none">
          <path className="ws-line" d="M300 0 V18 H100 V48 M300 18 V48 M300 18 H500 V48" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="grid gap-3 sm:grid-cols-3">
          {MAP.map((w, i) => (
            <div
              key={w.name}
              className="ws-card rounded-2xl border border-line bg-paper p-4 shadow-[0_18px_40px_-30px_rgb(28_34_30/0.5)]"
              style={{ "--i": i } as React.CSSProperties}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-lg text-[0.6875rem] font-bold ${
                    w.kind === "Brokerage" ? "bg-rust-ink text-white" : "bg-pine text-cream"
                  }`}
                >
                  {w.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{w.name}</span>
                  <span className="block text-[0.6875rem] font-medium text-muted">{w.kind}</span>
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 border-t border-line pt-3">
                {w.stats.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.6875rem] text-muted">{k}</dt>
                    <dd className="text-base font-bold text-ink tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** One person, a different role in each workspace. */
export function RolesCard() {
  const rows = [
    { ws: "Reyes Trucking", role: "Admin", tone: "bg-pine text-cream" },
    { ws: "Reyes Logistics", role: "Dispatcher", tone: "bg-rust-ink text-white" },
    { ws: "Reyes West", role: "Viewer", tone: "bg-mist text-ink ring-1 ring-line" },
  ];
  return (
    <div
      className="rounded-2xl border border-line bg-paper p-5 shadow-[0_24px_60px_-34px_rgb(28_34_30/0.45)]"
      role="img"
      aria-label="Maria Lopez is an admin in Reyes Trucking, a dispatcher in Reyes Logistics and a viewer in Reyes West."
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-mist text-sm font-bold text-ink">ML</span>
          <span>
            <span className="block font-semibold text-ink">Maria Lopez</span>
            <span className="block text-xs text-muted">maria@reyesgroup.com</span>
          </span>
        </div>
        <ul className="mt-4 divide-y divide-line border-t border-line">
          {rows.map((r) => (
            <li key={r.ws} className="flex items-center justify-between gap-3 py-3">
              <span className="text-sm text-ink">{r.ws}</span>
              <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${r.tone}`}>{r.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
