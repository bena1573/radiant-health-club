import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pillars } from "@/content/home";

/** HOME / 4. Experience pillars: text only, separated by hairlines. Not a sequence, so no numbering. */
export function Pillars() {
  return (
    <Section labelledBy="pillars-title" surface="ivory">
      <SectionHeader id="pillars-title" label="The experience" title="Three things we do well." />
      <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
        {pillars.map((p) => (
          <li key={p.title} className="border-t border-stone-300 pt-8">
            <h3 className="text-h3">{p.title}</h3>
            <p className="mt-4 max-w-[34ch] text-stone-500">{p.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
