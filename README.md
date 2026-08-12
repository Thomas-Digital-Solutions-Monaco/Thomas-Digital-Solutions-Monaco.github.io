# Thomas.github.io

My personal site, served from GitHub Pages.

## Current setup (static, zero build)

Just plain HTML/CSS/JS at the repo root. GitHub Pages serves `index.html`
directly — no build step, nothing to install.

```
├── index.html      # page markup
├── styles.css      # styles (CSS variables at the top for easy theming)
├── main.js         # tiny ES module (Vite-ready)
├── favicon.svg
├── CNAME           # custom domain (see note below)
└── .nojekyll       # tells Pages to skip Jekyll processing
```

### Deploy
Push to the default branch and enable Pages:
**Settings → Pages → Build and deployment → Source: "Deploy from a branch" →
`main` / root.** Live within ~1 minute.

### Custom domain
The `CNAME` file must contain your domain on a single line
(currently `domain.com` — **replace with your real domain**).
DNS records for the domain are managed at Cloudflare (via the registrar).

---

## Later: migrating to Vite

When you outgrow static files, see `MIGRATE-TO-VITE.md`. The current
`main.js` is already an ES module, so the jump is small.
