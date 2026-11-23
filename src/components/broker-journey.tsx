"use client";

import { Peak } from "./logo";
import { Check } from "./ui";
import { BellIcon, BookScene, LoadJourney, TruckIcon, d, type Stage } from "./load-journey";

/**
 * A brokered load through Harlo: tender to covered to tracked to settled.
 * Scenes for LoadJourney. All names and numbers are made up.
 */
const BROKER_STAGES: Stage[] = [
  {
    key: "book",
    tab: "Book it",
    sub: "Tender in",
    title: "Tender in. Load out.",
    body: "Drop in a customer tender. Ike reads it and builds the load: customer, lane, appointments and rate. On the board in seconds.",
    scene: () => (
      <BookScene
        doc="Tender.pdf"
        fields={[
          ["Customer", "Midwest Paper"],
          ["Lane", "Elk Grove → Nashville"],
          ["Pickup", "Thu 7:00 AM"],
          ["Customer rate", "$1,900"],
        ]}
        created="HB-20417 created"
      />
    ),
  },
  {
    key: "cover",
    tab: "Cover it",
    sub: "Carriers vetted",
    title: "Vetted carriers. Covered fast.",
    body: "Every carrier is checked before you book. A carrier that doesn't pass can't be booked. The one you pick gets a rate con built straight from the load.",
    scene: CoverScene,
  },
  {
    key: "track",
    tab: "Track it",
    sub: "No check calls",
    title: "Every load, no check calls.",
    body: "Stop times land on the load on their own. Running late? Ike spots it first and drafts the customer update for you to send.",
    scene: TrackScene,
  },
  {
    key: "settle",
    tab: "Settle it",
    sub: "Keep the spread",
    title: "Bill it. Pay it. Keep the spread.",
    body: "On delivery the invoice goes out from Harlo with the POD attached, carrier pay is lined up on the same load, and your margin is real. Connect your accounting to close the loop.",
    scene: SettleScene,
  },
];

/** The brokered-load journey (a client component, so the scenes stay on the client). */
export function BrokerJourney() {
  return <LoadJourney stages={BROKER_STAGES} label="A brokered load, start to finish" />;
}

function CoverScene() {
  const carriers = [
    { n: "Blue Ridge Haulers", mc: "MC 640118", ok: false, why: "Insurance expired", ms: 300 },
    { n: "Lakeshore Transport", mc: "MC 772031", ok: true, why: "Authority and insurance good", ms: 800 },
    { n: "Northline Freight", mc: "MC 518204", ok: true, why: "Authority and insurance good", ms: 1300 },
  ];
  return (
    <div className="flex h-full flex-col gap-2.5">
      <p data-step style={d(0)} className="text-xs font-semibold tracking-wide text-muted uppercase">
        Carriers for HB-20417
      </p>
      {carriers.map((c, n) => (
        <div
          key={c.n}
          data-step
          style={d(c.ms)}
          className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
            n === 1 ? "lj-pick border-line" : c.ok ? "border-line" : "border-stop/20 bg-stop-soft/40"
          }`}
        >
          <span
            className={`grid size-7 shrink-0 place-items-center rounded-full ${c.ok ? "bg-go-soft text-go" : "bg-stop-soft text-stop"}`}
          >
            {c.ok ? (
              <Check className="size-3.5" />
            ) : (
              <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
              </svg>
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className={`text-sm font-semibold ${c.ok ? "text-ink" : "text-muted line-through"}`}>{c.n}</p>
            <p className={`truncate text-[0.6875rem] ${c.ok ? "text-muted" : "font-semibold text-stop"}`}>
              {c.mc} · {c.why}
            </p>
          </div>
          {!c.ok && <span className="shrink-0 text-[0.6875rem] font-bold text-stop">Can&apos;t book</span>}
        </div>
      ))}

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <span data-step style={d(2300)} className="lj-stamp rounded-full bg-pine px-3.5 py-1.5 text-xs font-bold tracking-wide text-cream uppercase">
          Booked · Lakeshore $1,520
        </span>
        <span data-step style={d(2900)} className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink">
          Rate con sent
        </span>
        <span data-step style={d(3400)} className="rounded-full bg-go-soft px-3 py-1.5 text-xs font-bold text-go">
          Margin $380 · 20%
        </span>
      </div>
    </div>
  );
}

function TrackScene() {
  return (
    <div className="flex h-full flex-col">
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
          <span>Elk Grove, IL</span>
          <span>Nashville, TN</span>
        </div>
      </div>

      <div className="mt-4 grid gap-2">
        <div data-step style={d(900)} className="flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm">
          <span className="flex items-center gap-2 text-ink">
            <span className="size-1.5 rounded-full bg-rust" />
            Departed Elk Grove
          </span>
          <span className="font-semibold text-ink tabular-nums">8:10 AM</span>
        </div>
        <div data-step style={d(1800)} className="flex items-center justify-between rounded-lg border border-warn/30 bg-warn-soft px-3 py-2 text-sm">
          <span className="flex items-center gap-2 text-ink">
            <span className="size-1.5 rounded-full bg-warn" />
            ETA Nashville
          </span>
          <span className="font-semibold text-warn tabular-nums">40 min late</span>
        </div>
      </div>

      <div data-step style={d(2700)} className="mt-auto flex items-center gap-3 rounded-xl bg-pine px-3 py-2.5">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-rust-ink">
          <Peak className="h-2.5 w-auto" color="#fff" />
        </span>
        <p className="min-w-0 flex-1 text-xs text-cream">Drafted a heads-up to Midwest Paper.</p>
        <span className="relative shrink-0">
          <span className="lj-send-a block rounded-md bg-white px-2.5 py-1 text-[0.6875rem] font-bold text-ink">Send</span>
          <span className="lj-send-b absolute inset-0 flex items-center justify-center gap-1 rounded-md bg-go px-2.5 py-1 text-[0.6875rem] font-bold text-white">
            <Check className="size-3" /> Sent
          </span>
        </span>
      </div>
    </div>
  );
}

function SettleScene() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span data-step style={d(0)} className="flex items-center gap-1.5 rounded-full bg-go-soft px-3 py-1.5 text-xs font-bold text-go">
          <Check className="size-3.5" /> Delivered · POD attached
        </span>
        <span data-step style={d(600)} className="flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink">
          <BellIcon /> Customer notified
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div data-step style={d(1000)} className="rounded-xl border border-line p-3">
          <p className="text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">Customer invoice</p>
          <p className="mt-1 text-lg font-extrabold text-ink tabular-nums">$1,975</p>
          <p className="text-[0.6875rem] text-muted">incl. $75 detention</p>
          <span data-step style={d(1900)} className="lj-stamp mt-2 inline-block rounded-full bg-rust-ink px-2.5 py-1 text-[0.625rem] font-bold tracking-wide text-white uppercase">
            Sent
          </span>
        </div>
        <div data-step style={d(1300)} className="rounded-xl border border-line p-3">
          <p className="text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">Carrier pay</p>
          <p className="mt-1 text-lg font-extrabold text-ink tabular-nums">$1,570</p>
          <p className="text-[0.6875rem] text-muted">incl. $50 detention</p>
          <span data-step style={d(2300)} className="lj-stamp mt-2 inline-block rounded-full bg-pine px-2.5 py-1 text-[0.625rem] font-bold tracking-wide text-cream uppercase">
            Approved
          </span>
        </div>
      </div>

      <div data-step style={d(2900)} className="flex items-center justify-between rounded-xl bg-go-soft px-4 py-3">
        <span className="text-sm font-semibold text-go">Your spread</span>
        <span className="text-2xl font-extrabold tracking-tight text-go tabular-nums">$405</span>
      </div>

      <div data-step style={d(3700)} className="mt-auto flex items-center gap-2.5 rounded-xl border border-dashed border-line px-3 py-2.5">
        <span className="grid size-7 place-items-center rounded-lg bg-mist text-ink">
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 2.5v4M13 2.5v4M5 6.5h10v3a5 5 0 0 1-10 0zM10 14.5v3" />
          </svg>
        </span>
        <span className="text-xs text-body">
          <span className="font-semibold text-ink">Connect your accounting</span> to track payments automatically
        </span>
      </div>
    </div>
  );
}
