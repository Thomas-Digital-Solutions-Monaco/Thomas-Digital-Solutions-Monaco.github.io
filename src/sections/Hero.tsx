import { useEffect, useState, lazy, Suspense } from "react";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

const HeroCanvas = lazy(() => import("../components/HeroCanvas"));

const CanvasFallback = () => (
  <div className="grid h-full w-full place-items-center">
    <div className="h-56 w-56 rounded-full bg-brand/10 blur-3xl animate-pulse" />
  </div>
);

const Hero = () => {
  const { t } = useI18n();
  const [wordIndex, setWordIndex] = useState(0);
  const words = t.hero.words;

  useEffect(() => {
    setWordIndex(0);
    const id = setInterval(() => setWordIndex((i) => (i + 1) % words.length), 5000);
    return () => clearInterval(id);
  }, [words]);

  return (
    <section id="home" data-snap className="relative w-full overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />

      <div className="section grid min-h-[88vh] items-center gap-8 pb-16 pt-28 lg:grid-cols-2 lg:gap-6 lg:pb-12 lg:pt-24">
        <div className="fade-up max-w-xl">
          <p className="eyebrow mb-5">
            <span className="h-2 w-2 rounded-full bg-brand" />
            {company.location} · {t.hero.badge}
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            <span className="block">{t.hero.lead}</span>
            <span className="block h-[1.15em] overflow-hidden">
              <span key={wordIndex} className="word-swap inline-block whitespace-nowrap gradient-text">
                {words[wordIndex]}
              </span>
            </span>
            <span className="block">{t.hero.tail}</span>
          </h1>

          <p className="subtext mt-6 max-w-lg">{t.hero.subtext}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">{t.hero.ctaPrimary}</a>
            <a href="#work" className="btn btn-ghost">{t.hero.ctaSecondary}</a>
          </div>
        </div>

        <div className="relative h-[300px] w-full sm:h-[380px] lg:h-[520px]">
          {/* ── decorative backdrop so the car doesn't float alone ── */}
          <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
            {/* soft brand-red radial glow */}
            <div className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,30,44,0.28),rgba(216,30,44,0.08)_45%,transparent_70%)] blur-2xl" />
            {/* cool secondary accent for depth */}
            <div className="absolute right-[12%] top-[14%] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(155,28,49,0.25),transparent_70%)] blur-2xl" />
            {/* faint concentric rings, echoing the radar */}
            <div className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2">
              {[1, 0.72, 0.46].map((s) => (
                <span
                  key={s}
                  className="absolute rounded-full border border-brand/10"
                  style={{ inset: `${(1 - s) * 50}%` }}
                />
              ))}
            </div>
            {/* grounding "platform" ellipse under the car */}
            <div className="absolute bottom-[12%] left-1/2 h-10 w-3/5 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse,rgba(20,19,26,0.18),transparent_70%)] blur-md dark:bg-[radial-gradient(ellipse,rgba(0,0,0,0.5),transparent_70%)]" />
          </div>

          <div className="relative z-10 h-full w-full">
            <Suspense fallback={<CanvasFallback />}>
              <HeroCanvas />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
