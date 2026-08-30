import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SECTIONS, isSectionId } from "@/components/sections/registry";
import { Shell } from "@/components/Shell";
import { lensIcon } from "@/lib/paths";
import { getAudienceById, getAudiences } from "@/lib/content/loader";

type Params = { params: Promise<{ audience: string; section: string }> };

export async function generateStaticParams() {
  const audiences = await getAudiences();

  return audiences.flatMap((audience) =>
    audience.sections.map((section) => {
      // A `sections` entry with no registry component would render as a dead nav
      // item. Fail the build instead, naming the file and the id.
      if (!isSectionId(section)) {
        throw new Error(
          `content/audiences/${audience.id}.json lists section "${section}", which has no ` +
            `component. Known sections: ${Object.keys(SECTIONS).join(", ")}.`,
        );
      }
      return { audience: audience.id, section };
    }),
  );
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { audience: audienceId } = await params;
  const audience = await getAudienceById(audienceId);
  if (!audience) return {};

  return { icons: lensIcon(audience.id) };
}

export default async function SectionPage({ params }: Params) {
  const { audience: audienceId, section } = await params;
  const [audience, audiences] = await Promise.all([
    getAudienceById(audienceId),
    getAudiences(),
  ]);

  if (!audience || !isSectionId(section) || !audience.sections.includes(section)) {
    notFound();
  }

  const Section = SECTIONS[section];

  return (
    <Shell audience={audience} audiences={audiences} activeSection={section}>
      <Section audienceId={audience.id} />
    </Shell>
  );
}
