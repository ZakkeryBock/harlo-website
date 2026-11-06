"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./logo";
import { Button, Container } from "./ui";
import { LINKS } from "@/lib/site";

const ITEMS = [
  { href: "/carriers", label: "Carriers" },
  { href: "/brokers", label: "Brokers" },
  { href: "/workspaces", label: "Workspaces" },
  { href: "/ike", label: "Ike AI" },
  { href: "/apps", label: "Apps" },
  { href: "/pricing", label: "Pricing" },
];

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
            {ITEMS.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-lg font-semibold text-ink"
              >
                {i.label}
              </Link>
            ))}
            <div className="mt-8 grid gap-3">
              <Button href={signup} size="lg">
                Start my free trial
              </Button>
              <Button href={LINKS.login} variant="secondary" size="lg">
                Log in
              </Button>
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Free for 14 days. No card required.
            </p>
          </Container>
        </div>
      )}
    </header>
  );
}
