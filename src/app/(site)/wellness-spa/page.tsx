import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { spaIntro, spaJourney } from "@/content/spa";
import { getTreatments } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Wellness and Spa",
  description: "Moroccan bath, massage and restorative rituals at Radiant Health Club in Addis Ababa.",
  alternates: { canonical: "/wellness-spa" },
};

/** WELLNESS AND SPA overview: signature experience, treatment menu by category, the spa journey. */
export default async function SpaPage() {
  const treatments = await getTreatments();
  const signature = treatments.find((t) => t.isSignature) ?? treatments[0];
  const categories = Array.from(new Set(treatments.map((t) => t.category)));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Wellness and Spa", path: "/wellness-spa" }]} />
      <PageHero label="Wellness and Spa" title={spaIntro.title} intro={spaIntro.text} image={spaIntro.hero} />

      {signature && (
        <Section surface="ivory" labelledBy="signature-title">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="relative aspect-[4/5] lg:col-span-5"><Photo src={signature.image.src} alt={signature.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" /></div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeader id="signature-title" label="Signature experience" title={signature.title} intro={signature.summary} />
              <Button href={`/wellness-spa/${signature.slug}`} variant="secondary" tone="light" className="mt-10">Discover the experience</Button>
            </div>
          </div>
        </Section>
      )}

      <Section surface="sand" labelledBy="menu-title">
        <SectionHeader id="menu-title" label="Treatment menu" title="Choose your ritual." intro="Our team will help you choose. Contact us for availability and rates." />
        <div className="mt-16 space-y-20">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="border-b border-ink-950 pb-4 text-h3">{cat}</h3>
              <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {treatments.filter((t) => t.category === cat).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/wellness-spa/${t.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden"><Photo src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                      <h4 className="mt-5 font-serif text-h3 font-light transition-colors duration-500 group-hover:text-champagne-600">{t.title}</h4>
                      {t.durationMinutes && <p className="mt-1 text-sm text-champagne-600">{t.durationMinutes} minutes</p>}
                      <p className="mt-3 max-w-[38ch] text-stone-500">{t.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="ink" labelledBy="journey-title">
        <SectionHeader id="journey-title" tone="dark" label="The spa journey" title="Unhurried from start to finish." />
        <ol className="mt-14 grid gap-12 md:grid-cols-4 md:gap-8">
          {spaJourney.map((s, i) => (
            <li key={s.title} className="border-t border-ink-700 pt-8">
              <p aria-hidden className="font-serif text-h2 font-light text-champagne-400">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-3 text-stone-300">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand title="Reserve your time." text="Contact us to arrange a treatment, or book a tour of the spa." primary={{ label: "Enquire about treatments", href: "/contact" }} secondary={{ label: "Book a Tour", href: "/book-a-tour" }} />
    </>
  );
}
