import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";

const Experience = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="experience" data-snap className="section py-16 sm:py-24">
      <div className="mx-auto mb-14 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-line to-transparent" />

      <div ref={ref} className={shown ? "fade-up" : "opacity-0"}>
        <p className="eyebrow mb-4">{t.experience.eyebrow}</p>
        <h2 className="heading">{t.experience.heading}</h2>
        <div className="mt-10 border-l-2 border-line pl-6">
          {t.experience.items.map((e, i) => (
            <div key={i} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[31px] top-1 grid h-4 w-4 place-items-center rounded-full bg-brand ring-4 ring-paper" />
              <p className="text-sm font-semibold text-brand">{e.year}</p>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                {e.role} <span className="text-mist">· {e.place}</span>
              </h3>
              <p className="subtext mt-1 text-base">{e.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
