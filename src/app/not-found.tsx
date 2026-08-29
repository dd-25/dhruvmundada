import Link from "next/link";

import { getAudiences, getDefaultAudience } from "@/lib/content/loader";
import { Shell } from "@/components/Shell";
import { EmptySection, SectionFrame } from "@/components/sections/SectionFrame";

export default async function NotFound() {
  const [audience, audiences] = await Promise.all([getDefaultAudience(), getAudiences()]);

  return (
    <Shell audience={audience} audiences={audiences}>
      <SectionFrame title="404">
        <EmptySection
          title="That page does not exist."
          body="Nothing here. Use the bar at the bottom, or start over."
        />
        <p style={{ marginTop: 20 }}>
          <Link href="/" style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>
            go home →
          </Link>
        </p>
      </SectionFrame>
    </Shell>
  );
}
