import { skills } from "@/data/skills";
import { site } from "@/data/site";
import SkillsCarousel from "@/features/skills/SkillsCarousel";
import ScrollReveal from "@/features/scroll-reveal/ScrollReveal";

export default function SkillsCarouselSection() {
  const { kicker, sectionLabel, title } = site.sections.skills;

  return (
    <section aria-label={sectionLabel} className="skills-carousel-section">
      <ScrollReveal className="skills-carousel-section__header">
        <p className="skills-carousel-section__kicker">{kicker}</p>
        <h2 className="skills-carousel-section__title">{title}</h2>
        <span className="skills-carousel-section__separator"></span>
      </ScrollReveal>
      <SkillsCarousel skills={skills} />
    </section>
  );
}
