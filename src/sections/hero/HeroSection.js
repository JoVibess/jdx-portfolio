import HeroScene from "@/features/hero/components/HeroScene";
import { site } from "@/data/site";

export default function HeroSection() {
  const { sectionLabel, eyebrow, title } = site.sections.hero;

  return (
    <section aria-label={sectionLabel} className="hero-section">
      <HeroScene eyebrow={eyebrow} title={title} />
    </section>
  );
}
