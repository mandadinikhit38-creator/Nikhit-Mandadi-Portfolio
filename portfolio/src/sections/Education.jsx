import { siteConfig } from "../data/siteConfig.js";
import SectionHeading from "../components/SectionHeading.jsx";
import Timeline from "../components/Timeline.jsx";

export default function Education() {
  const { education } = siteConfig;
  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <SectionHeading label={education.label} title={education.heading} id="education-heading" />
      <div className="page-wrap"><Timeline items={education.items} /></div>
    </section>
  );
}
