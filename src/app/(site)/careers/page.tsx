import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RichText } from "@/components/ui/RichText";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { careersIntro, careersValues } from "@/content/careers";
import { getJobs } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Careers", description: "Join the team at Radiant Health Club in Addis Ababa. See open roles or introduce yourself.", alternates: { canonical: "/careers" } };

/** CAREERS: culture, open roles from Sanity (or an "introduce yourself" state), and an application form with CV upload. */
export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Careers", path: "/careers" }]} />
      <PageHero label="Careers" title={careersIntro.title} intro={careersIntro.text} />

      <Section surface="ivory" labelledBy="culture-title">
        <SectionHeader id="culture-title" label="Our culture" title="What it is like to work here." />
        <ul className="mt-14 grid gap-10 md:grid-cols-3">{careersValues.map((v) => <li key={v.title} className="border-t border-stone-300 pt-8"><h3 className="text-h3">{v.title}</h3><p className="mt-3 text-stone-500">{v.text}</p></li>)}</ul>
      </Section>

      <Section surface="sand" labelledBy="roles-title">
        <SectionHeader id="roles-title" label="Open roles" title={jobs.length ? "Current opportunities." : "No open roles right now."} intro={jobs.length ? undefined : "We are always glad to meet talented people. Introduce yourself below and we will keep you in mind."} />
        {jobs.length > 0 && (
          <ul className="mt-12 divide-y divide-stone-300 border-y border-stone-300">
            {jobs.map((j) => (
              <li key={j.slug}>
                <details className="group py-2">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
                    <span><span className="block font-serif text-h3 font-light">{j.title}</span><span className="text-sm text-stone-500">{[j.department, j.employmentType].filter(Boolean).join(", ")}</span></span>
                    <span aria-hidden className="text-champagne-600 transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-6"><RichText body={j.body} paragraphs={j.paragraphs} /></div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section surface="ivory" labelledBy="apply-title" id="apply">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeader id="apply-title" label="Apply" title="Introduce yourself." intro="Tell us a little about you and attach your CV." /></div>
          <div className="lg:col-span-7 lg:col-start-6"><ApplicationForm positions={jobs.map((j) => j.title)} /></div>
        </div>
      </Section>
    </>
  );
}
