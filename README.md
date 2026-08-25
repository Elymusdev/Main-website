# Elymus Therapeutics — website

Marketing site for Elymus Therapeutics, built on
[vinext](https://github.com/cloudflare/vinext) (Next.js App Router running on a
Cloudflare Worker) with React 19 and Tailwind 4.

## Prerequisites

- Node.js `>=22.13.0`

## Getting started

```bash
npm install
npm run dev
```

The dev server prints its URL (default `http://localhost:5173`). Pass
`-- --port 5174` to choose a different port.

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
  content/seed.ts    fallback content, also the source for the CMS import
  lib/               Sanity client and content accessors
  globals.css        all site styling
public/              images served at the site root
worker/index.ts      Cloudflare Worker entry, incl. image optimization
build/               Vite plugin that packages the Sites artifact
scripts/             install / build / validate helpers, CMS import
studio/              Sanity Studio (separate workspace, own package.json)
tests/               rendered-HTML check against the built artifact
.openai/hosting.json Sites project id and optional D1/R2 bindings
```

## Content

News, publications, and team members come from **Sanity**, fetched at request
time so edits go live without a redeploy. See `studio/README.md` for setup and
for how the client edits content.

`app/content/seed.ts` holds the same content as a fallback: if Sanity is
unconfigured or unreachable, pages render from seed rather than breaking. The
remaining page copy (hero headlines, section paragraphs) is still inline in the
page files.

## Commands

- `npm run dev` — start the Vite/vinext development server
- `npm run build` — build and validate the deployable Sites artifact
- `npm run start` — serve the built application
- `npm test` — build, then verify the rendered preview metadata
- `npm run validate:artifact` — recheck an existing artifact's manifest and ESM `default.fetch` export
- `npm run lint` — ESLint
- `npm run cms:seed` — one-time import of `app/content/seed.ts` into Sanity

`npm run install:ci`, `npm run build`, and `npm run lint` route through
`scripts/sites-env.sh`, which keeps npm, XDG, and temp paths inside the checkout
under the git-ignored `.sites-runtime/`. The build helpers use GNU `timeout` and
`flock` and are intended for the Linux CI image, not macOS; on macOS use
`npm run dev` and `npm install` directly.

The remote Sites builder runs `npm run build` against the pushed commit, so
building locally is only needed to diagnose a remote failure.

## Deployment notes

- `.openai/hosting.json` carries the Sites `project_id`; keep it in version control.
- `vite.config.ts` simulates any declared D1/R2 bindings for local development.
  Both are currently `null`.
- Timeout defaults can be overridden with `SITES_INSTALL_TIMEOUT`,
  `SITES_INSTALL_KILL_AFTER`, `SITES_BUILD_TIMEOUT`, and `SITES_BUILD_KILL_AFTER`.
  A timeout fails the command; the helpers never retry.

## Learn more

- [vinext documentation](https://github.com/cloudflare/vinext)
