import { useEffect, useState } from "react";
import { siteConfig } from "../data/siteConfig.js";
import SocialLinks from "../components/SocialLinks.jsx";

const photoModules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
  query: "?url",
});

export default function Hero() {
  const [role, setRole] = useState("");
  const [photoFailed, setPhotoFailed] = useState(false);
  const photoEntry = Object.entries(photoModules).find(([path]) => path.endsWith(`/${siteConfig.identity.photoFile}`));
  const photoUrl = photoEntry?.[1];

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionPreference.matches) {
      setRole(siteConfig.hero.roles[0]);
      return undefined;
    }

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const currentRole = siteConfig.hero.roles[roleIndex];
      setRole(currentRole.slice(0, characterIndex));
      let delay = deleting ? 55 : 85;
      if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % siteConfig.hero.roles.length;
        delay = 240;
      } else if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1350;
      } else {
        characterIndex += deleting ? -1 : 1;
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 180);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="page-wrap hero-section" id="top" aria-labelledby="hero-name">
      <div>
        <p className="hero-kicker">{siteConfig.hero.caseLabel}</p>
        <h1 className="hero-name" id="hero-name">{siteConfig.identity.name}</h1>
        <p className="hero-title">{siteConfig.identity.title}</p>
        <p className="role-line">
          <span aria-hidden="true">{role}</span><span className="typing-caret" aria-hidden="true" />
          <span className="sr-only">{siteConfig.hero.roles.join("; ")}</span>
        </p>
        <p className="hero-tagline">{siteConfig.hero.tagline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={`${import.meta.env.BASE_URL}${siteConfig.identity.resumePath}`} download>
            {siteConfig.hero.buttons.resume}
          </a>
          <a className="button button-secondary" href={`#${siteConfig.hero.contactTarget}`}>
            {siteConfig.hero.buttons.contact}
          </a>
          <SocialLinks />
        </div>
      </div>

      <aside className="case-card" aria-label={siteConfig.hero.cardTitle}>
        <div className="case-card-top">
          <p className="case-card-title">{siteConfig.hero.cardTitle}</p>
        </div>
        {photoUrl && !photoFailed && (
          <div className="profile-frame">
            <img src={photoUrl} alt={`${siteConfig.identity.name} profile portrait`} onError={() => setPhotoFailed(true)} />
          </div>
        )}
        <dl className="case-facts">
          {siteConfig.hero.facts.map((fact) => (
            <div className="case-fact" key={fact.label}>
              <dt>{fact.label}</dt><dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </section>
  );
}
