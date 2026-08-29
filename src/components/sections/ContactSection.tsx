import { SocialIcon } from "@/components/Icons";
import { getAudienceById, getIdentity, getSocials } from "@/lib/content/loader";
import { assetPath } from "@/lib/paths";

import { SectionFrame } from "./SectionFrame";
import styles from "./Section.module.css";

export default async function ContactSection({ audienceId }: { audienceId: string }) {
  const [identity, socials, audience] = await Promise.all([
    getIdentity(),
    getSocials(),
    getAudienceById(audienceId),
  ]);

  const shown = audience?.socials
    ? socials.filter((s) => audience.socials?.includes(s.id))
    : socials;

  return (
    <SectionFrame title="CONTACT">
      <div className={styles.list}>
        <div className={styles.row}>
          <div className={styles.meta}>
            <span className={styles.kind}>EMAIL</span>
          </div>
          <div className={styles.body}>
            <a className={styles.heading} href={`mailto:${identity.email}`}>
              <span className={styles.strong}>{identity.email}</span>
            </a>
            <p className={styles.pointText}>
              Fastest way to reach me. I read everything, I reply to anything specific.
            </p>
          </div>
        </div>

        {identity.phone ? (
          <div className={styles.row}>
            <div className={styles.meta}>
              <span className={styles.kind}>PHONE</span>
            </div>
            <div className={styles.body}>
              <a className={styles.heading} href={`tel:${identity.phone.replace(/\s/g, "")}`}>
                <span className={styles.strong}>{identity.phone}</span>
              </a>
            </div>
          </div>
        ) : null}

        <div className={styles.row}>
          <div className={styles.meta}>
            <span className={styles.kind}>ELSEWHERE</span>
          </div>
          <div className={styles.body}>
            <ul className={styles.points}>
              {shown.map((social) => (
                <li key={social.id} className={styles.point}>
                  <span className={styles.bullet}>
                    <SocialIcon id={social.id} size={14} />
                  </span>
                  <a className={styles.link} href={social.url} target="_blank" rel="noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.meta}>
            <span className={styles.kind}>BASED</span>
          </div>
          <div className={styles.body}>
            <p className={styles.pointText}>{identity.location}</p>
            <a className={styles.link} href={assetPath(identity.resume)}>
              download résumé (PDF)
            </a>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
