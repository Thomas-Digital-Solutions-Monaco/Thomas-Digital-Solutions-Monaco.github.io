import { LanguageProvider } from "./i18n/LanguageContext";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Services from "./sections/Services";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const App = () => {
  return (
    <LanguageProvider>
      <main className="relative">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Work />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
};

export default App;
