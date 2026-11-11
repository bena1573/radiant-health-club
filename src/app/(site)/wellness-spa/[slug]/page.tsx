import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getTreatment, getTreatments } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTreatments()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getTreatment((await params).slug);
  if (!d) return {};
  const t = d.treatment;
  return { title: t.title, description: t.summary, alternates: { canonical: `/wellness-spa/${t.slug}` }, openGraph: { title: t.title, description: t.summary, images: [{ url: t.image.src, alt: t.image.alt }] } };
}

/** TREATMENT detail. Prices are not published; the CTA is an enquiry. */
export default async function TreatmentPage({ params }: Props) {
  const d = await getTreatment((await params).slug);
  if (!d) notFound();
  const { treatment: t, related } = d;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Wellness and Spa", path: "/wellness-spa" }, { name: t.title, path: `/wellness-spa/${t.slug}` }]} />
      <PageHero label={t.category} title={t.title} intro={t.summary} image={t.image} />
      <Section surface="ivory" labelledBy="about-treatment">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7"><h2 id="about-treatment" className="sr-only">About this treatment</h2><RichText body={t.body} paragraphs={t.paragraphs} /></div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-stone-300 border-y border-stone-300">
              <div className="flex justify-between gap-6 py-3"><dt className="text-stone-500">Category</dt><dd>{t.category}</dd></div>
              {t.durationMinutes && <div className="flex justify-between gap-6 py-3"><dt className="text-stone-500">Duration</dt><dd>{t.durationMinutes} minutes</dd></div>}
              <div className="flex justify-between gap-6 py-3"><dt className="text-stone-500">Rates</dt><dd>On enquiry</dd></div>
            </dl>
          </aside>
        </div>
      </Section>
      {related.length > 0 && (
        <Section surface="sand" labelledBy="related-title">
          <h2 id="related-title" className="text-h2">You may also like</h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/wellness-spa/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden"><Photo src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-5 text-h3 transition-colors group-hover:text-champagne-600">{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand title={`Reserve ${t.title.toLowerCase()}.`} text="Contact us to arrange your treatment." primary={{ label: "Enquire", href: "/contact" }} />
    </>
  );
}
