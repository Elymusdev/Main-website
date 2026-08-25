import { defineCliConfig } from "sanity/cli";

// Project ID and dataset are public values; env vars allow overriding per machine.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "2hp0kt0w",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
});
