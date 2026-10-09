import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Education from "./sections/Education.jsx";
import Skills from "./sections/Skills.jsx";
import Experience from "./sections/Experience.jsx";
import Publications from "./sections/Publications.jsx";
import Projects from "./sections/Projects.jsx";
import Achievements from "./sections/Achievements.jsx";
import Leadership from "./sections/Leadership.jsx";
import Training from "./sections/Training.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./components/Footer.jsx";

function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // Continue with the requested dark default if storage is unavailable.
  }
  return "dark";
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // Theme still applies in memory when storage is blocked.
    }
  }, [theme]);

  return (
    <div className="app-shell min-h-screen bg-case-bg text-case-ink">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar theme={theme} onThemeChange={() => setTheme((current) => current === "dark" ? "light" : "dark")} />
      <main id="main-content">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Experience />
        <Publications />
        <Projects />
        <Achievements />
        <Leadership />
        <Training />
        <Contact />
      </main>
      <Footer />
      <span className="sr-only" aria-live="polite" aria-atomic="true" id="theme-announcement">{theme === "dark" ? "Dark theme" : "Light theme"}</span>
    </div>
  );
}
