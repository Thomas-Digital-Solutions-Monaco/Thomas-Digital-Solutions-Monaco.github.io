import { ThemeProvider } from "./theme/ThemeContext";
import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Live from "./sections/Live";
import About from "./sections/About";
import Services from "./sections/Services";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Activity from "./sections/Activity";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <main className="relative">
          <Navbar />
          <Hero />
          <Live />
          <About />
          <Services />
          <Work />
          <Experience />
          <Activity />
          <Contact />
          <Footer />
        </main>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
