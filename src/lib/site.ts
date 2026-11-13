/**
 * Where every call to action goes, and the launch price list.
 *
 * The prices mirror billing_plan in harlo-infra migration 054. They are
 * published here by hand, so when a price changes there it must change here in
 * the same release: a site that quotes a different number than checkout loses
 * the customer at the worst possible moment.
 */

export const SITE_URL = "https://goharlo.com";

/**
 * Where the apps live. Production unless a build says otherwise: a preview of
 * this site for testing sign-up end to end is built with
 * NEXT_PUBLIC_APP_URL=https://harlo-app-dev.vercel.app (and the Go one), so
 * its buttons create accounts on dev, never in production.
 */
const APP = process.env.NEXT_PUBLIC_APP_URL || "https://app.goharlo.com";
const GO = process.env.NEXT_PUBLIC_GO_URL || "https://go.goharlo.com";

export const LINKS = {
  signup: `${APP}/signup`,
  /** Signup preselects the workspace type. The app reads ?side= on /signup. */
  signupCarrier: `${APP}/signup?side=carrier`,
  signupBroker: `${APP}/signup?side=broker`,
  signupBoth: `${APP}/signup?side=both`,
  login: `${APP}/login`,
  goSignup: `${GO}/signup`,
  goLogin: `${GO}/login`,
  sales: "mailto:sales@goharlo.com?subject=Harlo%20for%20our%20fleet",
  support: "mailto:support@goharlo.com",
} as const;

export const TRIAL_DAYS = 14;

export type Interval = "month" | "year";

export type PlanCode = "free" | "pro" | "fleet" | "enterprise";

export interface Plan {
  code: PlanCode;
  name: string;
  /** Who it is for, in fleet terms. */
  band: string;
  /** Flat monthly price in dollars, or per-truck price when perTruck. */
  month: number | null;
  /** Annual price in dollars (flat or per truck), 10x monthly. */
  year: number | null;
  perTruck: boolean;
  minTrucks: number;
  maxTrucks: number | null;
  users: string;
  loads: string;
  ai: string;
  includes: string[];
  cta: { label: string; href: string };
}

export const PLANS: Plan[] = [
  {
    code: "free",
    name: "Free",
    band: "1 or 2 trucks",
    month: 0,
    year: 0,
    perTruck: false,
    minTrucks: 1,
    maxTrucks: 2,
    users: "Up to 3 users",
    loads: "30 loads a month",
    ai: "25 AI credits a month",
    includes: ["Harlo on desktop and Harlo Go on your phone", "Loads, dispatch and drivers", "Compliance tracking"],
    cta: { label: "Start free", href: LINKS.signupCarrier },
  },
  {
    code: "pro",
    name: "Pro",
    band: "4 to 25 trucks",
    month: 39,
    year: 390,
    perTruck: true,
    minTrucks: 4,
    maxTrucks: 25,
    users: "Unlimited users",
    loads: "Unlimited loads",
    ai: "75 AI credits per truck",
    includes: [
      "The full Harlo system",
      "Harlo Driver app for every driver",
      "Ike assistant and driver texts",
      "Custom roles and permissions",
    ],
    cta: { label: "Start my free trial", href: LINKS.signupCarrier },
  },
  {
    code: "fleet",
    name: "Fleet",
    band: "26 to 100 trucks",
    month: 32,
    year: 320,
    perTruck: true,
    minTrucks: 26,
    maxTrucks: 100,
    users: "Unlimited users",
    loads: "Unlimited loads",
    ai: "100 AI credits per truck",
    includes: ["Everything in Pro", "Single sign-on", "Lower per-truck rate"],
    cta: { label: "Start my free trial", href: LINKS.signupCarrier },
  },
  {
    code: "enterprise",
    name: "Enterprise",
    band: "More than 100 trucks",
    month: null,
    year: null,
    perTruck: true,
    minTrucks: 101,
    maxTrucks: null,
    users: "Unlimited users",
    loads: "Unlimited loads",
    ai: "Custom AI allowance",
    includes: ["Everything in Fleet", "Contract pricing and invoicing", "Onboarding and data migration"],
    cta: { label: "Talk to us", href: LINKS.sales },
  },
];

export const plan = (code: PlanCode) => PLANS.find((p) => p.code === code)!;

/** What a plan costs per month for a fleet, in dollars. Annual is shown as /12. */
export function monthlyCost(p: Plan, trucks: number, interval: Interval): number | null {
  const unit = interval === "year" ? p.year : p.month;
  if (unit == null) return null;
  const perMonth = interval === "year" ? unit / 12 : unit;
  return p.perTruck ? perMonth * Math.max(trucks, p.minTrucks) : perMonth;
}

/**
 * The plan we'd tell a carrier to buy: the full system, always. Free up to 2
 * trucks, then the cheapest of Pro and Fleet.
 */
export function recommend(trucks: number, interval: Interval): { plan: Plan; cost: number | null } {
  if (trucks > 100) return { plan: plan("enterprise"), cost: null };
  if (trucks <= 2) return { plan: plan("free"), cost: 0 };
  const fits = PLANS.filter(
    (p) => (p.code === "pro" || p.code === "fleet") && (p.maxTrucks == null || trucks <= p.maxTrucks),
  )
    // Fleet is allowed below 26 trucks (billed on 26), and is cheaper from 22 up.
    .concat(trucks < 26 && trucks >= 20 ? [plan("fleet")] : [])
    .map((p) => ({ plan: p, cost: monthlyCost(p, trucks, interval)! }))
    .sort((a, b) => a.cost - b.cost);
  return fits[0];
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  });

/* ------------------------------------------------------------------ brokers
 * Brokerages don't run trucks, so they're priced on load volume, with every
 * user included. Not yet in billing_plan: these need rows and Stripe prices
 * before launch (see README, "Ahead of the product").
 */

export type BrokerCode = "bfree" | "broker" | "scale" | "benterprise";

export interface BrokerPlan {
  code: BrokerCode;
  name: string;
  band: string;
  month: number | null;
  year: number | null;
  /** Loads included each month. */
  loads: number | null;
  /** Price per load above the included loads. */
  overage: number | null;
  users: string;
  ai: string;
  includes: string[];
  cta: { label: string; href: string };
}

export const BROKER_PLANS: BrokerPlan[] = [
  {
    code: "bfree",
    name: "Free",
    band: "New brokers and agents",
    month: 0,
    year: 0,
    loads: 25,
    overage: null,
    users: "Up to 3 users",
    ai: "25 AI credits a month",
    includes: ["Customers, carriers and loads", "Carrier authority and insurance checks", "Ike reads tenders and rate cons"],
    cta: { label: "Start free", href: LINKS.signupBroker },
  },
  {
    code: "broker",
    name: "Broker",
    band: "Up to a few hundred loads a month",
    month: 299,
    year: 2990,
    loads: 200,
    overage: 1.75,
    users: "Unlimited users",
    ai: "400 AI credits a month",
    includes: ["Carrier rate cons built from the load", "Tracking, late alerts and customer updates", "Custom roles and permissions"],
    cta: { label: "Start my free trial", href: LINKS.signupBroker },
  },
  {
    code: "scale",
    name: "Broker Scale",
    band: "High-volume brokerages",
    month: 749,
    year: 7490,
    loads: 750,
    overage: 1.25,
    users: "Unlimited users",
    ai: "1,500 AI credits a month",
    includes: ["Everything in Broker", "Single sign-on", "Lower per-load rate"],
    cta: { label: "Start my free trial", href: LINKS.signupBroker },
  },
  {
    code: "benterprise",
    name: "Enterprise",
    band: "More than 2,500 loads a month",
    month: null,
    year: null,
    loads: null,
    overage: null,
    users: "Unlimited users",
    ai: "Custom AI allowance",
    includes: ["Everything in Broker Scale", "Contract pricing and invoicing", "Onboarding and data migration"],
    cta: { label: "Talk to us", href: LINKS.sales },
  },
];

export const brokerPlan = (code: BrokerCode) => BROKER_PLANS.find((p) => p.code === code)!;

export const BROKER_MAX_LOADS = 2500;

/** Monthly cost of a broker plan at a load volume. Yearly discounts the base, not overage. */
export function brokerCost(p: BrokerPlan, loads: number, interval: Interval): number | null {
  if (p.month == null || p.loads == null) return null;
  const base = interval === "year" ? p.year! / 12 : p.month;
  const extra = Math.max(0, loads - p.loads) * (p.overage ?? 0);
  return base + extra;
}

export function recommendBroker(loads: number, interval: Interval): { plan: BrokerPlan; cost: number | null } {
  if (loads > BROKER_MAX_LOADS) return { plan: brokerPlan("benterprise"), cost: null };
  const free = brokerPlan("bfree");
  if (loads <= free.loads!) return { plan: free, cost: 0 };
  return (["broker", "scale"] as const)
    .map((c) => ({ plan: brokerPlan(c), cost: brokerCost(brokerPlan(c), loads, interval)! }))
    .sort((a, b) => a.cost - b.cost)[0];
}

/* --------------------------------------------------------------------- both
 * Carrier + Broker: the carrier side at the per-truck rate with no minimum,
 * the brokerage side at a discount, and loads the brokerage covers with its
 * own fleet don't count against its allowance.
 */
export const BUNDLE_BROKER_DISCOUNT = 0.25;

export function bundleCost(trucks: number, loads: number, interval: Interval) {
  if (trucks > 100 || loads > BROKER_MAX_LOADS) return null;
  const truckPlan = plan(trucks >= 26 ? "fleet" : "pro");
  const perTruck = interval === "year" ? truckPlan.year! / 12 : truckPlan.month!;
  const carrier = perTruck * trucks;
  const b = recommendBroker(loads, interval);
  const brokerFull = b.cost!;
  const broker = brokerFull * (1 - BUNDLE_BROKER_DISCOUNT);
  return { truckPlan, perTruck, carrier, brokerPlan: b.plan, brokerFull, broker, total: carrier + broker };
}
