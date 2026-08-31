import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Home } from "@/components/Home";
import { Shell } from "@/components/Shell";
import { getAudienceById, getAudiences, getIdentity } from "@/lib/content/loader";
import { lensIcon } from "@/lib/paths";

type Params = { params: Promise<{ audience: string }> };

export async function generateStaticParams() {
  return (await getAudiences()).map((audience) => ({ audience: audience.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { audience: id } = await params;
  const [audience, identity] = await Promise.all([getAudienceById(id), getIdentity()]);
  if (!audience) return {};

  const description = audience.tagline ?? identity.tagline;
  return {
    description,
    // Every page sets its own. The layout must not, because Next inherits layout
    // metadata into children, which would canonicalise the whole site to one URL.
    // The default lens is also served at "/", so it points at the short URL.
    alternates: { canonical: audience.default ? "/" : `/${audience.id}/` },
    icons: lensIcon(audience.id),
  };
}

export default async function AudiencePage({ params }: Params) {
  const { audience: id } = await params;
  const [audience, audiences] = await Promise.all([getAudienceById(id), getAudiences()]);
  if (!audience) notFound();

  return (
    <Shell audience={audience} audiences={audiences}>
      <Home audience={audience} />
    </Shell>
  );
}
