import { headers } from "next/headers";
import { redirect } from "next/navigation";

function getPreferredLocale(acceptLanguage = "") {
  return /(^|,)\s*fr(?:[-;,\s]|$)/i.test(acceptLanguage) ? "fr" : "en";
}

export default async function Home() {
  const requestHeaders = await headers();
  const acceptLanguage = requestHeaders.get("accept-language") || "";
  const locale = getPreferredLocale(acceptLanguage);

  redirect(`/${locale}`);
}
