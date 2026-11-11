import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getTiers } from "@/sanity/lib/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * HOME / 6. Membership teaser: one panel, three columns divided by hairlines.
 * Prices are intentionally not shown; every tier links to "Contact us for rates".
 */
export async function MembershipTeaser() {
  const tiers = await getTiers();
  return (
    <Section surface="ink" labelledBy="membership-title">
      <SectionHeader
        id="membership-title"
        tone="dark"
        label="Membership"
        title="Membership, shaped around how you live."
        intro="Choose the level of access that suits your routine. Our team will guide you."
      />
      <ul className="mt-16 grid border border-ink-700 md:grid-cols-3">
        {tiers.map((t) => (
          <li
            key={t.name}
            className={cn(
              "flex flex-col p-8 md:p-10 not-first:border-t not-first:border-ink-700 md:not-first:border-l md:not-first:border-t-0",
              t.featured && "bg-ink-900",
            )}
          >
            <h3 className="text-h3">{t.name}</h3>
            {t.featured && <p className="mt-2 text-label uppercase text-champagne-400">Most popular</p>}
            <p className="mt-5 text-stone-300">{t.text}</p>
            <ul className="mt-6 space-y-2 text-sm text-stone-300">
              {t.features.map((f) => (
                <li key={f} className="flex gap-3"><span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-champagne-400" />{f}</li>
              ))}
            </ul>
            <Button href={siteConfig.pricingCta.href} variant="text" tone="dark" className="mt-10 self-start">
              {t.ctaLabel ?? siteConfig.pricingCta.label}
            </Button>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-stone-500">Looking for a company plan? <a className="text-champagne-400 underline underline-offset-4 hover:text-champagne-200" href="/membership/corporate">Explore corporate membership.</a></p>
    </Section>
  );
}
