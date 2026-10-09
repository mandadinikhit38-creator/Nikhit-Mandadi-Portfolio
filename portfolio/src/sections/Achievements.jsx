import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Achievements() {
  const { achievements } = siteConfig;
  return (
    <section className="section" id="achievements" aria-labelledby="achievements-heading">
      <SectionHeading label={achievements.label} title={achievements.heading} id="achievements-heading" />
      <div className="page-wrap card-grid">
        {achievements.items.map((item) => (
          <article className="achievement-card" key={item.title}>
            <p className="micro-label">{item.period}</p>
            <h3>{item.title}</h3>
            {item.detail && <p className="card-meta">{item.detail}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
