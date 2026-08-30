import { forAudience, getCustomers } from "@/lib/content/loader";

import { SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function CustomersSection({ audienceId }: { audienceId: string }) {
  const customers = forAudience(await getCustomers(), audienceId);

  return (
    <SectionFrame
      title="WHO SAID YES"
    >
      {customers.length === 0 ? (
        <EmptySection
          title="Nothing listed here yet."
          body="Names go up only with the customer's permission. The work itself is under projects."
        />
      ) : (
        <div className={styles.list}>
          {customers.map((customer) => (
            <article key={customer.slug} className={styles.row}>
              <div className={styles.meta}>
                {customer.since ? <span className={styles.period}>{customer.since}</span> : null}
                <span className={styles.kind}>VIA {customer.via.toUpperCase()}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  <span className={styles.strong}>{customer.name}</span>
                  {customer.industry ? (
                    <>
                      <span className={styles.sep}>·</span>
                      <span className={styles.soft}>{customer.industry}</span>
                    </>
                  ) : null}
                </h2>

                <p className={styles.pointText}>{customer.outcome}</p>

                {customer.quote ? (
                  <blockquote className={styles.quote}>
                    <p className={styles.quoteText}>{customer.quote}</p>
                    {customer.quoteBy ? (
                      <cite className={styles.quoteBy}>— {customer.quoteBy}</cite>
                    ) : null}
                  </blockquote>
                ) : null}

                {customer.url ? (
                  <a
                    className={styles.link}
                    href={customer.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {customer.url.replace(/^https?:\/\//, "")} ↗
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </SectionFrame>
  );
}
