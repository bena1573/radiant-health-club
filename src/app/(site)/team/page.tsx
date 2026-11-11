import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { teamIntro } from "@/content/team";
import { getTeam } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Team", description: "Meet the coaches, therapists and hosts at Radiant Health Club.", alternates: { canonical: "/team" } };

const ORDER = ["Leadership", "Trainer", "Therapist", "Front of house"];
const LABELS: Record<string, string> = { Leadership: "Leadership", Trainer: "Trainers", Therapist: "Therapists", "Front of house": "Front of house" };

/** TEAM overview, grouped by role. Groups with no members are hidden. */
export default async function TeamPage() {
  const team = await getTeam();
  const groups = ORDER.filter((g) => team.some((t) => t.group === g));
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Team", path: "/team" }]} />
      <PageHero label="Team" title={teamIntro.title} intro={teamIntro.text} />
      {groups.map((g, gi) => (
        <Section key={g} surface={gi % 2 ? "sand" : "ivory"} labelledBy={`group-${gi}`}>
          <h2 id={`group-${gi}`} className="text-h2">{LABELS[g]}</h2>
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.filter((t) => t.group === g).map((m) => (
              <li key={m.slug}>
                <Link href={`/team/${m.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden"><Photo src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-5 text-h3 transition-colors group-hover:text-champagne-600">{m.name}</h3>
                  <p className="text-sm text-stone-500">{m.role}</p>
                  {m.specialties.length > 0 && <p className="mt-1 text-sm text-champagne-600">{m.specialties.join(", ")}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <CtaBand title="Meet us in person." />
    </>
  );
}
