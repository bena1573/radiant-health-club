import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CorporateForm } from "@/components/membership/CorporateForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { corporateBenefits, corporateIntro } from "@/content/membership";

export const metadata: Metadata = {
  title: "Corporate Membership",
  description: "Corporate memberships at Radiant Health Club in Addis Ababa, tailored to your team. Send an enquiry.",
  alternates: { canonical: "/membership/corporate" },
};

/** CORPORATE MEMBERSHIP: benefits plus a real enquiry form (stored privately, emailed through Resend). */
export default function CorporatePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Membership", path: "/membership" }, { name: "Corporate", path: "/membership/corporate" }]} />
      <PageHero label="Corporate membership" title={corporateIntro.title} intro={corporateIntro.text} />

      <Section surface="ivory" labelledBy="benefits-title">
        <SectionHeader id="benefits-title" label="Why Radiant" title="Designed around your team." />
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {corporateBenefits.map((b) => (
            <li key={b.title} className="border-t border-stone-300 pt-8">
              <h3 className="text-h3">{b.title}</h3>
              <p className="mt-3 text-stone-500">{b.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="sand" labelledBy="enquiry-title" id="enquiry">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeader id="enquiry-title" label="Enquire" title="Tell us about your team." intro="Share a few details and a member of our team will be in touch to discuss options." />
          </div>
          <div className="lg:col-span-7 lg:col-start-6"><CorporateForm /></div>
        </div>
      </Section>
    </>
  );
}
