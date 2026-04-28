import { projects } from "@/data/projects";
import { site } from "@/data/site";
import ProjectCarousel from "@/features/projects/components/ProjectCarousel";

export default function ProjectsCarouselSection() {
  const { sectionLabel, title } = site.sections.carousel;

  return (
    <section aria-label={sectionLabel} className="projects-carousel-section">
      <div className="projects-carousel-section__inner">
        <h2 className="projects-carousel-section__title">{title}</h2>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
