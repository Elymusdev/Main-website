import { createClient } from "@sanity/client";

/**
 * Sanity connection settings.
 *
 * These are PUBLIC values — they appear in ordinary browser requests to
 * Sanity's API — so they belong in source, not in a secret store. Reads from a
 * public dataset need no token, which is why nothing secret has to exist at
 * runtime on the Worker.
 *
 * Fill PROJECT_ID in after running `npx sanity init` in `studio/`.
 * Until it is set, the site falls back to the seed content in app/content/.
 */
export const SANITY_PROJECT_ID = "";
export const SANITY_DATASET = "production";

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
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    console.error("Sanity query failed; falling back to seed content.", error);
    return null;
  }
}
