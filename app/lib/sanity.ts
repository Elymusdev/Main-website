import { createClient } from "@sanity/client";

/**
 * Sanity connection settings.
 *
 * These are PUBLIC values — they appear in ordinary browser requests to
 * Sanity's API — so they belong in source, not in a secret store. Reads from a
 * public dataset need no token, which is why nothing secret has to exist at
 * runtime on the Worker.
 *
 * If PROJECT_ID is blank the site falls back to the seed content in
 * app/content/, so it always renders even without a CMS.
 */
export const SANITY_PROJECT_ID: string = "2hp0kt0w";
export const SANITY_DATASET: string = "production";

// Pin the API date. Bumping it opts into Sanity's newer query behaviour and
// should be a deliberate change, never an accidental one.
const API_VERSION = "2025-01-01";

export const isSanityConfigured = SANITY_PROJECT_ID !== "";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: API_VERSION,
      // Served from Sanity's CDN: edits go live within about a minute with no
      // redeploy. Set to false for uncached reads at the cost of latency.
      useCdn: true,
      perspective: "published",
    })
  : null;

/**
 * Run a GROQ query, returning `null` if Sanity is not configured or the request
 * fails. Callers fall back to seed content so a CMS outage degrades to the last
 * known copy rather than a broken page.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    // `no-store` opts out of Next's Data Cache, which would otherwise pin the
    // first response indefinitely and make CMS edits never appear. Freshness is
    // still bounded by Sanity's own CDN (~60s), which absorbs the load.
    return await sanityClient.fetch<T>(query, params, { cache: "no-store" });
  } catch (error) {
    console.error("Sanity query failed; falling back to seed content.", error);
    return null;
  }
}
