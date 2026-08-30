import { forAudience, getServices } from "@/lib/content/loader";

import { Points, SectionFrame, EmptySection } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function ServicesSection({ audienceId }: { audienceId: string }) {
  const services = forAudience(await getServices(), audienceId);

  return (
    <SectionFrame title="WHAT I DO">
      {services.length === 0 ? (
        <EmptySection
          title="Nothing listed here yet."
          body="Mail me and I will tell you straight whether it is something I can help with."
        />
      ) : (
        <div className={styles.list}>
          {services.map((service) => (
            // No left metadata column and no numbering — services are not a
            // sequence, and a number there would be decoration, not structure.
            <article key={service.slug} className={styles.rowWide}>
              <div className={styles.body}>
                <h2 className={styles.heading}>
                  <span className={styles.strong}>{service.name}</span>
                </h2>

                <p className={styles.pointText}>{service.blurb}</p>

                <Points points={service.points} />

                {service.detail ? (
                  <details className={styles.disclosure}>
                    <summary className={styles.summary}>read more</summary>
                    <div
                      className={styles.detail}
                      dangerouslySetInnerHTML={{ __html: service.detail }}
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
