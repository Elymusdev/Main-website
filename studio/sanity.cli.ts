import { defineCliConfig } from "sanity/cli";

// Project ID and dataset are public values; env vars allow overriding per machine.
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? "2hp0kt0w",
    dataset: process.env.SANITY_STUDIO_DATASET ?? "production",
  },
  // Hosted Studio subdomain: https://elymus.sanity.studio
  studioHost: "elymus",
  // Pins the hosted application so redeploys don't prompt for an app id.
  deployment: {
    appId: "jxir4sl8ws9rzkqt8swlkmvl",
  },
});
