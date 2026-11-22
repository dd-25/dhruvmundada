import { ArrowIcon, DownloadIcon, SocialIcon } from "@/components/Icons";
import { forAudience, getExperience, getIdentity, getSocials } from "@/lib/content/loader";
import type { Audience } from "@/lib/content/schema";
import { assetPath, isExternal } from "@/lib/paths";

import styles from "./Home.module.css";
import sectionStyles from "./sections/Section.module.css";

export async function Home({ audience }: { audience: Audience }) {
  const [identity, socials, experience] = await Promise.all([
    getIdentity(),
    getSocials(),
    getExperience(),
  ]);
  const now = forAudience(experience, audience.id).find((role) => role.current);

  const shown = audience.socials
    ? socials.filter((s) => audience.socials?.includes(s.id))
    : socials;
  const action = audience.primaryAction;

  return (
    <div className={styles.home}>
      {now ? (
        <p className={styles.now}>
          <span className={sectionStyles.dot} role="img" aria-label="current" />
          <span className={styles.nowLabel}>now</span>
          {now.role} · {now.company}
        </p>
      ) : null}

      <h1 className={styles.name} data-font={audience.nameFont}>
        {identity.name}
      </h1>

      <p className={styles.tagline}>{audience.tagline ?? identity.tagline}</p>

      <p className={styles.where}>{identity.location}</p>

      <div className={styles.actions}>
        <a
          className={styles.cta}
          href={assetPath(action.href)}
          target={isExternal(action.href) ? "_blank" : undefined}
          rel={isExternal(action.href) ? "noreferrer" : undefined}
        >
          {action.label}
          {action.glyph === "↓" ? <DownloadIcon size={15} /> : <ArrowIcon size={15} />}
        </a>

        <div className={styles.socials}>
          {shown.map((social) => (
            <a
              key={social.id}
              className={styles.social}
              href={social.url}
              target={isExternal(social.url) ? "_blank" : undefined}
              rel={isExternal(social.url) ? "noreferrer" : undefined}
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
