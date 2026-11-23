import Link from "next/link";
import { Button, Check } from "./ui";
import { Peak } from "./logo";
import { DesktopScreen, DriverTablet, Phone } from "./devices";

/**
 * The home page's platform grid: one card per idea, each with a small picture
 * of it instead of a feature list. Written for carriers and brokers alike.
 * All names and numbers are made up.
 */

export function PlatformGrid() {
  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-3">
        <Card
          dark
          href="/ike"
          cta="Meet Ike"
          icon={<Peak className="h-3 w-auto" />}
          title="Context-aware monitoring"
          body="Your AI assistant that understands your business."
          visual={<IkeVisual />}
        />
        <Card
          icon={<Ico d="M10 2.5l6 2.2v4.6c0 3.8-2.6 6.7-6 8.2-3.4-1.5-6-4.4-6-8.2V4.7zM7.2 10l2 2 3.8-4" />}
          title="Compliance, handled"
          body="Every driver, truck and partner checked before the load moves."
          visual={<ComplianceVisual />}
        />
        <Card
          icon={<Ico d="M10 17.5s5.5-5 5.5-9.5a5.5 5.5 0 0 0-11 0c0 4.5 5.5 9.5 5.5 9.5zM10 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />}
          title="Real-time visibility"
          body="Know where every load stands, from pickup to payment."
          visual={<VisibilityVisual />}
        />
        <Card
          href="/partners"
          cta="See integrations"
          icon={<Ico d="M7 2.5v4M13 2.5v4M5 6.5h10v3a5 5 0 0 1-10 0zM10 14.5v3" />}
          title="Integrations and API"
          body="Plug in the tools you already use, or build on ours."
          visual={<IntegrationsVisual />}
        />
        <div className="flex flex-col overflow-hidden rounded-3xl bg-mist p-7 sm:p-8 lg:col-span-2">
          <div className="flex h-10 items-center">
            <IconTile dark={false}>
              <Ico d="M2.5 4.5h11v7.5h-11zM6 15.5h4M8 12v3.5M14.5 8.5h3v9h-3z" />
            </IconTile>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-h3 font-bold">Every screen</h3>
              <p className="mt-2 max-w-md">
                Harlo in the office, Harlo Go on your phone, Harlo Driver in the cab. Same records on all three.
              </p>
            </div>
            <Button href="/apps" variant="secondary" className="shrink-0">
              See the apps
            </Button>
          </div>
          <ScreensVisual />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
        <span className="mr-2 text-sm font-semibold text-ink">On every paid plan</span>
        {["Unlimited users", "Roles and permissions", "Multiple workspaces", "Audit trail", "Single sign-on"].map((x) => (
          <span
            key={x}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-medium text-ink"
          >
            <Check className="size-3.5 text-rust-ink" />
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Card({
  title,
  body,
  visual,
  dark = false,
  href,
  cta,
  icon,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  visual: React.ReactNode;
  dark?: boolean;
  href?: string;
  cta?: string;
}) {
  const cls = `group relative flex flex-col overflow-hidden rounded-3xl p-7 sm:p-8 ${
    dark ? "on-pine bg-pine text-on-pine-muted" : "bg-mist"
  }`;
  const inner = (
    <>
      {dark && (
        <div aria-hidden="true" className="blob-field pointer-events-none absolute inset-0">
          <span className="blob blob-a" />
          <span className="blob blob-b" />
          <span className="blob blob-c" />
          <span className="blob blob-d" />
        </div>
      )}
      <div className="relative flex h-10 items-center justify-between">
        <IconTile dark={dark}>{icon}</IconTile>
        {href && cta && <ArrowBadge label={cta} dark={dark} />}
      </div>
      <h3 className={`relative mt-6 text-h3 font-bold ${dark ? "text-white" : ""}`}>{title}</h3>
      <p className={`relative mt-2 max-w-sm ${dark ? "text-on-pine" : ""}`}>{body}</p>
      <div aria-hidden="true" className="relative mt-8 flex flex-1 flex-col justify-end">
        {visual}
      </div>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

export function IconTile({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <span
      className={`grid size-10 place-items-center rounded-xl ${dark ? "bg-white/10 text-white" : "bg-paper text-rust-ink shadow-sm"}`}
    >
      {children}
    </span>
  );
}

export function Ico({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

/** A round arrow in the corner that opens into a labelled pill on hover or focus. */
export function ArrowBadge({ label, dark }: { label: string; dark: boolean }) {
  return (
    <span
      className={`flex h-10 shrink-0 items-center overflow-hidden rounded-full text-sm font-semibold transition-all duration-300 ease-out ${
        dark ? "bg-white/10 text-white group-hover:bg-rust-ink" : "bg-paper text-ink group-hover:bg-ink group-hover:text-white"
      }`}
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-out group-hover:max-w-[10rem] group-hover:pl-4 group-hover:opacity-100 group-focus-visible:max-w-[10rem] group-focus-visible:pl-4 group-focus-visible:opacity-100">
        {label}
      </span>
      <span className="grid size-10 shrink-0 place-items-center">
        <svg
          viewBox="0 0 16 16"
          className="size-4 transition-transform duration-300 group-hover:rotate-45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
        </svg>
      </span>
    </span>
  );
}

/* --------------------------------------------------------------- visuals */

const tile = "rounded-xl bg-paper shadow-[0_10px_30px_-18px_rgb(28_34_30/0.45)]";

function IkeVisual() {
  const notes = [
    { dot: "bg-warn", t: "A delivery is running behind.", a: "Customer update drafted" },
    { dot: "bg-go", t: "New paperwork came in.", a: "Filed to the right load" },
    { dot: "bg-rust-light", t: "A certificate expires next week.", a: "Reminder sent" },
  ];
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur">
      <div className="flex items-center gap-2 px-1 pb-3">
        <span className="grid size-6 place-items-center rounded-full bg-rust-ink">
          <Peak className="h-2.5 w-auto" color="#fff" />
        </span>
        <p className="text-xs font-semibold text-white">Ike</p>
        <span className="ml-auto flex items-center gap-1.5 text-[0.6875rem] text-on-pine-muted">
          <span className="ops-live size-1.5 rounded-full bg-go" />
          Watching
        </span>
      </div>
      <div className="grid gap-2">
        {notes.map((n) => (
          <div key={n.t} className="rounded-lg bg-paper px-3 py-2.5">
            <p className="flex items-center gap-2 text-xs font-semibold text-ink">
              <span className={`size-1.5 shrink-0 rounded-full ${n.dot}`} />
              {n.t}
            </p>
            <p className="mt-0.5 pl-3.5 text-[0.6875rem] text-muted">{n.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceVisual() {
  const checks = ["Licensed", "Insured", "Inspected", "Certified"];
  return (
    <div className={`${tile} p-4`}>
      <div className="grid grid-cols-2 gap-2">
        {checks.map((c) => (
          <div key={c} className="flex items-center gap-2 rounded-lg bg-mist px-3 py-2 text-xs font-semibold text-ink">
            <span className="grid size-4 place-items-center rounded-full bg-go text-white">
              <Check className="size-2.5" />
            </span>
            {c}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-go-soft px-3 py-2.5">
        <span className="text-xs font-semibold text-go">Cleared to roll</span>
        <span className="text-[0.6875rem] font-medium text-go/80">Checked just now</span>
      </div>
    </div>
  );
}

function VisibilityVisual() {
  const stops = [
    { t: "Picked up", s: "done" },
    { t: "In transit", s: "now" },
    { t: "Delivered", s: "next" },
    { t: "Paid", s: "next" },
  ];
  return (
    <div className={`${tile} p-4`}>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-ink">Load 4821</p>
        <span className="rounded-full bg-go-soft px-2 py-0.5 text-[0.6875rem] font-semibold text-go">On time</span>
      </div>
      <div className="relative mt-5 mb-1">
        <div className="absolute top-[0.4375rem] right-[12%] left-[12%] h-0.5 bg-mist-2" />
        <div className="absolute top-[0.4375rem] left-[12%] h-0.5 w-[26%] bg-rust" />
        <ol className="relative grid grid-cols-4">
          {stops.map((st) => (
            <li key={st.t} className="flex flex-col items-center gap-2">
              <span
                className={`size-4 rounded-full border-2 ${
                  st.s === "done"
                    ? "border-rust bg-rust"
                    : st.s === "now"
                      ? "border-rust bg-paper ring-4 ring-rust/20"
                      : "border-mist-2 bg-paper"
                }`}
              />
              <span className={`text-[0.6875rem] font-medium ${st.s === "next" ? "text-muted" : "text-ink"}`}>
                {st.t}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 border-t border-line pt-3 text-xs text-body">
        ETA <span className="font-semibold text-ink">Tomorrow, 9:40 AM</span>
      </p>
    </div>
  );
}

function IntegrationsVisual() {
  const left = ["ELD", "Load boards", "Accounting"];
  const right = ["Fuel cards", "Email", "Your apps"];
  const chip = "rounded-lg bg-paper px-3 py-2 text-xs font-semibold text-ink shadow-[0_6px_18px_-12px_rgb(28_34_30/0.5)]";
  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="grid gap-2">
          {left.map((x) => (
            <span key={x} className={`${chip} text-right`}>
              {x}
            </span>
          ))}
        </div>
        <span className="grid size-14 place-items-center rounded-2xl bg-pine shadow-[0_10px_24px_-12px_rgb(28_34_30/0.6)]">
          <Peak className="h-4 w-auto" />
        </span>
        <div className="grid gap-2">
          {right.map((x) => (
            <span key={x} className={chip}>
              {x}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-lg bg-pine px-3 py-2.5 font-mono text-[0.6875rem] text-on-pine">
        <span className="text-rust-light">GET</span> /v1/loads<span className="text-on-pine-muted">?status=in_transit</span>
      </div>
    </div>
  );
}

function ScreensVisual() {
  const frame = "bg-pine";
  return (
    <div className="relative mt-8 flex-1">
      <div className="relative mx-auto max-w-[42rem] pb-6 sm:pb-16">
        <DesktopScreen className="w-full sm:ml-auto sm:w-[82%]" />
        {/* laid out at a real tablet width, then scaled down so nothing squeezes */}
        <div className="absolute bottom-0 left-0 hidden w-[26rem] origin-bottom-left scale-[0.68] sm:block">
          <DriverTablet frame={frame} />
        </div>
        <Phone frame={frame} compact size="absolute -right-1 bottom-0 hidden w-[15%] sm:block" />
      </div>
    </div>
  );
}
