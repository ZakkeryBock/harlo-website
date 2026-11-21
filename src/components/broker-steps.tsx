import { Chips, IkeNote, Panel, Row, Total } from "./panels";
import type { Step } from "./workflow";

/** A brokered load, from customer tender to settled margin. All names and numbers are made up. */
export const BROKER_STEPS: Step[] = [
  {
    key: "book",
    tab: "Book it",
    title: "Customer tenders become loads.",
    body: "Drop in a tender and Ike builds the load: customer, lane, appointments, commodity and rate. Every customer load on one board.",
    points: [
      "Reads tenders, rate confirmations, BOLs and PODs",
      "Customer rate, accessorials and references captured",
      "Every shipper and their load history in one place",
    ],
    panel: (
      <Panel title="Load HB-20417" meta="Created from Tender_MidwestPaper_4471.pdf">
        <Row k="Customer" v="Midwest Paper Co." />
        <Row k="Elk Grove, IL to Nashville, TN" v="474 mi" />
        <Row k="Customer rate" v="$1,900.00" />
        <Row k="Target carrier pay" v="$1,520.00" />
        <Row k="Target margin" v="$380.00, 20%" tone="go" />
        <Chips items={["Tender", "Carrier rate con", "POD pending"]} warnLast />
      </Panel>
    ),
  },
  {
    key: "cover",
    tab: "Cover it",
    title: "Cover it with carriers you can trust.",
    body: "Authority and insurance are checked before you book. A carrier that doesn't pass can't be booked, and the ones that do get a rate confirmation built straight from the load.",
    points: [
      "Carrier authority and insurance tracked with expirations",
      "Carrier rate confirmations generated from the load",
      "Run trucks too? Tender to your own fleet's workspace",
    ],
    panel: (
      <Panel title="Cover HB-20417" meta="3 carriers checked">
        <Row k="Lakeshore Transport, MC 772031" v="Ready to book" tone="go" />
        <Row k="Insurance certificate" v="Good to Mar 2027" tone="go" />
        <Row k="Blue Ridge Haulers, MC 640118" v="Insurance expired" tone="stop" />
        <Row k="Reyes Trucking, your fleet" v="Truck open Thu" tone="go" />
      </Panel>
    ),
  },
  {
    key: "track",
    tab: "Track it",
    title: "Know where every load is, without the check calls.",
    body: "Stop times land on the load. When a load runs late, Ike flags it and drafts the customer update.",
    points: [
      "Arrival and departure times on every stop",
      "Late loads flagged before the appointment is missed",
      "Customer updates drafted for you to send",
    ],
    panel: (
      <Panel title="HB-20417 in transit" meta="Lakeshore Transport, truck 61">
        <Row k="Elk Grove arrived" v="6:52 AM" />
        <Row k="Elk Grove departed" v="8:10 AM" />
        <Row k="Nashville appointment" v="Fri 11:00 AM" />
        <Row k="Current ETA" v="Fri 11:40 AM" tone="warn" />
        <IkeNote>This one&apos;s trending 40 minutes late. Want me to draft a heads-up to Midwest Paper?</IkeNote>
      </Panel>
    ),
  },
  {
    key: "settle",
    tab: "Settle it",
    title: "Bill the customer, pay the carrier, keep the spread.",
    body: "Customer rate, carrier pay and signed POD on one load. Invoicing is one step, and margin is real the day it delivers.",
    points: [
      "Customer invoice and carrier pay on one record",
      "Signed POD attached before anything is billed",
      "Margin by load, customer and lane",
    ],
    panel: (
      <Panel title="HB-20417 settlement" meta="Delivered Fri 11:34 AM">
        <Row k="Customer rate" v="$1,900.00" />
        <Row k="Detention, billed to customer" v="$75.00" />
        <Row k="Carrier pay, Lakeshore" v="−$1,520.00" />
        <Row k="Detention, paid to carrier" v="−$50.00" />
        <Total k="Margin" v="$405.00" />
      </Panel>
    ),
  },
];
