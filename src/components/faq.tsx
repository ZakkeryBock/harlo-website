export type QA = { q: string; a: React.ReactNode };

export const FAQ_TRIAL: QA[] = [
  {
    q: "Do I need a credit card to start?",
    a: "No. Your trial runs for 14 days with every feature turned on, and we never ask for a card until you choose a paid plan.",
  },
  {
    q: "What happens when the 14 days are up?",
    a: "Your workspace moves to Free on its own and nothing is deleted. Free covers up to 2 trucks for carriers and 25 loads a month for brokers. Above that you can still see everything, but you can't add new loads, trucks or users until you pick a plan.",
  },
  {
    q: "What counts as a truck?",
    a: "An active power unit in Harlo. Trailers, drivers, dispatchers and office users are never billed. Trucks you add partway through a month are prorated.",
  },
  {
    q: "What's an AI credit?",
    a: "One task for Ike, such as reading a document or answering a question. Every plan includes a monthly allowance that resets on the 1st. On paid plans, anything over the allowance is billed at 5 cents a credit (4 cents on Fleet), with a hard ceiling so a busy month never turns into a surprise.",
  },
  {
    q: "Can I pay yearly?",
    a: "Yes. Yearly billing costs ten months' price for twelve months of service, so two months are free. You can switch between monthly and yearly from your billing settings.",
  },
  {
    q: "Is there a contract?",
    a: "Monthly plans are month to month and you can cancel any time. Cancelling stops the next renewal and your account stays open until the end of the period you paid for.",
  },
  {
    q: "Do my drivers need to install an app?",
    a: "No. Drivers who opt in get load details by text. On Pro and up you can also give them Harlo Driver, a dedicated app for their phone or the truck's tablet with load plans, stops and messages from dispatch.",
  },
  {
    q: "Who can see my data?",
    a: (
      <>
        Only people in your company. Every account is isolated at the database level, changes are
        recorded in an audit log, and Ike proposes changes rather than making them on its own. Read the{" "}
        <a className="font-semibold text-ink underline underline-offset-2" href="/privacy">
          privacy policy
        </a>{" "}
        for the details.
      </>
    ),
  },
];

/** Pricing-page questions: the trial ones plus how brokers and the bundle are billed. */
export const FAQ_BILLING: QA[] = [
  ...FAQ_TRIAL.slice(0, 3),
  {
    q: "Do the apps cost extra?",
    a: "No. Every plan includes Harlo on desktop and the Harlo Go phone app, signed in to the same account. Pro and up also include Harlo Driver for your drivers' phones and truck tablets. Your plan decides what's inside, not which devices you can use.",
  },
  {
    q: "What counts as a load for a brokerage?",
    a: "A load booked in your brokerage workspace and covered by a carrier during the month. Quotes and cancelled loads don't count, and on the Carrier + Broker plan neither do loads you cover with your own fleet.",
  },
  {
    q: "What if my brokerage goes over its included loads?",
    a: "Nothing stops. Extra loads are billed at your plan's per-load rate on the next invoice: $1.75 on Broker and $1.25 on Broker Scale. Above about 460 loads a month, Broker Scale is the cheaper plan.",
  },
  {
    q: "How is the Carrier + Broker plan priced?",
    a: "The carrier side is billed per truck with no minimum: $39 a truck, or $32 from 26 trucks. The brokerage side is whichever broker plan fits your volume, at 25% off. Both live under one login and one bill.",
  },
  ...FAQ_TRIAL.slice(3),
];

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((i) => (
        <details key={i.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-lg font-semibold text-ink">
            {i.q}
            <svg
              viewBox="0 0 20 20"
              className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="max-w-3xl pb-6 text-body">{i.a}</div>
        </details>
      ))}
    </div>
  );
}
