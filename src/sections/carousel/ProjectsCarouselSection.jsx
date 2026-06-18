import ProjectCarousel from "@/features/projects/components/ProjectCarousel";
import { getPublishedProjects } from "@/features/projects/lib/getProject";
import { getDictionary } from "@/lib/i18n";

export default function ProjectsCarouselSection({
  site = getDictionary("en").site,
  projects = getPublishedProjects(getDictionary("en").projects),
}) {
  const { sectionLabel, title } = site.sections.carousel || site.sections.projects;

  return (
    <section aria-label={sectionLabel} className="projects-carousel-section">
      <div className="projects-carousel-section__inner">
        <h2 className="projects-carousel-section__title">{title}</h2>
        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
