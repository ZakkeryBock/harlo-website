# Deploying

`goharlo.com` still points at Webflow. Nothing here changes that until DNS is
moved by hand.

## Recommended host: Cloudflare Pages

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
