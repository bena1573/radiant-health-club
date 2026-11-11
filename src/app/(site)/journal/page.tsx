import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { journalIntro } from "@/content/journal";
import { getPosts } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Journal", description: "Notes on training, recovery and living well from Radiant Health Club.", alternates: { canonical: "/journal" } };

export default async function JournalPage() {
  const posts = await getPosts();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Journal", path: "/journal" }]} />
      <PageHero label="Journal" title={journalIntro.title} intro={journalIntro.text} />
      <Section surface="ivory" labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">Articles</h2>
        <JournalGrid posts={posts} />
      </Section>
    </>
  );
}
