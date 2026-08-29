import { forAudience, getLearnings } from "@/lib/content/loader";

import { Chips, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

const KIND_LABEL = {
  work: "FROM WORK",
  general: "ELSEWHERE",
} as const;

export default async function LearningsSection({ audienceId }: { audienceId: string }) {
  const learnings = forAudience(await getLearnings(), audienceId);

  return (
    <SectionFrame
      title="LEARNINGS"
      count={learnings.length ? `${learnings.length} notes` : undefined}
    >
      {learnings.length === 0 ? (
        <EmptySection
          title="Nothing written down yet."
          body="Short notes on what production actually taught me, and what I picked up outside work. Add a file under content/learnings/ and it lands here."
        />
      ) : (
        <div className={styles.list}>
          {learnings.map((note) => (
            <article key={note.slug} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.period} data-current={note.current}>
                  {note.date}
                </span>
                <span className={styles.kind}>
                  {note.source ?? KIND_LABEL[note.kind]}
                </span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {note.current ? <span className={styles.dot} title="most recent" /> : null}
                  <span className={styles.strong}>{note.title}</span>
                </h2>

                {note.detail ? (
                  <div
                    className={styles.detail}
                    dangerouslySetInnerHTML={{ __html: note.detail }}
                  />
                ) : (
                  <span className={styles.muted}>no note yet</span>
                )}

                <div className={styles.footer}>
                  <Chips items={note.tags} />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionFrame>
  );
}
