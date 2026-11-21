import { Check } from "./ui";

/**
 * The three Harlo surfaces, drawn as product screens: the desktop command
 * center, Harlo Go on a phone, and Harlo Driver on a truck tablet. One account
 * and one set of records behind all three. All names and numbers are made up.
 *
 * DeviceStage layers all three into one picture (desktop behind, tablet and
 * phone in front of its corners) for dark sections; on small screens they stack.
 */

/* ----------------------------------------------------------------- desktop */

const BOARD = [
  { id: "NL-88412", lane: "Joliet, IL → Columbus, OH", who: "Unit 118, M. Reyes", state: "At pickup", tone: "go" },
  { id: "NL-88430", lane: "Gary, IN → Louisville, KY", who: "Unit 122, L. Ortega", state: "In transit", tone: "go" },
  { id: "HB-20417", lane: "Elk Grove, IL → Nashville, TN", who: "Lakeshore Transport", state: "Running late", tone: "warn" },
  { id: "NL-88441", lane: "Aurora, IL → St. Louis, MO", who: "Unassigned", state: "Needs a truck", tone: "stop" },
  { id: "NL-88452", lane: "Rockford, IL → Detroit, MI", who: "Unit 131, D. Whitfield", state: "Delivered", tone: "go" },
  { id: "NL-88457", lane: "Joliet, IL → Indianapolis, IN", who: "Unit 109, A. Kowalski", state: "Dispatched", tone: "go" },
] as const;

const toneText = { go: "text-go", warn: "text-warn", stop: "text-stop" } as const;
const tonePill = {
  go: "bg-go-soft text-go",
  warn: "bg-warn-soft text-warn",
  stop: "bg-stop-soft text-stop",
} as const;

const KPIS = [
  { k: "Moving", v: "18" },
  { k: "Running late", v: "1" },
  { k: "Need a truck", v: "1" },
  { k: "Delivered this week", v: "$24,310" },
];

export function DesktopScreen({ className = "", large = false }: { className?: string; large?: boolean }) {
  const rows = large ? BOARD : BOARD.slice(0, 4);
  return (
    <div
      className={`overflow-hidden rounded-xl border border-line bg-paper shadow-[0_24px_60px_-28px_rgb(28_34_30/0.4)] ${className}`}
      role="img"
      aria-label="Harlo on desktop: the dispatch board with its loads, a sidebar of modules, and a summary of what needs attention."
    >
      <div aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-line bg-mist px-3 py-2">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 truncate rounded bg-paper px-2 py-0.5 text-[0.625rem] text-muted">app.goharlo.com/dispatch</span>
        </div>
        <div className={`grid ${large ? "grid-cols-[8.5rem_1fr]" : "grid-cols-[5.5rem_1fr] sm:grid-cols-[7rem_1fr]"}`}>
          <div className={`border-r border-line bg-mist/60 p-2.5 text-body ${large ? "text-xs leading-7" : "text-[0.625rem] leading-6"}`}>
            {["Dashboard", "Dispatch", "Loads", "Drivers", "Equipment", "Customers", "Money"].map((x) => (
              <p key={x} className={x === "Dispatch" ? "rounded bg-paper px-2 font-semibold text-ink" : "px-2"}>
                {x}
              </p>
            ))}
          </div>
          <div className={`min-w-0 ${large ? "p-5" : "p-3"}`}>
            <div className="flex items-center justify-between gap-2">
              <p className={`font-bold text-ink ${large ? "text-base" : "text-xs"}`}>Dispatch board</p>
              <p className={`rounded bg-rust-soft px-1.5 py-0.5 font-semibold text-rust-deep ${large ? "text-xs" : "text-[0.625rem]"}`}>
                2 need you
              </p>
            </div>

            {large && (
              <div className="mt-4 grid grid-cols-4 gap-2.5">
                {KPIS.map((s) => (
                  <div key={s.k} className="rounded-lg border border-line px-3 py-2">
                    <p className="text-[0.6875rem] text-muted">{s.k}</p>
                    <p className="text-lg font-bold text-ink tabular-nums">{s.v}</p>
                  </div>
                ))}
              </div>
            )}

            <div className={`divide-y divide-line rounded-md border border-line ${large ? "mt-4" : "mt-2"}`}>
              {rows.map((b) =>
                large ? (
                  <div key={b.id} className="grid grid-cols-[5.5rem_1fr_10rem_6.5rem] items-center gap-3 px-3 py-2.5 text-xs">
                    <p className="font-semibold text-ink">{b.id}</p>
                    <p className="truncate text-body">{b.lane}</p>
                    <p className="truncate text-muted">{b.who}</p>
                    <p className={`rounded-full px-2 py-0.5 text-center text-[0.6875rem] font-semibold ${tonePill[b.tone]}`}>
                      {b.state}
                    </p>
                  </div>
                ) : (
                  <div key={b.id} className="grid grid-cols-[1fr_auto] gap-2 px-2 py-1.5">
                    <div className="min-w-0">
                      <p className="truncate text-[0.6875rem] font-semibold text-ink">
                        {b.id} <span className="font-normal text-body">{b.lane}</span>
                      </p>
                      <p className="truncate text-[0.625rem] text-muted">{b.who}</p>
                    </div>
                    <p className={`self-center text-[0.625rem] font-semibold whitespace-nowrap ${toneText[b.tone]}`}>{b.state}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- phone */

const LOADS = [
  { lane: "Joliet, IL to Columbus, OH", when: "Thu 07:00", rate: "$1,150", state: "Booked" },
  { lane: "Gary, IN to Louisville, KY", when: "In transit", rate: "$980", state: "On the road" },
  { lane: "Elk Grove, IL to Detroit, MI", when: "Delivered Tue", rate: "$1,040", state: "Delivered" },
];

/**
 * frame: the bezel colour (use a lighter one on a dark section so the device reads).
 * size: width and placement, replaced whole — two width utilities on one element
 * fight, and Tailwind decides the winner, not the order of the classes.
 * compact: a real phone's proportions (9:19.5 screen, thin bezel, small island)
 * and type scaled to sit next to a desktop window; the screen clips like a phone.
 */
export function Phone({
  className = "",
  frame = "bg-pine",
  size = "mx-auto w-full max-w-[20rem]",
  compact = false,
}: {
  className?: string;
  frame?: string;
  size?: string;
  compact?: boolean;
}) {
  const c = (full: string, small: string) => (compact ? small : full);
  return (
    <div
      className={`shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] ${c("rounded-[2.6rem] p-2.5", "rounded-[1.9rem] p-[5px]")} ${size} ${frame} ${className}`}
      role="img"
      aria-label="Harlo Go on a phone: a note about what needs attention, this week's delivered total, and the loads."
    >
      <div
        aria-hidden="true"
        className={`overflow-hidden bg-mist ${c("rounded-[2.1rem]", "aspect-[9/19.5] rounded-[1.6rem]")}`}
      >
        <div className={`flex justify-center ${c("pt-2.5", "pt-2")}`}>
          <span className={`rounded-full bg-pine ${c("h-5 w-24", "h-[0.9rem] w-[3.4rem]")}`} />
        </div>
        <div className={c("px-4 pt-4 pb-6", "px-2.5 pt-2.5")}>
          <p className={`text-muted ${c("text-xs", "text-[0.5rem]")}`}>Good morning, Ray</p>
          <p className={`font-extrabold tracking-tight text-ink ${c("text-xl", "text-[0.8125rem] leading-tight")}`}>
            Reyes Trucking
          </p>

          <div className={`bg-paper ${c("mt-4 rounded-2xl p-3.5", "mt-2 rounded-xl p-2")}`}>
            <p className={`font-semibold text-rust-deep ${c("text-[0.6875rem]", "text-[0.5rem]")}`}>Needs you</p>
            <p className={`mt-0.5 leading-snug text-ink ${c("text-[0.8125rem]", "text-[0.5625rem]")}`}>
              Unit 204&apos;s inspection lapses before Thursday. Swap to Unit 118?
            </p>
            <div className={`flex ${c("mt-2.5 gap-2", "mt-1.5 gap-1")}`}>
              <span className={`rounded-md bg-rust-ink font-semibold text-white ${c("px-2.5 py-1 text-[0.6875rem]", "px-1.5 py-0.5 text-[0.5rem]")}`}>
                Swap
              </span>
              <span className={`rounded-md border border-line font-semibold text-ink ${c("px-2.5 py-1 text-[0.6875rem]", "px-1.5 py-0.5 text-[0.5rem]")}`}>
                Later
              </span>
            </div>
          </div>

          <div className={`grid grid-cols-2 ${c("mt-3 gap-2", "mt-1.5 gap-1.5")}`}>
            {[
              ["This week", "$4,820"],
              ["On the road", "2 loads"],
            ].map(([k, v]) => (
              <div key={k} className={`bg-paper ${c("rounded-xl p-3", "rounded-lg p-1.5")}`}>
                <p className={`text-muted ${c("text-[0.6875rem]", "text-[0.5rem]")}`}>{k}</p>
                <p className={`font-extrabold whitespace-nowrap text-ink tabular-nums ${c("text-lg", "text-[0.75rem]")}`}>{v}</p>
              </div>
            ))}
          </div>

          <p className={`font-bold text-ink ${c("mt-5 mb-2 text-sm", "mt-2.5 mb-1 text-[0.625rem]")}`}>Loads</p>
          <div className={`grid ${c("gap-2", "gap-1")}`}>
            {LOADS.map((l) => (
              <div key={l.lane} className={`min-w-0 bg-paper ${c("rounded-xl p-3", "rounded-lg px-2 py-1.5")}`}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`min-w-0 truncate font-semibold text-ink ${c("text-[0.8125rem]", "text-[0.5625rem]")}`}>{l.lane}</p>
                  <p className={`shrink-0 font-bold text-ink tabular-nums ${c("text-[0.8125rem]", "text-[0.5625rem]")}`}>{l.rate}</p>
                </div>
                <div className={`mt-0.5 flex justify-between text-muted ${c("text-[0.6875rem]", "text-[0.5rem]")}`}>
                  <span>{l.when}</span>
                  <span className={l.state === "On the road" ? "font-semibold text-go" : ""}>{l.state}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ truck tablet */

export function DriverTablet({ className = "", frame = "bg-pine" }: { className?: string; frame?: string }) {
  return (
    <div
      className={`rounded-[1.6rem] p-2.5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] ${frame} ${className}`}
      role="img"
      aria-label="Harlo Driver on a truck tablet: the next stop, a message from dispatch, the documents to capture, and a large Arrived button."
    >
      <div aria-hidden="true" className="overflow-hidden rounded-[1.15rem] bg-mist">
        <div className="flex items-center justify-between bg-paper px-4 py-2.5">
          <p className="text-xs font-bold text-ink">Harlo Driver</p>
          <p className="text-[0.6875rem] text-muted">Unit 118, Marcus Reyes</p>
        </div>
        <div className="grid gap-3 p-3 sm:grid-cols-[1.25fr_1fr]">
          <div className="rounded-xl bg-paper p-3.5">
            <p className="text-[0.6875rem] text-muted">Next stop, 2 of 2</p>
            <p className="text-base leading-tight font-extrabold text-ink">Columbus, OH</p>
            <p className="mt-0.5 text-xs text-body">Ohio Paper DC, 4410 Alum Creek Dr</p>
            <p className="mt-2 text-xs text-body">
              Appointment <span className="font-semibold text-ink">Fri 09:00</span>, door 14
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <span className="grid h-10 place-items-center rounded-lg bg-rust-ink text-sm font-bold text-white">Arrived</span>
              <span className="grid h-10 place-items-center rounded-lg border border-line text-sm font-semibold text-ink">
                Directions
              </span>
            </div>
          </div>
          <div className="grid content-start gap-3">
            <div className="rounded-xl bg-paper p-3">
              <p className="text-[0.6875rem] font-semibold text-ink">Dispatch</p>
              <p className="mt-0.5 text-xs leading-snug text-body">Check in at the guard shack. Thanks Marcus.</p>
            </div>
            <div className="rounded-xl bg-paper p-3 text-xs">
              <p className="text-[0.6875rem] font-semibold text-ink">Paperwork</p>
              <p className="mt-1 flex items-center gap-1.5 text-go">
                <Check className="size-3.5" /> BOL captured
              </p>
              <p className="mt-1 text-warn">POD at delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- stage */

const SURFACES = [
  { name: "Harlo", what: "The command center for the office.", plan: "Desktop, every plan" },
  { name: "Harlo Go", what: "Your operation in your pocket.", plan: "Phone, every plan" },
  { name: "Harlo Driver", what: "A dedicated screen in every cab.", plan: "Phone or tablet, Pro and up" },
];

/** All three surfaces in one picture, plus a caption row. For dark (on-pine) sections. */
export function DeviceStage() {
  const frame = "bg-[#3a443d] ring-1 ring-white/10";
  return (
    <div>
      {/* lg: one layered picture */}
      <div className="relative isolate mx-auto hidden max-w-[68rem] pt-16 pb-16 lg:block">
        <div className="pointer-events-none absolute inset-x-[20%] top-[10%] -z-10 h-[60%] rounded-full bg-rust/20 blur-3xl" />
        <DesktopScreen large className="ml-[8%] w-[76%] border-white/10" />
        <DriverTablet frame={frame} className="absolute bottom-2 left-0 w-[36%]" />
        <Phone frame={frame} compact size="absolute right-[3%] bottom-0 w-[17%]" />
      </div>

      {/* small screens: stacked */}
      <div className="grid gap-8 lg:hidden">
        <DesktopScreen />
        <Phone frame={frame} size="mx-auto w-full max-w-[16rem]" />
        <DriverTablet frame={frame} />
      </div>

      <dl className="mt-14 grid gap-8 border-t border-pine-3 pt-8 sm:grid-cols-3">
        {SURFACES.map((s) => (
          <div key={s.name}>
            <dt className="text-lg font-bold text-white">{s.name}</dt>
            <dd className="mt-1">{s.what}</dd>
            <dd className="mt-2 text-sm text-on-pine-muted/80">{s.plan}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
