import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PrivacyChoices } from "@/components/privacy-choices";

export const metadata: Metadata = {
  title: "Your privacy choices",
  description: "Turn off advertising cookies on goharlo.com.",
};

export default function PrivacyChoicesPage() {
  return (
    <main>
      <Container className="max-w-2xl py-16 sm:py-24">
        <h1 className="text-h2 font-extrabold">Your privacy choices</h1>
        <p className="mt-5 text-lead">
          goharlo.com may use advertising cookies from Google, Meta and LinkedIn to measure our ads. The Harlo
          apps never do. Turn them off here.
        </p>
        <PrivacyChoices />
        <p className="mt-8 text-sm text-muted">
          Your choice is saved in this browser. A Global Privacy Control signal always turns them off. Details
          in our{" "}
          <a className="font-semibold text-ink underline underline-offset-2" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </Container>
    </main>
  );
}
