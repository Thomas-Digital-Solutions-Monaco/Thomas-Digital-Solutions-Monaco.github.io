import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";

const Services = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="services" className="relative bg-cream py-24 sm:py-32">
      <div className="section" ref={ref}>
        <div className={shown ? "fade-up" : "opacity-0"}>
          <p className="eyebrow mb-4">{t.services.eyebrow}</p>
          <h2 className="heading max-w-2xl">{t.services.heading}</h2>
          <p className="subtext mt-4 max-w-xl">{t.services.subtext}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {t.services.items.map((s, i) => (
            <article
              key={i}
              className="card group p-7"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-4 text-4xl">{s.icon}</div>
              <h3 className="text-xl font-semibold text-ink">{s.title}</h3>
              <p className="subtext mt-3 text-base">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
