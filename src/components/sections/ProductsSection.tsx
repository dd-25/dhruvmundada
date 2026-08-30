import { forAudience, getProducts } from "@/lib/content/loader";

import { Chips, Points, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function ProductsSection({ audienceId }: { audienceId: string }) {
  const products = forAudience(await getProducts(), audienceId);

  return (
    <SectionFrame
      title="PRODUCTS"
    >
      {products.length === 0 ? (
        <EmptySection
          title="Nothing here yet."
          body="Products appear here as they ship."
        />
      ) : (
        <div className={styles.list}>
          {products.map((product) => (
            <article key={product.slug} className={styles.row}>
              <div className={styles.meta}>
                <span className={styles.period} data-current={product.current}>
                  {product.period}
                </span>
                <span className={styles.kind}>{product.role.toUpperCase()}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  {product.current ? <span className={styles.dot} role="img" aria-label="current" /> : null}
                  {product.url ? (
                    <a
                      className={styles.strong}
                      href={product.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {product.name} ↗
                    </a>
                  ) : (
                    <span className={styles.strong}>{product.name}</span>
                  )}
                </h2>

                <p className={styles.pointText}>{product.blurb}</p>

                <Points points={product.points} />

                <div className={styles.footer}>
                  <Chips items={product.stack} />
                  {product.repo ? (
                    <a
                      className={styles.link}
                      href={product.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      source ↗
                    </a>
                  ) : null}
                </div>

                {product.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>read more</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: product.detail }}
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
