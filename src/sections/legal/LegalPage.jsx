import Link from "next/link";

export default function LegalPage({
  document,
  homeHref = "/",
  backLabel = "Back",
  languageSwitchLabel = "",
  languageSwitchHref = "",
}) {
  return (
    <main className="legal-page">
      <section className="legal-page__hero">
        <div className="legal-page__inner">
          <div className="legal-page__header">
            <Link className="legal-page__back button-roll" href={homeHref}>
              <span className="visually-hidden">{backLabel}</span>
              <span className="button-roll__text" aria-hidden="true">
                <span className="button-roll__text-item button-roll__text-item--base">
                  <span className="legal-page__back-arrow" />
                  {backLabel}
                </span>
                <span className="button-roll__text-item button-roll__text-item--clone">
                  <span className="legal-page__back-arrow" />
                  {backLabel}
                </span>
              </span>
            </Link>
            {languageSwitchHref ? (
              <Link className="legal-page__language-switch" href={languageSwitchHref}>
                {languageSwitchLabel}
              </Link>
            ) : null}
          </div>
          <p className="legal-page__eyebrow">Legal</p>
          <h1 className="legal-page__title">{document.title}</h1>
          <p className="legal-page__intro">{document.intro}</p>
        </div>
      </section>

      <section className="legal-page__content">
        <div className="legal-page__inner legal-page__content-inner">
          {document.sections.map((section) => (
            <article className="legal-page__section" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
