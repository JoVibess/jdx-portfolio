"use client";

import { useEffect, useRef, useState } from "react";

import ProjectDistortionScene from "@/features/project-distortion/ProjectDistortionScene";
import { getDictionary } from "@/lib/i18n";

export default function ProjectsSection({
  labels = getDictionary("en").site.sections.projects,
  projects = getDictionary("en").projects,
  onProjectSelect,
}) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  const handleProjectPointerMove = (event) => {
    setPreviewPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    const section = sectionRef.current;
    let frame = null;

    if (!section) return undefined;

    const titles = [...section.querySelectorAll(".projects-section__title")];

    const revealVisibleTitles = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerY = viewportHeight * 0.88;

      titles.forEach((title) => {
        if (title.classList.contains("is-visible")) return;

        const rect = title.getBoundingClientRect();
        const isInViewport = rect.top < triggerY && rect.bottom > 0;

        if (isInViewport) {
          title.classList.add("is-visible");
        }
      });

      frame = null;
    };

    const requestRevealCheck = () => {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(revealVisibleTitles);
    };

    revealVisibleTitles();
    window.addEventListener("scroll", requestRevealCheck, { passive: true });
    window.addEventListener("resize", requestRevealCheck);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestRevealCheck);
      window.removeEventListener("resize", requestRevealCheck);
    };
  }, []);

  return (
    <section ref={sectionRef} className="projects-section" aria-label={labels.sectionLabel}>
      <ProjectDistortionScene
        activeIndex={activeIndex}
        pointer={previewPosition}
        projects={projects}
      />
      <div className="projects-section__inner">
        <p className="projects-section__kicker">{labels.kicker}</p>
        <ul className="projects-section__list" onMouseLeave={() => setActiveIndex(null)}>
          {projects.map((project, index) => (
            <li className="projects-section__item" key={project.slug}>
              <button
                className="projects-section__link"
                type="button"
                onClick={() => onProjectSelect?.(project)}
                onMouseEnter={(event) => {
                  setActiveIndex(index);
                  handleProjectPointerMove(event);
                }}
                onMouseMove={handleProjectPointerMove}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                <span className="projects-section__title">
                  <span className="projects-section__title-line">{project.title}</span>
                </span>
                <span className="projects-section__meta">{project.year}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
