import type { Metadata } from "next";

import { Home } from "@/components/Home";
import { Shell } from "@/components/Shell";
import { getAudiences, getDefaultAudience } from "@/lib/content/loader";

// Canonical is set per page rather than on the layout, so this one has to declare
// its own. It is the page a name search should land on, so it is the one that
// most needs to be right.
export const metadata: Metadata = { alternates: { canonical: "/" } };

/** The default lens also lives at its own /<id>/ route; this is the short URL. */
export default async function RootPage() {
  const [audience, audiences] = await Promise.all([getDefaultAudience(), getAudiences()]);

  return (
    <Shell audience={audience} audiences={audiences}>
      <Home audience={audience} />
    </Shell>
  );
}
