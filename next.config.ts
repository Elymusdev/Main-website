import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  // Next 16 blocks dev-only resources (HMR) from origins it does not recognise.
  // Without 127.0.0.1 listed, loading the dev server by IP silently breaks
  // hydration: the page renders but no client component responds.
  allowedDevOrigins: ["127.0.0.1"],
  // Pin the workspace root: Next otherwise infers it from the nearest lockfile,
  // which can resolve outside the project when one exists further up the tree.
  turbopack: { root: dirname(fileURLToPath(import.meta.url)) },
  images: {
    // Team portraits uploaded in the Studio are served from Sanity's CDN.
    // Everything else comes from /public and needs no entry here.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
