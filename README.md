# harlo-website

The public marketing site for Harlo, `goharlo.com`. Its one job is to get
carriers into a free trial (`app.goharlo.com/signup`, or `go.goharlo.com/signup`
for Harlo Go).

Next.js 16 + Tailwind 4, built as a **static export**: `npm run build` writes
plain HTML/CSS/JS to `out/`, which any static host can serve. No server, no
runtime, no secrets.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
npx serve out      # preview the built site
```

## Pages

| Route | File | What |
|---|---|---|
| `/` | `src/app/page.tsx` | Ike briefing hero, Ike's four jobs, carriers and brokers, platform modules, workspaces, comparison, setup steps, story, pricing teaser, FAQ |
| `/carriers` | `src/app/carriers/page.tsx` | Carrier workflow tabs, compliance, fleet sizes |
| `/brokers` | `src/app/brokers/page.tsx` | Broker workflow tabs, load board, workspaces handoff, broker pricing note |
| `/workspaces` | `src/app/workspaces/page.tsx` | Multiple workspaces: switcher, use cases, handoff, FAQ |
| `/ike` | `src/app/ike/page.tsx` | Ike capabilities, guardrails, AI credits |
| `/security` | `src/app/security/page.tsx` | Isolation, roles, audit trail, SSO |
| `/pricing` | `src/app/pricing/page.tsx` | Truck calculator, plan cards, comparison table, billing FAQ |
| `/apps` | `src/app/apps/page.tsx` | The ecosystem: desktop, Harlo Go (phone), Harlo Driver (driver phone and truck tablet), continuity, tablet mode |
| `/go` | `src/app/go/page.tsx` | Harlo Go, the phone app on every plan (there is no Go plan) |
| `/about` | `src/app/about/page.tsx` | Origin (Fat Cat Freight, Loadbar), beliefs, contact |
| `/privacy`, `/terms` | copied from the product repo | see below |

## Prices live in one file

`src/lib/site.ts` holds every plan, price and signup URL. The numbers mirror
`billing_plan` in harlo-infra migration 054. **When a price changes there,
change it here in the same release.** The calculator, the cards, the FAQ and the
comparison table all read from it except the FAQ overage cents and the
comparison table rows, which are written out by hand.

## Brand system

From `~/Pictures/Harlo Branding`, tightened for a product site:

| Token | Value | Use |
|---|---|---|
| `ink` / `pine` | `#1C221E` | Headlines, dark sections, footer. The brand sage, deepened. |
| `body` | `#4C544A` | Body text. The brand sage exactly (7.9:1 on white). |
| `rust` | `#CA6B44` | The peak mark and decorative accents only. |
| `rust-ink` | `#B4532E` | Buttons and links. `#CA6B44` fails AA under white text; this passes (5.0:1). |
| `rust-light` | `#E08A63` | Rust text on dark surfaces. |
| `mist` | `#F4F5F1` | Panels. Replaces the cream page background. |
| `cream` | `#F4F0DF` | The brand cream, now only the light button on dark/rust. |

**Type:** Overpass, one family, 400 to 800. It descends from Highway Gothic,
the lettering on US interstate signs.

**Logo:** `src/components/logo.tsx` has the wordmark (letters take
`currentColor`, the A-peak stays rust) and the standalone peak. Paths are copied
exactly from the brand SVGs. The favicon is the rust peak on a pine tile.

### Rules we're holding to

These keep the site from looking like a template:

- No eyebrow labels above headings, no all-caps, no gradients, and no emoji or
  icon grids.
- One orchestrated animation (the hero demo); nothing fades in on scroll.
- No invented customers, logos, testimonials or usage numbers.
- The site is written ahead of the product on purpose: multiple workspaces,
  the broker side (tenders, carrier vetting, settlement, brokerage-to-fleet
  handoff), broker plans (Free / Broker $299 / Broker Scale $749, priced by
  load volume) and the Carrier + Broker bundle (per truck, no minimum, plus 25%
  off the broker plan) are described as shipped. Broker plans and the bundle
  are NOT in billing_plan or Stripe yet, and signup must read `?side=`
  (carrier | broker | both).
- Also ahead of the product: one account across desktop and Harlo Go (Go
  today has its own signup), Harlo Driver (driver app, Pro and up) with a
  shared truck-tablet PIN mode, and continuity between the three (alerts and
  approvals on any screen). Keep that list here so it's clear what to
  build or soften before launch.
- One call to action per screen: start the trial.

## Legal pages

`src/app/privacy` and `src/app/terms` are verbatim copies of the product
repo's pages (`HarloTMS_NextJS/src/app/{privacy,terms}`), and `src/lib/legal.ts`
copies its company facts. The only edit is the SMS consent link, which points
at `app.goharlo.com/sms-consent` (the URL registered with Twilio). When the
app's policies change, re-copy them in the same PR.

## Known noise

When it prefetches links, Next 16's static export requests
`/route/__next.route.__PAGE__.txt`, but the file is written to
`/route/__next.route/__PAGE__.txt`. The request 404s and Next falls back to a
normal page load. Navigation is unaffected.

## Plan lineup

Carriers: Free, Pro, Fleet, Enterprise. There is no Go plan on the site:
Harlo Go is the phone app's name, included on every plan. `billing_plan`
still has a `go` row (migration 054); retire it or stop selling it before
the site goes live so checkout and the site agree.
