export const BASE_PATH = process.env.BASE_PATH ?? "";

/** Absolute origin + basePath. Used by robots.txt, the sitemap and OG tags. */
export const SITE_URL = `https://dd-25.github.io${BASE_PATH}`;

/**
 * Per-lens tab icon. One static file each, so nothing is generated at runtime.
 *
 * The URL must be identical for every page of a lens, or the browser drops the
 * icon and refetches on each navigation — which is what a flickering favicon is.
 * That is also why "/" resolves to the default lens's icon rather than owning a
 * separate file: "/" and "/engineer/" are the same page and must not disagree.
 */
export function lensIcon(audienceId: string): { icon: { url: string; type: string } } {
  return {
    icon: { url: assetPath(`/icons/${audienceId}.svg`), type: "image/svg+xml" },
  };
}

/**
 * Prefixes basePath onto a raw href. Only needed for paths Next does not
 * rewrite itself — files in public/ referenced outside next/image, and any
 * href that comes from a content file. Absolute URLs and mailto: pass through.
 */
export function assetPath(href: string): string {
  if (/^[a-z]+:/i.test(href) || href.startsWith("//")) return href;
  return `${BASE_PATH}${href}`;
}

export function isExternal(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/** Route for an audience home. The default audience also lives at "/". */
export function audienceHref(audienceId: string): string {
  return `/${audienceId}`;
}

export function sectionHref(audienceId: string, sectionId: string): string {
  return `/${audienceId}/${sectionId}`;
}
