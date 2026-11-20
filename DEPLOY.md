# Deploying

## Live: Hostinger, from the `hostinger` branch (2026-11-20)

goharlo.com is served by Hostinger (LiteSpeed) behind Cloudflare. Hostinger's
Git deployment copies files and cannot run a Next.js build, so:

1. Every push to `main` (or `redesign`) runs `.github/workflows/hostinger.yml`:
   it builds the site and force-pushes the static files in `out/` to the
   `hostinger` branch.
2. In hPanel → Websites → goharlo.com → Advanced → Git, the repository is
   `ZakkeryBock/harlo-website`, branch **`hostinger`**, directory empty
   (public_html). Press Deploy, or turn on auto-deployment.

`public/.htaccess` maps `/pricing` to `pricing.html` (the export also writes a
`pricing/` folder of page data, which would otherwise answer 403) and serves
`404.html`. It deliberately has no http→https redirect: Cloudflare can reach the
origin over plain http, so turn on "Always Use HTTPS" in Cloudflare instead.

Never point Hostinger at `main`: that is the source, not a built site.

## Earlier recommendation: Cloudflare Pages

- **Free plan:** commercial use is allowed, bandwidth is unlimited, and there
  are 500 builds a month.
- **DNS is already there:** the `goharlo.com` zone is on Cloudflare, so the
  custom domain attaches in two clicks.
- **Why not Vercel Hobby:** it forbids commercial use. GitHub Pages also works
  for a static site, but it can't do preview deploys per branch.

### One-time setup (dashboard)

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git →
   `ZakkeryBock/harlo-website`.
2. Build command `npm run build`, output directory `out`, environment variable
   `NODE_VERSION=22`.
3. Production branch `main`. Every other branch gets a preview URL.
4. Custom domains → add `goharlo.com` and `www.goharlo.com`. Cloudflare
   replaces the Webflow records itself and asks you to confirm.

### Or from the CLI

```sh
npm run build
npx wrangler pages deploy out --project-name harlo-website
```

## Cutover checklist

1. Deploy, then check the `*.pages.dev` URL on a phone and a desktop.
2. Attach `goharlo.com` (step 4 above). The Webflow site stops serving.
3. Keep Webflow until the end of its paid term as a rollback. To roll back,
   point the apex records back to Webflow.
4. Make sure `sales@goharlo.com` and `support@goharlo.com` are monitored
   inboxes. They are the only contact routes on the site.
