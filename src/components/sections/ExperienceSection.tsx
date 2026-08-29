import { forAudience, getExperience } from "@/lib/content/loader";

import { Chips, Points, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function ExperienceSection({ audienceId }: { audienceId: string }) {
  const roles = forAudience(await getExperience(), audienceId);

  return (
    <SectionFrame title="EXPERIENCE" count={`${roles.length} entries`}>
      {roles.length === 0 ? (
        <EmptySection
          title="Nothing here yet."
          body="Add a markdown file under content/experience/ and it appears here on the next build."
        />
      ) : (
        <div className={styles.list}>
          {roles.map((role) => (
            <article key={role.slug} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.period} data-current={role.current}>
                  {role.period}
                </span>
                <span className={styles.kind}>{role.kind}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {role.current ? <span className={styles.dot} role="img" aria-label="current" /> : null}
                  <span className={styles.strong}>{role.role}</span>
                  <span className={styles.sep}>·</span>
                  {role.url ? (
                    <a className={styles.soft} href={role.url} target="_blank" rel="noreferrer">
                      {role.company} ↗
                    </a>
                  ) : (
                    <span className={styles.soft}>{role.company}</span>
                  )}
                </h2>

                <Points points={role.points} />

                <div className={styles.footer}>
                  <Chips items={role.stack} />
                </div>

                {role.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>read more</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: role.detail }}
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
