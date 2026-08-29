const BASE_PATH = process.env.BASE_PATH ?? "";

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
