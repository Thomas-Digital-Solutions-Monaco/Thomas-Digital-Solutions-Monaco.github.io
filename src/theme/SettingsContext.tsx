import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
export type Motion = "on" | "off";
export type Speed = "slow" | "normal" | "fast";
export const SPEED_MUL: Record<Speed, number> = { slow: 1.7, normal: 1, fast: 0.5 };
interface Ctx { motion: Motion; speed: Speed; speedMul: number; setMotion: (m: Motion) => void; setSpeed: (s: Speed) => void; }
const SettingsContext = createContext<Ctx | null>(null);
export function SettingsProvider({ children }: { children: ReactNode }) {
  const [motion, setMotionS] = useState<Motion>(() => {
    const s = typeof localStorage !== "undefined" && localStorage.getItem("tdsm-motion");
    if (s === "on" || s === "off") return s;
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "off" : "on";
  });
  const [speed, setSpeedS] = useState<Speed>(() => {
    const s = typeof localStorage !== "undefined" && localStorage.getItem("tdsm-speed");
    return s === "slow" || s === "fast" || s === "normal" ? s : "normal";
  });
  useEffect(() => { document.documentElement.classList.toggle("no-anim", motion === "off"); localStorage.setItem("tdsm-motion", motion); }, [motion]);
  useEffect(() => { localStorage.setItem("tdsm-speed", speed); }, [speed]);
  return <SettingsContext.Provider value={{ motion, speed, speedMul: SPEED_MUL[speed], setMotion: setMotionS, setSpeed: setSpeedS }}>{children}</SettingsContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() { const c = useContext(SettingsContext); if (!c) throw new Error("useSettings"); return c; }
