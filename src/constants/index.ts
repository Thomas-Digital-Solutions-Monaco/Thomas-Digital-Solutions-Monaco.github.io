// ============================================================
//  Non-text data (not translated).
// ============================================================

export const company = {
  name: "Thomas Digital Solutions Monaco",
  short: "TDSM",
  email: "contact@tdsm.mc",
  location: "Monaco",
};

// ▸▸ SET YOUR GITHUB USERNAME HERE (live activity + radar feed) ◂◂
export const githubUsername = "Thomas-Digital-Solutions-Monaco";

export interface TechLogo {
  name: string;
  url?: string;
  color: string;
}
const si = (slug: string, color?: string) =>
  `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
const dev = (path: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}.svg`;

export const techLogos: TechLogo[] = [
  { name: "React Native", url: si("react", "61DAFB"), color: "#61DAFB" },
  { name: "Expo", url: si("expo", "000020"), color: "#000020" },
  { name: "TypeScript", url: si("typescript", "3178C6"), color: "#3178C6" },
  { name: "Node.js", url: si("nodedotjs", "5FA04E"), color: "#5FA04E" },
  { name: "Vite", url: si("vite", "646CFF"), color: "#646CFF" },
  { name: "Three.js", url: si("threedotjs", "000000"), color: "#111111" },
  { name: "Tailwind", url: si("tailwindcss", "06B6D4"), color: "#06B6D4" },
  { name: "Azure", url: dev("azure/azure-original"), color: "#0078D4" },
  { name: "Android", url: dev("android/android-original"), color: "#3DDC84" },
  { name: "Windows", url: dev("windows11/windows11-original"), color: "#0078D4" },
  { name: "Linux", url: si("linux", "FCC624"), color: "#111111" },
  { name: "Mac", url: si("apple", "000000"), color: "#111111" },
];

export const platformsList: { id: string; name: string; note: string }[] = [
  { id: "ios", name: "iOS", note: "iPhone & iPad" },
  { id: "android", name: "Android", note: "Phones & tablets" },
  { id: "mac", name: "macOS", note: "Native Mac apps" },
  { id: "windows", name: "Windows", note: "Desktop apps" },
];

export const socials = [
  { name: "GitHub", href: "https://github.com/Thomas-Digital-Solutions-Monaco" },
  { name: "Email", href: "mailto:contact@tdsm.mc" },
];

export { monacoEvents } from "./monacoEvents";
export type { MonacoEvent } from "./monacoEvents";
