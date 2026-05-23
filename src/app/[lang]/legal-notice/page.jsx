import { notFound } from "next/navigation";

import LegalPage from "@/sections/legal/LegalPage";
import { getDictionary, isLocale } from "@/lib/i18n";

export default async function LocaleLegalNoticePage({ params }) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <LegalPage
      document={dictionary.site.legal.legalNotice}
      homeHref={`/${lang}`}
      backLabel={dictionary.site.projectDetail.backLabel}
      languageSwitchLabel={dictionary.languageLabel}
      languageSwitchHref={lang === "fr" ? "/en/legal-notice" : "/fr/mentions-legales"}
    />
  );
}
