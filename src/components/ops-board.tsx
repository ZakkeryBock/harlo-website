/**
 * The home hero's product moment: Harlo running. Paperwork and driver texts
 * come in on the left and get filed to the right load, loads move through
 * their day, and the delivered count ticks up — one 12-second loop, pure CSS
 * (see .ops-* in globals.css). Under reduced motion it holds a finished frame.
 * All names and numbers are made up.
 */

const PERIOD = 12; // seconds; four 3-second beats

const STATES = [
  { label: "Dispatched", cls: "bg-mist-2 text-ink" },
  { label: "In transit", cls: "bg-rust-soft text-rust-deep" },
  { label: "Delivered", cls: "bg-go-soft text-go" },
  { label: "Invoiced", cls: "bg-pine text-cream" },
];

const LOADS = [
  { id: "NL-88412", lane: "Joliet, IL → Columbus, OH", who: "Marcus R.", margin: "$412", offset: 0, still: 2 },
  { id: "NL-88430", lane: "Gary, IN → Nashville, TN", who: "Dana W.", margin: "$388", offset: 1, still: 1 },
  { id: "NL-88441", lane: "Rockford, IL → Detroit, MI", who: "Luis P.", margin: "$515", offset: 2, still: 3 },
  { id: "NL-88457", lane: "Aurora, IL → St. Louis, MO", who: "Ana K.", margin: "$297", offset: 3, still: 0 },
];

const INCOMING = [
  { kind: "Rate con", from: "Midwest Paper, $2,450", to: "NL-88457 created" },
  { kind: "Driver text", from: "Marcus: arrived Columbus, 8:52", to: "Stop time saved" },
  { kind: "POD", from: "NL-88430, signed", to: "Ready to invoice" },
  { kind: "Insurance", from: "Lakeshore Transport, renewed", to: "Carrier cleared" },
];

const NAV = ["Board", "Loads", "Fleet", "Carriers", "Money"];

/** A negative delay so beat `beat` of an element is on screen at the right moment from the first frame. */
const at = (beat: number) => ({ animationDelay: `${(((beat * 3) % PERIOD) + PERIOD) % PERIOD - PERIOD}s` });

export function OpsBoard() {
  return (
    <div
      className="ops relative overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_1px_0_rgb(28_34_30/0.04),0_24px_60px_-28px_rgb(28_34_30/0.35)]"
      role="img"
      aria-label="Harlo's live board: rate confirmations, driver texts, PODs and insurance certificates arrive and are filed to the right load, while loads move from dispatched to in transit, delivered and invoiced."
    >
      <div aria-hidden="true">
        {/* window bar */}
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-mist-2" />
          <span className="size-2.5 rounded-full bg-mist-2" />
          <span className="size-2.5 rounded-full bg-mist-2" />
        </div>

        <div className="flex">
          {/* sidebar */}
          <nav className="hidden w-28 shrink-0 border-r border-line bg-mist/60 px-2 py-3 sm:block">
            {NAV.map((n, i) => (
              <p
                key={n}
                className={`rounded-md px-2.5 py-1.5 text-xs font-medium ${i === 0 ? "bg-paper text-ink shadow-sm" : "text-muted"}`}
              >
                {n}
              </p>
            ))}
          </nav>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            {/* numbers */}
            <div className="grid grid-cols-3 gap-2.5">
              <Stat label="In motion" value="214" />
              <Stat label="On time" value="96%" />
              <div className="rounded-lg border border-line px-3 py-2">
                <p className="text-[0.6875rem] font-medium text-muted">
                  Delivered<span className="hidden sm:inline"> today</span>
                </p>
                <p className="ops-count text-lg font-bold tabular-nums text-ink" />
              </div>
            </div>

            {/* incoming */}
            <p className="mt-4 text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">Incoming</p>
            <div className="relative mt-1.5 h-12 overflow-hidden rounded-lg border border-dashed border-line">
              {INCOMING.map((m, i) => (
                <div
                  key={m.kind}
                  className={`ops-feed absolute inset-0 flex items-center gap-2.5 px-3 ${i === 0 ? "ops-still" : ""}`}
                  style={at(i)}
                >
                  <span className="shrink-0 rounded bg-mist-2 px-1.5 py-0.5 text-[0.625rem] font-bold text-ink uppercase">
                    {m.kind}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs text-body">{m.from}</span>
                  <span className="ops-filed flex shrink-0 items-center gap-1 text-[0.6875rem] font-semibold text-go" style={at(i)}>
                    <svg viewBox="0 0 16 16" className="size-3.5">
                      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="hidden sm:inline">{m.to}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* loads */}
            <p className="mt-4 text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">Loads</p>
            <ul className="mt-1.5 divide-y divide-line rounded-lg border border-line">
              {LOADS.map((l) => (
                <li key={l.id} className="flex items-center gap-3 px-3 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-ink">{l.id}</p>
                    <p className="truncate text-[0.6875rem] text-muted">
                      {l.lane}
                      <span className="mx-1.5 text-line">|</span>
                      {l.who}
                    </p>
                  </div>
                  <span className="hidden text-xs font-semibold tabular-nums text-go sm:block">{l.margin}</span>
                  <span className="relative h-6 w-[5.25rem] shrink-0">
                    {STATES.map((s, k) => (
                      <span
                        key={s.label}
                        className={`ops-state absolute inset-0 grid place-items-center rounded-full text-[0.6875rem] font-semibold ${s.cls} ${
                          k === l.still ? "ops-still" : ""
                        }`}
                        style={at(k - l.offset)}
                      >
                        {s.label}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            {/* on-time trend */}
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">On-time, 30 days</p>
                <p className="text-xs text-body">Every stop time, from every driver</p>
              </div>
              <svg viewBox="0 0 160 40" className="h-10 w-40 shrink-0">
                <path
                  className="ops-line"
                  pathLength={100}
                  d="M2 30 L20 26 L36 28 L52 20 L68 22 L84 15 L100 17 L116 10 L132 12 L158 5"
                  fill="none"
                  stroke="var(--color-rust)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line px-3 py-2">
      <p className="text-[0.6875rem] font-medium text-muted">{label}</p>
      <p className="text-lg font-bold tabular-nums text-ink">{value}</p>
    </div>
  );
}
