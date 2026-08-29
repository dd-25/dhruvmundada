import type { MetadataRoute } from "next";

import { getAudiences } from "@/lib/content/loader";
import { SITE_URL } from "@/lib/paths";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const audiences = await getAudiences();

  const pages = audiences.flatMap((audience) => [
    { url: `${SITE_URL}/${audience.id}`, priority: audience.default ? 0.9 : 0.8 },
    ...audience.sections.map((section) => ({
      url: `${SITE_URL}/${audience.id}/${section}`,
      priority: 0.6,
    })),
  ]);

  return [{ url: SITE_URL, priority: 1 }, ...pages];
}
