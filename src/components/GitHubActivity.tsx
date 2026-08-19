import { useEffect, useMemo, useState } from "react";
import { githubUsername } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

interface Day { date: string; count: number; level: 0 | 1 | 2 | 3 | 4; }

const LEVEL_CLASS: Record<number, string> = {
  0: "bg-[#ebedf0] dark:bg-[#20232a]",
  1: "bg-[#9be9a8] dark:bg-[#0e4429]",
  2: "bg-[#40c463] dark:bg-[#006d32]",
  3: "bg-[#30a14e] dark:bg-[#26a641]",
  4: "bg-[#216e39] dark:bg-[#39d353]",
};

const GitHubActivity = () => {
  const { t } = useI18n();
  const a = t.activity;
  const [days, setDays] = useState<Day[] | null>(null);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading");

  useEffect(() => {
    let alive = true;
    setStatus("loading");
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: { contributions: Day[] }) => {
        if (!alive) return;
        const c = json.contributions ?? [];
        setDays(c);
        setTotal(c.reduce((s, d) => s + (d.count || 0), 0));
        setStatus("ok");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const weeks = useMemo(() => {
    if (!days) return [];
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
  }, [days]);

  const profileUrl = `https://github.com/${githubUsername}`;

  return (
    <div className="card p-6 sm:p-8">
      {status === "loading" && <p className="py-10 text-center text-sm text-mist">{a.loading}</p>}

      {status === "error" && (
        <div className="py-10 text-center">
          <p className="text-sm text-mist">{a.error}</p>
          <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
            {a.viewProfile}
          </a>
        </div>
      )}

      {status === "ok" && (
        <>
          <p className="mb-4 text-sm font-semibold text-ink">
            {total.toLocaleString()} <span className="font-normal text-mist">{a.total}</span>
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) =>
                    day ? (
                      <span key={di} title={`${day.count} — ${day.date}`} className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASS[day.level]}`} />
                    ) : (
                      <span key={di} className="h-[11px] w-[11px]" />
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-mist">
            <span>{a.less}</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span key={l} className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASS[l]}`} />
            ))}
            <span>{a.more}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default GitHubActivity;
