import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";

function isSafePaperLink(value) {
  if (!value) return false;
  try { return new URL(value).protocol === "https:"; } catch { return false; }
}

export default function Publications() {
  const { publications, labels } = siteConfig;
  return (
    <section className="section" id="publications" aria-labelledby="publications-heading">
      <SectionHeading label={publications.label} title={publications.heading} id="publications-heading" />
      <div className="page-wrap card-grid">
        {publications.items.map((paper) => (
          <article className="publication-card" key={paper.title}>
            <p className="publication-role">{paper.role}</p>
            <h3>{paper.title}</h3>
            <p className="publication-meta">{paper.venue} · {paper.period}</p>
            {isSafePaperLink(paper.paperLink) && <a className="paper-link" href={paper.paperLink} target="_blank" rel="noopener noreferrer">{labels.paperLink}</a>}
          </article>
        ))}
      </div>
    </section>
  );
}
