import type { Metadata } from "next";
import "./globals.css";

const SITE_NAME = "Elymus";
const SITE_DESCRIPTION =
  "Elymus is advancing bottlebrush macromolecular science toward a powerful new class of muscle membrane therapeutics.";

export const metadata: Metadata = {
  // `template` lets each page export a short `title` and inherit the suffix.
  title: { default: "Elymus | Muscle membrane science", template: "%s | Elymus" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  other: { "codex-preview": "development" },
  icons: { icon: "/elymus-logo.png", shortcut: "/elymus-logo.png" },
  // No `images` yet: the only brand asset is a 1130x2048 portrait mark, which
  // social cards crop badly. Add a 1200x630 image here — plus `metadataBase`
  // set to the production origin, so the URL resolves absolutely — when one exists.
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Elymus | Muscle membrane science",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: "Elymus | Muscle membrane science",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
