# TDSM — Thomas Digital Solutions Monaco

Bilingual (EN/FR) portfolio for **Thomas Digital Solutions Monaco**, built with
React 18 · TypeScript · Vite · Three.js · Tailwind · EmailJS. Monaco red-&-white
theme, a 3D Formula-1 hero (a nod to the Monaco GP), and lazy-loaded 3D for fast
first paint. Configured for **Option A** (root of `Thomas.github.io`, `base:"/"`).

---

## ✍️ WHERE TO EDIT THINGS

| I want to change… | Edit this file |
|---|---|
| **The top-left logo** | Drop your PNG at **`public/logo.png`** (auto-used). Markup: `src/sections/Navbar.tsx` |
| **All text (EN + FR)** | **`src/i18n/translations.ts`** — services, projects, experience, everything |
| **Services** | `translations.ts` → `services.items` (both `en` and `fr`) |
| **Projects / apps** | `translations.ts` → `work.items` (name, tagline, desc, `platforms`, `accent`) |
| **Experience** | `translations.ts` → `experience.items` |
| **Brand colours** | `tailwind.config.js` → `colors` block |
| **Tech logos** | `src/constants/index.ts` → `techLogos` (Devicon slugs) |
| **The 3D car** | `src/components/HeroObject.tsx` |

> Everything user-facing is bilingual. When you add a service/project, add it to
> **both** the `en` and `fr` blocks in `translations.ts` so nothing goes missing.

### Your logo
Save your PNG as **`public/logo.png`**. It appears top-left automatically. If the
file is missing, a text "T TDSM." fallback shows instead. Transparent-background
PNG, ~80–120 px tall, looks best.

---

## 🌍 Language toggle
A **FR / EN** button sits in the navbar. It flips every string instantly and
remembers the choice (localStorage). Logic: `src/i18n/LanguageContext.tsx`.

---

## 📱 Project platform buttons
Each app shows 2–4 buttons (iOS / Android / macOS / Windows) based on its
`platforms` array. They're **intentionally not wired yet** — they show a
"Coming soon" tooltip. When a store listing is ready, open `src/sections/Work.tsx`
and turn the `<button>` into an `<a href="store-url">`.

---

## 🚀 Run locally

```bash
npm install     # first time only
npm run dev     # → http://localhost:5173
```

Optional production check:

```bash
npm run build && npm run preview
```

---

## 🌐 Deploy (Option A → Thomas.github.io)

Publishing happens on **GitHub's servers**, not your machine — you just push.

1. Push to the **`Thomas.github.io`** repo (`main` branch).
2. GitHub → **Settings → Pages → Source → "GitHub Actions."**
3. Every push auto-builds and deploys to **https://thomas.github.io**.

```bash
git add . && git commit -m "TDSM portfolio" && git push
```

### Custom domain later (e.g. tdsm.mc)
Create `public/CNAME` containing just your domain, add the DNS records at your
DNS host (Cloudflare via your registrar), then set the domain in Settings → Pages.

---

## 📬 Contact form (EmailJS)
Works out of the box (logs the submission). To send real email: copy
`.env.example` → `.env.local`, fill in your EmailJS keys, and add the same as
repo **secrets** for the deployed build.

---

## 📁 Structure

```
tdsm/
├─ public/               logo.png (yours), favicon.svg, .nojekyll
├─ src/
│  ├─ components/        HeroCanvas, HeroObject (F1 car), CanvasLoader, PlatformIcon
│  ├─ constants/         techLogos, company, socials (non-text)
│  ├─ i18n/              translations.ts (EN+FR) + LanguageContext.tsx
│  ├─ lib/               useReveal
│  ├─ sections/          Navbar, Hero, About, Services, Work, Experience, Contact, Footer
│  ├─ App.tsx            wraps everything in <LanguageProvider>
│  └─ index.css
├─ vite.config.ts        base:"/" + Three.js chunk split
└─ .github/workflows/deploy.yml
```

Built with ☕ in Monaco.
