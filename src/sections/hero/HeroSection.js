import FractureStage from "@/features/face-scene/components/FractureStage";
import { site } from "@/data/site";
import HeroWordmark from "@/features/hero/components/HeroWordmark";

export default function HeroSection() {
  const { sectionLabel, eyebrow, title } = site.sections.hero;

  return (
    <section aria-label={sectionLabel} className="hero-section">
      <FractureStage />
      <HeroWordmark eyebrow={eyebrow} title={title} />
    </section>
  );
}
