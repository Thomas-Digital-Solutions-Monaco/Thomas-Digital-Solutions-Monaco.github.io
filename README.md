# TDSM — Thomas Digital Solutions Monaco

Bilingual (EN/FR) portfolio for **Thomas Digital Solutions Monaco**, built with
React 18 · TypeScript · Vite · Three.js · Tailwind · EmailJS. Monaco red-&-white
theme with dark mode, a 3D Formula-1 hero, a **live "TDSM Live" radar**, and a
live GitHub contributions view. Configured for **Option A** (`Thomas.github.io`).

---

## ⚙️ THINGS TO SET
| What | Where |
|------|-------|
| **GitHub username** (live radar count + activity heatmap) | `src/constants/index.ts` → `githubUsername` |
| **Monaco event dates** (radar countdowns) | `src/constants/monacoEvents.ts` |
| **Logos** | `public/logo.png` (navbar) · `public/logo-horizontal.png` (footer) |

---

## 🆕 What's new
- **"TDSM Live" radar section** (just below the hero, left-aligned, mobile-ready):
  a CSS **sonar sweep** + concentric rings + expanding ping, a **LIVE** badge, a
  live **Monaco clock** (`Europe/Monaco`), a KPI strip (apps · platforms · years
  · **live GitHub contributions**), the **next Monaco event** with a live day
  countdown, and a **rotating feed** cycling through upcoming Monaco events
  (the `2/5` effect). Component: `src/components/LiveRadar.tsx`.
- **Monaco event countdowns** — real, official dates in
  `src/constants/monacoEvents.ts` (Yacht Show 23–26 Sep 2026 · Rallye
  Monte-Carlo 18–24 Jan 2027 · Monaco GP 4–6 Jun 2027). Cycling Grand Tours are
  left as commented placeholders — enable only if a year's route passes through
  Monaco. **No official live API exists**, so update these yearly by hand.
- **"Activity" link** added to the navbar.
- **KPI modals animate from the clicked card** — the preview pops open scaling
  from the exact card you clicked (`src/components/Modal.tsx` + `About.tsx`).

---

## ✍️ Where to edit content
| Change… | File |
|---|---|
| **All text (EN + FR)** incl. radar copy | `src/i18n/translations.ts` |
| **Monaco events** | `src/constants/monacoEvents.ts` |
| **Radar sweep colour / speed** | `src/index.css` (`.sonar-sweep`, `@keyframes sweep`) |
| **Brand colours / theme** | `tailwind.config.js` + `src/index.css` (`:root` / `.dark`) |

---

## 🚀 Run & deploy
```bash
npm install
npm run dev            # → http://localhost:5173
```
Deploy (Option A): push to `Thomas.github.io` → **Settings → Pages → Source →
GitHub Actions**. Workflow already uses the Node-24 action versions.

Built with ☕ in Monaco.
