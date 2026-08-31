import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

import {
  getAudiences,
  getDefaultAudience,
  getEducation,
  getExperience,
  getIdentity,
  getSocials,
} from "@/lib/content/loader";
import { BASE_PATH, SITE_URL, lensIcon } from "@/lib/paths";

import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const [identity, fallbackLens] = await Promise.all([getIdentity(), getDefaultAudience()]);
  return {
    // Without this every canonical and og:url resolves relative, which on a
    // project-path deploy points at the wrong place.
    metadataBase: new URL(SITE_URL),
    // Search Console ownership. Public by design — it proves the site to one Google
    // account and is worthless to anyone else, so it belongs in the repo.
    verification: { google: "qSmiTFFwK6qAy_ar58W7DVW2sZD6NmL1Yzpq_BgIpj4" },
    // Every tab reads just the name — no section, no lens, no separator.
    title: identity.name,
    description: identity.tagline,
    // "/" serves the default lens, so it carries that lens's icon.
    icons: lensIcon(fallbackLens.id),
    openGraph: {
      title: identity.name,
      description: identity.tagline,
      url: SITE_URL,
      siteName: identity.name,
      locale: "en_IN",
      type: "profile",
    },
  };
}

/**
 * Tells a search engine that this page and those profiles are one person, which
 * is what lets a name query resolve to this site rather than to a namesake.
 */
async function personJsonLd() {
  const [identity, socials, education, experience] = await Promise.all([
    getIdentity(),
    getSocials(),
    getEducation(),
    getExperience(),
  ]);
  // Education is ordered highest-qualification-first, so [0] is the degree. The
  // schools below it are true but add nothing a search engine can disambiguate on.
  const degree = education[0];
  const role = experience.find((entry) => entry.current);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    url: SITE_URL,
    email: identity.email,
    jobTitle: role?.role ?? "Software Engineer",
    description: identity.tagline,
    address: { "@type": "PostalAddress", addressLocality: identity.location },
    ...(degree && {
      alumniOf: { "@type": "CollegeOrUniversity", name: degree.institution },
    }),
    ...(role && { worksFor: { "@type": "Organization", name: role.company } }),
    sameAs: socials.filter((s) => s.url.startsWith("http")).map((s) => s.url),
  };
}

/**
 * Static export serves one file for "/" regardless of query string, so a lens
 * hint in the URL has to be applied in the browser. This runs in <head>, before
 * the body paints, so nobody sees the wrong lens first. It is a no-op on every
 * URL except the bare root.
 *
 * Sending /business/ directly is still the better link — no JS, no redirect,
 * correct link preview. This exists for ?as=business / ?business=true.
 */
function lensRedirectScript(audienceIds: string[]): string {
  return `(function(){try{
var base=${JSON.stringify(BASE_PATH)},ids=${JSON.stringify(audienceIds)};
if(location.pathname.replace(/\\/+$/,"")!==base)return;
var q=new URLSearchParams(location.search),want=q.get("as");
if(!want)for(var i=0;i<ids.length;i++)if(q.get(ids[i])==="true"){want=ids[i];break;}
if(want&&ids.indexOf(want)>-1)location.replace(base+"/"+want+"/");
}catch(e){}})();`;
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const audienceIds = (await getAudiences()).map((audience) => audience.id);

  return (
    <html lang="en" className={`${mono.variable} ${sans.variable} ${serif.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: lensRedirectScript(audienceIds) }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(await personJsonLd()) }}
        />{children}</body>
    </html>
  );
}
