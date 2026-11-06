"use client";

import { useId, useState } from "react";
import { Check } from "./ui";

/**
 * One load, followed through the jobs a team does with it. These really are a
 * sequence, so the tabs are numbered. Step content lives in carrier-steps.tsx
 * and broker-steps.tsx.
 */

export type Step = {
  key: string;
  tab: string;
  title: string;
  body: string;
  points: string[];
  panel: React.ReactNode;
};

export function Workflow({ steps, label }: { steps: Step[]; label: string }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const step = steps[active];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : steps.length - 1)) % steps.length;
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={label}
        className="-mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:px-0"
        onKeyDown={onKey}
      >
        {steps.map((s, i) => (
          <button
            key={s.key}
            id={`${id}-tab-${i}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`${id}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`group flex shrink-0 items-center gap-2.5 rounded-lg border px-4 py-2.5 text-[0.9375rem] font-semibold transition-colors ${
              i === active
                ? "border-ink bg-ink text-white"
                : "border-line bg-paper text-body hover:border-ink/30 hover:text-ink"
            }`}
          >
            <span
              className={`grid size-5 place-items-center rounded-full text-[0.6875rem] tabular-nums ${
                i === active ? "bg-white/15 text-white" : "bg-mist text-muted"
              }`}
            >
              {i + 1}
            </span>
            {s.tab}
          </button>
        ))}
      </div>

      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        className="mt-10 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16"
      >
        <div key={step.key} className="max-w-xl">
          <h3 className="text-[1.75rem] leading-tight font-bold tracking-[-0.02em]">{step.title}</h3>
          <p className="mt-4 text-lead">{step.body}</p>
          <ul className="mt-6 grid gap-3">
            {step.points.map((p) => (
              <li key={p} className="flex gap-3">
                <Check className="mt-1 text-rust-ink" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-mist p-4 sm:p-8">{step.panel}</div>
      </div>
    </div>
  );
}
