import { sanityFetch } from "./sanity";
import {
  newsSeed,
  publicationsSeed,
  teamSeed,
  type NewsItem,
  type Publication,
  type TeamMember,
} from "../content/seed";
import {
  homeDefaults, scienceDefaults, pipelineDefaults, aboutDefaults,
  contactDefaults, newsDefaults, publicationsDefaults, siteSettingsDefaults,
  type HomeContent, type ScienceContent, type PipelineContent, type AboutContent,
  type ContactContent, type SimplePageContent, type SiteSettings,
} from "../content/pages";

export type { NewsItem, Publication, TeamMember };

/**
 * Content accessors used by the pages.
 *
 * Each returns Sanity data when it is available and the seed content otherwise,
 * so an unconfigured or unreachable CMS degrades to the last known copy instead
 * of an empty page. `orderRank` lets an editor drag items into order in the Studio.
 */

const NEWS_QUERY = `*[_type == "newsItem"] | order(orderRank asc, _createdAt desc) {
  _id, type, source, title, url
}`;

const PUBLICATIONS_QUERY = `*[_type == "publication"] | order(orderRank asc, year desc) {
  _id, year, journal, title, authors, detail, url
}`;

// `image.asset->url` resolves the CDN URL; `coalesce` keeps any legacy /public path working.
const TEAM_QUERY = `*[_type == "teamMember"] | order(orderRank asc, name asc) {
  _id, name, role, note, linkedin, group,
  "image": coalesce(image.asset->url, imagePath)
}`;

function nonEmpty<T>(rows: T[] | null, fallback: T[]): T[] {
  return rows && rows.length > 0 ? rows : fallback;
}

export async function getNews(): Promise<NewsItem[]> {
  return nonEmpty(await sanityFetch<NewsItem[]>(NEWS_QUERY), newsSeed);
}

export async function getPublications(): Promise<Publication[]> {
  return nonEmpty(await sanityFetch<Publication[]>(PUBLICATIONS_QUERY), publicationsSeed);
}

export async function getTeam(): Promise<{ leaders: TeamMember[]; advisors: TeamMember[] }> {
  const members = nonEmpty(await sanityFetch<TeamMember[]>(TEAM_QUERY), teamSeed);
  return {
    leaders: members.filter((m) => m.group === "leadership"),
    advisors: members.filter((m) => m.group === "advisor"),
  };
}

/* ------------------------------------------------------------------ *
 * Page copy
 * ------------------------------------------------------------------ */


export type {
  HomeContent, ScienceContent, PipelineContent, AboutContent,
  ContactContent, SimplePageContent, SiteSettings,
};

/**
 * Overlay CMS values on the defaults, skipping anything an editor left empty.
 * A blank field in the Studio therefore falls back to the shipped copy instead
 * of rendering an empty heading.
 */
function merge<T extends object>(defaults: T, cms: Partial<T> | null): T {
  if (!cms) return defaults;
  const out = { ...defaults } as Record<string, unknown>;
  for (const [key, value] of Object.entries(cms)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

/** Page copy lives in one singleton document per page, addressed by a fixed _id. */
async function page<T extends object>(id: string, defaults: T): Promise<T> {
  return merge(defaults, await sanityFetch<Partial<T>>(`*[_id == $id][0]`, { id }));
}

export const getHome = () => page<HomeContent>("homePage", homeDefaults);
export const getScience = () => page<ScienceContent>("sciencePage", scienceDefaults);
export const getPipeline = () => page<PipelineContent>("pipelinePage", pipelineDefaults);
export const getAbout = () => page<AboutContent>("aboutPage", aboutDefaults);
export const getContact = () => page<ContactContent>("contactPage", contactDefaults);
export const getNewsPage = () => page<SimplePageContent>("newsPage", newsDefaults);
export const getPublicationsPage = () => page<SimplePageContent>("publicationsPage", publicationsDefaults);
export const getSiteSettings = () => page<SiteSettings>("siteSettings", siteSettingsDefaults);
