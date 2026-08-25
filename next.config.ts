import type { NextConfig } from "next";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
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
