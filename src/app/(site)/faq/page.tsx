import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getFaqs } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "FAQ", description: "Answers to common questions about membership, classes, the spa and facilities at Radiant Health Club.", alternates: { canonical: "/faq" } };

const ORDER = ["Membership", "Classes", "Spa", "Facilities", "Policies", "General"];

/** FAQ: grouped accordions with FAQPage structured data. Empty groups are hidden. */
export default async function FaqPage() {
  const faqs = await getFaqs();
  const groups = ORDER.filter((g) => faqs.some((f) => f.group === g));
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "FAQ", path: "/faq" }]} />
      <FaqJsonLd items={faqs} />
      <PageHero label="FAQ" title="Questions, answered." intro="Can't find what you need? Our team is happy to help." />
      <Section surface="ivory" labelledBy="faq-groups">
        <h2 id="faq-groups" className="sr-only">Frequently asked questions</h2>
        <div className="space-y-20">
          {groups.map((g) => (
            <div key={g} className="grid gap-8 lg:grid-cols-12">
              <h3 className="text-h2 lg:col-span-4">{g}</h3>
              <div className="lg:col-span-8"><Accordion items={faqs.filter((f) => f.group === g)} /></div>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand title="Still have a question?" text="Get in touch and we will be glad to help." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Book a Tour", href: "/book-a-tour" }} />
    </>
  );
}
