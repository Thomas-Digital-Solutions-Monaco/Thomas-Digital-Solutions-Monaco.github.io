import { useMemo, useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";
import PlatformIcon, { platformLabel } from "../components/PlatformIcon";

const Work = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [filter, setFilter] = useState<string>("__all");

  const projects = t.work.items;

  const categories = useMemo(
    () => ["__all", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const visible =
    filter === "__all"
      ? projects
      : projects.filter((p) => p.category === filter);

  const label = (c: string) => (c === "__all" ? t.work.all : c);

  return (
    <section id="work" className="section py-24 sm:py-32">
      <div ref={ref} className={shown ? "fade-up" : "opacity-0"}>
        <p className="eyebrow mb-4">{t.work.eyebrow}</p>
        <h2 className="heading">{t.work.heading}</h2>

        {/* filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                filter === c
                  ? "bg-brand text-white"
                  : "border border-line text-mist hover:text-ink"
              }`}
            >
              {label(c)}
            </button>
          ))}
        </div>

        {/* grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article key={p.name} className="card group flex flex-col overflow-hidden">
              {/* colored header with the app initial */}
              <div
                className="relative flex h-40 w-full items-center justify-center"
                style={{
                  background: `radial-gradient(120% 120% at 30% 0%, ${p.accent}, ${p.accent}bb 60%, ${p.accent}77)`,
                }}
              >
                <span className="text-6xl font-black text-white/90">
                  {p.name.charAt(0)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {p.category}
                </span>
                <h3 className="mt-2 text-lg font-bold text-ink">{p.name}</h3>
                <p className="text-sm font-medium text-mist">{p.tagline}</p>
                <p className="subtext mt-3 flex-1 text-sm">{p.desc}</p>

                {/* platform buttons — not wired yet (store links added at launch) */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.platforms.map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      className="btn-platform"
                      title={t.work.comingSoon}
                      aria-disabled="true"
                    >
                      <PlatformIcon platform={plat} />
                      {platformLabel(plat)}
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
