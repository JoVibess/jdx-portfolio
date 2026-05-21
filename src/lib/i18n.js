import { en } from "@/data/en";
import { fr } from "@/data/fr";

export const defaultLocale = "en";
export const dictionaries = { en, fr };
export const supportedLocales = Object.keys(dictionaries);

export const localeAlternates = {
  en: "/en",
  fr: "/fr",
  "x-default": "/en",
};

export function isLocale(locale) {
  return supportedLocales.includes(locale);
}

export function getDictionary(locale = defaultLocale) {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export function getLocaleFromPathname(pathname = "") {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function getAlternatePath(pathname = "", currentLocale = defaultLocale) {
  const nextLocale = currentLocale === "fr" ? "en" : "fr";
  const segments = pathname.split("/").filter(Boolean);

  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else if (segments.length > 0) {
    return `/${nextLocale}`;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join("/")}`;
}
