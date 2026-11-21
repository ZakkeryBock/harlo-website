"use client";

import { useSyncExternalStore } from "react";
import { ANY_PIXEL, gpcOn, optedOut, setOptOut } from "./ad-pixels";

type State = "loading" | "none" | "gpc" | "on" | "off";

const noop = () => () => {};
const read = (): State =>
  !ANY_PIXEL ? "none" : gpcOn() ? "gpc" : optedOut() ? "off" : "on";

/** The opt-out toggle. Reloads so a pixel already on the page is gone too. */
export function PrivacyChoices() {
  // Static export: the server has no browser to ask, so it renders "loading".
  const state = useSyncExternalStore<State>(noop, read, () => "loading");

  if (state === "loading") return <div className="mt-10 h-24" />;

  return (
    <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-line bg-mist p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-ink">Advertising cookies</p>
        <p className="mt-1 text-sm">
          {state === "none"
            ? "None in use on goharlo.com right now."
            : state === "gpc"
              ? "Off. Your browser sends Global Privacy Control."
              : state === "off"
                ? "Off in this browser."
                : "On in this browser."}
        </p>
      </div>
      {(state === "on" || state === "off") && (
        <button
          type="button"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-rust-ink px-5 text-[0.9375rem] font-semibold text-white hover:bg-rust-deep"
          onClick={() => {
            setOptOut(state === "on");
            window.location.reload();
          }}
        >
          {state === "on" ? "Turn off" : "Turn on"}
        </button>
      )}
    </div>
  );
}
