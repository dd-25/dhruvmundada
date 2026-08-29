import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

import { getAudiences, getIdentity } from "@/lib/content/loader";
import { BASE_PATH } from "@/lib/paths";

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
  const identity = await getIdentity();
  return {
    title: { default: identity.name, template: `%s · ${identity.name}` },
    description: identity.tagline,
    openGraph: {
      title: identity.name,
      description: identity.tagline,
      type: "profile",
    },
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
      <body>{children}</body>
    </html>
  );
}
