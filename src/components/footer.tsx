import Link from "next/link";
import { Wordmark } from "./logo";
import { Container } from "./ui";
import { LINKS } from "@/lib/site";
import { LEGAL_ENTITY, SUPPORT_EMAIL } from "@/lib/legal";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/carriers", label: "For carriers" },
      { href: "/brokers", label: "For brokers" },
      { href: "/workspaces", label: "Workspaces" },
      { href: "/ike", label: "Ike" },
      { href: "/apps", label: "Apps" },
      { href: "/go", label: "Harlo Go" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/security", label: "Security" },
      { href: "/partners", label: "Partners" },
      { href: LINKS.developers, label: "Developers" },
      { href: LINKS.sales, label: "Sales" },
      { href: LINKS.support, label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "https://app.goharlo.com/sms-consent", label: "SMS consent" },
      { href: "/privacy-choices", label: "Your privacy choices" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="on-pine bg-pine text-on-pine-muted">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Wordmark className="h-5 w-auto text-cream" />
          <p className="mt-6 text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] text-white">
            Logistics, <span className="text-rust-light">redefined.</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a className="text-on-pine hover:text-white" href={LINKS.login}>
              Log in to Harlo
            </a>
            <a className="text-on-pine hover:text-white" href={LINKS.goLogin}>
              Log in to Go
            </a>
          </div>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <h2 className="text-sm font-semibold text-on-pine">{c.title}</h2>
            <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("/") ? (
                    <Link className="hover:text-white" href={l.href}>
                      {l.label}
                    </Link>
                  ) : (
                    <a className="hover:text-white" href={l.href}>
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-pine-3">
        <Container className="flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {LEGAL_ENTITY}
          </p>
          <a className="hover:text-white" href={`mailto:${SUPPORT_EMAIL}`}>
            {SUPPORT_EMAIL}
          </a>
        </Container>
      </div>
    </footer>
  );
}
