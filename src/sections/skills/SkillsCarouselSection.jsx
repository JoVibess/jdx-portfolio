import SkillsCarousel from "@/features/skills/SkillsCarousel";
import ScrollReveal from "@/features/scroll-reveal/ScrollReveal";
import { getDictionary } from "@/lib/i18n";

export default function SkillsCarouselSection({
  site = getDictionary("en").site,
  skills = getDictionary("en").skills,
}) {
  const { kicker, sectionLabel, title, controlsLabel, previousLabel, nextLabel } =
    site.sections.skills;

  return (
    <section aria-label={sectionLabel} className="skills-carousel-section">
      <ScrollReveal className="skills-carousel-section__header">
        <p className="skills-carousel-section__kicker">{kicker}</p>
        <h2 className="skills-carousel-section__title">{title}</h2>
        <span className="skills-carousel-section__separator"></span>
      </ScrollReveal>
      <SkillsCarousel
        skills={skills}
        labels={{ controlsLabel, previousLabel, nextLabel }}
      />
    </section>
  );
}
