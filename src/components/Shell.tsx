import Link from "next/link";

import { DownloadIcon, ArrowIcon } from "@/components/Icons";
import type { Audience } from "@/lib/content/schema";
import { assetPath, audienceHref, isExternal, sectionHref } from "@/lib/paths";

import styles from "./Shell.module.css";

type ShellProps = {
  audience: Audience;
  audiences: Audience[];
  /** Section id when inside a section; undefined on an audience home. */
  activeSection?: string;
  children: React.ReactNode;
};

/**
 * Theme wrapper, audience toggle, and the status bar. The toggle is a pair of
 * links rather than client state: prefetch makes it feel instant while keeping
 * real URLs, the back button, and per-lens SEO.
 */
export function Shell({ audience, audiences, activeSection, children }: ShellProps) {
  const action = audience.primaryAction;
  const barPath = activeSection
    ? `~/dhruv-mundada/${activeSection}`
    : "~/dhruv-mundada";

  return (
    <div className={styles.shell} data-theme={audience.theme}>
      <header className={styles.top}>
        <Link
          href={audienceHref(audience.id)}
          className={styles.wordmark}
          data-hidden={activeSection ? "false" : "true"}
        >
          Dhruv Mundada
        </Link>

        <nav className={styles.toggle} aria-label="View this site as">
          <span className={styles.toggleLabel}>view me as</span>
          <div className={styles.toggleGroup}>
            {audiences.map((option) => (
              <Link
                key={option.id}
                href={audienceHref(option.id)}
                className={styles.toggleOption}
                data-active={option.id === audience.id}
                aria-current={option.id === audience.id ? "page" : undefined}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <nav className={styles.bar} aria-label="Sections">
        <span className={styles.mode}>{audience.modeLabel}</span>

        <div className={styles.nav}>
          {audience.sections.map((section) => (
            <Link
              key={section}
              href={sectionHref(audience.id, section)}
              className={styles.navItem}
              data-active={section === activeSection}
              aria-current={section === activeSection ? "page" : undefined}
            >
              {section}
            </Link>
          ))}
        </div>

        <div className={styles.barRight}>
          <span className={styles.barPath}>{barPath}</span>
          <a
            className={styles.barAction}
            href={assetPath(action.href)}
            target={isExternal(action.href) ? "_blank" : undefined}
            rel={isExternal(action.href) ? "noreferrer" : undefined}
          >
            {action.glyph === "↓" ? <DownloadIcon /> : <ArrowIcon />}
            {action.label}
          </a>
        </div>
      </nav>
    </div>
  );
}
