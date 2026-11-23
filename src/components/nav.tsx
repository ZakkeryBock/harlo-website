"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./logo";
import { Button, Container } from "./ui";
import { LINKS } from "@/lib/site";

type Item = { href: string; label: string; menu?: boolean };

const ITEMS: Item[] = [
  { href: "/carriers", label: "Carriers" },
  { href: "/brokers", label: "Brokers" },
  { href: "/workspaces", label: "Workspaces" },
  { href: "/ike", label: "Ike" },
  { href: "/apps", label: "Apps", menu: true },
  { href: "/pricing", label: "Pricing" },
];

/** The Apps menu: one Harlo account on every screen. */
const APPS = [
  {
    href: "/apps#desktop",
    name: "Harlo for desktop",
    d: "The full system, in any browser.",
    icon: "M2.5 4.5h15v9h-15zM7 16.5h6M10 13.5v3",
  },
  {
    href: "/go",
    name: "Harlo Go",
    d: "Harlo on your phone. Every plan.",
    icon: "M6.5 2.5h7a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1zM9 15h2",
  },
  {
    href: "/apps#driver",
    name: "Harlo Driver",
    d: "For driver phones and truck tablets.",
    icon: "M3 5.5h14v10H3zM6 18h8M8 9l2 2 3-3",
  },
];

function AppIcon({ d }: { d: string }) {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-mist text-rust-ink">
      <svg viewBox="0 0 20 20" className="size-[1.1rem]" fill="none" aria-hidden="true">
        <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function AppsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const enter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    timer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div ref={ref} className="relative" onPointerEnter={enter} onPointerLeave={leave}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="apps-menu"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:text-ink ${
          active ? "text-ink" : "text-body"
        }`}
      >
        Apps
        <svg viewBox="0 0 12 12" className={`size-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div id="apps-menu" className="absolute top-full left-1/2 z-50 w-[22rem] -translate-x-1/2 pt-2">
          <div className="rounded-2xl border border-line bg-paper p-2 shadow-[0_24px_60px_-24px_rgb(28_34_30/0.35)]">
            {APPS.map((a) => (
              <Link
                key={a.name}
                href={a.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-mist"
              >
                <AppIcon d={a.icon} />
                <span>
                  <span className="block text-sm font-semibold text-ink">{a.name}</span>
                  <span className="block text-xs text-muted">{a.d}</span>
                </span>
              </Link>
            ))}
            <Link
              href="/apps"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between border-t border-line px-3 pt-3 pb-2 text-sm font-semibold text-rust-ink hover:underline"
            >
              How the apps work together
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const signup = path === "/go" ? LINKS.goSignup : LINKS.signup;

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-md transition-[border-color] ${
        scrolled || open ? "border-b border-line" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center gap-8">
        <Link href="/" className="shrink-0 text-ink" aria-label="Harlo home" onClick={() => setOpen(false)}>
          <Wordmark className="h-[1.15rem] w-auto" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {ITEMS.map((i) => {
            const on = i.href === path;
            if (i.menu) return <AppsMenu key={i.href} active={on || path === "/go"} />;
            return (
              <Link
                key={i.href}
                href={i.href}
                aria-current={on ? "page" : undefined}
                className={`rounded-md px-3 py-2 text-[0.9375rem] font-medium transition-colors hover:text-ink ${
                  on ? "text-ink" : "text-body"
                }`}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <a
            href={path === "/go" ? LINKS.goLogin : LINKS.login}
            className="hidden rounded-md px-3 py-2 text-[0.9375rem] font-medium text-body hover:text-ink sm:block"
          >
            Log in
          </a>
          <Button href={signup} size="sm">
            Start free trial
          </Button>
          <button
            type="button"
            className="-mr-2 grid size-10 place-items-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto bg-paper lg:hidden">
          <Container className="flex flex-col pt-2 pb-8">
            {ITEMS.map((i) =>
              i.menu ? (
                <div key={i.href} className="border-b border-line py-4">
                  <Link href={i.href} onClick={() => setOpen(false)} className="text-lg font-semibold text-ink">
                    {i.label}
                  </Link>
                  <div className="mt-3 grid gap-1">
                    {APPS.map((a) => (
                      <Link
                        key={a.name}
                        href={a.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl py-2"
                      >
                        <AppIcon d={a.icon} />
                        <span>
                          <span className="block font-semibold text-ink">{a.name}</span>
                          <span className="block text-sm text-muted">{a.d}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={i.href}
                  href={i.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 text-lg font-semibold text-ink"
                >
                  {i.label}
                </Link>
              ),
            )}
            <div className="mt-8 grid gap-3">
              <Button href={signup} size="lg">
                Start free trial
              </Button>
              <Button href={path === "/go" ? LINKS.goLogin : LINKS.login} variant="secondary" size="lg">
                Log in
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Try Pro free for 14 days. No card required.
            </p>
          </Container>
        </div>
      )}
    </header>
  );
}
