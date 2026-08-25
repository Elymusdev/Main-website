import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { structure } from "./structure";
import { schemaTypes } from "./schemas";

// Must match SANITY_PROJECT_ID / SANITY_DATASET in app/lib/sanity.ts.
// Values come from studio/.env (written at setup); the fallback keeps CLI
// commands working if that file is missing.
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "2hp0kt0w";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "elymus",
  title: "Elymus",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
});
