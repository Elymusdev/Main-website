# Elymus CMS (Sanity Studio)

The editing interface for the Elymus site. It is a **separate workspace** from
the site: its dependency tree is large and targets Node, while the site builds
for Cloudflare Workers. Keeping them apart is deliberate — do not merge this
into the root `package.json`.

The site reads published content directly from Sanity's API at request time, so
**edits go live without a redeploy** (within about a minute, via Sanity's CDN).

## One-time setup

Run these once, from this directory:

```bash
cd studio
npm install
npx sanity login          # opens a browser
npx sanity init --env     # creates the project + dataset, writes .env
```

`sanity init` prints a **project ID**. Two things need it:

1. `studio/.env` — written for you as `SANITY_STUDIO_PROJECT_ID=...`
2. `app/lib/sanity.ts` — set `SANITY_PROJECT_ID` to the same value by hand

Then import the content the site already has:

```bash
cd ..
SANITY_PROJECT_ID=<id> SANITY_WRITE_TOKEN=<token> npm run cms:seed
```

Create the token at [sanity.io/manage](https://sanity.io/manage) → your project →
API → Tokens, with **Editor** permission. It is used only by that script, from
your machine. The site itself never needs a token.

The import is safe to re-run: documents use deterministic ids and are created
only if missing, so it will not duplicate entries or overwrite edits made in the
Studio. Pass `--replace` to force-overwrite.

## Publishing the Studio for the client

```bash
cd studio
npm run deploy
```

This hosts it at `https://<your-project>.sanity.studio`. Invite the client at
sanity.io/manage → Members. Give them the **Editor** role — it allows creating,
editing, and publishing content but not changing schemas, billing, or members.

## Day-to-day use

Editors work in the Studio and press **Publish**. Nothing else is needed.

| Section | What it controls |
|---|---|
| News | The list on `/news`. Add, edit, reorder, delete. |
| Publications | The list on `/publications`. |
| Team | Leadership and Advisors on `/about`, split by the **Section** field. |
| Home / Science / Pipeline / About / Contact / News / Publications page | All copy on that page — headings, intro paragraphs, cards, CTAs. |
| Site settings | Footer tagline, footer disclaimer, and the contact form's destination email. |

The page entries are single documents, not lists, so there is no way to
accidentally create a second "Home page".

Any field left blank falls back to the copy shipped in `app/content/pages.ts`,
so clearing a field never leaves a blank heading on the live site.

Headings marked "line breaks allowed" render each new line as a line break.

**Display order** on each document controls sequence — lower numbers first.
Leave it blank to use the default (news and publications by newest, team by name).

Portraits: uploading an image replaces the file shipped with the site. Until
someone uploads one, the built-in `/team/*.png` is used.

## Changing the content model

Edit `schemas/index.ts`, then restart `npm run dev` here. If you add a field the
site should display, it also needs adding to the GROQ query in
`app/lib/content.ts` — the query selects fields explicitly, so a new field will
not appear on the site until it is listed there.
