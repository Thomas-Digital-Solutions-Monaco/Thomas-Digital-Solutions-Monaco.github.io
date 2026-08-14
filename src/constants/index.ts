// ============================================================
//  Non-text data (not translated).
//  Text content lives in src/i18n/translations.ts
// ============================================================

export const company = {
  name: "Thomas Digital Solutions Monaco",
  short: "TDSM",
  email: "contact@tdsm.mc",
  location: "Monaco",
  phone: "+377 00 00 00 00",
};

// Real, colored brand logos served from the Devicon CDN.
// To add/remove a tech, edit this list — { name, slug }.
// URL pattern: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/<slug>/<slug>-original.svg
export const techLogos: { name: string; slug: string }[] = [
  { name: "Swift", slug: "swift" },
  { name: "Kotlin", slug: "kotlin" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodejs" },
  { name: "Vite", slug: "vitejs" },
  { name: "Three.js", slug: "threejs" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Azure", slug: "azure" },
  { name: "Figma", slug: "figma" },
];

export const deviconUrl = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;

export const socials = [
  { name: "GitHub", href: "https://github.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
  { name: "Email", href: "mailto:contact@tdsm.mc" },
];
