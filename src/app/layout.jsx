import "./globals.css";
import CustomCursor from "@/features/cursor/CustomCursor";
import SiteFooter from "@/sections/footer/SiteFooter";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const { site } = getDictionary("en");
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: site.name,
  description: site.description,
  alternates: {
    canonical: "/en",
    languages: localeAlternates,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/RocGrotesk/Kostic - Roc Grotesk Wide Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/RocGrotesk/Kostic - Roc Grotesk Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
