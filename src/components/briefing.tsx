import { Check } from "./ui";

/**
 * The hero's product moment: Ike's morning brief. Harlo has been watching the
 * whole operation overnight and lands on the four things that need a person,
 * each with the fix already drafted. Items arrive one by one (see .demo in
 * globals.css) and show finished under reduced motion. All names and numbers
 * are made up.
 */

type Tone = "warn" | "stop" | "rust" | "go";

export type BriefItem = {
  tone: Tone;
  title: string;
  body: string;
  action?: string;
  secondary?: string;
  done?: string;
};

const DOT: Record<Tone, string> = {
  warn: "bg-warn",
  stop: "bg-stop",
  rust: "bg-rust",
  go: "bg-go",
};

export const HOME_BRIEF: BriefItem[] = [
  {
    tone: "warn",
    title: "HB-20417 is trending 40 minutes late",
    body: "Midwest Paper's Nashville appointment is 11:00. I drafted a heads-up with the new ETA.",
    action: "Send update",
    secondary: "Edit",
  },
  {
    tone: "stop",
    title: "Unit 204 can't run Thursday's Joliet load",
    body: "Its annual inspection lapses Wednesday. Unit 118 is open, qualified and 12 miles closer.",
    action: "Swap to Unit 118",
    secondary: "Keep 204",
  },
  {
    tone: "rust",
    title: "Joliet to Columbus margin is down 18% this month",
    body: "Fuel advances doubled on that lane across 6 loads. Want the breakdown by driver?",
    action: "Show me",
  },
  {
    tone: "go",
    title: "Lakeshore Transport is cleared to book again",
    body: "Their renewed insurance certificate came in by email. I read it and filed it.",
    done: "Done, logged",
  },
];

export const CARRIER_BRIEF: BriefItem[] = [
  {
    tone: "stop",
    title: "Dana Whitfield's medical card expires in 6 days",
    body: "She's on two loads next week. I can text her the renewal reminder and flag both loads.",
    action: "Text Dana",
    secondary: "Later",
  },
  {
    tone: "warn",
    title: "Unit 204's annual inspection is due Wednesday",
    body: "Thursday's Joliet load is assigned to it. Unit 118 is open and qualified.",
    action: "Swap to Unit 118",
  },
  {
    tone: "rust",
    title: "Three delivered loads still have no POD",
    body: "NL-88412, NL-88430 and NL-88441. That's $3,410 you can't invoice yet.",
    action: "Ask the drivers",
  },
  {
    tone: "go",
    title: "Marcus Reyes arrived in Columbus at 8:52",
    body: "Stop time saved to NL-88412 from his text. On time for the 9:00 appointment.",
    done: "Logged",
  },
];

export function Briefing({
  items = HOME_BRIEF,
  greeting = "Good morning, Ray",
  workspace = "Reyes Logistics",
  kind = "broker",
  watching = "Ike is watching 214 loads",
}: {
  items?: BriefItem[];
  greeting?: string;
  workspace?: string;
  kind?: "broker" | "carrier";
  watching?: string;
}) {
  const initials = workspace
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  const count = items.filter((i) => !i.done).length;
  return (
    <div
      className="demo relative rounded-2xl border border-line bg-paper shadow-[0_1px_0_rgb(28_34_30/0.04),0_24px_60px_-28px_rgb(28_34_30/0.35)]"
      role="img"
      aria-label={`Ike's morning brief. ${items.map((i) => `${i.title}. ${i.body}`).join(" ")}`}
    >
      <div aria-hidden="true">
        <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
          <span className="flex min-w-0 items-center gap-1.5 rounded-md bg-mist px-2 py-1 text-xs font-semibold text-ink">
            <span
              className={`grid size-4 shrink-0 place-items-center rounded-[4px] text-[0.5625rem] font-bold ${
                kind === "broker" ? "bg-rust-ink text-white" : "bg-pine text-cream"
              }`}
            >
              {initials}
            </span>
            <span className="truncate">{workspace}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted">
            <span className="size-1.5 rounded-full bg-go" />
            {watching}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div data-step style={{ "--d": 200 } as React.CSSProperties}>
            <p className="text-sm text-muted">{greeting}</p>
            <p className="text-lg leading-snug font-bold text-ink">
              {count} things need you this morning. The rest is handled.
            </p>
          </div>

          <ul className="mt-4 grid gap-2.5">
            {items.map((it, i) => (
              <li
                key={it.title}
                data-step
                style={{ "--d": 700 + i * 650 } as React.CSSProperties}
                className="rounded-xl border border-line p-3.5"
              >
                <div className="flex gap-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${DOT[it.tone]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-snug font-semibold text-ink">{it.title}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-body">{it.body}</p>
                    {it.action && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        <span
                          className={`inline-flex h-7 items-center rounded-md bg-rust-ink px-2.5 text-xs font-semibold text-white ${
                            i === 0 ? "demo-cta" : ""
                          }`}
                          style={i === 0 ? { animationDelay: "3600ms" } : undefined}
                        >
                          {it.action}
                        </span>
                        {it.secondary && (
                          <span className="inline-flex h-7 items-center rounded-md border border-line px-2.5 text-xs font-semibold text-ink">
                            {it.secondary}
                          </span>
                        )}
                      </div>
                    )}
                    {it.done && (
                      <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-go">
                        <Check className="size-3.5" />
                        {it.done}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p
            data-step
            style={{ "--d": 700 + items.length * 650 } as React.CSSProperties}
            className="mt-4 text-xs text-muted"
          >
            Ike proposes. Your team approves. Every action is logged.
          </p>
        </div>
      </div>
    </div>
  );
}
