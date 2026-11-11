import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getTestimonials } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Success Stories", description: "Members share their experience of Radiant Health Club in Addis Ababa.", alternates: { canonical: "/stories" } };

/** SUCCESS STORIES: one featured quote, then the rest. Only testimonials with confirmed consent are shown (see getTestimonials). */
export default async function StoriesPage() {
  const all = await getTestimonials();
  const [lead, ...rest] = [...all].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Success Stories", path: "/stories" }]} />
      <PageHero label="Success stories" title="In members' words." intro="The people who make Radiant what it is." />
      {lead && (
        <Section surface="ivory" labelledBy="featured-story">
          <h2 id="featured-story" className="sr-only">Featured story</h2>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-serif text-h1 font-light leading-tight">&ldquo;{lead.quote}&rdquo;</blockquote>
            <figcaption className="mt-8 text-stone-500"><span className="block text-ink-950">{lead.name}</span>{lead.detail}</figcaption>
          </figure>
        </Section>
      )}
      {rest.length > 0 && (
        <Section surface="sand" labelledBy="more-stories">
          <h2 id="more-stories" className="text-h2">More stories</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((t, i) => (
              <li key={i}>
                <figure className="border-t border-stone-300 pt-8">
                  <blockquote className="font-serif text-h3 font-light leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 text-sm text-stone-500"><span className="block text-ink-950">{t.name}</span>{t.detail}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand title="Write your own story." />
    </>
  );
}
