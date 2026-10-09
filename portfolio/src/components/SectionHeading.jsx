export default function SectionHeading({ label, title, id }) {
  return (
    <div className="section-heading page-wrap">
      <div>
        <p className="evidence-label">{label}</p>
        <h2 className="section-title" id={id}>{title}</h2>
      </div>
    </div>
  );
}
