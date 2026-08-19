import { useState, useEffect } from "react";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";

const Navbar = () => {
  const { t, lang, toggle } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#services", label: t.nav.services },
    { href: "#work", label: t.nav.work },
    { href: "#activity", label: t.nav.activity },
    { href: "#contact", label: t.nav.contact },
  ];

  const iconBtn =
    "grid h-9 w-9 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-brand hover:text-brand";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <nav className="section flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt={company.name}
            className="h-9 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
              if (fb) fb.style.display = "inline-flex";
            }}
          />
          <span className="items-center gap-2 font-extrabold tracking-tight" style={{ display: "none" }}>
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white">T</span>
            <span className="text-lg text-ink">
              {company.short}
              <span className="text-brand">.</span>
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm text-mist transition-colors hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle dark mode" title={theme === "dark" ? "Light mode" : "Dark mode"}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={toggle}
            className="rounded-lg border border-line px-3 py-1.5 text-xs font-bold uppercase text-ink transition-colors hover:border-brand hover:text-brand"
            aria-label="Switch language"
            title={lang === "en" ? "Passer en français" : "Switch to English"}
          >
            {lang === "en" ? "FR" : "EN"}
          </button>
          <a href="#contact" className="btn btn-primary hidden lg:inline-flex">
            {t.nav.cta}
          </a>
          <button className="text-2xl lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-paper/95 px-5 pb-4 lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)} className="block py-3 text-mist hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Navbar;
