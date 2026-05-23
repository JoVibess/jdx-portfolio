import LegalPage from "@/sections/legal/LegalPage";
import { getDictionary } from "@/lib/i18n";

export const metadata = {
  title: "Privacy policy | JDX",
};

export default function PrivacyPolicyPage() {
  const dictionary = getDictionary("en");

  return (
    <LegalPage
      document={dictionary.site.legal.privacyPolicy}
      homeHref="/en"
      backLabel={dictionary.site.projectDetail.backLabel}
      languageSwitchLabel={dictionary.languageLabel}
      languageSwitchHref="/fr/politique-de-confidentialite"
    />
  );
}
