import { siteConfig } from "@/config/site";
import { JsonLd } from "./JsonLd";

/** BreadcrumbList structured data. `items` are in order, starting below Home. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${siteConfig.url}${it.path === "/" ? "" : it.path}` })),
      }}
    />
  );
}