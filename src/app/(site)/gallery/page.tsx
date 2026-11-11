import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getGallery } from "@/sanity/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Gallery", description: "Photos and films from Radiant Health Club in Addis Ababa.", alternates: { canonical: "/gallery" } };

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Gallery", path: "/gallery" }]} />
      <PageHero label="Gallery" title="A look inside." intro="The spaces, the rituals and the people." />
      <Section surface="ivory" labelledBy="gallery-title" wide>
        <h2 id="gallery-title" className="sr-only">Photos and films</h2>
        <GalleryGrid items={items} />
        <div className="mt-16 text-center"><Button href={siteConfig.social.instagram} variant="secondary" tone="light">Follow us on Instagram</Button></div>
      </Section>
    </>
  );
}
