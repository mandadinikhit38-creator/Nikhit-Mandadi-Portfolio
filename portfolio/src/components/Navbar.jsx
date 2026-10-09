import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig.js";

export default function Navbar({ theme, onThemeChange }) {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const sections = siteConfig.navigation
      .map(({ target }) => document.getElementById(target))
      .filter(Boolean);
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.15, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <div className="page-wrap nav-row">
        <a className="brand" href={`#${siteConfig.identity.topAnchor}`} aria-label={`${siteConfig.identity.name}, back to top`}>
          <span className="brand-mark" aria-hidden="true">MN</span>{siteConfig.identity.name}
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {siteConfig.navigation.map((item) => (
            <a className="nav-link" href={`#${item.target}`} aria-current={active === item.target ? "location" : undefined} key={item.target}>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="theme-toggle" type="button" onClick={onThemeChange} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} aria-pressed={theme === "light"}>
          <span aria-hidden="true">{theme === "dark" ? "◐" : "◑"}</span>{theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
      <div className="header-rule" aria-hidden="true" />
    </header>
  );
}
