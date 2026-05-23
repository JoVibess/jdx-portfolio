"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ProjectOverview({ project }) {
  const overview = project.overview;
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!overview) {
      return undefined;
    }

    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const revealTargets = Array.from(section.querySelectorAll("[data-overview-reveal]"));
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerY = viewportHeight * 0.88;

      return rect.top < triggerY && rect.bottom > 0;
    };

    revealTargets.forEach((element) => {
      element.classList.remove("is-visible");
    });

    if (!("IntersectionObserver" in window)) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
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
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      },
    );

    const frame = window.requestAnimationFrame(() => {
      revealTargets.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add("is-visible");
          return;
        }

        observer.observe(element);
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [overview, project.slug]);

  if (!overview) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="project-overview"
      aria-labelledby="project-overview-title"
    >
      <div className="project-overview__inner">
        <aside className="project-overview__sticky">
          <p
            className="project-overview__eyebrow project-overview__reveal"
            data-overview-reveal
            style={{ "--overview-reveal-delay": "0ms" }}
          >
            {overview.eyebrow}
          </p>
          <h2
            id="project-overview-title"
            className="project-overview__title project-overview__reveal"
            data-overview-reveal
            style={{ "--overview-reveal-delay": "80ms" }}
          >
            {overview.title}
          </h2>
          <p
            className="project-overview__description project-overview__reveal"
            data-overview-reveal
            style={{ "--overview-reveal-delay": "160ms" }}
          >
            {overview.description}
          </p>

          {overview.stacks?.length ? (
            <div
              className="project-overview__stacks project-overview__reveal"
              aria-label={overview.stacksTitle}
              data-overview-reveal
              style={{ "--overview-reveal-delay": "240ms" }}
            >
              <h3>{overview.stacksTitle}</h3>
              <ul>
                {overview.stacks.map((stack) => (
                  <li key={stack.label} title={stack.label}>
                    {stack.icon ? (
                      <Image
                        src={stack.icon}
                        alt={`${stack.label} icon`}
                        width={34}
                        height={34}
                        className="project-overview__stack-icon"
                      />
                    ) : (
                      <span>{stack.short}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>

        <div className="project-overview__steps">
          {overview.steps?.map((step, index) => {
            const stepNumber = step.number || String(index + 1).padStart(2, "0");
            const isTextOnly = true;

            return (
            <article
              className="project-overview__step project-overview__step-reveal project-overview__step--text-only"
              key={step.title}
              data-tone={step.color?.toLowerCase() === "#111111" ? "dark" : "light"}
              data-overview-reveal
              style={{
                "--overview-card-color": step.color || "#e7e7e7",
                "--overview-reveal-delay": `${index * 110}ms`,
              }}
            >
              <div className="project-overview__step-header">
                <div className="project-overview__step-heading">
                  {isTextOnly ? (
                    <span className="project-overview__step-number project-overview__step-number--inline">
                      {stepNumber}
                    </span>
                  ) : null}
                  <h3>{step.title}</h3>
                </div>
                <span className="project-overview__step-mark" aria-hidden="true" />
              </div>
              <div className="project-overview__step-footer">
                <p>{step.description}</p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
