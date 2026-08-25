import { useMemo, useRef, useEffect } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { useGitHub, toWeeks } from "../lib/useGitHub";
import { githubUsername } from "../constants";
const LEVEL: Record<number, string> = { 0:"bg-[#ebedf0] dark:bg-[#20232a]", 1:"bg-[#9be9a8] dark:bg-[#0e4429]", 2:"bg-[#40c463] dark:bg-[#006d32]", 3:"bg-[#30a14e] dark:bg-[#26a641]", 4:"bg-[#216e39] dark:bg-[#39d353]" };
const GitHubHeatmap = () => {
  const { t } = useI18n(); const a = t.activity;
  const { data, status } = useGitHub();
  const scrollRef = useRef<HTMLDivElement>(null);
  const weeks = useMemo(() => (data ? toWeeks(data.days) : []), [data]);
  const monthLabels = useMemo(() => { const out: { col: number; label: string }[] = []; let last = -1; weeks.forEach((w, ci) => { const f = w.find((d) => d); if (!f) return; const m = new Date(f.date).getMonth(); if (m !== last) { out.push({ col: ci, label: a.months[m] }); last = m; } }); return out; }, [weeks, a.months]);
  useEffect(() => { if (status === "ok" && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth; }, [status, weeks.length]);
  const cell = 8, gap = 3, step = cell + gap;
  const url = `https://github.com/${githubUsername}`;
  if (status === "loading") return <p className="py-4 text-center text-sm text-mist">{a.loading}</p>;
  if (status === "error") return (<div className="py-4 text-center"><p className="text-sm text-mist">{a.error}</p><a href={url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-brand hover:underline">{a.viewProfile}</a></div>);
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-ink">{data!.total.toLocaleString()} <span className="font-normal text-mist">{a.total}</span></p>
      <div ref={scrollRef} className="overflow-x-auto pb-1"><div className="inline-block">
        <div className="relative mb-1 h-4" style={{ width: weeks.length * step }}>{monthLabels.map((m) => (<span key={`${m.col}-${m.label}`} className="absolute text-[9px] text-mist" style={{ left: m.col * step }}>{m.label}</span>))}</div>
        <div className="flex" style={{ gap }}>{weeks.map((w, wi) => (<div key={wi} className="flex flex-col" style={{ gap }}>{w.map((d, di) => d ? <span key={di} title={`${d.count} — ${d.date}`} className={`rounded-[2px] ${LEVEL[d.level]}`} style={{ width: cell, height: cell }} /> : <span key={di} style={{ width: cell, height: cell }} />)}</div>))}</div>
      </div></div>
    </div>
  );
};
export default GitHubHeatmap;
