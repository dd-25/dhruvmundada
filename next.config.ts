import type { NextConfig } from "next";

// Served from a subdirectory because this is a project repo, not <user>.github.io.
// Buying a custom domain later = set this to "", rebuild. Nothing else changes,
// as long as every asset path goes through next/link, next/image or assetPath().
const BASE_PATH = "/dhruvmundada";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  // Emits /experience/index.html instead of /experience.html — GitHub Pages
  // serves directory indexes, not bare .html siblings.
  trailingSlash: true,
  // Mandatory under output: 'export'. Build throws otherwise.
  images: { unoptimized: true },
  // next/link and next/image apply basePath themselves; raw hrefs (the résumé
  // PDF, mailto targets in content files) need it applied by hand via assetPath().
  env: { BASE_PATH },
};

export default nextConfig;
