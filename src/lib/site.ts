/**
 * Where every call to action goes, and the launch price list.
 *
 * The prices mirror billing_plan in harlo-infra migration 116 (pricing sheet
 * v2: Go+, Pro from 3 trucks, graduated Fleet, the launch offer). They are
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
  partners: "/partners",
  developers: process.env.NEXT_PUBLIC_DEVELOPER_URL || "https://developer.goharlo.com",
} as const;

/**
 * The partner form posts to the partner-inquiry Edge Function (harlo-infra
 * migration 101). Production unless the build says otherwise; a preview built
 * against dev sets NEXT_PUBLIC_PARTNER_ENDPOINT and Cloudflare's test
 * Turnstile key, so test inquiries never reach the real inbox.
 */
export const PARTNER_ENDPOINT =
  process.env.NEXT_PUBLIC_PARTNER_ENDPOINT || "https://uymounluwsykwapucbbg.supabase.co/functions/v1/partner-inquiry";
// Public by design (it ships in the page); the secret half lives only in the function.
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAAF0ThLi-1KoztRti";

export const TRIAL_DAYS = 14;

export type Interval = "month" | "year";

export type PlanCode = "free" | "go_plus" | "pro" | "fleet" | "enterprise";

/**
 * Launch pricing (billing_offer 'launch_2026', billing_plan.intro_*): about
 * 20% off list for the first 12 months on Pro, Fleet, Broker and Broker Scale,
 * for anyone who starts a paid plan before March 1, 2027. Go+ is not in it.
 * The launch prices are round numbers, not an exact 20%: $49 -> $39, $40 ->
 * $32, $499 -> $399, $1,249 -> $999; yearly is ten months of the launch price.
 */
export const INTRO = { percent: 20, months: 12, endsLabel: "March 1, 2027" } as const;

/**
 * A list unit price at launch pricing: 80% rounded down to the dollar (to
 * $10 for yearly), which reproduces every launch price in billing_plan.
 */
export const introPrice = (list: number, interval: Interval = "month") =>
  interval === "year" ? Math.floor((list * 0.8) / 10) * 10 : Math.floor(list * 0.8);

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
  /** Billed on at least this many trucks. */
  minTrucks: number;
  /** Graduated: trucks 1..upto bill at these rates (dollars), the rest at month/year. */
  graduated?: { upto: number; month: number; year: number };
  /** Gets the launch offer. */
  intro: boolean;
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
    intro: false,
    users: "Up to 3 users",
    loads: "30 loads a month",
    ai: "25 AI credits a month",
    includes: ["Harlo on desktop and Harlo Go on your phone", "Loads, dispatch and drivers", "Compliance tracking"],
    cta: { label: "Start free", href: LINKS.signupCarrier },
  },
  {
    code: "go_plus",
    name: "Go+",
    band: "1 or 2 trucks, owner-operators",
    month: 30,
    year: 300,
    perTruck: false,
    minTrucks: 1,
    maxTrucks: 2,
    intro: false,
    users: "Up to 3 users",
    loads: "Unlimited loads",
    ai: "150 AI credits a month",
    includes: [
      "Everything in Free",
      "Ike: morning brief, suggestions and answers",
      "Auto check-in from your phone",
      "Detention called out and billed in one tap",
      "Rate check, truck-routed miles and driver texts",
    ],
    cta: { label: "Start free trial", href: LINKS.goSignup },
  },
  {
    code: "pro",
    name: "Pro",
    band: "3 to 25 trucks",
    month: 49,
    year: 490,
    perTruck: true,
    minTrucks: 3,
    maxTrucks: 25,
    intro: true,
    users: "Unlimited users",
    loads: "Unlimited loads",
    ai: "75 AI credits per truck",
    includes: [
      "Everything in Go+",
      "Harlo Driver app for every driver",
      "Teams, custom roles and permissions",
      "ELD connections, API and Away mode",
    ],
    cta: { label: "Start free trial", href: LINKS.signupCarrier },
  },
  {
    code: "fleet",
    name: "Fleet",
    band: "26 to 100 trucks",
    month: 40,
    year: 400,
    perTruck: true,
    minTrucks: 26,
    maxTrucks: 100,
    graduated: { upto: 25, month: 49, year: 490 },
    intro: true,
    users: "Unlimited users",
    loads: "Unlimited loads",
    ai: "100 AI credits per truck",
    includes: ["Everything in Pro", "Single sign-on", "Lower rate from truck 26"],
    cta: { label: "Start free trial", href: LINKS.signupCarrier },
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
    intro: false,
    users: "Unlimited users",
    loads: "Unlimited loads",
    ai: "Custom AI allowance",
    includes: ["Everything in Fleet", "Contract pricing and invoicing", "Onboarding and data migration"],
    cta: { label: "Talk to us", href: LINKS.sales },
  },
];

export const plan = (code: PlanCode) => PLANS.find((p) => p.code === code)!;

/**
 * What a plan costs per month for a fleet at LIST price, in dollars. Annual is
 * shown as /12. Fleet is graduated: trucks 1-25 at the Pro rate, then lower,
 * so adding a truck never lowers the total.
 */
export function monthlyCost(p: Plan, trucks: number, interval: Interval, launch = false): number | null {
  const listUnit = interval === "year" ? p.year : p.month;
  if (listUnit == null) return null;
  const at = (n: number) => (launch && p.intro ? introPrice(n, interval) : n);
  const unit = at(listUnit);
  if (!p.perTruck) return interval === "year" ? unit / 12 : unit;
  const qty = Math.max(trucks, p.minTrucks);
  const total = p.graduated
    ? at(interval === "year" ? p.graduated.year : p.graduated.month) * Math.min(qty, p.graduated.upto) +
      unit * Math.max(qty - p.graduated.upto, 0)
    : unit * qty;
  return interval === "year" ? total / 12 : total;
}

/** The same, at the launch price when the plan has it. */
export function launchCost(p: Plan, trucks: number, interval: Interval): number | null {
  return monthlyCost(p, trucks, interval, true);
}

/**
 * The plan we'd tell a carrier to buy: Free up to 2 trucks (Go+ is the step
 * up for the smart parts), Pro from 3, Fleet from 26, a contract past 100.
 */
export function recommend(trucks: number, interval: Interval): { plan: Plan; cost: number | null } {
  const code: PlanCode = trucks > 100 ? "enterprise" : trucks >= 26 ? "fleet" : trucks >= 3 ? "pro" : "free";
  const p = plan(code);
  return { plan: p, cost: code === "enterprise" ? null : launchCost(p, trucks, interval) };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n % 1 === 0 ? 0 : 2,
  });

/* ------------------------------------------------------------------ brokers
 * Brokerages don't run trucks, so they're priced on load volume, with every
 * user included (billing_plan broker / broker_scale, repriced in 116).
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
  /** Gets the launch offer (base fee only; overage is never discounted). */
  intro: boolean;
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
    intro: false,
    users: "Up to 3 users",
    ai: "25 AI credits a month",
    includes: ["Customers, carriers and loads", "Carrier authority and insurance checks", "Ike reads tenders and rate cons"],
    cta: { label: "Start free", href: LINKS.signupBroker },
  },
  {
    code: "broker",
    name: "Broker",
    band: "Up to a few hundred loads a month",
    month: 499,
    year: 4990,
    loads: 200,
    overage: 2,
    intro: true,
    users: "Unlimited users",
    ai: "400 AI credits a month",
    includes: ["Carrier rate cons built from the load", "Tracking, late alerts and customer updates", "Custom roles and permissions"],
    cta: { label: "Start free trial", href: LINKS.signupBroker },
  },
  {
    code: "scale",
    name: "Broker Scale",
    band: "High-volume brokerages",
    month: 1249,
    year: 12490,
    loads: 750,
    overage: 1.5,
    intro: true,
    users: "Unlimited users",
    ai: "1,500 AI credits a month",
    includes: ["Everything in Broker", "Single sign-on", "Lower per-load rate"],
    cta: { label: "Start free trial", href: LINKS.signupBroker },
  },
  {
    code: "benterprise",
    name: "Enterprise",
    band: "More than 2,500 loads a month",
    month: null,
    year: null,
    loads: null,
    overage: null,
    intro: false,
    users: "Unlimited users",
    ai: "Custom AI allowance",
    includes: ["Everything in Broker Scale", "Contract pricing and invoicing", "Onboarding and data migration"],
    cta: { label: "Talk to us", href: LINKS.sales },
  },
];

export const brokerPlan = (code: BrokerCode) => BROKER_PLANS.find((p) => p.code === code)!;

export const BROKER_MAX_LOADS = 2500;

/**
 * Monthly cost of a broker plan at a load volume. Yearly and the launch offer
 * discount the base, never the overage. `launch` applies the launch offer.
 */
export function brokerCost(p: BrokerPlan, loads: number, interval: Interval, launch = true): number | null {
  if (p.month == null || p.loads == null) return null;
  const listBase = interval === "year" ? p.year! : p.month;
  const base = (launch && p.intro ? introPrice(listBase, interval) : listBase) / (interval === "year" ? 12 : 1);
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
  // No truck minimum on the carrier side of a bundle (harlo-infra 063).
  const carrier = launchCost({ ...truckPlan, minTrucks: 1 }, trucks, interval)!;
  const perTruck = carrier / trucks;
  const b = recommendBroker(loads, interval);
  // The brokerage takes the bundle discount instead of the launch offer.
  const brokerFull = brokerCost(b.plan, loads, interval, false) ?? 0;
  const broker = brokerFull * (1 - BUNDLE_BROKER_DISCOUNT);
  return { truckPlan, perTruck, carrier, brokerPlan: b.plan, brokerFull, broker, total: carrier + broker };
}
