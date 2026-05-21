"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { getAlternatePath, getDictionary, getLocaleFromPathname } from "@/lib/i18n";

export default function LanguageSwitch({ projectSlug }) {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const nextSearchParams = new URLSearchParams(searchParams.toString());

  if (projectSlug) {
    nextSearchParams.set("project", projectSlug);
  }

  const queryString = nextSearchParams.toString();
  const href = `${getAlternatePath(pathname, locale)}${queryString ? `?${queryString}` : ""}`;

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
