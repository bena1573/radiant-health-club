import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import type { JournalCard } from "@/content/home";

const formatDate = (iso?: string) =>
  iso ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso)) : undefined;

/** HOME / 8. Journal preview: latest three posts (Sanity, with placeholder fallback). */
export function JournalPreview({ posts }: { posts: JournalCard[] }) {
  return (
    <Section surface="sand" labelledBy="journal-title">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeader id="journal-title" label="The journal" title="Notes on training, recovery and living well." />
        <Button href="/journal" variant="text" tone="light">Read the journal</Button>
      </div>
      <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/journal/${p.slug}`} className="group block">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Photo src={p.image} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" />
              </div>
              <p className="mt-6 text-sm text-champagne-600">{[p.category, formatDate(p.date)].filter(Boolean).join(", ")}</p>
              <h3 className="mt-2 text-h3 transition-colors duration-500 group-hover:text-champagne-600">{p.title}</h3>
              <p className="mt-3 max-w-[40ch] text-stone-500">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
