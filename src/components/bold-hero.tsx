import { Button, Container } from "./ui";
import { LINKS } from "@/lib/site";
import { TRIAL_NOTE } from "@/lib/content";

/** The words in a headline that get the rust colour and the hand-drawn line. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block text-rust-ink">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 300 16"
        preserveAspectRatio="none"
        className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-full"
      >
        <path
          className="hero-line"
          pathLength={100}
          d="M3 11 C 70 4, 150 4, 297 8"
          fill="none"
          stroke="var(--color-rust)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * The centered hero the home page set: a big headline, one line under it, the
 * trial CTA, and a product picture that sits half on paper, half on mist.
 */
export function BoldHero({
  title,
  lead,
  visual,
  cta = { href: LINKS.signup, label: "Start free trial" },
  secondary = { href: "/pricing", label: "See pricing" },
  note = TRIAL_NOTE,
}: {
  title: React.ReactNode;
  lead: React.ReactNode;
  visual?: React.ReactNode;
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {visual && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-mist sm:h-[38%]" />}
      <Container className="relative pt-12 pb-16 sm:pt-20 sm:pb-20 lg:pt-24">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="text-[clamp(2.75rem,1.6rem+4.6vw,5.5rem)] leading-[0.98] font-extrabold tracking-[-0.04em]">
            {title}
          </h1>
          <div className="mt-8 max-w-[38rem] text-lead">{lead}</div>
          <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
            {secondary && (
              <Button href={secondary.href} size="lg" variant="secondary">
                {secondary.label}
              </Button>
            )}
          </div>
          <p className="mt-4 text-sm text-muted">{note}</p>
        </div>
        {visual && <div className="mt-14 sm:mt-16">{visual}</div>}
      </Container>
    </section>
  );
}

export type Float = {
  pos: string;
  tilt: number;
  delay: number;
  tone: "go" | "rust" | "ink" | "warn";
  label: string;
  text: string;
};

const toneCls = {
  go: "bg-go-soft text-go",
  rust: "bg-rust-soft text-rust-deep",
  ink: "bg-mist text-ink",
  warn: "bg-warn-soft text-warn",
} as const;

/** A product picture with small cards drifting around it (wide screens only). */
export function FloatStage({ children, floats }: { children: React.ReactNode; floats: Float[] }) {
  return (
    <div className="relative mx-auto max-w-[68rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[12%] top-[8%] bottom-0 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_40%,rgb(202_107_68/0.22),transparent_70%)] blur-2xl"
      />
      <div className="relative z-10 mx-auto max-w-[44rem]">{children}</div>
      <div aria-hidden="true" className="hidden xl:block">
        {floats.map((f) => (
          <div key={f.text} className={`absolute z-20 ${f.pos}`} style={{ rotate: `${f.tilt}deg` }}>
            <div className="hero-scrap" style={{ animationDelay: `${-f.delay}s` }}>
              <div className="flex items-center gap-3 rounded-xl border border-line bg-paper px-3.5 py-3 shadow-[0_14px_34px_-16px_rgb(28_34_30/0.4)]">
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${toneCls[f.tone]}`}>
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3.5 8.5l3 3 6-7" />
                  </svg>
                </span>
                <span>
                  <span className="block text-[0.6875rem] font-semibold tracking-wide text-muted uppercase">{f.label}</span>
                  <span className="block text-[0.8125rem] font-semibold whitespace-nowrap text-ink">{f.text}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
