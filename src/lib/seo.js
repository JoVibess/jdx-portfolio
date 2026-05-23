import { getDictionary } from "@/lib/i18n";

export function getHomePath(locale = "en") {
  return locale === "fr" ? "/fr" : "/en";
}

export function getProjectPath(locale = "en", slug) {
  return locale === "fr" ? `/projet/${slug}` : `/projects/${slug}`;
}

export function getLegalNoticePath(locale = "en") {
  return locale === "fr" ? "/fr/mentions-legales" : "/en/legal-notice";
}

export function getPrivacyPolicyPath(locale = "en") {
  return locale === "fr" ? "/fr/politique-de-confidentialite" : "/en/privacy-policy";
}

export function getProjectMetadata(project, locale = "en") {
  const dictionary = getDictionary(locale);
  const title = `${project.title} | ${dictionary.site.name}`;
  const description = project.summary;

  return {
    title,
    description,
    alternates: {
      canonical: getProjectPath(locale, project.slug),
      languages: {
        en: getProjectPath("en", project.slug),
        fr: getProjectPath("fr", project.slug),
        "x-default": getProjectPath("en", project.slug),
      },
    },
    openGraph: {
      title,
      description,
      images: [project.featuredImage || project.heroImage],
    },
  };
}

export function getLegalMetadata({ locale = "en", type = "legal-notice" }) {
  const dictionary = getDictionary(locale);
  const isPrivacy = type === "privacy-policy";
  const document = isPrivacy
    ? dictionary.site.legal.privacyPolicy
    : dictionary.site.legal.legalNotice;
  const canonical = isPrivacy ? getPrivacyPolicyPath(locale) : getLegalNoticePath(locale);

  return {
    title: `${document.title} | ${dictionary.site.name}`,
    description: document.intro,
    alternates: {
      canonical,
      languages: {
        en: isPrivacy ? getPrivacyPolicyPath("en") : getLegalNoticePath("en"),
        fr: isPrivacy ? getPrivacyPolicyPath("fr") : getLegalNoticePath("fr"),
        "x-default": isPrivacy ? getPrivacyPolicyPath("en") : getLegalNoticePath("en"),
      },
    },
    openGraph: {
      title: `${document.title} | ${dictionary.site.name}`,
      description: document.intro,
    },
  };
}
