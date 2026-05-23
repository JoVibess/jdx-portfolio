import LegalPage from "@/sections/legal/LegalPage";
import { getDictionary } from "@/lib/i18n";
import { getLegalMetadata } from "@/lib/seo";

export const metadata = getLegalMetadata({ locale: "en", type: "legal-notice" });

export default function LegalNoticePage() {
  const dictionary = getDictionary("en");

  return (
    <LegalPage
      document={dictionary.site.legal.legalNotice}
      homeHref="/en"
      backLabel={dictionary.site.projectDetail.backLabel}
      languageSwitchLabel={dictionary.languageLabel}
      languageSwitchHref="/fr/mentions-legales"
    />
  );
}
