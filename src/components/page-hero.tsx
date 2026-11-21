import { Button, Container } from "./ui";
import { LINKS } from "@/lib/site";
import { TRIAL_NOTE } from "@/lib/content";

/** The standard hero for inner pages: headline, lead, the trial CTA, and an optional visual. */
export function PageHero({
  title,
  lead,
  visual,
  secondary = { href: "/pricing", label: "See pricing" },
  cta = { href: LINKS.signup, label: "Start free trial" },
  note = TRIAL_NOTE,
}: {
  title: string;
  lead: React.ReactNode;
  visual?: React.ReactNode;
  secondary?: { href: string; label: string } | null;
  cta?: { href: string; label: string };
  note?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {visual && <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-mist lg:block" />}
      <Container
        className={`relative grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:gap-16 lg:pt-20 lg:pb-24 ${
          visual ? "lg:grid-cols-[1fr_1fr]" : ""
        }`}
      >
        <div>
          <h1 className="max-w-[16ch] text-display font-extrabold">{title}</h1>
          <div className="mt-6 max-w-[34rem] text-lead">{lead}</div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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
        {visual && <div className="lg:pl-2">{visual}</div>}
      </Container>
    </section>
  );
}
