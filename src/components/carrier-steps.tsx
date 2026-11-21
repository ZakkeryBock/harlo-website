import { Chips, Panel, Row, Total } from "./panels";
import type { Step } from "./workflow";

/** A carrier's load, from rate con to margin. All names and numbers are made up. */
export const CARRIER_STEPS: Step[] = [
  {
    key: "book",
    tab: "Book it",
    title: "Rate con in. Load out.",
    body: "Drop in a rate con and Ike builds the load: broker, stops, appointments, rate and accessorials. Nobody re-types a PDF.",
    points: [
      "Reads rate confirmations, BOLs and PODs",
      "Truck-routed miles and rate per mile on every load",
      "Documents stay attached to the load they belong to",
    ],
    panel: (
      <Panel title="Load NL-88412" meta="Created from RateCon_Northline_88412.pdf">
        <Row k="Joliet, IL to Columbus, OH" v="352 mi" />
        <Row k="Linehaul" v="$1,150.00" />
        <Row k="Detention after 2 hrs" v="$50.00 / hr" />
        <Row k="Rate per mile" v="$3.27" />
        <Chips items={["Rate confirmation", "BOL", "POD pending"]} warnLast />
      </Panel>
    ),
  },
  {
    key: "dispatch",
    tab: "Dispatch it",
    title: "Dispatch with total confidence.",
    body: "Harlo tracks every CDL, medical card and registration, and won't dispatch anything that isn't legal.",
    points: [
      "Pair a driver, power unit and trailer once, dispatch them together",
      "Expiring documents flagged before they lapse",
      "Out-of-service equipment blocked automatically",
    ],
    panel: (
      <Panel title="Driver and equipment fitness" meta="12 drivers, 14 units">
        <Row k="Marcus Reyes, CDL-A" v="Fit" tone="go" />
        <Row k="Unit 204, annual inspection" v="Due in 9 days" tone="warn" />
        <Row k="Dana Whitfield, medical card" v="Expired Nov 3" tone="stop" />
        <Row k="Trailer 5312, registration" v="Fit" tone="go" />
        <Row k="Luis Ortega, CDL-A" v="Fit" tone="go" />
      </Panel>
    ),
  },
  {
    key: "run",
    tab: "Run it",
    title: "Every load, live.",
    body: "Load plans go to Harlo Driver or by text. Stop times land on the load, and your dashboard shows what's moving, what's late and who's open tomorrow.",
    points: [
      "Harlo Driver app, or texts with consent tracked for you",
      "Arrival and departure times on every stop",
      "A dashboard each person arranges for themselves",
    ],
    panel: (
      <Panel title="Text to Marcus Reyes" meta="Sent 6:12 AM">
        <div className="grid gap-2.5 text-sm">
          <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-mist px-3.5 py-2.5 text-ink">
            Load NL-88412. Pickup Thu 07:00 at Midwest Paper, 2201 Channahon Rd, Joliet IL. Ref PO 55120.
          </p>
          <p className="text-xs text-muted">Delivered 6:12 AM</p>
          <div className="mt-2 rounded-lg border border-line px-3.5 py-2.5">
            <Row k="Stop 1, Joliet arrived" v="6:58 AM" />
            <Row k="Stop 1, Joliet departed" v="8:41 AM" />
          </div>
        </div>
      </Panel>
    ),
  },
  {
    key: "paid",
    tab: "Get paid",
    title: "See your margin the day it delivers.",
    body: "Rates, pay, fuel, advances and fees live on the load, so you know what every load made.",
    points: [
      "Margin on every load",
      "Advances and their fees tracked against the route",
      "Signed POD kept with the load for billing",
    ],
    panel: (
      <Panel title="NL-88412 margin" meta="Delivered Fri 9:20 AM">
        <Row k="Linehaul and detention" v="$1,250.00" />
        <Row k="Driver pay, 352 mi" v="−$228.80" />
        <Row k="Fuel" v="−$318.00" />
        <Row k="Advance fee" v="−$7.50" />
        <Total k="Margin" v="$695.70" />
      </Panel>
    ),
  },
];
