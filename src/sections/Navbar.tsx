import { useState } from "react";
import { company } from "../constants";
import { useI18n } from "../i18n/LanguageContext";
import { useTheme } from "../theme/ThemeContext";
const Navbar = () => {
  const { t, lang, toggle } = useI18n();
  const { theme, toggle: toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const links = [ { href: "#home", label: t.nav.home }, { href: "#about", label: t.nav.about }, { href: "#services", label: t.nav.services }, { href: "#work", label: t.nav.work }, { href: "#activity", label: t.nav.activity }, { href: "#contact", label: t.nav.contact } ];
  const iconBtn = "grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel/70 text-ink transition-colors hover:border-brand hover:text-brand";
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt={company.name} className="h-9 w-auto" onError={(e) => { e.currentTarget.style.display = "none"; const fb = e.currentTarget.nextElementSibling as HTMLElement | null; if (fb) fb.style.display = "inline-flex"; }} />
          <span className="items-center gap-2 font-extrabold tracking-tight" style={{ display: "none" }}>
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white">T</span>
            <span className="text-lg text-ink">{company.short}<span className="text-brand">.</span></span>
          </span>
        </a>
        <ul className="hidden items-center gap-7 lg:flex">{links.map((link) => (<li key={link.href}><a href={link.href} className="text-sm font-medium text-mist transition-colors hover:text-ink">{link.label}</a></li>))}</ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle dark mode" title={theme === "dark" ? "Light mode" : "Dark mode"}>{theme === "dark" ? "☀️" : "🌙"}</button>
          <button onClick={toggle} className="rounded-lg border border-line bg-panel/70 px-3 py-1.5 text-xs font-bold uppercase text-ink transition-colors hover:border-brand hover:text-brand" aria-label="Switch language" title={lang === "en" ? "Passer en français" : "Switch to English"}>{lang === "en" ? "FR" : "EN"}</button>
          <a href="#contact" className="btn btn-primary hidden lg:inline-flex">{t.nav.cta}</a>
          <button className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-panel/70 text-xl lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">{open ? "✕" : "☰"}</button>
        </div>
      </nav>
      {open && (<ul className="mx-5 rounded-2xl border border-line bg-panel/95 p-2 shadow-glow backdrop-blur-md lg:hidden">{links.map((link) => (<li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-sm text-mist hover:bg-cream hover:text-ink">{link.label}</a></li>))}</ul>)}
    </header>
  );
};
export default Navbar;
