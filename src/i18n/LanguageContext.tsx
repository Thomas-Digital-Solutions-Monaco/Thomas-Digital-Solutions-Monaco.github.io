import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type Translation } from "./translations";
interface Ctx { lang: Lang; setLang: (l: Lang) => void; toggle: () => void; t: Translation; }
const LanguageContext = createContext<Ctx | null>(null);
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => { const saved = typeof localStorage !== "undefined" && localStorage.getItem("tdsm-lang"); return saved === "fr" ? "fr" : "en"; });
  useEffect(() => { localStorage.setItem("tdsm-lang", lang); document.documentElement.lang = lang; }, [lang]);
  const toggle = () => setLang((l) => (l === "en" ? "fr" : "en"));
  return <LanguageContext.Provider value={{ lang, setLang, toggle, t: translations[lang] }}>{children}</LanguageContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() { const ctx = useContext(LanguageContext); if (!ctx) throw new Error("useI18n"); return ctx; }
