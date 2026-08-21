# Deploying

The site is live at **<https://zakkerybock.github.io/harlo-website/>**.

Pushing to `main` republishes it. No build, no CI — GitHub Pages serves the
files directly, usually within a minute.

## goharlo.com still points at Webflow

**Nothing about the live `goharlo.com` has been changed.** The old Webflow
one-pager is still serving there, untouched. Switching the domain over needs
access to Cloudflare DNS, which is a deliberate, human step — do it when you
have a minute to watch it, not in a hurry.

### The switch

1. **Add the domain to this repo.** Create a file named `CNAME` at the repo
   root containing exactly:

   ```
   goharlo.com
   ```

   > Do this **only when you are ready to move DNS**, and not before. The
   > moment `CNAME` exists, GitHub redirects
   > `zakkerybock.github.io/harlo-website` to `goharlo.com` — so if DNS still
   > points at Webflow, the preview URL stops showing this site and you lose
   > the thing you were checking against.

2. **Point DNS at GitHub Pages.** In Cloudflare, on the `goharlo.com` zone,
   replace the existing apex records with:

   | Type | Name | Value |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `zakkerybock.github.io` |

   Set the proxy status to **DNS only** (grey cloud) at first. GitHub needs an
   unproxied record to issue the TLS certificate; with the orange cloud on,
   certificate provisioning fails and you get a warning in repo settings that
   is easy to misread as a DNS mistake.

3. **Wait for the certificate.** Repo → Settings → Pages will show *"Your site
   is published at https://goharlo.com"* with *Enforce HTTPS* available once
   the cert is issued. This normally takes a few minutes and occasionally up to
   an hour. Tick **Enforce HTTPS**.

4. **Optional: turn Cloudflare's proxy back on.** Once HTTPS is enforced and
   working, you can flip the records back to proxied. Set the zone's SSL/TLS
   mode to **Full (strict)** — *Flexible* will cause a redirect loop against
   Pages.

5. **Cancel Webflow** once you are happy, not before. Keeping it a few days
   costs one month of hosting and buys you a rollback: point the A records
   back and you are live again in minutes.

### Rolling back

Restore the previous apex DNS records and delete the `CNAME` file. There is no
state to migrate and nothing to undo on the GitHub side.

## What still needs a decision

- **The contact form is a `mailto:` link.** A static host cannot accept a form
  post. If you want a real form, the options are a form service (Formspree,
  Basin) or an endpoint on the app — either way someone has to be reading the
  inbox it lands in.
- **`support@goharlo.com` must be a monitored mailbox.** It is the only contact
  route on the site and it appears in both policies.
- **The legal pages are a copy.** See the note in `README.md` — when the app's
  `/privacy` or `/terms` change, regenerate these in the same PR.
