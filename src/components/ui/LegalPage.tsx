import { Section } from "./Section";
import { PageHero } from "./PageHero";
import { LEGAL_IS_DRAFT, legalUpdated } from "@/content/legal";

export function LegalPage({ title, sections }: { title: string; sections: { heading: string; paragraphs: string[] }[] }) {
  return (
    <>
      <PageHero label="Legal" title={title} intro={`Last updated: ${legalUpdated}`} />
      <Section surface="ivory" labelledBy="legal-body">
        <h2 id="legal-body" className="sr-only">{title}</h2>
        <div className="mx-auto max-w-3xl">
          {LEGAL_IS_DRAFT && (
            <p role="note" className="mb-12 border border-error p-4 text-sm text-error">
              DRAFT: this text has not been reviewed by a lawyer and must not be relied on. Review and complete it, then set LEGAL_IS_DRAFT to false in src/content/legal.ts.
            </p>
          )}
          {sections.map((s) => (
            <section key={s.heading} className="mt-12 first:mt-0">
              <h3 className="text-h3">{s.heading}</h3>
              {s.paragraphs.map((p, i) => <p key={i} className="mt-4 text-stone-500">{p}</p>)}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}