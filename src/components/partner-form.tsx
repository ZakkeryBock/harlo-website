"use client";

import { useEffect, useId, useRef, useState } from "react";
import { PARTNER_ENDPOINT, TURNSTILE_SITE_KEY } from "@/lib/site";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export const PARTNER_KINDS = [
  { value: "integration", label: "Technology or integration", hint: "ELDs, telematics, visibility, load boards, software" },
  { value: "financial", label: "Factoring or financial services", hint: "Factoring, fuel cards, payments, lending" },
  { value: "insurance", label: "Insurance", hint: "Trucking and freight insurance" },
  { value: "reseller", label: "Reseller or consultant", hint: "You set up and support Harlo for carriers" },
  { value: "referral", label: "Referral partner", hint: "Associations, communities, schools, advisors" },
  { value: "other", label: "Something else", hint: "Tell us what you have in mind" },
] as const;

const field =
  "mt-1.5 block w-full rounded-lg border border-line bg-paper px-3.5 py-2.5 text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink/40 focus-visible:ring-2 focus-visible:ring-rust-ink/30";

/** The goharlo.com/partners form: Turnstile, then the partner-inquiry function. */
export function PartnerForm({ fallbackEmail }: { fallbackEmail: string }) {
  const id = useId();
  const widget = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState("");
  const [kind, setKind] = useState<string>("integration");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || sentTo) return;
    let cancelled = false;
    const render = () => {
      if (cancelled || !widget.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(widget.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
        action: "partner_inquiry",
        callback: (t: string) => setToken(t),
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };
    if (window.turnstile) render();
    else {
      const src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      let s = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
      if (!s) {
        s = document.createElement("script");
        s.src = src;
        s.async = true;
        document.head.appendChild(s);
      }
      s.addEventListener("load", render);
    }
    return () => {
      cancelled = true;
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [sentTo]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(PARTNER_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(f.entries()), partner_type: kind, turnstile_token: token }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) throw new Error(body.error || "That didn't go through.");
      setSentTo(String(f.get("name") || "").split(" ")[0] || "there");
    } catch (err) {
      setError(
        err instanceof TypeError
          ? `We couldn't reach Harlo. Check your connection, or email ${fallbackEmail}.`
          : (err as Error).message,
      );
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      setToken("");
    } finally {
      setBusy(false);
    }
  }

  if (sentTo) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-paper p-8">
        <p className="text-h3 font-bold text-ink">Thanks, {sentTo}. It&apos;s with us.</p>
        <p className="mt-3">
          Someone from the Harlo team will reply to the email you gave us. If it&apos;s urgent, write to{" "}
          <a className="font-semibold text-ink underline underline-offset-2" href={`mailto:${fallbackEmail}`}>
            {fallbackEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative grid gap-6 rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <fieldset>
        <legend className="font-semibold text-ink">What kind of partner are you?</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {PARTNER_KINDS.map((k) => (
            <label
              key={k.value}
              className={`flex cursor-pointer gap-3 rounded-lg border px-3.5 py-3 transition-colors ${
                kind === k.value ? "border-rust-ink bg-rust-soft/60" : "border-line hover:border-ink/25"
              }`}
            >
              <input
                type="radio"
                name="kind"
                value={k.value}
                checked={kind === k.value}
                onChange={() => setKind(k.value)}
                className="mt-1 accent-[var(--color-rust-ink)]"
              />
              <span>
                <span className="block text-[0.9375rem] font-semibold text-ink">{k.label}</span>
                <span className="block text-sm text-muted">{k.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block" htmlFor={`${id}-company`}>
          <span className="text-[0.9375rem] font-semibold text-ink">Company</span>
          <input id={`${id}-company`} name="company" required maxLength={160} autoComplete="organization" className={field} />
        </label>
        <label className="block" htmlFor={`${id}-name`}>
          <span className="text-[0.9375rem] font-semibold text-ink">Your name</span>
          <input id={`${id}-name`} name="name" required maxLength={120} autoComplete="name" className={field} />
        </label>
        <label className="block" htmlFor={`${id}-email`}>
          <span className="text-[0.9375rem] font-semibold text-ink">Work email</span>
          <input id={`${id}-email`} name="email" type="email" required maxLength={254} autoComplete="email" className={field} />
        </label>
        <label className="block" htmlFor={`${id}-phone`}>
          <span className="text-[0.9375rem] font-semibold text-ink">
            Phone <span className="font-normal text-muted">(optional)</span>
          </span>
          <input id={`${id}-phone`} name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
        </label>
        <label className="block sm:col-span-2" htmlFor={`${id}-website`}>
          <span className="text-[0.9375rem] font-semibold text-ink">
            Website <span className="font-normal text-muted">(optional)</span>
          </span>
          <input id={`${id}-website`} name="website" type="url" maxLength={300} placeholder="https://" autoComplete="url" className={field} />
        </label>
        <label className="block sm:col-span-2" htmlFor={`${id}-message`}>
          <span className="text-[0.9375rem] font-semibold text-ink">What do you have in mind?</span>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            minLength={10}
            maxLength={4000}
            rows={5}
            placeholder="Who you serve, what you'd build or offer together, and anything we should read first."
            className={`${field} resize-y`}
          />
        </label>
      </div>

      {/* People never see or fill this; form-filling bots do. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input name="website_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4">
        {TURNSTILE_SITE_KEY ? <div ref={widget} className="min-h-[65px]" /> : null}
        {error && (
          <p role="alert" className="rounded-lg bg-stop-soft px-3.5 py-2.5 text-[0.9375rem] text-stop">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={busy || !token}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-rust-ink px-6 font-semibold text-white transition-colors hover:bg-rust-deep disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send to Harlo"}
          </button>
          <p className="text-sm text-muted">
            {token ? "We use what you send only to reply to you." : "Confirm you're a person above to send."}
          </p>
        </div>
      </div>
    </form>
  );
}
