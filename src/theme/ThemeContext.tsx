import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
type Theme = "light" | "dark";
interface Ctx { theme: Theme; toggle: () => void; }
const ThemeContext = createContext<Ctx | null>(null);
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light");
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); localStorage.setItem("tdsm-theme", theme); }, [theme]);
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() { const ctx = useContext(ThemeContext); if (!ctx) throw new Error("useTheme"); return ctx; }
