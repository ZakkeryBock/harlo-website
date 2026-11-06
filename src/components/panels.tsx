/** Small product-screen primitives shared by the workflow panels and page mocks. */

export type Tone = "go" | "warn" | "stop";

const toneText = (tone?: Tone) =>
  tone === "go" ? "text-go" : tone === "warn" ? "text-warn" : tone === "stop" ? "text-stop" : "text-ink";

export const Row = ({ k, v, tone }: { k: string; v: string; tone?: Tone }) => (
  <div className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0">
    <span className="text-sm text-body">{k}</span>
    <span className={`shrink-0 text-sm font-semibold whitespace-nowrap tabular-nums ${toneText(tone)}`}>{v}</span>
  </div>
);

export const Panel = ({ title, meta, children }: { title: string; meta?: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-line bg-paper p-5 shadow-[0_20px_50px_-30px_rgb(28_34_30/0.35)]">
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <p className="font-semibold text-ink">{title}</p>
      {meta && <p className="text-right text-xs text-muted">{meta}</p>}
    </div>
    {children}
  </div>
);

export const Total = ({ k, v }: { k: string; v: string }) => (
  <div className="mt-3 flex items-baseline justify-between rounded-lg bg-go-soft px-3 py-2.5">
    <span className="text-sm font-semibold text-ink">{k}</span>
    <span className="text-lg font-bold text-go tabular-nums">{v}</span>
  </div>
);

export const Chips = ({ items, warnLast }: { items: string[]; warnLast?: boolean }) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {items.map((d, i) => (
      <span
        key={d}
        className={`rounded-md px-2.5 py-1 text-xs font-medium ${
          warnLast && i === items.length - 1 ? "bg-warn-soft text-warn" : "bg-mist text-body"
        }`}
      >
        {d}
      </span>
    ))}
  </div>
);

export const IkeNote = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 rounded-lg border border-rust/30 bg-rust-soft px-3.5 py-3 text-sm text-ink">
    <span className="font-semibold text-rust-deep">Ike: </span>
    {children}
  </div>
);
