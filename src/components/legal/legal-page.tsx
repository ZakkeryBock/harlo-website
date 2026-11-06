import { Container } from "@/components/ui";
import { EFFECTIVE_DATE } from "@/lib/legal";

/**
 * Chrome for /privacy and /terms. The page bodies are copied verbatim from the
 * product repo (HarloTMS_NextJS src/app/privacy and src/app/terms) and must be
 * re-copied whenever those change. Only this wrapper is site-specific.
 */

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <div className="grid gap-3 text-[0.9875rem] leading-relaxed">{children}</div>
    </section>
  );
}

export function LegalList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="grid list-disc gap-1.5 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LegalPage({
  title,
  intro,
  showEffectiveDate = true,
  children,
}: {
  title: string;
  intro: React.ReactNode;
  showEffectiveDate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <main className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-h2 font-extrabold">{title}</h1>
        {showEffectiveDate && <p className="mt-3 text-sm text-muted">Effective {EFFECTIVE_DATE}</p>}
        <div className="mt-6 text-lead">{intro}</div>
        <div className="mt-12 grid gap-10 [&_a]:text-ink">{children}</div>
      </Container>
    </main>
  );
}
