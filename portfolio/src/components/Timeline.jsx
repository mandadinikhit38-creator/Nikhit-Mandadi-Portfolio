export default function Timeline({ items, kind = "education" }) {
  return (
    <ol className="timeline">
      {items.map((item) => (
        <li className="timeline-item" key={`${item.title}-${item.period}`}>
          <div className="timeline-meta">
            <span>{item.period}</span>
            {item.duration && <span>{item.duration}</span>}
          </div>
          <h3 className="timeline-title">{item.title}</h3>
          <p className="timeline-org">{item.institution || item.organization}</p>
          {item.result && <p className="timeline-result">{item.result}</p>}
          {kind === "experience" && item.responsibilities?.length > 0 && (
            <ul className="timeline-bullets">
              {item.responsibilities.map((responsibility) => <li key={responsibility}>{responsibility}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
