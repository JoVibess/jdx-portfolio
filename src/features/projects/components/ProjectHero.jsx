export default function ProjectHero({ project }) {
  return (
    <header
      style={{
        display: "grid",
        alignContent: "end",
        minHeight: "70vh",
        padding: "96px 24px 40px",
      }}
    >
      <div style={{ maxWidth: 1120, width: "100%", margin: "0 auto" }}>
        <p style={{ margin: 0, fontSize: 14, textTransform: "uppercase" }}>{project.year}</p>
        <h1 style={{ margin: "12px 0 0", fontSize: 72, lineHeight: 0.92 }}>{project.title}</h1>
        <p style={{ maxWidth: 620, margin: "22px 0 0", fontSize: 18, lineHeight: 1.45 }}>
          {project.summary}
        </p>
      </div>
    </header>
  );
}
