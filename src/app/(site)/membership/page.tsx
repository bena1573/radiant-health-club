import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand } from "@/components/ui/CtaBand";
import { ComparisonTable } from "@/components/membership/ComparisonTable";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { joiningSteps, membershipIntro } from "@/content/membership";
import { getFaqs, getTiers } from "@/sanity/lib/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Membership",
  description: "Membership at Radiant Health Club in Addis Ababa: choose your level of access and contact us for rates.",
  alternates: { canonical: "/membership" },
};

/** MEMBERSHIP: tiers, comparison, corporate panel, joining steps, FAQ. Prices are not published. */
export default async function MembershipPage() {
  const [tiers, faqs] = await Promise.all([getTiers(), getFaqs("Membership")]);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Membership", path: "/membership" }]} />
      <FaqJsonLd items={faqs} />
      <PageHero label="Membership" title={membershipIntro.title} intro={membershipIntro.text} />

      <Section surface="ivory" labelledBy="tiers-title">
        <h2 id="tiers-title" className="sr-only">Membership levels</h2>
        <ul className="grid gap-px bg-stone-300 md:grid-cols-3">
          {tiers.map((t) => (
            <li key={t.name} className={cn("flex flex-col p-8 md:p-10", t.featured ? "bg-ink-950 text-ivory-50" : "bg-ivory-50")}>
              <h3 className="text-h2">{t.name}</h3>
              {t.featured && <p className="mt-2 text-label uppercase text-champagne-400">Most popular</p>}
              <p className={cn("mt-5", t.featured ? "text-stone-300" : "text-stone-500")}>{t.text}</p>
              <Button href={siteConfig.pricingCta.href} variant={t.featured ? "primary" : "secondary"} tone={t.featured ? "dark" : "light"} className="mt-10 self-start">
                {t.ctaLabel ?? siteConfig.pricingCta.label}
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="sand" labelledBy="compare-title">
        <SectionHeader id="compare-title" label="Compare" title="What each membership includes." />
        <div className="mt-14"><ComparisonTable tiers={tiers} /></div>
      </Section>

      <Section surface="ink" labelledBy="corporate-title">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeader id="corporate-title" tone="dark" label="Corporate" title="Memberships for teams and organisations." intro="Arrangements tailored to your people, your schedules and your goals." />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Button href="/membership/corporate" variant="secondary" size="lg">Explore corporate membership</Button>
          </div>
        </div>
      </Section>

      <Section surface="ivory" labelledBy="process-title">
        <SectionHeader id="process-title" label="Joining" title="Three simple steps." />
        {/* A real sequence, so numbering is meaningful here. */}
        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {joiningSteps.map((s, i) => (
            <li key={s.title} className="border-t border-stone-300 pt-8">
              <p className="font-serif text-h2 font-light text-champagne-600" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-3 max-w-[34ch] text-stone-500">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="sand" labelledBy="faq-title">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeader id="faq-title" label="Questions" title="Membership FAQ." /></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Accordion items={faqs} />
            <p className="mt-8 text-sm text-stone-500">More questions? <Link href="/faq" className="text-champagne-600 underline underline-offset-4 hover:text-ink-950">See all FAQs</Link>.</p>
          </div>
        </div>
      </Section>

      <CtaBand title="See the club, then decide." text="Book a private tour. There is no obligation." />
    </>
  );
}
