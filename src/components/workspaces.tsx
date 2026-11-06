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
