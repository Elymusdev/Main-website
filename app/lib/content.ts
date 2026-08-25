import { sanityFetch } from "./sanity";
import {
  newsSeed,
  publicationsSeed,
  teamSeed,
  type NewsItem,
  type Publication,
  type TeamMember,
} from "../content/seed";

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
