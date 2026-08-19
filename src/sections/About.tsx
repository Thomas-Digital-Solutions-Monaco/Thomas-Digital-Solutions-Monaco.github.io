import { useState } from "react";
import { techLogos } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";
import StatPreview from "../components/StatPreview";
import type { StatId } from "../i18n/translations";

const About = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const a = t.about;
  const [openStat, setOpenStat] = useState<StatId | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const openWith = (id: StatId, e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setOpenStat(id);
  };

  return (
    <section id="about" data-snap className="section py-16 sm:py-24">
      <div ref={ref} className={shown ? "fade-up" : "opacity-0"}>
        <p className="eyebrow mb-4">{a.eyebrow}</p>
        <h2 className="heading max-w-3xl">
          {a.headA}
          <span className="text-brand">{a.acc1}</span>
          {a.mid}
          <span className="text-brand2">{a.acc2}</span>
          {a.end}
        </h2>
        <p className="subtext mt-6 max-w-2xl">{a.subtext}</p>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {a.stats.map((s) => (
              <button
                key={s.id}
                onClick={(e) => openWith(s.id, e)}
                className="card group cursor-pointer p-6 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <p className="text-4xl font-extrabold gradient-text">{s.value}</p>
                <p className="mt-2 text-sm text-mist">{s.label}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                  ⤢ preview
                </span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-mist">{a.previews.hint}</p>
        </div>

        <div className="mt-10 flex flex-wrap items-start gap-x-6 gap-y-6 sm:gap-x-8">
          {techLogos.map((tech) => (
            <div key={tech.name} className="group flex w-16 flex-col items-center gap-2 text-center" title={tech.name}>
              <div className="grid h-10 w-10 place-items-center">
                <img
                  src={tech.url}
                  alt={tech.name}
                  loading="lazy"
                  className="tech-logo h-9 w-9 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "grid";
                  }}
                />
                <span className="h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white" style={{ display: "none", backgroundColor: tech.color }}>
                  {tech.name.slice(0, 2)}
                </span>
              </div>
              <span className="text-xs leading-tight text-mist">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>

      <StatPreview stat={openStat} origin={origin} onClose={() => setOpenStat(null)} />
    </section>
  );
};

export default About;
