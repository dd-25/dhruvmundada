import { forAudience, getClients } from "@/lib/content/loader";

import { SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function ClientsSection({ audienceId }: { audienceId: string }) {
  const clients = forAudience(await getClients(), audienceId);

  return (
    <SectionFrame
      title="CLIENTS"
      count={clients.length ? `${clients.length} engagements` : undefined}
    >
      {clients.length === 0 ? (
        <EmptySection
          title="Nothing listed yet."
          body="Client names go up only with their permission — add a file under content/clients/ once you have it. Until then the work itself is under projects."
        />
      ) : (
        <div className={styles.list}>
          {clients.map((client) => (
            <article key={client.slug} className={styles.row}>
              <div className={styles.meta}>
                {client.since ? <span className={styles.period}>{client.since}</span> : null}
                <span className={styles.kind}>VIA {client.via.toUpperCase()}</span>
              </div>

              <div className={styles.body}>
                <h2 className={styles.heading}>
                  <span className={styles.strong}>{client.name}</span>
                  {client.industry ? (
                    <>
                      <span className={styles.sep}>·</span>
                      <span className={styles.soft}>{client.industry}</span>
                    </>
                  ) : null}
                </h2>

                <p className={styles.pointText}>{client.outcome}</p>

                {client.quote ? (
                  <blockquote className={styles.quote}>
                    <p className={styles.quoteText}>{client.quote}</p>
                    {client.quoteBy ? (
                      <cite className={styles.quoteBy}>— {client.quoteBy}</cite>
                    ) : null}
                  </blockquote>
                ) : null}

                {client.url ? (
                  <a
                    className={styles.link}
                    href={client.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {client.url.replace(/^https?:\/\//, "")} ↗
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
