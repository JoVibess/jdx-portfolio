"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAlternatePath, getDictionary, getLocaleFromPathname } from "@/lib/i18n";

export default function LanguageSwitch({ projectSlug }) {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const alternatePath = getAlternatePath(pathname, locale);
  const href = projectSlug ? `${alternatePath}?project=${projectSlug}` : alternatePath;

  return (
    <Link
      className="language-switch"
      href={href}
      hrefLang={dictionary.alternateLocale}
      aria-label={`Switch language to ${dictionary.alternateLocale.toUpperCase()}`}
    >
      {dictionary.languageLabel}
    </Link>
  );
}
