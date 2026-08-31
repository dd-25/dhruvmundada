import type { MetadataRoute } from "next";

import { getAudiences } from "@/lib/content/loader";
import { SITE_URL } from "@/lib/paths";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const audiences = await getAudiences();

  // Trailing slashes are not cosmetic: next.config sets trailingSlash, so every
  // page is a directory index. A URL without the slash 301s, and a sitemap full
  // of redirects is reported as one.
  const pages = audiences.flatMap((audience) => [
    // The default lens is the same page as "/" and canonicalises to it. Listing
    // both submits a URL that points at another one, which is a duplicate report.
    ...(audience.default ? [] : [{ url: `${SITE_URL}/${audience.id}/`, priority: 0.8 }]),
    ...audience.sections.map((section) => ({
      url: `${SITE_URL}/${audience.id}/${section}/`,
      priority: 0.6,
    })),
  ]);

  return [{ url: `${SITE_URL}/`, priority: 1 }, ...pages];
}
