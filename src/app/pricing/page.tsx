import type { Metadata } from "next";
import { Pricing } from "@/components/pricing";
import { Faq, FAQ_BILLING } from "@/components/faq";
import { EndCta } from "@/components/end-cta";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Carriers pay per truck, brokers pay by load volume, and companies that do both save 25% on the brokerage. Free plans for both, unlimited users on every paid plan, and every plan includes the desktop and the Harlo Go phone app.",
  alternates: { canonical: "/pricing" },
};

type Cell = boolean | string;

const COMPARE: { group: string; rows: [string, Cell, Cell, Cell, Cell][] }[] = [
  {
    group: "Limits",
    rows: [
      ["Trucks", "Up to 2", "4 to 25", "26 to 100", "More than 100"],
      ["Users", "Up to 3", "Unlimited", "Unlimited", "Unlimited"],
      ["Loads", "30 a month", "Unlimited", "Unlimited", "Unlimited"],
      ["AI credits included", "25 a month", "75 per truck", "100 per truck", "Custom"],
      ["Extra AI credits", false, "5¢ each", "4¢ each", "Contract"],
    ],
  },
  {
    group: "Operations",
    rows: [
      ["Loads, stops and documents", true, true, true, true],
      ["Dispatch with driver, truck and trailer", true, true, true, true],
      ["CDL, medical card and registration tracking", true, true, true, true],
      ["Maintenance and out-of-service records", true, true, true, true],
      ["Margin, driver pay and advances per load", true, true, true, true],
      ["Truck-routed miles", false, true, true, true],
      ["Driver text messages", false, true, true, true],
    ],
  },
  {
    group: "Apps",
    rows: [
      ["Harlo on desktop", true, true, true, true],
      ["Harlo Go phone app", true, true, true, true],
      ["Harlo Driver app for your drivers", false, true, true, true],
    ],
  },
  {
    group: "Ike",
    rows: [
      ["Reads rate confirmations, BOLs and PODs", true, true, true, true],
      ["Ask Ike about your operation", false, true, true, true],
    ],
  },
  {
    group: "Team and security",
    rows: [
      ["Audit log", true, true, true, true],
      ["Custom roles and permissions", false, true, true, true],
      ["Single sign-on", false, false, true, true],
    ],
  },
];

const HEAD = ["Free", "Pro", "Fleet", "Enterprise"];

const BROKER_COMPARE: { group: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    group: "Limits",
    rows: [
      ["Loads included a month", "25", "200", "750"],
      ["Each extra load", false, "$1.75", "$1.25"],
      ["Users", "Up to 3", "Unlimited", "Unlimited"],
      ["AI credits included", "25 a month", "400 a month", "1,500 a month"],
      ["Extra AI credits", false, "5¢ each", "4¢ each"],
    ],
  },
  {
    group: "Brokerage",
    rows: [
      ["Customers, carriers and loads", true, true, true],
      ["Carrier authority and insurance checks", true, true, true],
      ["Carrier rate confirmations built from the load", false, true, true],
      ["Tracking, late alerts and customer updates", false, true, true],
      ["Customer rate, carrier pay and margin per load", true, true, true],
    ],
  },
  {
    group: "Ike",
    rows: [
      ["Reads tenders, rate cons, BOLs, PODs and COIs", true, true, true],
      ["Ask Ike about your book of business", false, true, true],
    ],
  },
  {
    group: "Team and security",
    rows: [
      ["Audit log", true, true, true],
      ["Custom roles and permissions", false, true, true],
      ["Single sign-on", false, false, true],
    ],
  },
];

function Mark({ v }: { v: Cell }) {
  if (typeof v === "string") return <span className="text-ink">{v}</span>;
  return v ? (
    <svg viewBox="0 0 16 16" className="mx-auto size-4 text-go" role="img" aria-label="Included">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <span className="text-muted" aria-label="Not included">
      –
    </span>
  );
}

function Table({
  caption,
  head,
  groups,
}: {
  caption: string;
  head: string[];
  groups: { group: string; rows: Cell[][] }[];
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-ink">
            <th scope="col" className="w-[40%] py-4 font-semibold text-ink">
              <span className="sr-only">Feature</span>
            </th>
            {head.map((h) => (
              <th key={h} scope="col" className="py-4 text-center text-lg font-bold text-ink">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((g) => (
          <tbody key={g.group}>
            <tr>
              <th colSpan={head.length + 1} scope="colgroup" className="pt-8 pb-2 text-left text-lg font-bold text-ink">
                {g.group}
              </th>
            </tr>
            {g.rows.map(([label, ...cells]) => (
              <tr key={String(label)} className="border-b border-line">
                <th scope="row" className="py-3.5 pr-4 font-normal text-body">
                  {label}
                </th>
                {cells.map((c, i) => (
                  <td key={i} className="py-3.5 text-center">
                    <Mark v={c} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

const carrierTable = <Table caption="Features in each carrier plan" head={HEAD} groups={COMPARE} />;
const brokerTable = (
  <Table caption="Features in each broker plan" head={["Free", "Broker", "Broker Scale"]} groups={BROKER_COMPARE} />
);

function Compare({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="mt-14">
      <h2 className="text-h2 font-extrabold">{title}</h2>
      <p className="mt-4 max-w-2xl">
        Every plan runs on the same platform and the same records. Upgrading never means moving your data.
      </p>
      <div className="mt-10">{children}</div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main>
      <section className="pt-14 pb-24 sm:pt-20">
        <Container>
          <div className="mb-12 max-w-2xl">
            <h1 className="text-display font-extrabold">Simple pricing for every side of freight.</h1>
            <p className="mt-6 text-lead">
              Carriers pay per truck. Brokers pay by load volume. Do both and the brokerage is 25% off. Every
              paid plan includes unlimited users, and every trial is 14 days with no card.
            </p>
          </div>
          <Pricing
            extra={{
              carrier: <Compare title="Compare carrier plans">{carrierTable}</Compare>,
              broker: <Compare title="Compare broker plans">{brokerTable}</Compare>,
              both: (
                <>
                  <Compare title="The carrier side">{carrierTable}</Compare>
                  <Compare title="The brokerage side">{brokerTable}</Compare>
                </>
              ),
            }}
          />
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <h2 className="text-h2 font-extrabold">Billing questions</h2>
          <Faq items={FAQ_BILLING} />
        </Container>
      </section>

      <EndCta />
    </main>
  );
}
