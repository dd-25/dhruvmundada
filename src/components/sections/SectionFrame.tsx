import styles from "./Section.module.css";

type FrameProps = {
  title: string;
  children: React.ReactNode;
};

export function SectionFrame({ title, children }: FrameProps) {
  return (
    <section className={styles.frame}>
      <div className={styles.head}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {children}
    </section>
  );
}

/** A second heading inside a section, for a page that carries two distinct blocks. */
export function GroupHead({ title }: { title: string }) {
  return (
    <div className={`${styles.head} ${styles.headGroup}`}>
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}

export function EmptySection({ title, body }: { title: string; body: string }) {
  return (
    <div className={styles.empty}>
      <p className={styles.emptyTitle}>{title}</p>
      <p className={styles.emptyBody}>{body}</p>
    </div>
  );
}

/**
 * Points arrive as HTML — the loader renders their inline markdown at build
 * time, so `**45%**` in a content file lands at full contrast against dim body
 * text. Safe to inject: remark-html sanitises, and the source is the repo.
 */
export function Points({ points }: { points: string[] }) {
  return (
    <ul className={styles.points}>
      {points.map((point, index) => (
        <li
          key={index}
          className={styles.point}
          dangerouslySetInnerHTML={{ __html: point }}
        />
      ))}
    </ul>
  );
}

export function Chips({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className={styles.chips}>
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className={styles.chip}>
          {item}
        </span>
      ))}
    </div>
  );
}
