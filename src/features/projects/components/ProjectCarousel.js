import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ projects }) {
  return (
    <div className="project-carousel">
      {projects.map((project) => (
        <div key={project.slug} className="project-carousel__item">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
