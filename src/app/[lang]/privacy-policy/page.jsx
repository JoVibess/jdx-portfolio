import { notFound } from "next/navigation";

import LegalPage from "@/sections/legal/LegalPage";
import { getDictionary, isLocale } from "@/lib/i18n";
import { getLegalMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  return getLegalMetadata({ locale: lang, type: "privacy-policy" });
}

export default async function LocalePrivacyPolicyPage({ params }) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <LegalPage
      document={dictionary.site.legal.privacyPolicy}
      homeHref={`/${lang}`}
      backLabel={dictionary.site.projectDetail.backLabel}
      languageSwitchLabel={dictionary.languageLabel}
      languageSwitchHref={lang === "fr" ? "/en/privacy-policy" : "/fr/politique-de-confidentialite"}
    />
  );
}
