import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Leadership() {
  const { leadership } = siteConfig;
  return (
    <section className="section" id="leadership" aria-labelledby="leadership-heading">
      <SectionHeading label={leadership.label} title={leadership.heading} id="leadership-heading" />
      <div className="page-wrap card-grid">
        {leadership.items.map((item) => (
          <article className="event-card" key={item.title + item.period}>
            <p className="micro-label">{item.period}</p>
            <h3>{item.title}</h3>
            <p className="card-meta">{item.event}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
