import { forAudience, getBeyond } from "@/lib/content/loader";

import { Points, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function BeyondSection({ audienceId }: { audienceId: string }) {
  const entries = forAudience(await getBeyond(), audienceId);

  return (
    <SectionFrame title="BEYOND">
      {entries.length === 0 ? (
        <EmptySection
          title="Nothing here yet."
          body="Things done outside the job — teaching, sport, whatever else is worth writing down."
        />
      ) : (
        <div className={styles.list}>
          {entries.map((entry) => (
            // An undated entry drops the meta column rather than leaving it blank.
            <article key={entry.slug} className={entry.period ? styles.row : styles.rowWide}>
              {entry.period ? (
                <div className={styles.meta}>
                  <span className={styles.period} data-current={entry.current}>
                    {entry.period}
                  </span>
                </div>
              ) : null}

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {entry.current ? <span className={styles.dot} role="img" aria-label="ongoing" /> : null}
                  {entry.url ? (
                    <a
                      className={styles.strong}
                      href={entry.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {entry.title} ↗
                    </a>
                  ) : (
                    <span className={styles.strong}>{entry.title}</span>
                  )}
                </h2>

                <Points points={entry.points} />

                {entry.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>read more</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: entry.detail }}
                    />
                  </details>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionFrame>
  );
}
