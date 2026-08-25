import { useEffect, useState } from "react";
export function useMonacoClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Monaco", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date())); tick();
    const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return time;
}
export function daysUntil(iso: string): number { const now = new Date(); const target = new Date(iso + "T00:00:00"); return Math.ceil((target.getTime() - now.getTime()) / 86_400_000); }
