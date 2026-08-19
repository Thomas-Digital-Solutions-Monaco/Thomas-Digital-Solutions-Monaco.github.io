import { useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { monacoEvents } from "../constants";
import { useMonacoClock, daysUntil } from "../lib/useMonacoClock";
import { useGitHub } from "../lib/useGitHub";
import StatPreview from "./StatPreview";
import type { StatId } from "../i18n/translations";

const LiveRadar = () => {
  const { t } = useI18n();
  const r = t.radar;
  const clock = useMonacoClock();
  const { data } = useGitHub();
  const commits = data?.total ?? null;

  const [openStat, setOpenStat] = useState<StatId | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);
  const openWith = (id: StatId, e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setOpenStat(id);
  };

  const events = useMemo(
    () =>
      monacoEvents
        .map((e) => ({ ...e, daysToStart: daysUntil(e.start), daysToEnd: daysUntil(e.end) }))
        .filter((e) => e.daysToEnd >= 0)
        .sort((a, b) => a.daysToStart - b.daysToStart),
    []
  );
  const next = events[0];

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (events.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % events.length), 4000);
    return () => clearInterval(id);
  }, [events.length]);

  const dayWord = (n: number) => (n === 1 ? r.day : r.days);
  const countdownLabel = (e: (typeof events)[number]) =>
    e.daysToStart <= 0 && e.daysToEnd >= 0 ? r.liveNow : `${r.starts} ${e.daysToStart} ${dayWord(e.daysToStart)}`;

  const stats: { id: StatId; value: string; label: string }[] = [
    { id: "apps", value: "3", label: r.kApps },
    { id: "platforms", value: "4", label: r.kPlatforms },
    { id: "experience", value: "6", label: r.kYears },
    { id: "github", value: commits === null ? "—" : commits.toLocaleString(), label: r.kCommits },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-panel p-6 shadow-soft sm:p-8">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute -left-24 -top-24 h-[520px] w-[520px]">
          {[0.25, 0.5, 0.75, 1].map((s) => (
            <span key={s} className="absolute rounded-full border border-brand/15" style={{ inset: `${(1 - s) * 50}%` }} />
          ))}
          <span className="radar-ping" style={{ inset: "38%" }} />
          <div className="sonar-sweep" />
        </div>
      </div>

      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-extrabold tracking-tight text-ink">{r.title}</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand">
            <span className="live-dot h-2 w-2 rounded-full bg-brand" />
            {r.live}
          </span>
          <span className="ml-auto font-mono text-sm text-mist">
            {r.today} · {clock || "--:--:--"}
          </span>
        </div>

        <p className="subtext mt-3 max-w-2xl text-sm sm:text-base">{r.subtext}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <button
              key={s.id}
              onClick={(e) => openWith(s.id, e)}
              className="group rounded-xl border border-line bg-cream px-4 py-3 text-left transition-colors hover:border-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <p className="text-2xl font-extrabold text-brand">{s.value}</p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-mist">{s.label}</p>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-mist">{r.hint}</p>

        {next && (
          <div className="mt-5 flex items-center gap-3 rounded-xl border border-line bg-panel2/60 px-4 py-3">
            <span className="text-2xl" aria-hidden>{next.icon}</span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-mist">{r.nextEvent}</p>
              <p className="truncate font-bold text-ink">{next.name}</p>
            </div>
            <span className="ml-auto shrink-0 rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white">
              {next.daysToStart <= 0 ? r.liveNow : `${next.daysToStart} ${dayWord(next.daysToStart)}`}
            </span>
          </div>
        )}

        {events.length > 0 && (
          <div className="mt-5">
            <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
              <span aria-hidden>◉</span> {r.feedTitle}
              {events.length > 1 && <span className="text-mist">{idx + 1}/{events.length}</span>}
            </p>
            <a
              key={idx}
              href={events[idx].url}
              target="_blank"
              rel="noopener noreferrer"
              className="word-swap flex items-center gap-3 rounded-xl border border-line bg-cream px-4 py-3 transition-colors hover:border-brand"
            >
              <span className="text-xl" aria-hidden>{events[idx].icon}</span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-ink">{events[idx].name}</span>
                <span className="block text-xs text-mist">{countdownLabel(events[idx])}</span>
              </span>
              <span className="ml-auto text-mist">→</span>
            </a>
          </div>
        )}
      </div>

      <StatPreview stat={openStat} origin={origin} onClose={() => setOpenStat(null)} />
    </div>
  );
};

export default LiveRadar;
