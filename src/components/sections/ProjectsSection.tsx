import { forAudience, getProjects } from "@/lib/content/loader";

import { Chips, Points, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function ProjectsSection({ audienceId }: { audienceId: string }) {
  const projects = forAudience(await getProjects(), audienceId);

  return (
    <SectionFrame
      title="PROJECTS"
      count={projects.length ? `${projects.length} built` : undefined}
    >
      {projects.length === 0 ? (
        <EmptySection
          title="Nothing here yet."
          body="Add a markdown file under content/projects/ and it appears here on the next build."
        />
      ) : (
        <div className={styles.list}>
          {projects.map((project) => (
            <article key={project.slug} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.period} data-current={project.current}>
                  {project.period}
                </span>
                <span className={styles.kind}>{project.role.toUpperCase()}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {project.current ? <span className={styles.dot} role="img" aria-label="current" /> : null}
                  {project.url ? (
                    <a
                      className={styles.strong}
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name} ↗
                    </a>
                  ) : (
                    <span className={styles.strong}>{project.name}</span>
                  )}
                </h2>

                <p className={styles.pointText}>{project.blurb}</p>

                <Points points={project.points} />

                <div className={styles.footer}>
                  <Chips items={project.stack} />
                  {project.repo ? (
                    <a
                      className={styles.link}
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      source ↗
                    </a>
                  ) : null}
                </div>

                {project.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>read more</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: project.detail }}
                    />
                  </details>
                ) : (
                  <span className={styles.muted}>no write-up yet</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionFrame>
  );
}
