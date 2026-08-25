import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

// Filled in by `npx sanity init` — must match app/lib/sanity.ts on the site side.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "elymus",
  title: "Elymus",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
