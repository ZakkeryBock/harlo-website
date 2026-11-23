"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Peak } from "./logo";
import { Check } from "./ui";

/**
 * The carriers page's load cycle: one load token travels a four-stop track
 * while each stage plays a short scene of Harlo doing the work. Auto-advances
 * while on screen; the stops are tabs. Scenes replay from the start each time
 * a stage opens (they remount). Reduced motion shows each scene finished.
 * All names and numbers are made up.
 */

const STAGE_MS = 7000;

export type Stage = { key: string; tab: string; sub: string; title: string; body: string; scene: () => React.ReactNode };

export const CARRIER_STAGES: Stage[] = [
  {
    key: "book",
    tab: "Book it",
    sub: "Rate con in",
    title: "Rate con in. Load out.",
    body: "Drop in a rate con. Ike reads it and builds the load: customer, stops, times and rate. Nobody retypes a PDF.",
    scene: () => <BookScene />,
  },
  {
    key: "dispatch",
    tab: "Dispatch it",
    sub: "Compliance checked",
    title: "Compliance checked. Wheels up.",
    body: "Pick the driver and the truck. Harlo checks compliance before anything moves, then sends the load straight to the driver.",
    scene: DispatchScene,
  },
  {
    key: "run",
    tab: "Run it",
    sub: "Every mile in view",
    title: "Every mile, in view.",
    body: "Stop times flow in from the driver app, texts or the ELD. You see what's on time, and Ike flags trouble before the customer calls.",
    scene: RunScene,
  },
  {
    key: "paid",
    tab: "Get paid",
    sub: "Invoiced on delivery",
    title: "Delivered. Invoiced. Sent.",
    body: "The moment it delivers, Harlo lets the customer know, adds any accessorials and sends the invoice. Track payment in Harlo, or connect your accounting to close the loop.",
    scene: PaidScene,
  },
];

export function LoadJourney({
  stages = CARRIER_STAGES,
  label = "A carrier load, start to finish",
}: {
  stages?: Stage[];
  label?: string;
}) {
  const [stage, setStage] = useState(0);
  const [run, setRun] = useState(0);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setRun((r) => r + 1);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % stages.length), STAGE_MS);
    return () => clearTimeout(t);
  }, [stage, run, visible, stages.length]);

  const go = (n: number) => {
    setStage(n);
    setRun((r) => r + 1);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (stage + (e.key === "ArrowRight" ? 1 : stages.length - 1)) % stages.length;
    go(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  const s = stages[stage];
  const Scene = s.scene;
  // token sits on the active stop: stops are at 12.5%, 37.5%, 62.5%, 87.5%
  const pos = 12.5 + stage * 25;

  return (
    <div ref={box} className={`lj ${visible ? "" : "is-paused"}`}>
      {/* the track */}
      <div className="relative">
        <div className="absolute top-5 right-[12.5%] left-[12.5%] h-1 rounded-full bg-line" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute top-5 left-[12.5%] h-1 rounded-full bg-gradient-to-r from-rust-ink to-rust transition-[width] duration-700 ease-out"
          style={{ width: `${pos - 12.5}%` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 transition-[left] duration-700 ease-out"
          style={{ left: `${pos}%` }}
        >
          <span className="lj-token relative grid size-11 place-items-center rounded-full bg-rust-ink text-white shadow-[0_8px_24px_-6px_rgb(180_83_46/0.7)]">
            <TruckIcon />
          </span>
        </div>

        <div role="tablist" aria-label={label} onKeyDown={onKey} className="relative grid grid-cols-4">
          {stages.map((st, n) => {
            const active = n === stage;
            const done = n < stage;
            return (
              <button
                key={st.key}
                id={`${id}-tab-${n}`}
                role="tab"
                aria-selected={active}
                aria-controls={`${id}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => go(n)}
                className="group flex flex-col items-center gap-3 px-1 text-center"
              >
                <span
                  className={`grid size-11 place-items-center rounded-full border-2 text-sm font-bold transition-colors ${
                    active
                      ? "border-transparent bg-transparent text-transparent"
                      : done
                        ? "border-rust bg-rust text-white"
                        : "border-line bg-paper text-muted group-hover:border-rust/50 group-hover:text-ink"
                  }`}
                >
                  {done ? <Check className="size-4" /> : n + 1}
                </span>
                <span>
                  <span className={`block text-sm font-bold sm:text-base ${active ? "text-ink" : "text-muted group-hover:text-ink"}`}>
                    {st.tab}
                  </span>
                  <span className="mt-0.5 hidden text-xs text-muted sm:block">{st.sub}</span>
                  <span className="mx-auto mt-2 block h-0.5 w-12 overflow-hidden rounded-full bg-line">
                    {active && <span key={`${stage}-${run}`} className="lj-timer block h-full origin-left bg-rust" />}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* the stage */}
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${stage}`}
        className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14"
      >
        <div key={`t-${stage}`} className="demo min-h-[14.5rem] sm:min-h-[12rem] lg:min-h-0">
          <p data-step className="text-sm font-semibold text-rust-ink" style={{ "--d": 0 } as React.CSSProperties}>
            Step {stage + 1} of {stages.length}
          </p>
          <h3
            data-step
            className="mt-2 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] leading-[1.05] font-extrabold tracking-[-0.03em]"
            style={{ "--d": 60 } as React.CSSProperties}
          >
            {s.title}
          </h3>
          <p data-step className="mt-4 max-w-md text-lead" style={{ "--d": 140 } as React.CSSProperties}>
            {s.body}
          </p>
        </div>
        <div
          key={`${stage}-${run}`}
          className="demo relative h-[26rem] overflow-hidden rounded-2xl border border-line bg-paper p-5 shadow-[0_24px_60px_-28px_rgb(28_34_30/0.35)] sm:h-[21rem] sm:p-6"
          role="img"
          aria-label={`${s.tab}: ${s.title}`}
        >
          <div aria-hidden="true" className="h-full">
            <Scene />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ scenes */

export const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

export function BookScene({
  doc = "RateCon.pdf",
  fields = [
    ["Customer", "Midwest Paper"],
    ["Pickup", "Joliet, IL · Thu 7:00"],
    ["Delivery", "Columbus, OH · Fri 9:00"],
    ["Rate", "$1,150"],
  ],
  created = "NL-88412 created",
}: {
  doc?: string;
  fields?: string[][];
  created?: string;
}) {
  return (
    <div className="grid h-full grid-cols-1 items-center gap-5 sm:grid-cols-[0.8fr_auto_1.2fr]">
      {/* the PDF */}
      <div data-step style={d(0)} className="relative hidden overflow-hidden rounded-xl border border-line bg-mist p-4 sm:block">
        <div className="flex items-center gap-2">
          <span className="rounded bg-stop-soft px-1.5 py-0.5 text-[0.625rem] font-bold text-stop">PDF</span>
          <span className="truncate text-xs font-semibold text-ink">{doc}</span>
        </div>
        <div className="mt-4 grid gap-2">
          {[90, 70, 82, 55, 76, 64, 48].map((w, n) => (
            <span key={n} className="h-1.5 rounded-full bg-mist-2" style={{ width: `${w}%` }} />
          ))}
        </div>
        <span className="lj-scan absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-rust/25 to-transparent" />
      </div>

      <span data-step style={d(500)} className="hidden size-9 place-items-center rounded-full bg-rust-ink sm:grid">
        <Peak className="h-2.5 w-auto" color="#fff" />
      </span>

      {/* the load it becomes */}
      <div className="rounded-xl border border-line p-4">
        <p data-step style={d(700)} className="text-xs font-semibold tracking-wide text-muted uppercase">
          New load
        </p>
        <div className="mt-3 grid gap-2.5">
          {fields.map(([k, v], n) => (
            <div key={k} data-step style={d(1000 + n * 450)} className="flex items-baseline justify-between gap-3 border-b border-line pb-2 text-sm">
              <span className="text-muted">{k}</span>
              <span className="font-semibold text-ink tabular-nums">{v}</span>
            </div>
          ))}
        </div>
        <div data-step style={d(3000)} className="lj-stamp mt-4 flex items-center gap-2 rounded-lg bg-go-soft px-3 py-2 text-xs font-bold text-go">
          <Check className="size-3.5" /> {created}
        </div>
      </div>
    </div>
  );
}

function DispatchScene() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center justify-center gap-3">
        <div className="lj-from-left flex items-center gap-2.5 rounded-xl border border-line bg-paper px-3 py-2.5 shadow-sm">
          <span className="grid size-8 place-items-center rounded-full bg-pine text-[0.6875rem] font-bold text-cream">MR</span>
          <span className="text-sm font-semibold text-ink">Marcus R.</span>
        </div>
        <span data-step style={d(700)} className="text-lg font-bold text-muted">
          +
        </span>
        <div className="lj-from-right flex items-center gap-2.5 rounded-xl border border-line bg-paper px-3 py-2.5 shadow-sm">
          <span className="grid size-8 place-items-center rounded-lg bg-mist text-ink">
            <TruckIcon />
          </span>
          <span className="text-sm font-semibold text-ink">Unit 118</span>
        </div>
      </div>

      <div data-step style={d(1000)} className="rounded-xl border border-line p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-go-soft text-go">
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2.5l6 2.2v4.6c0 3.8-2.6 6.7-6 8.2-3.4-1.5-6-4.4-6-8.2V4.7zM7.2 10l2 2 3.8-4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between">
              <p className="text-sm font-bold text-ink">Compliance</p>
              <p data-step style={d(2500)} className="text-xs font-bold text-go">
                Passed
              </p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist-2">
              <div className="lj-fill h-full rounded-full bg-go" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span data-step style={d(2900)} className="lj-stamp rounded-full bg-pine px-3.5 py-1.5 text-xs font-bold tracking-wide text-cream uppercase">
          Dispatched
        </span>
        <div data-step style={d(3500)} className="flex items-center gap-2.5 rounded-xl bg-mist px-3 py-2">
          <span className="grid size-7 place-items-center rounded-lg bg-rust-ink">
            <Peak className="h-2 w-auto" color="#fff" />
          </span>
          <span className="text-xs">
            <span className="block font-semibold text-ink">Harlo Driver</span>
            <span className="text-muted">New load for Marcus</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function RunScene() {
  const events = [
    { t: "Arrived Joliet", v: "6:58 AM", ms: 900 },
    { t: "Departed Joliet", v: "8:41 AM", ms: 1900 },
    { t: "ETA Columbus", v: "9:40 AM", ms: 3000, tone: "go" },
  ];
  return (
    <div className="flex h-full flex-col">
      {/* the route */}
      <div className="relative rounded-xl bg-mist px-5 pt-7 pb-5 [background-image:radial-gradient(rgb(28_34_30/0.08)_1px,transparent_1px)] [background-size:14px_14px]">
        <div className="relative h-8">
          <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-full bg-mist-2" />
          <div className="lj-route absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-rust" />
          <span className="absolute top-1/2 left-0 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-rust bg-paper" />
          <span className="absolute top-1/2 right-0 size-4 translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-mist-2 bg-paper" />
          <span className="lj-truck absolute top-1/2 grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rust-ink text-white shadow-md">
            <TruckIcon small />
          </span>
        </div>
        <div className="mt-2 flex justify-between text-xs font-semibold text-ink">
          <span>Joliet, IL</span>
          <span>Columbus, OH</span>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        {events.map((e) => (
          <div key={e.t} data-step style={d(e.ms)} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm">
            <span className="flex items-center gap-2 text-ink">
              <span className={`size-1.5 rounded-full ${e.tone ? "bg-go" : "bg-rust"}`} />
              {e.t}
            </span>
            <span className={`font-semibold tabular-nums ${e.tone ? "text-go" : "text-ink"}`}>
              {e.v}
              {e.tone && " · On time"}
            </span>
          </div>
        ))}
      </div>

      <p data-step style={d(3800)} className="mt-auto self-start rounded-2xl rounded-bl-sm bg-pine px-3.5 py-2 text-xs text-cream">
        Marcus: Loaded and rolling 👍
      </p>
    </div>
  );
}

function PaidScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span data-step style={d(0)} className="flex items-center gap-1.5 rounded-full bg-go-soft px-3 py-1.5 text-xs font-bold text-go">
          <Check className="size-3.5" /> Delivered Fri 9:20 AM
        </span>
        <span data-step style={d(700)} className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink">
          <BellIcon /> Customer notified
        </span>
      </div>

      <div data-step style={d(1100)} className="rounded-xl border border-line p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-ink">Invoice #4821</p>
          <p className="text-xs text-muted">Midwest Paper</p>
        </div>
        <div className="mt-3 grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Linehaul</span>
            <span className="font-semibold text-ink tabular-nums">$1,150.00</span>
          </div>
          <div data-step style={d(1800)} className="lj-flash -mx-2 flex justify-between rounded-md px-2 py-0.5">
            <span className="text-ink">+ Detention, 2 hrs</span>
            <span className="font-semibold text-ink tabular-nums">$100.00</span>
          </div>
          <div className="flex justify-between border-t border-line pt-2">
            <span className="font-semibold text-ink">Total</span>
            <span data-step style={d(2300)} className="text-lg font-extrabold text-ink tabular-nums">
              $1,250.00
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span data-step style={d(2900)} className="lj-stamp rounded-full bg-rust-ink px-3.5 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
          Invoice sent
        </span>
        <span data-step style={d(3400)} className="rounded-full bg-warn-soft px-3 py-1.5 text-xs font-semibold text-warn">
          Payment: awaiting
        </span>
      </div>

      <div data-step style={d(4000)} className="mt-auto flex items-center gap-2.5 rounded-xl border border-dashed border-line px-3 py-2.5">
        <span className="grid size-7 place-items-center rounded-lg bg-mist text-ink">
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 2.5v4M13 2.5v4M5 6.5h10v3a5 5 0 0 1-10 0zM10 14.5v3" />
          </svg>
        </span>
        <span className="text-xs text-body">
          <span className="font-semibold text-ink">Connect your accounting</span> to mark it paid automatically
        </span>
      </div>
    </div>
  );
}

export function TruckIcon({ small = false }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={small ? "size-4" : "size-5"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 6.5h11v9h-11zM13.5 9.5h4l3 3v3h-7" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </svg>
  );
}

export function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11V7a4 4 0 0 1 8 0v4l1 1.5H3zM6.5 14a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}
