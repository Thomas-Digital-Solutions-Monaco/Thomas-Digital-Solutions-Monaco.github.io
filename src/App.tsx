import { ThemeProvider } from "./theme/ThemeContext";
import { SettingsProvider } from "./theme/SettingsContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./sections/Navbar";
import CircuitWorld from "./sections/CircuitWorld";
const App = () => (
  <ThemeProvider>
    <SettingsProvider>
      <LanguageProvider>
        <Navbar />
        <CircuitWorld />
      </LanguageProvider>
    </SettingsProvider>
  </ThemeProvider>
);
export default App;
