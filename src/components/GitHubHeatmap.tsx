import { useMemo } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { useGitHub, toWeeks } from "../lib/useGitHub";
import { githubUsername } from "../constants";

const LEVEL_CLASS: Record<number, string> = {
  0: "bg-[#ebedf0] dark:bg-[#20232a]",
  1: "bg-[#9be9a8] dark:bg-[#0e4429]",
  2: "bg-[#40c463] dark:bg-[#006d32]",
  3: "bg-[#30a14e] dark:bg-[#26a641]",
  4: "bg-[#216e39] dark:bg-[#39d353]",
};

const GitHubHeatmap = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useI18n();
  const a = t.activity;
  const { data, status } = useGitHub();

  const weeks = useMemo(() => (data ? toWeeks(data.days) : []), [data]);

  const monthLabels = useMemo(() => {
    const out: { col: number; label: string }[] = [];
    let last = -1;
    weeks.forEach((week, ci) => {
      const first = week.find((d) => d);
      if (!first) return;
      const m = new Date(first.date).getMonth();
      if (m !== last) {
        out.push({ col: ci, label: a.months[m] });
        last = m;
      }
    });
    return out;
  }, [weeks, a.months]);

  const cell = compact ? 9 : 11;
  const gap = 3;
  const step = cell + gap;
  const profileUrl = `https://github.com/${githubUsername}`;

  if (status === "loading")
    return <p className="py-8 text-center text-sm text-mist">{a.loading}</p>;

  if (status === "error")
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-mist">{a.error}</p>
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">
          {a.viewProfile}
        </a>
      </div>
    );

  return (
    <div>
      {!compact && (
        <p className="mb-4 text-sm font-semibold text-ink">
          {data!.total.toLocaleString()} <span className="font-normal text-mist">{a.total}</span>
        </p>
      )}

      <div className="overflow-x-auto pb-2">
        <div className="inline-block">
          <div className="relative mb-1 h-4" style={{ width: weeks.length * step }}>
            {monthLabels.map((m) => (
              <span key={`${m.col}-${m.label}`} className="absolute text-[10px] text-mist" style={{ left: m.col * step }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex" style={{ gap }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap }}>
                {week.map((day, di) =>
                  day ? (
                    <span
                      key={di}
                      title={`${day.count} — ${day.date}`}
                      className={`rounded-[2px] ${LEVEL_CLASS[day.level]}`}
                      style={{ width: cell, height: cell }}
                    />
                  ) : (
                    <span key={di} style={{ width: cell, height: cell }} />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-4 flex items-center justify-end gap-2 text-xs text-mist">
          <span>{a.less}</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`h-[11px] w-[11px] rounded-[2px] ${LEVEL_CLASS[l]}`} />
          ))}
          <span>{a.more}</span>
        </div>
      )}
    </div>
  );
};

export default GitHubHeatmap;
