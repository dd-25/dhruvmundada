import { Home } from "@/components/Home";
import { Shell } from "@/components/Shell";
import { getAudiences, getDefaultAudience } from "@/lib/content/loader";

/** The default lens also lives at its own /<id>/ route; this is the short URL. */
export default async function RootPage() {
  const [audience, audiences] = await Promise.all([getDefaultAudience(), getAudiences()]);

  return (
    <Shell audience={audience} audiences={audiences}>
      <Home audience={audience} />
    </Shell>
  );
}
