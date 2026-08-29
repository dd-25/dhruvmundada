import { forAudience, getWriting } from "@/lib/content/loader";

import { Chips, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function WritingSection({ audienceId }: { audienceId: string }) {
  const posts = forAudience(await getWriting(), audienceId);

  return (
    <SectionFrame title="WRITING" count={posts.length ? `${posts.length} pieces` : undefined}>
      {posts.length === 0 ? (
        <EmptySection
          title="Nothing published yet."
          body="Notes on backend performance, production incidents, and what building a product alone actually teaches you. First piece is being written."
        />
      ) : (
        <div className={styles.list}>
          {posts.map((post) => (
            <article key={post.slug} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.period} data-current={post.current}>
                  {post.date}
                </span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {post.current ? <span className={styles.dot} title="latest" /> : null}
                  {post.external ? (
                    <a
                      className={styles.strong}
                      href={post.external}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {post.title} ↗
                    </a>
                  ) : (
                    <span className={styles.strong}>{post.title}</span>
                  )}
                </h2>

                <p className={styles.pointText}>{post.blurb}</p>

                <div className={styles.footer}>
                  <Chips items={post.tags} />
                </div>

                {post.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>read it</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: post.detail }}
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
