"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Peak } from "./logo";

/**
 * The home page's Ike moment: a question types itself, Ike thinks, the answer
 * streams in and a proposed next step appears for a person to approve. Cycles
 * through four scenes; the tabs jump between them. Runs only while on screen,
 * and under reduced motion shows each scene finished. All examples made up.
 */

type Scene = { tab: string; q: string; a: string; action: string; detail: string; btn: string };

const SCENES: Scene[] = [
  {
    tab: "Watches",
    q: "What needs my attention today?",
    a: "Two deliveries are running behind and one certificate expires Friday. I drafted updates for both customers.",
    action: "2 customer updates",
    detail: "Ready to send",
    btn: "Review",
  },
  {
    tab: "Reads",
    q: "Did the paperwork from this morning come in?",
    a: "Yes. The signed delivery receipt arrived at 8:52 and is filed to the load. It's ready to bill.",
    action: "Invoice #4821",
    detail: "Receipt attached",
    btn: "Send invoice",
  },
  {
    tab: "Answers",
    q: "Which lanes made us the most this month?",
    a: "Your top three lanes brought in 31% of margin. The Midwest run leads at $612 a load, up 8% from last month.",
    action: "Lane report",
    detail: "Updated just now",
    btn: "Open",
  },
  {
    tab: "Drafts",
    q: "A truck just broke down. What are my options?",
    a: "Two available trucks are within three hours of the load. I drafted the swap and a heads-up to the customer.",
    action: "Swap plan",
    detail: "Needs your approval",
    btn: "Approve",
  },
];

const TYPE = 38; // ms per character
const THINK = 1100;
const WORD = 70; // ms per word
const HOLD = 3200;
const TICK = 40;

function timing(s: Scene) {
  const typed = s.q.length * TYPE;
  const thought = typed + THINK;
  const words = s.a.split(" ");
  const answered = thought + words.length * WORD;
  return { typed, thought, answered, total: answered + 500 + HOLD, words };
}

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export function IkeConsole() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [t, setT] = useState(0);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const ring = useRef<HTMLDivElement>(null);

  // The ring's bright edge points at the cursor while it's anywhere near the
  // console; when the cursor leaves, the ring goes back to circling on its own.
  useEffect(() => {
    const el = ring.current;
    if (!el || reduced) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const near =
        e.clientX > r.left - 240 && e.clientX < r.right + 240 && e.clientY > r.top - 240 && e.clientY < r.bottom + 240;
      if (!near) {
        el.classList.remove("is-tracking");
        return;
      }
      const deg = (Math.atan2(e.clientX - cx, cy - e.clientY) * 180) / Math.PI;
      el.style.setProperty("--ike-a", `${deg - 270}deg`);
      el.style.setProperty("--ike-x", `${e.clientX - r.left}px`);
      el.style.setProperty("--ike-y", `${e.clientY - r.top}px`);
      el.classList.add("is-tracking");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !visible) return;
    const id = setInterval(() => {
      elapsed.current += TICK;
      if (elapsed.current >= timing(SCENES[i]).total) {
        elapsed.current = 0;
        setI((i + 1) % SCENES.length);
      }
      setT(elapsed.current);
    }, TICK);
    return () => clearInterval(id);
  }, [i, reduced, visible]);

  const scene = SCENES[i];
  const tm = timing(scene);
  const now = reduced ? tm.total : t;
  const chars = Math.min(scene.q.length, Math.floor(now / TYPE));
  const thinking = now >= tm.typed && now < tm.thought;
  const shownWords = now < tm.thought ? 0 : Math.min(tm.words.length, Math.floor((now - tm.thought) / WORD) + 1);
  const showAction = now >= tm.answered + 300;

  const go = (n: number) => {
    elapsed.current = 0;
    setI(n);
    setT(0);
  };

  return (
    <div ref={box} className="relative mx-auto max-w-3xl">
      {/* tabs */}
      <div role="tablist" aria-label="What Ike does" className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur">
        {SCENES.map((s, n) => {
          const active = n === i;
          return (
            <button
              key={s.tab}
              role="tab"
              aria-selected={active}
              onClick={() => go(n)}
              className={`relative overflow-hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "bg-white text-ink" : "text-on-pine-muted hover:text-white"
              }`}
            >
              {active && !reduced && (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-rust"
                  style={{ transform: `scaleX(${now / tm.total})` }}
                />
              )}
              {s.tab}
            </button>
          );
        })}
      </div>

      {/* console */}
      <div ref={ring} className="ike-ring relative mt-6">
        <div aria-hidden="true" className="ike-halo pointer-events-none absolute -inset-px rounded-[1.75rem]" />
        <div aria-hidden="true" className="ike-spot pointer-events-none absolute inset-0 z-10 rounded-[1.75rem]" />
        <div className="relative rounded-[1.75rem] border border-white/10 bg-[#202723]/90 p-5 shadow-[0_40px_120px_-40px_rgb(202_107_68/0.45)] backdrop-blur sm:p-7">
          {/* Every scene, finished and invisible, in the same cell as the live one:
              the box is always as tall as the longest scene, so it never resizes. */}
          <div className="grid">
            {SCENES.map((sc) => (
              <div key={sc.tab} aria-hidden="true" className="invisible [grid-area:1/1]">
                <Body scene={sc} chars={sc.q.length} thinking={false} words={sc.a.split(" ")} shownWords={Infinity} showAction />
              </div>
            ))}
            <div className="[grid-area:1/1]">
              <Body
                scene={scene}
                chars={chars}
                thinking={thinking}
                words={tm.words}
                shownWords={shownWords}
                showAction={showAction}
                live
              />
            </div>
          </div>

          {/* the input */}
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <span className="flex-1 truncate text-sm text-on-pine-muted">Ask Ike anything about your operation…</span>
            <span className="grid size-8 place-items-center rounded-full bg-rust-ink text-white">
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Body({
  scene,
  chars,
  thinking,
  words,
  shownWords,
  showAction,
  live = false,
}: {
  scene: Scene;
  chars: number;
  thinking: boolean;
  words: string[];
  shownWords: number;
  showAction: boolean;
  live?: boolean;
}) {
  const typing = live && chars < scene.q.length;
  return (
    <>
      {/* the question */}
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white/10 px-4 py-3 text-[0.9375rem] text-white sm:text-base">
          {live && <span className="sr-only">{scene.q}</span>}
          <span aria-hidden="true">
            {scene.q.slice(0, chars)}
            {typing && <span className="ike-caret ml-0.5 inline-block h-[1.05em] w-0.5 translate-y-[0.15em] bg-rust-light" />}
            {chars === 0 && <span className="text-on-pine-muted">&nbsp;</span>}
          </span>
        </p>
      </div>

      {/* the answer */}
      <div className="mt-5 flex gap-3 sm:gap-4">
        <span
          className={`ike-orb relative grid size-9 shrink-0 place-items-center rounded-full bg-rust-ink sm:size-10 ${thinking ? "is-thinking" : ""}`}
        >
          <Peak className="h-3 w-auto" color="#fff" />
        </span>
        <div className="min-w-0 flex-1 pt-1.5">
          <p className="text-xs font-semibold tracking-wide text-on-pine-muted uppercase">Ike</p>
          {thinking ? (
            <p className="mt-2 flex items-center gap-1.5" aria-label="Ike is thinking">
              <span className="ike-dot size-1.5 rounded-full bg-on-pine" />
              <span className="ike-dot size-1.5 rounded-full bg-on-pine [animation-delay:150ms]" />
              <span className="ike-dot size-1.5 rounded-full bg-on-pine [animation-delay:300ms]" />
            </p>
          ) : (
            <p className="mt-1.5 text-base leading-relaxed text-white sm:text-lg" aria-live={live ? "polite" : undefined}>
              {words.slice(0, shownWords).map((w, n) => (
                <span key={n} className={live ? "ike-word" : ""}>
                  {w}{" "}
                </span>
              ))}
            </p>
          )}

          <div
            className={`mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 transition-all duration-500 ease-out ${
              showAction ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
            }`}
            aria-hidden={!showAction}
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-rust/20 text-rust-light">
              <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2.5l1.8 4.7 4.7 1.8-4.7 1.8L10 15.5l-1.8-4.7L3.5 9l4.7-1.8z" />
              </svg>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-tight font-semibold text-white">{scene.action}</p>
              <p className="truncate text-xs text-on-pine-muted">{scene.detail}</p>
            </div>
            <span className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-ink">{scene.btn}</span>
          </div>
        </div>
      </div>
    </>
  );
}
