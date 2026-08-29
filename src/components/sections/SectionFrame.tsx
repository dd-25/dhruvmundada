import styles from "./Section.module.css";

type FrameProps = {
  title: string;
  count?: string;
  children: React.ReactNode;
};

export function SectionFrame({ title, count, children }: FrameProps) {
  return (
    <section className={styles.frame}>
      <div className={styles.head}>
        <h1 className={styles.title}>{title}</h1>
        {count ? <span className={styles.count}>{count}</span> : null}
      </div>
      {children}
    </section>
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

export function Points({ points }: { points: string[] }) {
  return (
    <ul className={styles.points}>
      {points.map((point, index) => (
        <li key={index} className={styles.point}>
          <span className={styles.bullet}>—</span>
          <span className={styles.pointText}>{point}</span>
        </li>
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
