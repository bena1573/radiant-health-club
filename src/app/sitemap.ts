import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { staticRoutes } from "@/lib/routes";
import { sanityFetch } from "@/sanity/lib/fetch";

type Slug = { slug: string; _updatedAt: string };

/** sitemap.xml: static routes plus every published document that has its own page. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const groups: [string, string][] = [
    ["post", "/journal"],
    ["classType", "/classes"],
    ["facility", "/facilities"],
    ["treatment", "/wellness-spa"],
    ["teamMember", "/team"],
  ];

  const dynamic = await Promise.all(
    groups.map(async ([type, prefix]) => {
      const docs = await sanityFetch<Slug[]>(
        `*[_type == $type && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
        { type },
      );
      return docs.map((d) => ({ url: `${base}${prefix}/${d.slug}`, lastModified: d._updatedAt }));
    }),
  );

  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path === "/" ? "" : path}`, lastModified: new Date() })),
    ...dynamic.flat(),
  ];
}
