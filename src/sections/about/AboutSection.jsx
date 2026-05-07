import { site } from "@/data/site";

export default function AboutSection() {
  const { accent, body, sectionLabel, title } = site.sections.about;

  return (
    <section aria-label={sectionLabel} className="about-section">
      <div className="about-section__inner">
        <div className="about-section__headline">
          <p className="about-section__label">{sectionLabel}</p>
          <h2 className="about-section__title">
            <span>{title}</span>
            <em>{accent}</em>
          </h2>
        </div>
        <div className="about-section__copy">
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}
