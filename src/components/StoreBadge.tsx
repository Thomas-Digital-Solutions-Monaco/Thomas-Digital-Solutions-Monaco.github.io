import type { Platform } from "../i18n/translations";
interface BadgeMeta { supertext: string; name: string; icon: JSX.Element; }
const appleMark = (<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>);
const playMark = (<svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path d="M3.6 2.4c-.3.2-.5.6-.5 1.1v17c0 .5.2.9.5 1.1l9.4-9.6L3.6 2.4z" fill="#00D2FF" /><path d="M16.9 8.7L13 12.1l3.9 3.4 3.2-1.8c.9-.5.9-1.9 0-2.4l-3.2-1.6z" fill="#FFCE00" /><path d="M3.6 2.4L13 12.1l3.9-3.4L5.2 1.9c-.6-.3-1.2-.2-1.6.5z" fill="#00F076" /><path d="M3.6 21.6c.4.6 1 .7 1.6.4l11.7-6.5-3.9-3.4L3.6 21.6z" fill="#FF3945" /></svg>);
const windowsMark = (<svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden><path fill="#00A4EF" d="M3 5.5l7.5-1v7.5H3zM3 18.5l7.5 1V12H3zM11.5 4.3L21 3v9h-9.5zM11.5 12H21v9l-9.5-1.3z" /></svg>);
const meta: Record<Platform, BadgeMeta> = {
  ios: { supertext: "Download", name: "App Store", icon: appleMark }, mac: { supertext: "Download", name: "Mac App Store", icon: appleMark },
  android: { supertext: "Get it on", name: "Google Play", icon: playMark }, windows: { supertext: "Get from", name: "Microsoft Store", icon: windowsMark },
};
const StoreBadge = ({ platform, comingSoon }: { platform: Platform; comingSoon: string }) => {
  const m = meta[platform];
  return (
    <button type="button" title={comingSoon} aria-disabled="true" className="group inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-[#141319] px-2.5 py-1.5 text-white transition-transform hover:-translate-y-0.5">
      <span className="shrink-0">{m.icon}</span>
      <span className="flex flex-col items-start leading-none"><span className="text-[7px] font-medium uppercase tracking-wide text-white/80">{m.supertext}</span><span className="text-xs font-semibold">{m.name}</span></span>
    </button>
  );
};
export default StoreBadge;
