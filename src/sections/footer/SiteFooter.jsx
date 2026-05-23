"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getDictionary, getLocaleFromPathname } from "@/lib/i18n";

import FooterEyes from "./FooterEyes";

const LOGO_SRC = "/image/webp/logo-jdx-noir.webp";

export default function SiteFooter() {
  const pathname = usePathname() || "/";
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const footer = dictionary.site.footer;
  const homeHref = dictionary.site.homeHref;
  const isLegalPage =
    pathname.includes("/legal-notice") ||
    pathname.includes("/privacy-policy") ||
    pathname.includes("/mentions-legales") ||
    pathname.includes("/politique-de-confidentialite");

  return (
    <footer
      className={`site-footer${isLegalPage ? " site-footer--static" : ""}`}
      aria-label="Footer"
    >
      <div className="site-footer__fixed">
        <div className="site-footer__content">
          <div className="site-footer__center">
            <Link className="site-footer__logo-link" href={homeHref} aria-label={footer.logoAlt}>
              <Image
                className="site-footer__logo"
                src={LOGO_SRC}
                alt={footer.logoAlt}
                width={720}
                height={220}
                priority={false}
              />
            </Link>
            <p className="site-footer__title">{footer.title}</p>
            <a className="site-footer__button button-roll" href={footer.contactHref}>
              <span className="visually-hidden">{footer.contactLabel}</span>
              <span className="button-roll__text" aria-hidden="true">
                <span className="button-roll__text-item button-roll__text-item--base">
                  {footer.contactLabel}
                </span>
                <span className="button-roll__text-item button-roll__text-item--clone">
                  {footer.contactLabel}
                </span>
              </span>
            </a>
          </div>

          <div className="site-footer__bottom">
            <FooterEyes />
            <p className="site-footer__copyright">{footer.copyright}</p>
            <nav className="site-footer__legal" aria-label="Legal">
              <Link className="site-footer__legal-link" href={footer.legalNoticeHref}>
                {footer.legalNoticeLabel}
              </Link>
              <Link className="site-footer__legal-link" href={footer.privacyPolicyHref}>
                {footer.privacyPolicyLabel}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
