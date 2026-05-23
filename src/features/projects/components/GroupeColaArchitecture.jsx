"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const COPY = {
  fr: {
    eyebrow: "Architecture multisite",
    title: "Schéma global de la structure du projet",
    description:
      "Une vue d’ensemble de l’architecture imaginée pour mutualiser le socle technique, centraliser l’espace pro et répartir les spécificités sur chaque site enfant.",
    imageSrc: "/image/projects/cola/groupe_cola_step_fr.webp",
    imageAlt: "Schéma de l’architecture multisite du projet Groupe Cola",
  },
  en: {
    eyebrow: "Multisite architecture",
    title: "Global structure of the project",
    description:
      "A high-level view of the architecture designed to share the technical foundation, centralize the pro space, and distribute specific logic across each child site.",
    imageSrc: "/image/projects/cola/groupe_cola_step_en.webp",
    imageAlt: "Multisite architecture diagram for the Groupe Cola project",
  },
};

export default function GroupeColaArchitecture({ locale = "fr" }) {
  const sectionRef = useRef(null);
  const content = COPY[locale] || COPY.en;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const targets = Array.from(section.querySelectorAll("[data-architecture-reveal]"));

    if (!("IntersectionObserver" in window)) {
      targets.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      },
    );

    targets.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="groupe-cola-architecture"
      aria-labelledby="groupe-cola-architecture-title"
    >
      <div className="groupe-cola-architecture__inner">
        <div
          className="groupe-cola-architecture__intro"
          data-architecture-reveal
          style={{ "--architecture-reveal-delay": "0ms" }}
        >
          <p className="groupe-cola-architecture__eyebrow">{content.eyebrow}</p>
          <h2 id="groupe-cola-architecture-title" className="groupe-cola-architecture__title">
            {content.title}
          </h2>
          <p className="groupe-cola-architecture__description">{content.description}</p>
        </div>

        <figure
          className="groupe-cola-architecture__figure"
          data-architecture-reveal
          style={{ "--architecture-reveal-delay": "90ms" }}
        >
          <Image
            className="groupe-cola-architecture__image"
            src={content.imageSrc}
            alt={content.imageAlt}
            width={2048}
            height={1478}
            sizes="(max-width: 900px) 96vw, (max-width: 1440px) 92vw, 1320px"
          />
        </figure>
      </div>
    </section>
  );
}
