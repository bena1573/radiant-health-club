import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { facilitiesIntro } from "@/content/facilities";
import { getFacilities } from "@/sanity/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Explore the training floor, pool, studios, sauna and steam, and locker rooms at Radiant Health Club in Addis Ababa.",
  alternates: { canonical: "/facilities" },
};

export default async function FacilitiesPage() {
  const facilities = await getFacilities();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Facilities", path: "/facilities" }]} />
      <PageHero label="The club" title={facilitiesIntro.title} intro={facilitiesIntro.text} />
      <Section surface="ivory" labelledBy="spaces-title">
        <h2 id="spaces-title" className="sr-only">All facilities</h2>
        <ul className="space-y-24 md:space-y-36">
          {facilities.map((f, i) => (
            <li key={f.slug} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <Link href={`/facilities/${f.slug}`} className={cn("group relative block aspect-[4/3] overflow-hidden md:col-span-7", i % 2 === 1 && "md:order-2 md:col-span-6 md:col-start-7")} aria-label={`${f.title}: view details`}>
                <Photo src={f.hero.src} alt={f.hero.alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" />
              </Link>
              <div className={cn("md:col-span-5", i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-9 md:col-span-4")}>
                <h3 className="text-h2">{f.title}</h3>
                <p className="mt-5 max-w-[40ch] text-lead text-stone-500">{f.summary}</p>
                <Link href={`/facilities/${f.slug}`} className="mt-8 inline-block text-label uppercase text-champagne-600 underline underline-offset-8 transition-colors hover:text-ink-950">
                  Explore {f.title.toLowerCase()}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="See the spaces in person." />
    </>
  );
}