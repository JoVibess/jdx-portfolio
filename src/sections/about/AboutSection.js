import { site } from "@/data/site";
import MauritiusMap from "@/features/about/MauritiusMap";

export default function AboutSection() {
  const { sectionLabel, title, accent, body } = site.sections.about;

  return (
    <section aria-label={sectionLabel} className="about-section">
      <div className="about-section__inner">
        <MauritiusMap />
        <div className="about-section__content">
          <h2 className="about-section__title">
            <span>{title}</span>
            <em>{accent}</em>
          </h2>
          <p className="about-section__body">{body}</p>
        </div>
      </div>
    </section>
  );
}
