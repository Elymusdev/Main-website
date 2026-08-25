# Elymus Therapeutics — website

Marketing site for Elymus Therapeutics. Next.js 16 (App Router) with React 19
and Tailwind 4, content managed in Sanity, deployed on Vercel.

## Prerequisites

- Node.js `>=22.13.0`

## Getting started

```bash
npm install
npm run dev
```

## Structure

```
app/                 pages and components (Next.js App Router)
  page.tsx           home
  about/             team and advisors
  science/           platform and mechanism of action
  pipeline/          DMD program
  publications/      peer-reviewed papers
  news/              press and podcast coverage
  contact/           inquiry form (mailto-based)
  components/        SiteChrome (nav/footer/shell), MoaExplorer, InquiryForm
  content/           default copy (seed.ts = lists, pages.ts = page copy)
  lib/               Sanity client and content accessors
  globals.css        all site styling
public/              images served at the site root
scripts/             CMS import helper
studio/              Sanity Studio (separate workspace, own package.json)
```

## Content

All site content comes from **Sanity** (project `2hp0kt0w`, dataset
`production`), fetched at request time so edits go live without a redeploy —
lists (news, publications, team) and page copy (headings, paragraphs, cards,
CTAs, footer). See `studio/README.md` for how the client edits it.

Defaults live in `app/content/seed.ts` (lists) and `app/content/pages.ts`
(page copy). If Sanity is unconfigured or unreachable, or an editor leaves a
field blank, the site renders those defaults rather than breaking.

CMS-backed pages set `export const dynamic = "force-dynamic"`. Without it Next
statically prerenders them and bakes content into the build, so editor changes
would never appear.

Sanity project id and dataset are public values and live in `app/lib/sanity.ts`.
Reads use a public dataset, so no API token is needed at runtime.

## Commands

- `npm run dev` — development server
- `npm run build` — production build
- `npm start` — serve the production build
- `npm run lint` — ESLint
- `npm run cms:seed` — one-time import of the default content into Sanity

## Deployment

Deployed on **Vercel**, which detects Next.js automatically — no `vercel.json`
needed. Push to `main` and Vercel builds and deploys.

Images are optimized by Vercel. `next.config.ts` allows `cdn.sanity.io` as a
remote source for team portraits uploaded in the Studio; everything else is
served from `public/`.

> This project previously targeted Cloudflare Workers via `vinext`, with the
> `worker/`, `build/` and `.openai/` directories and a Worker-artifact build.
> Those were removed in the move to Vercel; see git history if that setup is
> ever needed again.
