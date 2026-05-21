import MauritiusMap from "@/features/about/MauritiusMap";
import ScrollReveal from "@/features/scroll-reveal/ScrollReveal";
import { getDictionary } from "@/lib/i18n";

export default function AboutSection({ site = getDictionary("en").site }) {
  const { accent, body, sectionLabel, title } = site.sections.about;

  return (
    <section aria-label={sectionLabel} className="about-section">
      <MauritiusMap />
      <ScrollReveal className="about-section__inner">
        <div className="about-section__headline">
          <p className="about-section__label">{sectionLabel}</p>
          <h2 className="about-section__title">
            <span>{title}</span>
            <em>{accent}</em>
          </h2>
          <span className="about-section__divider" aria-hidden="true" />
        </div>
        <div className="about-section__copy">
          <p>{body}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
