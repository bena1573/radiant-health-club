import { JsonLd } from "./JsonLd";

/** FAQPage structured data. Items still containing a [PLACEHOLDER] answer are left out. */
export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const real = items.filter((i) => !i.answer.includes("[PLACEHOLDER"));
  if (!real.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: real.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
      }}
    />
  );
}