import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Timeline from "../components/Timeline.jsx";

export default function Experience() {
  const { experience } = siteConfig;
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <SectionHeading label={experience.label} title={experience.heading} id="experience-heading" />
      <div className="page-wrap">
        <Timeline items={experience.items} kind="experience" />
        <p className="confidential-note">{experience.note}</p>
      </div>
    </section>
  );
}
