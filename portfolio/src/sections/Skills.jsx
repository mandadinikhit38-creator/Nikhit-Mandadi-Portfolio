import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Skills() {
  const { skills } = siteConfig;
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <SectionHeading label={skills.label} title={skills.heading} id="skills-heading" />
      <div className="page-wrap card-grid">
        {skills.groups.map((group) => (
          <article className="skill-card" key={group.title}>
            <h3>{group.title}</h3>
            <ul className="chip-list">
              {group.items.map((skill) => <li className="chip" key={skill}>{skill}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
