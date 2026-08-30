import { PhoneIcon, SocialIcon } from "@/components/Icons";
import {
  getAudienceById,
  getEducation,
  getIdentity,
  getSocials,
} from "@/lib/content/loader";

import { GroupHead, SectionFrame } from "./SectionFrame";
import styles from "./Section.module.css";

/** "+91 98502 51104" -> https://wa.me/919850251104 — wa.me wants digits only. */
function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

function Row({
  label,
  children,
  group,
}: {
  label: string;
  children: React.ReactNode;
  /** Drops the rule below, so consecutive rows read as one block. */
  group?: boolean;
}) {
  return (
    <div className={group ? `${styles.row} ${styles.rowGroup}` : styles.row}>
      <div className={styles.meta}>
        <span className={styles.kind}>{label}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export default async function ProfileSection({ audienceId }: { audienceId: string }) {
  const [identity, socials, audience, education] = await Promise.all([
    getIdentity(),
    getSocials(),
    getAudienceById(audienceId),
    getEducation(),
  ]);

  // Email has its own row below, so listing it again under ELSEWHERE printed the
  // same address twice on every lens.
  const elsewhere = (
    audience?.socials ? socials.filter((s) => audience.socials?.includes(s.id)) : socials
  ).filter((s) => s.id !== "email");

  return (
    <SectionFrame title="EDUCATION">
      <div className={styles.list}>
        {education.map((entry) => (
          // No rule between education rows — they read as one group under three
          // labels rather than three unrelated records.
          <div
            key={entry.institution}
            className={`${styles.row} ${styles.rowGroup}`}
          >
            <div className={styles.meta}>
              <span className={styles.period}>{entry.level.toUpperCase()}</span>
              <span className={styles.kind}>{entry.period}</span>
            </div>
            <div className={`${styles.body} ${styles.bodyTight}`}>
              <p className={styles.pointText}>
                <span className={styles.strongInline}>{entry.qualification}</span>
                {` — ${entry.institution}`}
              </p>
              {entry.note ? <p className={styles.figure}>{entry.note}</p> : null}
            </div>
          </div>
        ))}

      </div>

      <GroupHead title="CONTACT" />

      <div className={styles.list}>
        <Row label="EMAIL" group>
          <ul className={styles.lines}>
            <li className={styles.line}>
              <span className={styles.iconSlot}>
                <SocialIcon id="email" size={14} />
              </span>
              <a className={styles.link} href={`mailto:${identity.email}`}>
                {identity.email}
              </a>
            </li>
          </ul>
          <p className={styles.hint}>
            Fastest way to reach me. Send the context, the problem, or the role.
          </p>
        </Row>

        {identity.phone ? (
          <Row label="WHATSAPP" group>
            <ul className={styles.lines}>
              <li className={styles.line}>
                <span className={styles.iconSlot}>
                  <PhoneIcon size={14} />
                </span>
                <a
                  className={styles.link}
                  href={whatsappHref(identity.phone)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {identity.phone}
                </a>
              </li>
            </ul>
          </Row>
        ) : null}

        <Row label="ELSEWHERE" group>
          <ul className={styles.lines}>
            {elsewhere.map((social) => (
              <li key={social.id} className={styles.line}>
                <span className={styles.iconSlot}>
                  <SocialIcon id={social.id} size={14} />
                </span>
                <a className={styles.link} href={social.url} target="_blank" rel="noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </SectionFrame>
  );
}
