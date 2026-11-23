export type QA = { q: string; a: React.ReactNode };

export const FAQ_TRIAL: QA[] = [
  {
    q: "Do I need a credit card to start?",
    a: "No. You only add a card when you choose a paid plan.",
  },
  {
    q: "What happens when the 14 days are up?",
    a: "Your workspace moves to Free and nothing is deleted. Over Free's limits, everything stays readable and exportable, but adding loads, trucks or users needs a paid plan.",
  },
  {
    q: "What counts as a truck?",
    a: "An active power unit. Trailers, drivers and users are never billed. Trucks added mid-month are prorated.",
  },
  {
    q: "What's an AI credit?",
    a: "One task for Ike, like reading a document or answering a question. Every plan includes a monthly allowance. Free and Go+ stop at theirs; Pro and up can go over at 5¢ a credit (4¢ on Fleet), up to a hard ceiling. Now and then we raise every allowance for a while, at no charge.",
  },
  {
    q: "Can I pay yearly?",
    a: "Yes. Twelve months for the price of ten. Switch any time in billing settings.",
  },
  {
    q: "Is there a contract?",
    a: "No. Cancel any time in billing settings. Your plan runs to the end of the period you paid for.",
  },
  {
    q: "Do my drivers need to install an app?",
    a: "No. Drivers can get load details by text. On Pro and up they can also use Harlo Driver on a phone or the truck's tablet.",
  },
  {
    q: "Who can see my data?",
    a: (
      <>
        Only people in your company. Every account is isolated in the database and every change is
        logged. Harlo trains its own models on activity across the platform, with personal details
        removed, so it gets better for everyone. We never sell your data, and no other customer sees
        your rates, margins, customers, drivers or loads. Read the{" "}
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
    a: "No. Every plan includes desktop and Harlo Go. Pro and up add Harlo Driver.",
  },
  {
    q: "What's Go+?",
    a: "For owner-operators with 1 or 2 trucks: $30 a month adds Ike, auto check-in from your phone, detention called out and billed in one tap, rate checks and unlimited loads. A third truck moves you to Pro.",
  },
  {
    q: "What's launch pricing?",
    a: "Start Pro, Fleet, Broker or Broker Scale before March 1, 2027 and pay the launch price for your first 12 months: $39 a truck instead of $49 on Pro, $32 instead of $40 from truck 26, $399 instead of $499 on Broker, $999 instead of $1,249 on Broker Scale. Yearly plans too. Moving up a plan keeps it. Go+ is $30 flat.",
  },
  {
    q: "What counts as a load for a brokerage?",
    a: "A brokered load covered by a carrier during the month. Quotes, cancelled loads, and loads covered by your own fleet on Carrier + Broker don't count.",
  },
  {
    q: "What if my brokerage goes over its included loads?",
    a: "Nothing stops. Extra loads bill at $2.00 on Broker or $1.50 on Broker Scale. Above about 500 loads a month, Scale is cheaper.",
  },
  {
    q: "How is the Carrier + Broker plan priced?",
    a: "Carrier side: $49 a truck ($40 from truck 26), or $39 ($32) at launch for your first year, no minimum. Brokerage side: the broker plan that fits your volume, 25% off. One login, one bill.",
  },
  ...FAQ_TRIAL.slice(3),
];

/** One answer open at a time: <details> sharing a name close each other. */
export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((i) => (
        <details key={i.q} name="faq" className="group">
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
