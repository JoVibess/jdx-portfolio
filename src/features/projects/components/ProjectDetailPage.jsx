import Image from "next/image";

import LanguageSwitch from "@/features/language/LanguageSwitch";
import ProjectsSection from "@/sections/projects/ProjectsSection";
import { getDictionary } from "@/lib/i18n";

import ProjectReadingText from "./ProjectReadingText";
import ProjectOverview from "./ProjectOverview";
import ProjectParallaxGallery from "./ProjectParallaxGallery";
import GroupeColaArchitecture from "./GroupeColaArchitecture";

const HERO_MEDIA_SLIDE_IN_SLUGS = new Set(["groupe-cola", "new-one-by-c", "moon-cycle", "soul-sight"]);

export default function ProjectDetailPage({
  project,
  onBack,
  onProjectSelect,
  dictionary = getDictionary("en"),
  isPageTransitionActive = false,
  locale = "en",
}) {
  const { projectDetail } = dictionary.site;
  const shouldSlideHeroMedia = HERO_MEDIA_SLIDE_IN_SLUGS.has(project.slug);
  const heroMediaClassName = [
    "project-detail-hero__media",
    shouldSlideHeroMedia && isPageTransitionActive ? "project-detail-hero__media--pre-slide" : "",
    shouldSlideHeroMedia && !isPageTransitionActive ? "project-detail-hero__media--slide-in" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const logo = (
    <Image
      className="project-detail-header__logo-image"
      src="/image/webp/logo-jdx-noir.webp"
      width={933}
      height={227}
      alt={dictionary.site.footer.logoAlt}
      priority
    />
  );

  return (
    <div className="project-detail-page">
      <header className="project-detail-header" aria-label="Primary">
        <div className="project-detail-header__inner">
          {onBack ? (
            <button className="project-detail-page__back button-roll" type="button" onClick={onBack}>
              <span className="visually-hidden">{projectDetail.backLabel}</span>
              <span className="button-roll__text" aria-hidden="true">
                <span className="button-roll__text-item button-roll__text-item--base">
                  <span className="project-detail-page__back-arrow" />
                  {projectDetail.backLabel}
                </span>
                <span className="button-roll__text-item button-roll__text-item--clone">
                  <span className="project-detail-page__back-arrow" />
                  {projectDetail.backLabel}
                </span>
              </span>
            </button>
          ) : (
            <a
              className="project-detail-page__back button-roll"
              href={dictionary.site.homeHref || `/${locale}`}
            >
              <span className="visually-hidden">{projectDetail.backLabel}</span>
              <span className="button-roll__text" aria-hidden="true">
                <span className="button-roll__text-item button-roll__text-item--base">
                  <span className="project-detail-page__back-arrow" />
                  {projectDetail.backLabel}
                </span>
                <span className="button-roll__text-item button-roll__text-item--clone">
                  <span className="project-detail-page__back-arrow" />
                  {projectDetail.backLabel}
                </span>
              </span>
            </a>
          )}

          {onBack ? (
            <button
              className="project-detail-header__logo"
              type="button"
              onClick={onBack}
              aria-label={projectDetail.backHomeLabel}
            >
              {logo}
            </button>
          ) : (
            <a
              className="project-detail-header__logo"
              href={dictionary.site.homeHref || `/${locale}`}
              aria-label={projectDetail.backHomeLabel}
            >
              {logo}
            </a>
          )}

          <LanguageSwitch projectSlug={project.slug} />
        </div>
      </header>

      <section
        className={`project-detail-hero${project.slug === "new-one-by-c" ? " project-detail-hero--new-one-by-c" : ""}`}
        aria-labelledby="project-title"
        style={{ "--project-hero-background": project.heroBackground || "#d7d4d4" }}
      >
        <div className="project-detail-hero__inner">
          <div className="project-detail-hero__content">
            <p className="project-detail-hero__eyebrow project-detail-hero__text-reveal">
              {project.eyebrow}
            </p>
            <h1
              id="project-title"
              className="project-detail-hero__title project-detail-hero__text-reveal"
            >
              {project.title}
            </h1>
            {project.projectHref ? (
              <a
                className="project-detail-hero__cta project-detail-hero__text-reveal"
                href={project.projectHref}
              >
                <span>{project.ctaLabel || "View live"}</span>
                <span aria-hidden="true" className="project-detail-hero__cta-arrow" />
              </a>
            ) : project.status ? (
              <p className="project-detail-hero__status project-detail-hero__text-reveal">
                {project.status}
              </p>
            ) : null}
          </div>

          <div
            className={heroMediaClassName}
            aria-hidden="true"
          >
            <Image
              src={project.heroImage || project.featuredImage}
              alt={`${project.title} hero visual`}
              fill
              priority
              sizes="(max-width: 900px) 90vw, (max-width: 1440px) 52vw, 760px"
            />
          </div>
        </div>
      </section>

      <section className="project-detail-intro" aria-label={projectDetail.summaryLabel}>
        <ProjectReadingText text={project.summary} />
      </section>

      {project.slug === "groupe-cola" ? (
        <GroupeColaArchitecture locale={locale} />
      ) : null}

      <ProjectOverview project={project} />
      <ProjectParallaxGallery title={project.galleryTitle} images={project.galleryImages} />
      <ProjectsSection
        labels={dictionary.site.sections.projects}
        projects={dictionary.projects}
        onProjectSelect={onProjectSelect}
      />
    </div>
  );
}
