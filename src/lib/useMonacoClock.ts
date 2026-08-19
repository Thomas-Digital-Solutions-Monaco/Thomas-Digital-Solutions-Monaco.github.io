import { useEffect, useState } from "react";

/** Live HH:MM:SS clock in Monaco's timezone (Europe/Monaco). */
export function useMonacoClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Monaco",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

/** Whole days from now until a target ISO date (>=0). */
export function daysUntil(iso: string): number {
  const now = new Date();
  const target = new Date(iso + "T00:00:00");
  const ms = target.getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}
