import { techLogos, deviconUrl } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";

const About = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const a = t.about;

  return (
    <section id="about" className="section py-24 sm:py-32">
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

        {/* stats */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {a.stats.map((s) => (
            <div key={s.label} className="card p-6 text-center">
              <p className="text-4xl font-extrabold gradient-text">{s.value}</p>
              <p className="mt-2 text-sm text-mist">{s.label}</p>
            </div>
          ))}
        </div>

        {/* tech logos */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center gap-2"
              title={tech.name}
            >
              <img
                src={deviconUrl(tech.slug)}
                alt={tech.name}
                loading="lazy"
                className="h-9 w-9 grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
              />
              <span className="text-xs text-mist">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
