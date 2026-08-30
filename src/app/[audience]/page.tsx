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
    title: `For ${audience.label}s`,
    description,
    // The default lens is also served at "/". Point search engines at the short URL.
    alternates: audience.default ? { canonical: "/" } : undefined,
    icons: { icon: lensIcon(audience.id) },
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
