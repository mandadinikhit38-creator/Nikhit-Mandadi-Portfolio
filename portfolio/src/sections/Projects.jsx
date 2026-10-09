import { useMemo, useState } from "react";
import { siteConfig } from "../data/siteConfig.js";
import { projects } from "../data/projects.js";
import SectionHeading from "../components/SectionHeading.jsx";

function safeExternalUrl(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" ? parsed.href : null;
  } catch {
    return null;
  }
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const { labels } = siteConfig;
  const visibleProjects = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <SectionHeading label={labels.projectLabel} title={labels.projectHeading} id="projects-heading" />
      <div className="page-wrap">
        <div className="project-toolbar" role="group" aria-label="Filter projects by category">
          {labels.projectCategories.map((category) => (
            <button className="filter-button" type="button" aria-pressed={filter === category} onClick={() => setFilter(category)} key={category}>
              {category}
            </button>
          ))}
        </div>
        <div className="card-grid" aria-live="polite">
          {visibleProjects.map((project) => {
            const githubUrl = safeExternalUrl(project.githubLink);
            const writeupUrl = safeExternalUrl(project.writeupLink);
            return (
              <article className="project-card" key={project.id}>
                <span className="project-placeholder">{labels.projectPlaceholder}</span>
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tools">
                  <p className="micro-label">{labels.projectTools}</p>
                  {project.tools.length > 0 ? (
                    <ul className="chip-list">{project.tools.map((tool) => <li className="chip" key={tool}>{tool}</li>)}</ul>
                  ) : <span className="card-meta">—</span>}
                </div>
                {(githubUrl || writeupUrl) && (
                  <div className="project-links">
                    {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer">{labels.projectGithub}</a>}
                    {writeupUrl && <a href={writeupUrl} target="_blank" rel="noopener noreferrer">{labels.projectWriteup}</a>}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
