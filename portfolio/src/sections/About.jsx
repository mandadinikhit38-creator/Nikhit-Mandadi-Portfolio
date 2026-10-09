import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";

export default function About() {
  const { about } = siteConfig;
  return (
    <section className="section" id="about" aria-labelledby="about-heading">
      <SectionHeading label={about.label} title={about.heading} id="about-heading" />
      <div className="page-wrap">
        <p className="about-copy">{about.paragraph}</p>
        <div className="card-grid">
          {about.highlights.map((highlight) => <article className="highlight-card" key={highlight}>{highlight}</article>)}
        </div>
        <h3 className="subheading">Soft skills</h3>
        <ul className="chip-list" aria-label="Soft skills">
          {about.softSkills.map((skill) => <li className="chip chip-accent" key={skill}>{skill}</li>)}
        </ul>
        <h3 className="subheading">Languages</h3>
        <div className="language-list">
          {about.languages.map((language) => <span key={language.name}><strong>{language.name}</strong> · {language.level}</span>)}
        </div>
      </div>
    </section>
  );
}
