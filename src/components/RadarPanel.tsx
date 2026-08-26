import { useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { monacoEvents } from "../constants";
import { useMonacoClock, daysUntil } from "../lib/useMonacoClock";
import { useGitHub } from "../lib/useGitHub";
import { useMonacoFeed } from "../lib/useMonacoFeed";
import type { StatId } from "../i18n/translations";
const clamp2 = "block overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]";
const RadarPanel = ({ onStat }: { onStat: (id: StatId, e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const { t } = useI18n(); const r = t.radar;
  const clock = useMonacoClock();
  const { data } = useGitHub(); const commits = data?.total ?? null;
  const { items, status } = useMonacoFeed();
  const events = useMemo(() => monacoEvents.map((e) => ({ ...e, dS: daysUntil(e.start), dE: daysUntil(e.end) })).filter((e) => e.dE >= 0).sort((a, b) => a.dS - b.dS), []);
  const next = events[0]; const dayWord = (n: number) => (n === 1 ? r.day : r.days);
  const live = status === "ok" && items && items.length > 0;
  const [idx, setIdx] = useState(0);
  const feedLen = live ? items!.length : events.length;
  useEffect(() => { if (feedLen < 2) return; const id = setInterval(() => setIdx((i) => (i + 1) % feedLen), 4500); return () => clearInterval(id); }, [feedLen]);
  const stats: { id: StatId; value: string; label: string }[] = [
    { id: "apps", value: "3", label: r.kApps }, { id: "platforms", value: "4", label: r.kPlatforms },
    { id: "experience", value: "6", label: r.kYears }, { id: "github", value: commits === null ? "—" : commits.toLocaleString(), label: r.kCommits },
  ];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 -top-16 h-[22rem] w-[22rem] opacity-90" aria-hidden><div className="radar-rings absolute inset-0" /><div className="sonar-sweep" /></div>
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-extrabold tracking-tight text-ink">{r.title}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand"><span className="live-dot h-1.5 w-1.5 rounded-full bg-brand" />{r.live}</span>
          <span className="ml-auto font-mono text-xs text-mist">{r.today} · {clock || "--:--:--"}</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stats.map((s) => (<button key={s.id} onClick={(e) => onStat(s.id, e)} className="rounded-lg border border-line bg-cream/90 px-3 py-2 text-left backdrop-blur-sm transition-colors hover:border-brand"><p className="text-xl font-extrabold text-brand">{s.value}</p><p className="mt-0.5 text-[10px] uppercase tracking-wide text-mist">{s.label}</p></button>))}
        </div>
        {next && (<div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-panel2/70 px-3 py-2 backdrop-blur-sm"><span className="text-lg" aria-hidden>{next.icon}</span><p className="truncate text-sm font-bold text-ink">{next.name}</p><span className="ml-auto shrink-0 rounded-md bg-brand px-2 py-1 text-[11px] font-bold text-white">{next.dS <= 0 ? r.liveNow : `${r.starts} ${next.dS} ${dayWord(next.dS)}`}</span></div>)}
        <div className="mt-3">
          <p className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-brand"><span className="live-dot h-1.5 w-1.5 rounded-full bg-brand" />{r.news}</p>
          {live ? (
            <a key={idx} href={items![idx].link} target="_blank" rel="noopener noreferrer" className="word-swap flex items-start gap-2 rounded-lg border border-line bg-cream/90 px-3 py-2 backdrop-blur-sm transition-colors hover:border-brand">
              <span className="min-w-0 flex-1"><span className={`${clamp2} text-sm font-semibold leading-snug text-ink`}>{items![idx].title}</span>{items!.length > 1 && <span className="mt-0.5 block text-[10px] text-mist">{idx + 1}/{items!.length}</span>}</span><span className="mt-0.5 shrink-0 text-mist">→</span>
            </a>
          ) : (
            <a key={idx} href={events[idx % events.length]?.url} target="_blank" rel="noopener noreferrer" className="word-swap flex items-center gap-2 rounded-lg border border-line bg-cream/90 px-3 py-2 backdrop-blur-sm transition-colors hover:border-brand"><span className="text-lg" aria-hidden>{events[idx % events.length]?.icon}</span><span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{events[idx % events.length]?.name}</span><span className="shrink-0 text-mist">→</span></a>
          )}
        </div>
      </div>
    </div>
  );
};
export default RadarPanel;
