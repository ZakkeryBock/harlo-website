import { Button, Container } from "@/components/ui";
import { LINKS } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="py-24 sm:py-32">
      <Container>
        <p className="text-sm font-semibold text-rust-ink">404</p>
        <h1 className="mt-3 max-w-xl text-h2 font-extrabold">This page took a wrong exit.</h1>
        <p className="mt-5 max-w-lg text-lead">
          The link may be old, or the page may have moved. Looking for the app? Log in at
          app.goharlo.com.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/">Go to the home page</Button>
          <Button href={LINKS.login} variant="secondary">
            Log in to Harlo
          </Button>
        </div>
      </Container>
    </main>
  );
}
