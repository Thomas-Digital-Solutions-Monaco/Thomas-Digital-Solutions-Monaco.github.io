# TDSM — Thomas Digital Solutions Monaco

Bilingual (EN/FR) portfolio for **Thomas Digital Solutions Monaco**, built with
React 18 · TypeScript · Vite · Three.js · Tailwind · EmailJS. Monaco red-&-white
theme, a detailed 3D **Formula-1 car** hero (a nod to the Monaco GP), lazy-loaded
3D for fast first paint. Configured for **Option A** (root of `Thomas.github.io`).

---

## 🖼️ TWO LOGO FILES TO ADD

| Where | File to drop in | Notes |
|-------|-----------------|-------|
| **Top-left navbar** | `public/logo.png` | ~80–120 px tall, transparent bg |
| **Footer** | `public/logo-horizontal.png` | your 1672×941 wide logo; shown at ~48–64 px tall, width auto |

Both have placeholders until you add the files, so nothing looks broken.

---

## ✍️ WHERE TO EDIT THINGS

| Change… | File |
|---|---|
| **All text (EN + FR)** | `src/i18n/translations.ts` |
| **Services / Projects / Experience** | `src/i18n/translations.ts` |
| **Brand colours** | `tailwind.config.js` → `colors` |
| **Tech logos** | `src/constants/index.ts` → `techLogos` |
| **The 3D F1 car** | `src/components/HeroObject.tsx` |
| **Store badges** | `src/components/StoreBadge.tsx` |

> User-facing content is bilingual — edit both the `en` and `fr` blocks.

---

## 🔧 Latest changes
- **Bigger footer logo** — horizontal logo now renders at ~48 px (mobile) /
  64 px (desktop) tall instead of 20 px, width scales automatically.
- **Tech stack** — added **Android** and **Windows** (now: React Native, Expo,
  TypeScript, Node.js, Vite, Three.js, Tailwind, Azure, Android, Windows, Linux,
  Mac).
- **Better F1 car** — added multi-element wings, bargeboards, sidepod intakes,
  shark-fin, DRS, driver helmet + visor, suspension arms and rimmed tyres.
- **Consistent left alignment** — the hero (previously centered) now matches the
  rest of the site: everything is left-aligned, and still looks good on mobile
  (car stacks under the text).

---

## 🌍 Language toggle
FR/EN button in the navbar flips every string and remembers the choice.

## 📱 Store badges
Each app shows App Store / Google Play / Mac App Store / Microsoft Store badges.
**Not wired yet** — swap the `<button>` in `StoreBadge.tsx` for an
`<a href="store-url">` at launch.

---

## 🚀 Run locally
```bash
npm install
npm run dev     # → http://localhost:5173
```

## 🌐 Deploy (Option A → Thomas.github.io)
1. Push to the `Thomas.github.io` repo (`main`).
2. GitHub → **Settings → Pages → Source → "GitHub Actions."**
3. Every push auto-builds and deploys to https://thomas.github.io.

Built with ☕ in Monaco.
