import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, localeAlternates, supportedLocales } from "@/lib/i18n";
import HomeExperience from "@/features/home/HomeExperience";

export function generateStaticParams() {
  return supportedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    return {};
  }

  const dictionary = getDictionary(lang);

  return {
    title: dictionary.site.name,
    description: dictionary.site.description,
    alternates: {
      canonical: `/${lang}`,
      languages: localeAlternates,
    },
  };
}

export default async function LocaleHome({ params }) {
  const { lang } = await params;

  if (!isLocale(lang)) {
    notFound();
  }

  const dictionary = getDictionary(lang);

  return (
    <main className="relative min-h-screen bg-background">
      <Suspense fallback={null}>
        <HomeExperience dictionary={dictionary} locale={lang} />
      </Suspense>
    </main>
  );
}
