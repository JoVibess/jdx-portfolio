import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="project-card">
      <span className="project-card__year">{project.year}</span>
      <span>
        <strong className="project-card__title">{project.title}</strong>
        <span className="project-card__role">{project.role}</span>
      </span>
    </Link>
  );
}
