import { ThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./sections/Navbar";
import CircuitWorld from "./sections/CircuitWorld";
const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <Navbar />
      <CircuitWorld />
    </LanguageProvider>
  </ThemeProvider>
);
export default App;
