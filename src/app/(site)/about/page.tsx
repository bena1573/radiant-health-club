import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { about } from "@/content/about";
import { getTeam } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The philosophy and people behind Radiant Health Club in Addis Ababa.",
  alternates: { canonical: "/about" },
};

/** ABOUT / OUR STORY: story, principles, history, leadership. */
export default async function AboutPage() {
  const team = await getTeam();
  const leaders = (team.filter((t) => t.group === "Leadership").length ? team.filter((t) => t.group === "Leadership") : team).slice(0, 3);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Our Story", path: "/about" }]} />
      <PageHero label="About" title={about.title} intro={about.text} image={about.hero} />

      <Section surface="ivory" labelledBy="story-title">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="story-title" className="sr-only">Our story</h2>
            <div className="max-w-[58ch] space-y-6 text-lead text-stone-500">{about.story.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <div className="relative aspect-[4/5] lg:col-span-5 lg:col-start-8"><Photo src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" /></div>
        </div>
      </Section>

      <Section surface="ink" labelledBy="philosophy-title">
        <SectionHeader id="philosophy-title" tone="dark" label="Philosophy" title="What we believe." />
        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {about.principles.map((p) => (
            <li key={p.title} className="border-t border-ink-700 pt-8"><h3 className="text-h3">{p.title}</h3><p className="mt-4 max-w-[34ch] text-stone-300">{p.text}</p></li>
          ))}
        </ul>
      </Section>

      <Section surface="ivory" labelledBy="history-title">
        <SectionHeader id="history-title" label="History" title="How we got here." />
        <ol className="mt-14 divide-y divide-stone-300 border-y border-stone-300">
          {about.timeline.map((t, i) => (
            <li key={i} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr]"><p className="font-serif text-h3 font-light text-champagne-600">{t.year}</p><p className="text-stone-500">{t.text}</p></li>
          ))}
        </ol>
      </Section>

      <Section surface="sand" labelledBy="leadership-title">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader id="leadership-title" label="Leadership" title="The team behind Radiant." />
          <Button href="/team" variant="text" tone="light">Meet the whole team</Button>
        </div>
        <ul className="mt-14 grid gap-10 sm:grid-cols-3">
          {leaders.map((m) => (
            <li key={m.slug}>
              <Link href={`/team/${m.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden"><Photo src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                <h3 className="mt-5 text-h3">{m.name}</h3><p className="text-sm text-stone-500">{m.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
