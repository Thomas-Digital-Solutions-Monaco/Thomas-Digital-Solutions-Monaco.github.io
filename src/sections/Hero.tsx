import { useEffect, useState, lazy, Suspense } from "react";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

// ⚡ Lazy-load the 3D canvas so the Three.js bundle becomes its own chunk.
const HeroCanvas = lazy(() => import("../components/HeroCanvas"));

const CanvasFallback = () => (
  <div className="absolute inset-0 grid place-items-center">
    <div className="h-64 w-64 rounded-full bg-brand/10 blur-3xl animate-pulse" />
  </div>
);

const Hero = () => {
  const { t } = useI18n();
  const [wordIndex, setWordIndex] = useState(0);
  const words = t.hero.words;

  useEffect(() => {
    setWordIndex(0);
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(id);
  }, [words]);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* 3D background (lazy) */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<CanvasFallback />}>
          <HeroCanvas />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-70" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-paper/60 via-transparent to-paper" />

      <div className="section flex min-h-screen flex-col justify-center pt-24">
        <div className="max-w-3xl fade-up">
          <p className="eyebrow mb-5">
            <span className="h-2 w-2 rounded-full bg-brand" />
            {company.location} · {t.hero.badge}
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            {t.hero.lead}
            <span className="gradient-text">{words[wordIndex]}</span>
            {t.hero.tail}
          </h1>

          <p className="subtext mt-6 max-w-xl">{t.hero.subtext}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#work" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-sm text-mist"
      >
        ↓ {t.hero.scroll}
      </a>
    </section>
  );
};

export default Hero;
