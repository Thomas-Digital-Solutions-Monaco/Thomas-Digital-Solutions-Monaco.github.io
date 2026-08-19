import { useEffect, useState } from "react";
import { githubUsername } from "../constants";

export interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
export type GhStatus = "loading" | "ok" | "error";

interface GhData {
  days: Day[];
  total: number;
}

interface ApiResponse {
  total?: Record<string, number>; // includes "lastYear"
  contributions: Day[];
}

let cache: GhData | null = null;
let inflight: Promise<GhData> | null = null;

function load(): Promise<GhData> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  // ?y=last → GitHub's default rolling-year view. The API's total.lastYear is
  // the authoritative count (same number GitHub shows), so prefer it over
  // summing the array ourselves.
  inflight = fetch(
    `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`
  )
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((j: ApiResponse) => {
      const days = j.contributions ?? [];
      const summed = days.reduce((s, d) => s + (d.count || 0), 0);
      const total = j.total?.lastYear ?? summed;
      cache = { days, total };
      return cache;
    });
  return inflight;
}

/** Shared hook: live GitHub contributions for the configured user. */
export function useGitHub() {
  const [data, setData] = useState<GhData | null>(cache);
  const [status, setStatus] = useState<GhStatus>(cache ? "ok" : "loading");

  useEffect(() => {
    if (cache) return;
    let alive = true;
    load()
      .then((d) => alive && (setData(d), setStatus("ok")))
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  return { data, status };
}

/** Group days into week columns (each = 7 days aligned by weekday). */
export function toWeeks(days: Day[]): (Day | null)[][] {
  const cols: (Day | null)[][] = [];
  let col: (Day | null)[] = [];
  days.forEach((d, i) => {
    if (i === 0) {
      const wd = new Date(d.date).getUTCDay();
      for (let k = 0; k < wd; k++) col.push(null);
    }
    col.push(d);
    if (col.length === 7) {
      cols.push(col);
      col = [];
    }
  });
  if (col.length) {
    while (col.length < 7) col.push(null);
    cols.push(col);
  }
  return cols;
}
