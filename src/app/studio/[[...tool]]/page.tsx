import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export { metadata, viewport } from "next-sanity/studio";

/** Sanity Studio at /studio. Excluded from the sitemap and robots.txt. */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
