import { useEffect, useRef, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { useSettings, type Speed } from "../theme/SettingsContext";

/** Visitor control: turn animation off, or pick the drive speed. Phone-friendly. */
const SettingsMenu = () => {
  const { t } = useI18n();
  const s = t.settings;
  const { motion, speed, setMotion, setSpeed } = useSettings();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDoc); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const seg = (val: Speed, label: string) => (
    <button
      key={val}
      onClick={() => setSpeed(val)}
      disabled={motion === "off"}
      className={`flex-1 rounded-md px-2 py-1.5 text-xs font-semibold transition-colors disabled:opacity-40 ${speed === val && motion === "on" ? "bg-brand text-white" : "text-ink hover:bg-cream"}`}
    >
      {label}
    </button>
  );

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel/70 text-ink transition-colors hover:border-brand hover:text-brand"
        aria-label={s.title}
        title={s.title}
        aria-expanded={open}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[59] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed left-1/2 top-1/2 z-[60] w-[min(20rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-panel p-4 shadow-glow">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-mist">{s.title}</p>

          {/* Motion on/off */}
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">{s.motion}</span>
            <div className="flex overflow-hidden rounded-lg border border-line">
              <button onClick={() => setMotion("on")} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${motion === "on" ? "bg-brand text-white" : "text-ink hover:bg-cream"}`}>{s.on}</button>
              <button onClick={() => setMotion("off")} className={`px-3 py-1.5 text-xs font-semibold transition-colors ${motion === "off" ? "bg-brand text-white" : "text-ink hover:bg-cream"}`}>{s.off}</button>
            </div>
          </div>

          {/* Speed */}
          <span className="mb-1.5 block text-sm font-medium text-ink">{s.speed}</span>
          <div className="flex gap-1 rounded-lg border border-line p-1">
            {seg("slow", s.slow)}{seg("normal", s.normal)}{seg("fast", s.fast)}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default SettingsMenu;
