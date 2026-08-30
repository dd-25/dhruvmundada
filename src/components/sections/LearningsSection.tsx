import { forAudience, getLearnings } from "@/lib/content/loader";

import { Points, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

const KIND_LABEL = {
  work: "FROM WORK",
  general: "ELSEWHERE",
} as const;

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/** "2025-08" -> "Aug 2025". The schema guarantees a real month, so no guard here. */
function monthYear(date: string): string {
  const [year, month] = date.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export default async function LearningsSection({ audienceId }: { audienceId: string }) {
  const learnings = forAudience(await getLearnings(), audienceId);

  return (
    <SectionFrame title="LEARNINGS">
      {learnings.length === 0 ? (
        <EmptySection
          title="Nothing written down yet."
          body="Short notes on what production actually taught me, and what I picked up outside work."
        />
      ) : (
        <div className={styles.list}>
          {learnings.map((note) => (
            <article key={note.slug} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.period} data-current={note.current}>
                  {monthYear(note.date)}
                </span>
                <span className={styles.kind}>
                  {note.source ?? KIND_LABEL[note.kind]}
                </span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {note.current ? <span className={styles.dot} role="img" aria-label="most recent" /> : null}
                  <span className={styles.strong}>{note.title}</span>
                </h2>

                <Points points={note.points} />

                {note.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>the long version</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: note.detail }}
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
