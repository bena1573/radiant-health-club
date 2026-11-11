import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { facilities } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * HOME / 3. Featured facilities: an asymmetric, staggered grid (not identical cards).
 * Every second column drops down on desktop for an editorial rhythm.
 */
export function Facilities() {
  return (
    <Section surface="ink" labelledBy="facilities-title" wide>
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <SectionHeader id="facilities-title" tone="dark" label="The club" title="Spaces designed for focus and recovery." />
        <Button href="/facilities" variant="text" tone="dark">All facilities</Button>
      </div>

      <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-6">
        {facilities.map((f, i) => (
          <li key={f.slug} className={cn(i % 2 === 1 && "lg:mt-24")}>
            <Link href={`/facilities/${f.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-6 text-h3 transition-colors duration-500 group-hover:text-champagne-400">{f.title}</h3>
              <p className="mt-2 max-w-[32ch] text-sm text-stone-300">{f.text}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
