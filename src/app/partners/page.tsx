import type { Metadata } from "next";
import { Peak } from "@/components/logo";
import { PartnerForm } from "@/components/partner-form";
import { Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Partner with Harlo: integrations, factoring and financial services, insurance, resellers and referral partners. Tell us what you have in mind.",
  alternates: { canonical: "/partners" },
};

const PARTNER_EMAIL = "sales@goharlo.com";

const KINDS = [
  {
    t: "Technology and integrations",
    d: "ELDs and telematics, load tracking, load boards, accounting and other software. Your data shows up where dispatchers already work, through the Harlo API or a built-in connection in Settings, Integrations.",
  },
  {
    t: "Factoring and financial services",
    d: "Harlo already knows when a load is delivered, invoiced and paid. Offer factoring, fuel cards or payments to carriers at the moment they need them, with paperwork that's already complete.",
  },
  {
    t: "Insurance",
    d: "Carriers keep their equipment, drivers and authority in Harlo. Help them get covered, and stay covered, without retyping the fleet.",
  },
  {
    t: "Resellers, consultants and referrals",
    d: "Set carriers up on Harlo, train their teams, or simply point the people you advise our way. Associations, schools and communities welcome.",
  },
];

export default function PartnersPage() {
  return (
    <main>
      <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 sm:pb-20">
        <Peak className="pointer-events-none absolute -top-10 -right-40 hidden w-[40rem] max-w-none opacity-[0.07] lg:block" />
        <Container className="relative">
          <h1 className="max-w-[18ch] text-display font-extrabold">Build what carriers need, with us.</h1>
          <p className="mt-6 max-w-2xl text-lead">
            Harlo runs loads, dispatch, compliance and billing for carriers and brokers. If your product or service makes
            that work easier, we want to hear from you. Messages go to the people who build Harlo.
          </p>
        </Container>
      </section>

      <section className="border-y border-line bg-mist py-16 sm:py-20">
        <Container>
          <h2 className="text-h2 font-extrabold">Who we partner with</h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
            {KINDS.map((k) => (
              <div key={k.t} className="border-l-2 border-rust pl-5">
                <h3 className="text-h3 font-bold">{k.t}</h3>
                <p className="mt-2">{k.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 max-w-2xl">
            Building an integration? The Harlo API is documented at{" "}
            <a className="font-semibold text-ink underline underline-offset-2" href={LINKS.developers}>
              developer.goharlo.com
            </a>
            , and any Harlo customer can make a key today. Partners get a test workspace to build against.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="text-h2 font-extrabold">Tell us about it</h2>
            <ol className="mt-8 grid gap-6">
              {[
                ["You write", "A few lines on who you serve and what you'd do together."],
                ["We reply", "Someone from the Harlo team answers you by email."],
                ["We build it", "A call to agree the details, a test workspace if you need one, then launch."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-pine text-sm font-bold text-cream">{i + 1}</span>
                  <span>
                    <span className="block font-bold text-ink">{t}</span>
                    <span className="block">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-sm text-muted">
              Prefer email? Write to{" "}
              <a className="font-semibold text-ink underline underline-offset-2" href={`mailto:${PARTNER_EMAIL}?subject=Partnering%20with%20Harlo`}>
                {PARTNER_EMAIL}
              </a>
              . Looking for help with your own Harlo account?{" "}
              <a className="font-semibold text-ink underline underline-offset-2" href={LINKS.support}>
                Contact support
              </a>
              .
            </p>
          </div>
          <PartnerForm fallbackEmail={PARTNER_EMAIL} />
        </Container>
      </section>
    </main>
  );
}
