import Image from "next/image";

export default function ProjectOverview({ project }) {
  const overview = project.overview;

  if (!overview) {
    return null;
  }

  return (
    <section className="project-overview" aria-labelledby="project-overview-title">
      <div className="project-overview__inner">
        <aside className="project-overview__sticky">
          <p className="project-overview__eyebrow">{overview.eyebrow}</p>
          <h2 id="project-overview-title" className="project-overview__title">
            {overview.title}
          </h2>
          <p className="project-overview__description">{overview.description}</p>

          {overview.stacks?.length ? (
            <div className="project-overview__stacks" aria-label={overview.stacksTitle}>
              <h3>{overview.stacksTitle}</h3>
              <ul>
                {overview.stacks.map((stack) => (
                  <li key={stack.label} title={stack.label}>
                    {stack.icon ? (
                      <Image
                        src={stack.icon}
                        alt=""
                        aria-hidden="true"
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
          {overview.steps?.map((step, index) => (
            <article
              className="project-overview__step"
              key={step.title}
              data-tone={step.color?.toLowerCase() === "#111111" ? "dark" : "light"}
              style={{ "--overview-card-color": step.color || "#e7e7e7" }}
            >
              <div className="project-overview__step-header">
                <h3>{step.title}</h3>
                <span className="project-overview__step-mark" aria-hidden="true" />
              </div>
              <div className="project-overview__image">
                <Image src={step.image} alt="" fill sizes="(max-width: 900px) 64vw, 24vw" />
              </div>
              <div className="project-overview__step-footer">
                <span>{step.number || String(index + 1).padStart(2, "0")}</span>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
