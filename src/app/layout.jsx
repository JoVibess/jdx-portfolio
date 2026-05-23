import "./globals.css";
import CustomCursor from "@/features/cursor/CustomCursor";
import SiteFooter from "@/sections/footer/SiteFooter";
import { getDictionary, localeAlternates } from "@/lib/i18n";

const { site } = getDictionary("en");

export const metadata = {
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
        <SiteFooter />
        <CustomCursor />
      </body>
    </html>
  );
}
