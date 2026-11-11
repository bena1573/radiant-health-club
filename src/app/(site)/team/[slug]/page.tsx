import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getTeam, getTeamMember } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getTeam()).map((t) => ({ slug: t.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = await getTeamMember((await params).slug);
  if (!m) return {};
  const description = `${m.name}, ${m.role} at Radiant Health Club.`;
  return { title: m.name, description, alternates: { canonical: `/team/${m.slug}` }, openGraph: { title: m.name, description, images: [{ url: m.photo.src, alt: m.photo.alt }] } };
}

/** TEAM MEMBER profile. */
export default async function TeamMemberPage({ params }: Props) {
  const m = await getTeamMember((await params).slug);
  if (!m) notFound();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Team", path: "/team" }, { name: m.name, path: `/team/${m.slug}` }]} />
      <PageHero label={m.group} title={m.name} intro={m.role} />
      <Section surface="ivory" labelledBy="bio-title">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="relative aspect-[3/4] lg:col-span-4"><Photo src={m.photo.src} alt={m.photo.alt} fill preload sizes="(min-width: 1024px) 33vw, 100vw" /></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="bio-title" className="sr-only">Biography</h2>
            <RichText body={m.body} paragraphs={m.paragraphs} />
            {m.specialties.length > 0 && (<><h3 className="mt-12 text-h3">Specialties</h3><ul className="mt-4 flex flex-wrap gap-2">{m.specialties.map((s) => <li key={s} className="border border-stone-300 px-4 py-1.5 text-sm text-stone-500">{s}</li>)}</ul></>)}
            {m.credentials.length > 0 && (<><h3 className="mt-12 text-h3">Qualifications</h3><ul className="mt-4 list-disc space-y-1 pl-5 text-stone-500">{m.credentials.map((c) => <li key={c}>{c}</li>)}</ul></>)}
            <Button href="/team" variant="text" tone="light" className="mt-12">All team members</Button>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
