import { ArrowIcon, DownloadIcon, SocialIcon } from "@/components/Icons";
import { getIdentity, getSocials } from "@/lib/content/loader";
import type { Audience } from "@/lib/content/schema";
import { assetPath } from "@/lib/paths";

import styles from "./Home.module.css";

export async function Home({ audience }: { audience: Audience }) {
  const [identity, socials] = await Promise.all([getIdentity(), getSocials()]);

  const shown = audience.socials
    ? socials.filter((s) => audience.socials?.includes(s.id))
    : socials;
  const action = audience.primaryAction;

  return (
    <div className={styles.home}>
      <h1 className={styles.name} data-font={audience.nameFont}>
        {identity.name}
      </h1>

      <p className={styles.tagline}>{audience.tagline ?? identity.tagline}</p>

      {identity.deltas.length > 0 ? (
        <ul className={styles.deltas}>
          {identity.deltas.map((delta) => (
            <li key={delta.label} className={styles.delta}>
              <span className={styles.deltaLabel}>{delta.label}</span>
              <span className={styles.deltaFrom}>{delta.from}</span>
              <span className={styles.deltaArrow}>→</span>
              <span className={styles.deltaTo}>{delta.to}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className={styles.actions}>
        <a className={styles.cta} href={assetPath(action.href)}>
          {action.label}
          {action.glyph === "↓" ? <DownloadIcon size={15} /> : <ArrowIcon size={15} />}
        </a>

        <div className={styles.socials}>
          {shown.map((social) => (
            <a
              key={social.id}
              className={styles.social}
              href={social.url}
              target={social.url.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              title={social.label}
            >
              <SocialIcon id={social.id} />
              {social.id === "email" ? (
                <span className={styles.socialLabel}>{social.label}</span>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
