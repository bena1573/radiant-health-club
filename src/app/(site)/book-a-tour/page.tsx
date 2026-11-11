import type { Metadata } from "next";
import Script from "next/script";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Book a Tour", description: "Book a private tour of Radiant Health Club in Addis Ababa. Choose a time that suits you.", alternates: { canonical: "/book-a-tour" } };

const expect = ["A private walk through every space", "A conversation about your goals", "Time to ask anything you like", "No obligation"];

/**
 * BOOK A TOUR: Calendly inline embed (URL lives in siteConfig.calendlyUrl).
 * The widget script loads lazily, and a plain link is always available as a fallback.
 * Calendly is a third party: it is named in the Privacy Policy.
 */
export default function BookATourPage() {
  const url = `${siteConfig.calendlyUrl}?hide_gdpr_banner=1&background_color=f8f4ec&text_color=0d0c0a&primary_color=8c6d32`;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Book a Tour", path: "/book-a-tour" }]} />
      <PageHero label="Visit" title="Book a private tour." intro="See the club, meet the team and ask us anything. Choose a time below." />
      <Section surface="ivory" labelledBy="tour-title">
        <div className="grid gap-14 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <SectionHeader id="tour-title" label="Your visit" title="What to expect." />
            <ul className="mt-8 divide-y divide-stone-300 border-y border-stone-300">{expect.map((e) => <li key={e} className="py-3 text-stone-500">{e}</li>)}</ul>
            <p className="mt-8 text-sm text-stone-500">Prefer to talk first? <a className="text-champagne-600 underline underline-offset-4 hover:text-ink-950" href="/contact?topic=Membership">Send us a message</a>.</p>
          </aside>
          <div className="lg:col-span-8">
            <div className="calendly-inline-widget" data-url={url} style={{ minWidth: 320, height: 720 }} />
            <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
            <noscript><p className="text-stone-500">The calendar needs JavaScript. Please <a className="underline" href={siteConfig.calendlyUrl}>open the booking page</a>.</p></noscript>
            <p className="mt-6 text-sm text-stone-500">Calendar not showing? <a className="text-champagne-600 underline underline-offset-4 hover:text-ink-950" href={siteConfig.calendlyUrl} target="_blank" rel="noopener noreferrer">Open it in a new tab<span className="sr-only"> (opens in a new tab)</span></a>.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
