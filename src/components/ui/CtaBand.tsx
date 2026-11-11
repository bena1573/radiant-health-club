import { Section } from "./Section";
import { Button } from "./Button";

/** Compact closing call to action for inner pages. */
export function CtaBand({
  title = "Begin with a visit.",
  text = "Take a private tour of the club and meet the team. There is no obligation.",
  primary = { label: "Book a Tour", href: "/book-a-tour" },
  secondary = { label: "Contact us", href: "/contact" },
}: {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section surface="ink" labelledBy="cta-title" className="text-center">
      <h2 id="cta-title" className="mx-auto max-w-3xl text-h1">{title}</h2>
      <p className="mx-auto mt-6 max-w-xl text-lead text-ivory-50/80">{text}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href={primary.href} size="lg">{primary.label}</Button>
        <Button href={secondary.href} variant="secondary" size="lg">{secondary.label}</Button>
      </div>
    </Section>
  );
}