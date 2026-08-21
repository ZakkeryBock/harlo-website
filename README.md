# harlo-website

The public marketing site for [Harlo](https://app.goharlo.com) — `goharlo.com`.

Four static files. No framework, no build step, no dependencies: GitHub Pages
serves them exactly as they are, and the whole thing renders with one request
for HTML and one for CSS.

| File | What |
|---|---|
| `index.html` | The one-page site — hero, who we are, what we do, contact |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |
| `style.css` | The only stylesheet; light and dark, brand values match the app |

## The legal pages are duplicated, on purpose

`privacy.html` and `terms.html` carry the same text as `/privacy` and `/terms`
in the app repo (`HarloTMS_NextJS`, `src/app/privacy` and `src/app/terms`,
sourced from `src/lib/legal.ts`). They were generated from the published app
pages and verified word-for-word against them.

**They will drift.** A policy that says two different things in two places is
worse than either version alone, so when the app's policies change, regenerate
these in the same PR rather than editing one side. The company facts —
entity, address, governing state, contact — live in `src/lib/legal.ts` in the
app repo and are the source of truth for both.

The SMS consent disclosure is deliberately *not* duplicated: it links to
`https://app.goharlo.com/sms-consent`, which is the URL submitted to Twilio for
toll-free verification and must keep resolving there.

## Contact form

There isn't one. The Contact section is a `mailto:` link with the fields
pre-filled in the body. A static host cannot process a form post, and a form
that silently drops enquiries is worse than a link that opens a mail client.
Add a real form when someone is actually reading the inbox and a form service
(or the app's own API) is wired up.

## Local preview

Open `index.html` in a browser, or:

```sh
python -m http.server 8000
```

## Deploying

Pushing to `main` publishes via GitHub Pages. The custom domain is not attached
yet — see `DEPLOY.md`.
