import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Training() {
  const { training } = siteConfig;
  return (
    <section className="section" id="training" aria-labelledby="training-heading">
      <SectionHeading label={training.label} title={training.heading} id="training-heading" />
      <div className="page-wrap">
        <details className="training-details">
          <summary>{training.toggleLabel} ({training.items.length})</summary>
          <ol>
            {training.items.map((item) => (
              <li key={`${item.title}-${item.period}`}>
                <div className="training-item">
                  <span>{item.title}{item.organization ? `, ${item.organization}` : ""}</span>
                  <span className="training-date">{item.period}</span>
                </div>
              </li>
            ))}
          </ol>
        </details>
      </div>
    </section>
  );
}
