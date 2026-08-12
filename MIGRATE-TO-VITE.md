# Migrating this site to Vite (when you're ready)

You don't need this yet — the static version works great. But when you want
a bundler, npm packages, a framework (React/Vue/Svelte), or SCSS, here's the
painless path. Nothing about your **DNS or custom domain changes** — only how
the site is *built and deployed*.

## 1. Scaffold Vite (in a fresh branch first)

```bash
npm create vite@latest .        # pick "Vanilla" (or React/Vue/etc.)
npm install
```

Move your existing markup into `index.html` (Vite keeps it at the root during
dev) and your styles/JS into `/src`. Your current `main.js` already uses ES
module syntax, so it drops straight in.

## 2. IMPORTANT — set the base path

For a **user site** (`Thomas.github.io`, served at the root), the default is fine:

```js
// vite.config.js
export default { base: '/' }
```

> If this were a *project* repo (served at `/repo-name/`), you'd set
> `base: '/repo-name/'`. Not your case, but good to know.

## 3. Keep the custom domain + Jekyll opt-out

Make sure the build output still contains these two files, or Pages breaks:

- `CNAME`  → put it in `/public/CNAME` so Vite copies it into `dist/`
- `.nojekyll` → also in `/public/`

## 4. Deploy with GitHub Actions

Replace "deploy from a branch" with an Actions workflow. Create
`.github/workflows/deploy.yml`:

```yaml
name: Deploy site to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build          # outputs to ./dist
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then in **Settings → Pages → Build and deployment → Source**, switch to
**"GitHub Actions."** Push to `main` and it builds + deploys automatically.

## 5. Re-check the domain
After the first Actions deploy, confirm the custom domain still shows a green
check in Settings → Pages, and that **Enforce HTTPS** is still ticked.
