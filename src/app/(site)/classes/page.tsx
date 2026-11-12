import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { ScheduleBoard } from "@/components/classes/ScheduleBoard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { classesIntro, groupFitness, personalTraining } from "@/content/classes";
import { getClasses, getSessions } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Classes and Programs",
  description: "Small-group classes, personal training and a weekly schedule at Radiant Health Club in Addis Ababa. Reserve your place online.",
  alternates: { canonical: "/classes" },
};

export default async function ClassesPage() {
  const [classes, sessions] = await Promise.all([getClasses(), getSessions()]);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Classes and Programs", path: "/classes" }]} />
      <PageHero label="Classes and Programs" title={classesIntro.title} intro={classesIntro.text} />
      <Section surface="ivory" labelledBy="schedule-title" id="schedule">
        <SectionHeader id="schedule-title" title="The weekly schedule." intro="Choose a class to reserve your place. Our team will confirm by email." />
        <div className="mt-12"><ScheduleBoard sessions={sessions} /></div>
      </Section>
      <Section surface="sand" labelledBy="types-title">
        <SectionHeader id="types-title" label="Class types" title="Find the practice that suits you." />
        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((c) => (
            <li key={c.slug}>
              <Link href={`/classes/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" />
                </div>
                <p className="mt-6 text-sm text-champagne-600">{[c.category, c.level, c.durationMinutes && `${c.durationMinutes} min`].filter(Boolean).join(", ")}</p>
                <h3 className="mt-2 text-h3 transition-colors duration-500 group-hover:text-champagne-600">{c.title}</h3>
                <p className="mt-3 max-w-[40ch] text-stone-500">{c.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Reserve your place." text="Choose a class and send a request. Our team will confirm by email." />
    </>
  );
}