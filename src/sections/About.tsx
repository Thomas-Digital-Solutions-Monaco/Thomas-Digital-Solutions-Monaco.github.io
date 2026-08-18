import { techLogos } from "../constants";
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

        {/* tech logos (real brand marks, with graceful monogram fallback) */}
        <div className="mt-12 flex flex-wrap items-start gap-x-6 gap-y-6 sm:gap-x-8">
          {techLogos.map((tech) => (
            <div
              key={tech.name}
              className="group flex w-16 flex-col items-center gap-2 text-center"
              title={tech.name}
            >
              <div className="grid h-10 w-10 place-items-center">
                <img
                  src={tech.url}
                  alt={tech.name}
                  loading="lazy"
                  className="h-9 w-9 object-contain grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const fb = e.currentTarget
                      .nextElementSibling as HTMLElement | null;
                    if (fb) fb.style.display = "grid";
                  }}
                />
                <span
                  className="h-9 w-9 place-items-center rounded-lg text-xs font-bold text-white"
                  style={{ display: "none", backgroundColor: tech.color }}
                >
                  {tech.name.slice(0, 2)}
                </span>
              </div>
              <span className="text-xs leading-tight text-mist">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
