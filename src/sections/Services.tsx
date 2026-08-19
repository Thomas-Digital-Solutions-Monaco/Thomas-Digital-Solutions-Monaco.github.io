import { useState } from "react";
import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";
import ServiceIcon from "../components/ServiceIcon";
import ServicePreview from "../components/ServicePreview";
import type { SvcId } from "../i18n/translations";

const Services = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [openSvc, setOpenSvc] = useState<SvcId | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  const openWith = (id: SvcId, e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setOpenSvc(id);
  };

  return (
    <section id="services" data-snap className="relative bg-cream py-16 sm:py-24">
      <div className="section" ref={ref}>
        <div className={shown ? "fade-up" : "opacity-0"}>
          <p className="eyebrow mb-4">{t.services.eyebrow}</p>
          <h2 className="heading max-w-2xl">{t.services.heading}</h2>
          <p className="subtext mt-4 max-w-xl">{t.services.subtext}</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {t.services.items.map((s, i) => (
            <button
              key={s.id}
              onClick={(e) => openWith(s.id, e)}
              className="card group cursor-pointer p-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <ServiceIcon id={s.id} className="h-7 w-7" />
              </span>
              <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
              <p className="subtext mt-3 text-base">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                Learn more →
              </span>
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-mist">{t.services.hint}</p>
      </div>

      <ServicePreview svc={openSvc} origin={origin} onClose={() => setOpenSvc(null)} />
    </section>
  );
};

export default Services;
