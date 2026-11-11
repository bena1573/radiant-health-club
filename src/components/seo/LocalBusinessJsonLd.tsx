import { siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";
import { JsonLd } from "./JsonLd";

/**
 * Local-business structured data (HealthClub). Fields that are still placeholders
 * are omitted, so nothing false or unfinished reaches search engines.
 */
export function LocalBusinessJsonLd() {
  const { contact } = siteConfig;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["HealthClub", "LocalBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: Object.values(siteConfig.social),
    address: {
      "@type": "PostalAddress",
      ...(isPlaceholder(contact.address) ? {} : { streetAddress: contact.address }),
      addressLocality: contact.city,
      addressCountry: "ET",
    },
  };
  if (!isPlaceholder(contact.phone)) data.telephone = contact.phone;
  if (!isPlaceholder(contact.email)) data.email = contact.email;
  if (contact.geo.lat !== null && contact.geo.lng !== null) {
    data.geo = { "@type": "GeoCoordinates", latitude: contact.geo.lat, longitude: contact.geo.lng };
  }
  return <JsonLd data={data} />;
}
