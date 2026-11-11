import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/dates";
import { getPost, getPosts } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getPost((await params).slug);
  if (!d) return {};
  const p = d.post;
  return { title: p.title, description: p.excerpt, alternates: { canonical: `/journal/${p.slug}` }, openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.publishedAt, images: [{ url: p.cover.src, alt: p.cover.alt }] } };
}

/** JOURNAL ARTICLE: header, cover, body, related reading. Includes Article structured data. */
export default async function ArticlePage({ params }: Props) {
  const d = await getPost((await params).slug);
  if (!d) notFound();
  const { post: p, related } = d;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Journal", path: "/journal" }, { name: p.title, path: `/journal/${p.slug}` }]} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, image: [p.cover.src], ...(p.publishedAt ? { datePublished: p.publishedAt } : {}), author: { "@type": p.author ? "Person" : "Organization", name: p.author ?? siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name } }} />

      <header className="bg-ink-950 pb-16 pt-40 text-ivory-50 md:pt-48">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <p className="text-label uppercase text-champagne-400">{p.category ?? "Journal"}</p>
          <h1 className="mt-5 text-h1">{p.title}</h1>
          <p className="mt-6 text-stone-300">{[p.author && `By ${p.author}`, formatDate(p.publishedAt)].filter(Boolean).join(", ")}</p>
        </div>
      </header>

      <article className="bg-ivory-50 pb-20 md:pb-32">
        <div className="mx-auto max-w-wide px-5 md:px-10 lg:px-16">
          <div className="relative -mt-8 aspect-[16/9] md:-mt-12"><Photo src={p.cover.src} alt={p.cover.alt} fill preload sizes="100vw" /></div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl px-5 md:px-10"><RichText body={p.body} paragraphs={p.paragraphs} /></div>
      </article>

      {related.length > 0 && (
        <Section surface="sand" labelledBy="related-title">
          <h2 id="related-title" className="text-h2">Keep reading</h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/journal/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden"><Photo src={r.cover.src} alt={r.cover.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-5 text-h3 transition-colors group-hover:text-champagne-600">{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
