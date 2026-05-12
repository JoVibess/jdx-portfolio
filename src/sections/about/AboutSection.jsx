import Image from "next/image";

import { site } from "@/data/site";
import ScrollReveal from "@/features/scroll-reveal/ScrollReveal";

export default function AboutSection() {
  const { accent, body, sectionLabel, title } = site.sections.about;

  return (
    <section aria-label={sectionLabel} className="about-section">
      <Image
        className="about-section__map"
        src="/image/svg/about-mauritius.svg"
        width={538}
        height={585}
        alt=""
        aria-hidden="true"
        priority={false}
      />
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
