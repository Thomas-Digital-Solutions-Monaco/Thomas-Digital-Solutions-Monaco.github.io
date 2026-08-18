import { useEffect, useState, lazy, Suspense } from "react";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";

// ⚡ Lazy-load the 3D canvas so the Three.js bundle becomes its own chunk.
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
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, 2200);
    return () => clearInterval(id);
  }, [words]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-paper"
    >
      {/* faint grid, kept well behind everything */}
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />

      {/* Left-aligned throughout. On mobile the car sits below the text; on
          desktop it moves to a right column. */}
      <div className="section grid min-h-screen items-center gap-8 pb-24 pt-28 lg:grid-cols-2 lg:gap-6 lg:pb-16 lg:pt-24">
        {/* ── TEXT (always left-aligned) ── */}
        <div className="fade-up max-w-xl">
          <p className="eyebrow mb-5">
            <span className="h-2 w-2 rounded-full bg-brand" />
            {company.location} · {t.hero.badge}
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t.hero.lead}
            <span className="gradient-text">{words[wordIndex]}</span>
            {t.hero.tail}
          </h1>

          <p className="subtext mt-6 max-w-lg">{t.hero.subtext}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#work" className="btn btn-ghost">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* ── 3D F1 car ── */}
        <div className="relative h-[300px] w-full sm:h-[400px] lg:h-[560px]">
          <Suspense fallback={<CanvasFallback />}>
            <HeroCanvas />
          </Suspense>
        </div>
      </div>

      {/* scroll indicator — left-aligned to match the section, hidden on short
          mobile screens to avoid overlapping the buttons */}
      <a
        href="#about"
        className="section absolute inset-x-0 bottom-6 hidden animate-bounce text-sm text-mist sm:block"
      >
        ↓ {t.hero.scroll}
      </a>
    </section>
  );
};

export default Hero;
