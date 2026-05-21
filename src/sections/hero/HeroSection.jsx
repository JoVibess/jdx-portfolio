import Image from "next/image";

import HeroScene from "@/features/hero/components/HeroScene";
import LanguageSwitch from "@/features/language/LanguageSwitch";
import { getDictionary } from "@/lib/i18n";

export default function HeroSection({ site = getDictionary("en").site }) {
  const { intro, sectionLabel, eyebrow, title } = site.sections.hero;

  return (
    <section aria-label={sectionLabel} className="hero-section">
      <header className="hero-section__header" aria-label="Primary">
        <a className="hero-section__logo" href={site.homeHref} aria-label={site.name}>
          <Image
            className="hero-section__logo-image"
            src="/image/webp/logo-jdx-noir.webp"
            width={933}
            height={227}
            alt=""
            aria-hidden="true"
            priority
          />
        </a>
        <LanguageSwitch />
      </header>
      <div className="hero-section__panel">
        <h1 className="hero-section__title">
          <span className="hero-section__intro">{intro}</span>
          <span>{eyebrow}</span>
          <span>{title}</span>
        </h1>
      </div>
      <HeroScene />
    </section>
  );
}
