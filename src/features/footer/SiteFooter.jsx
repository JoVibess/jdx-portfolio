"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

import FooterEyes from "@/features/footer/FooterEyes";
import { getDictionary, getLocaleFromPathname } from "@/lib/i18n";

const LOGO_SRC = "/image/webp/logo-jdx-noir.webp";

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  const footer = getDictionary(getLocaleFromPathname(pathname)).site.footer;

  return (
    <footer className="site-footer" aria-label="Footer">
      <div className="site-footer__fixed">
        <div className="site-footer__content">
          <div className="site-footer__center">
            <Image
              className="site-footer__logo"
              src={LOGO_SRC}
              alt={footer.logoAlt}
              width={720}
              height={220}
              priority={false}
            />
            <p className="site-footer__title">{footer.title}</p>
            <a className="site-footer__button" href={footer.contactHref}>
              {footer.contactLabel}
            </a>
          </div>

          <div className="site-footer__bottom">
            <FooterEyes />
            <p className="site-footer__copyright">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
