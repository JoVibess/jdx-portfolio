export default function ProjectMeta({ project }) {
  return (
    <section style={{ padding: "32px 24px 96px" }}>
      <dl
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 24,
          maxWidth: 1120,
          margin: "0 auto",
        }}
      >
        <div>
          <dt style={{ color: "rgba(5, 5, 5, 0.55)" }}>Role</dt>
          <dd style={{ margin: "8px 0 0" }}>{project.role}</dd>
        </div>
        <div>
          <dt style={{ color: "rgba(5, 5, 5, 0.55)" }}>Stack</dt>
          <dd style={{ margin: "8px 0 0" }}>{project.tags.join(", ")}</dd>
        </div>
      </dl>
    </section>
  );
}
