import LegalPage from "@/sections/legal/LegalPage";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: "Legal notice | JDX",
};

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
