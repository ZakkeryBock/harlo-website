import { Peak } from "./logo";
import { Button, Container } from "./ui";
import { LINKS } from "@/lib/site";
import { TRIAL_NOTE } from "@/lib/content";

export function EndCta({
  title = "See your operation running on Harlo.",
  body = "Start free and add your first load. Within minutes you'll see Ike at work on your own freight.",
  href = LINKS.signup,
  label = "Start my free trial",
}: {
  title?: string;
  body?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-rust-ink text-white">
      <Peak
        className="pointer-events-none absolute -right-24 -bottom-16 w-[34rem] max-w-none opacity-[0.12] sm:-right-10"
        color="#ffffff"
      />
      <Container className="relative py-20 sm:py-24">
        <h2 className="max-w-2xl text-h2 font-extrabold text-white">{title}</h2>
        <p className="mt-5 max-w-xl text-lead text-white/90">{body}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href={href} variant="light" size="lg">
            {label}
          </Button>
          <Button
            href={
              href === LINKS.signupBroker ? "/pricing#broker" : href === LINKS.signupBoth ? "/pricing#both" : "/pricing"
            }
            size="lg"
            variant="outline-light"
          >
            Compare plans
          </Button>
        </div>
        <p className="mt-5 text-sm text-white/90">
          {TRIAL_NOTE}
        </p>
      </Container>
    </section>
  );
}
