import { useI18n } from "../i18n/LanguageContext";
import { useReveal } from "../lib/useReveal";
import GitHubHeatmap from "../components/GitHubHeatmap";

const Activity = () => {
  const { t } = useI18n();
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section id="activity" data-snap className="relative bg-cream py-16 sm:py-24">
      <div className="section" ref={ref}>
        <div className={shown ? "fade-up" : "opacity-0"}>
          <p className="eyebrow mb-4">{t.activity.eyebrow}</p>
          <h2 className="heading">{t.activity.heading}</h2>
          <p className="subtext mt-4 max-w-xl">{t.activity.subtext}</p>
          <div className="mt-8 card p-6 sm:p-8">
            <GitHubHeatmap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activity;
