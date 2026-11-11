#!/usr/bin/env bash
# RAW INSTALL: no checks, no backups. Run from your project root: bash radiant-raw-install.sh

mkdir -p "src/app/(site)/about"
mkdir -p "src/app/(site)/book-a-tour"
mkdir -p "src/app/(site)/careers"
mkdir -p "src/app/(site)/contact"
mkdir -p "src/app/(site)/faq"
mkdir -p "src/app/(site)/gallery"
mkdir -p "src/app/(site)/journal/[slug]"
mkdir -p "src/app/(site)/membership/corporate"
mkdir -p "src/app/(site)/privacy"
mkdir -p "src/app/(site)/stories"
mkdir -p "src/app/(site)/team/[slug]"
mkdir -p "src/app/(site)/terms"
mkdir -p "src/app/(site)/wellness-spa/[slug]"
mkdir -p "src/app/api/careers"
mkdir -p "src/app/api/contact"
mkdir -p "src/app/api/corporate-enquiry"
mkdir -p "src/components/careers"
mkdir -p "src/components/contact"
mkdir -p "src/components/forms"
mkdir -p "src/components/gallery"
mkdir -p "src/components/home"
mkdir -p "src/components/journal"
mkdir -p "src/components/membership"
mkdir -p "src/components/seo"
mkdir -p "src/components/ui"
mkdir -p "src/config"
mkdir -p "src/content"
mkdir -p "src/lib"
mkdir -p "src/sanity/lib"
mkdir -p "src/sanity/schemaTypes"

cat << 'EOF' > "README.md"
# Radiant Health Club website

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Sanity. English only.

## Quick start

```bash
npm install
cp .env.example .env.local     # then fill in the Sanity values
npm run dev                    # http://localhost:3000
npm run build                  # production build
```

The site builds and runs **without** Sanity credentials (CMS-driven sections simply stay empty).

## Connect Sanity

1. Create a project at https://www.sanity.io/manage and note the **Project ID**.
2. Put it in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Under **API > CORS origins**, add `http://localhost:3000` and your production URL (allow credentials).
4. **Create a second dataset named `bookings` and set it to PRIVATE** (Manage > Datasets). Class-booking
   submissions contain names, emails and phone numbers and must never be publicly readable.
   Public site content stays in the `production` dataset.
5. Create an API token with **Editor** access (Manage > API > Tokens) and set `SANITY_API_WRITE_TOKEN`. Server-side only.
6. Open http://localhost:3000/studio. Choose **Content** to edit the site, or **Bookings (private)** to view requests.

## Email with Resend

1. Create a Resend account and an API key: `RESEND_API_KEY`.
2. Verify your sending domain in Resend, then set `BOOKING_FROM_EMAIL` (for example `Radiant Health Club <bookings@yourdomain.com>`).
   Until a domain is verified, Resend only lets `onboarding@resend.dev` email your own account address, so guest emails will fail in testing.
3. Set `BOOKING_NOTIFY_EMAIL` to the front-desk inbox that should receive new requests.
4. Booking flow: form -> `/api/class-booking` (validates, rate-limits, stores in the private dataset) -> confirmation to the guest + notification to the club.
   If storage is not configured the form shows an honest "temporarily unavailable" message instead of pretending to work.
   If email fails the booking is still saved and the `emailStatus` field records what happened.

## Project map

```
src/
  app/
    layout.tsx              Root layout: fonts, global CSS, default metadata
    globals.css             DESIGN TOKENS (colors, type scale, motion). Edit here.
    (site)/                 Public pages, wrapped in header + footer
    studio/[[...tool]]/     Sanity Studio at /studio
    sitemap.ts, robots.ts   SEO (sitemap includes Sanity documents)
    not-found.tsx           Branded 404
  components/
    ui/                     Button, Container, Section, SectionHeader
    layout/                 Header, Footer, Logo, SiteChrome
    motion/Reveal.tsx       Scroll reveal (respects reduced motion)
    seo/                    JSON-LD (HealthClub / LocalBusiness)
  config/site.ts            Business facts, nav, Calendly URL, pricing CTA
  lib/                      Helpers, route list
  sanity/                   Client, image builder, schemas, Studio structure
sanity.config.ts            Studio config
```

## Where to change things

| To change | Edit |
|---|---|
| Colors, type sizes, easing | `src/app/globals.css` (`@theme`) |
| Address, hours, phone, email | `src/config/site.ts` (every `[PLACEHOLDER]`) |
| Calendly link | `calendlyUrl` in `src/config/site.ts` |
| Navigation | `primaryNav`, `footerNav` in `src/config/site.ts` |
| Logo | `src/components/layout/Logo.tsx` (swap in the SVG) |
| New public route in sitemap | `src/lib/routes.ts` |

## Conventions

- One `h1` per page; every `Section` is labelled by its heading (`labelledBy`).
- All CTAs use `<Button>`. Pricing is never shown: use `siteConfig.pricingCta`.
- Placeholder facts are written `[PLACEHOLDER: ...]`; they are excluded from structured data automatically.
- Images come from Sanity via `urlFor()` and `next/image`; alt text is required in the CMS.

## Forms and where submissions go

| Form | Route | Stored in (private "bookings" dataset) |
|---|---|---|
| Class booking | `/api/class-booking` | `classBooking` |
| Corporate enquiry | `/api/corporate-enquiry` | `corporateEnquiry` |
| Contact | `/api/contact` | `contactMessage` |
| Job application (+ CV) | `/api/careers` | `jobApplication` (CV stored as a private file asset) |

All four share the same safeguards: same-origin check, size limit, rate limit, honeypot, server-side validation (zod),
private storage, then Resend emails (guest acknowledgement + front-desk notification). If storage is not configured they
return an honest "temporarily unavailable" message. They never fake success. CVs: PDF/DOC/DOCX, up to 4 MB, verified by file content.

## LAUNCH CHECKLIST (everything still placeholder)

1. **Real content:** replace every `[PLACEHOLDER: ...]` (grep for it). Business facts live in `src/config/site.ts`.
2. **Photography and video:** replace Unsplash URLs (`src/lib/images.ts`, then Sanity). Add the hero video URL in `src/content/home.ts`. Remove `images.unsplash.com` from `next.config.ts` when done.
3. **Logo:** swap the wordmark in `src/components/layout/Logo.tsx` for the SVG. Add a favicon and social share image (`src/app/icon.png`, `opengraph-image.png`).
4. **Legal:** have a lawyer review `src/content/legal.ts`, then set `LEGAL_IS_DRAFT = false`.
5. **Consent:** written consent for every testimonial, trainer photo and gallery image showing people.
6. **Email:** verify your domain in Resend, set `BOOKING_FROM_EMAIL` and `BOOKING_NOTIFY_EMAIL`, and send a real test of all four forms.
7. **Sanity:** create the private `bookings` dataset, set CORS origins for the production URL, and add the write token to your host's environment variables.
8. **Calendly:** replace `calendlyUrl` in `src/config/site.ts`.
9. **Map:** add the Google Maps embed URL (`mapsEmbedUrl`).
10. **Production URL:** set `NEXT_PUBLIC_SITE_URL` (used by sitemap, canonical URLs and structured data).
11. **Rate limiting:** add Upstash Redis or your host's WAF rules for the `/api/*` routes.
12. **Analytics and cookie notice:** not included. Choose a privacy-friendly analytics tool if wanted and update the Privacy Policy.
13. **Newsletter:** not included (needs a provider decision).
14. **Quality pass:** run Lighthouse and an accessibility check (axe) on the real content and photos, and test on real phones.
EOF
cat << 'EOF' > "sanity.config.ts"
"use client";

/**
 * SANITY STUDIO CONFIG: two workspaces, served from /studio (a chooser page).
 *  1. Content  (/studio/content)  the public dataset: pages, classes, team, journal...
 *  2. Bookings (/studio/bookings) a PRIVATE dataset for class-booking submissions.
 * Submissions contain personal data (names, emails, phones), so they are kept out of
 * the public dataset. See README, "Connect Sanity".
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, bookingsDataset, dataset, projectId } from "./src/sanity/env";
import { bookingSchemaTypes, schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const base = { projectId: projectId || "unconfigured" };

export default defineConfig([
  {
    ...base,
    name: "content",
    title: "Radiant: Content",
    basePath: "/studio/content",
    dataset,
    schema: { types: schemaTypes },
    plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  },
  {
    ...base,
    name: "bookings",
    title: "Radiant: Bookings (private)",
    basePath: "/studio/bookings",
    dataset: bookingsDataset,
    schema: { types: bookingSchemaTypes },
    plugins: [structureTool()],
  },
]);
EOF
cat << 'EOF' > "src/app/(site)/about/page.tsx"
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { about } from "@/content/about";
import { getTeam } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The philosophy and people behind Radiant Health Club in Addis Ababa.",
  alternates: { canonical: "/about" },
};

/** ABOUT / OUR STORY: story, principles, history, leadership. */
export default async function AboutPage() {
  const team = await getTeam();
  const leaders = (team.filter((t) => t.group === "Leadership").length ? team.filter((t) => t.group === "Leadership") : team).slice(0, 3);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Our Story", path: "/about" }]} />
      <PageHero label="About" title={about.title} intro={about.text} image={about.hero} />

      <Section surface="ivory" labelledBy="story-title">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="story-title" className="sr-only">Our story</h2>
            <div className="max-w-[58ch] space-y-6 text-lead text-stone-500">{about.story.map((p, i) => <p key={i}>{p}</p>)}</div>
          </div>
          <div className="relative aspect-[4/5] lg:col-span-5 lg:col-start-8"><Photo src={about.image.src} alt={about.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" /></div>
        </div>
      </Section>

      <Section surface="ink" labelledBy="philosophy-title">
        <SectionHeader id="philosophy-title" tone="dark" label="Philosophy" title="What we believe." />
        <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {about.principles.map((p) => (
            <li key={p.title} className="border-t border-ink-700 pt-8"><h3 className="text-h3">{p.title}</h3><p className="mt-4 max-w-[34ch] text-stone-300">{p.text}</p></li>
          ))}
        </ul>
      </Section>

      <Section surface="ivory" labelledBy="history-title">
        <SectionHeader id="history-title" label="History" title="How we got here." />
        <ol className="mt-14 divide-y divide-stone-300 border-y border-stone-300">
          {about.timeline.map((t, i) => (
            <li key={i} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr]"><p className="font-serif text-h3 font-light text-champagne-600">{t.year}</p><p className="text-stone-500">{t.text}</p></li>
          ))}
        </ol>
      </Section>

      <Section surface="sand" labelledBy="leadership-title">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader id="leadership-title" label="Leadership" title="The team behind Radiant." />
          <Button href="/team" variant="text" tone="light">Meet the whole team</Button>
        </div>
        <ul className="mt-14 grid gap-10 sm:grid-cols-3">
          {leaders.map((m) => (
            <li key={m.slug}>
              <Link href={`/team/${m.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden"><Photo src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 640px) 30vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                <h3 className="mt-5 text-h3">{m.name}</h3><p className="text-sm text-stone-500">{m.role}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/book-a-tour/page.tsx"
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
EOF
cat << 'EOF' > "src/app/(site)/careers/page.tsx"
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RichText } from "@/components/ui/RichText";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { careersIntro, careersValues } from "@/content/careers";
import { getJobs } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Careers", description: "Join the team at Radiant Health Club in Addis Ababa. See open roles or introduce yourself.", alternates: { canonical: "/careers" } };

/** CAREERS: culture, open roles from Sanity (or an "introduce yourself" state), and an application form with CV upload. */
export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Careers", path: "/careers" }]} />
      <PageHero label="Careers" title={careersIntro.title} intro={careersIntro.text} />

      <Section surface="ivory" labelledBy="culture-title">
        <SectionHeader id="culture-title" label="Our culture" title="What it is like to work here." />
        <ul className="mt-14 grid gap-10 md:grid-cols-3">{careersValues.map((v) => <li key={v.title} className="border-t border-stone-300 pt-8"><h3 className="text-h3">{v.title}</h3><p className="mt-3 text-stone-500">{v.text}</p></li>)}</ul>
      </Section>

      <Section surface="sand" labelledBy="roles-title">
        <SectionHeader id="roles-title" label="Open roles" title={jobs.length ? "Current opportunities." : "No open roles right now."} intro={jobs.length ? undefined : "We are always glad to meet talented people. Introduce yourself below and we will keep you in mind."} />
        {jobs.length > 0 && (
          <ul className="mt-12 divide-y divide-stone-300 border-y border-stone-300">
            {jobs.map((j) => (
              <li key={j.slug}>
                <details className="group py-2">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 marker:hidden [&::-webkit-details-marker]:hidden">
                    <span><span className="block font-serif text-h3 font-light">{j.title}</span><span className="text-sm text-stone-500">{[j.department, j.employmentType].filter(Boolean).join(", ")}</span></span>
                    <span aria-hidden className="text-champagne-600 transition-transform duration-500 group-open:rotate-45">+</span>
                  </summary>
                  <div className="pb-6"><RichText body={j.body} paragraphs={j.paragraphs} /></div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section surface="ivory" labelledBy="apply-title" id="apply">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeader id="apply-title" label="Apply" title="Introduce yourself." intro="Tell us a little about you and attach your CV." /></div>
          <div className="lg:col-span-7 lg:col-start-6"><ApplicationForm positions={jobs.map((j) => j.title)} /></div>
        </div>
      </Section>
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/contact/page.tsx"
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";

export const metadata: Metadata = { title: "Contact", description: "Contact Radiant Health Club in Addis Ababa: form, address, hours and directions.", alternates: { canonical: "/contact" } };

type Props = { searchParams: Promise<{ topic?: string }> };

/** CONTACT: form, details, hours and map. Unconfirmed facts render as [PLACEHOLDER] and are never turned into links. */
export default async function ContactPage({ searchParams }: Props) {
  const { topic } = await searchParams;
  const { contact, hours, social } = siteConfig;
  const wa = contact.whatsapp.replace(/\D/g, "");
  const mapReady = !isPlaceholder(contact.mapsEmbedUrl);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", path: "/contact" }]} />
      <PageHero label="Contact" title="We would love to hear from you." intro="Ask a question, arrange a treatment or plan your visit." />

      <Section surface="ivory" labelledBy="contact-form-title">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7"><h2 id="contact-form-title" className="sr-only">Send us a message</h2><ContactForm defaultTopic={topic} /></div>
          <aside className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div><h2 className="text-h3">Visit</h2><address className="mt-4 not-italic text-stone-500">{contact.address}<br />{contact.city}, {contact.country}</address>
              {!isPlaceholder(contact.mapsUrl) && <Button href={contact.mapsUrl} variant="text" tone="light" className="mt-3">Get directions</Button>}</div>
            <div><h2 className="text-h3">Hours</h2><dl className="mt-4 space-y-2 text-stone-500">{hours.map((h) => <div key={h.days}><dt className="text-ink-950">{h.days}</dt><dd>{h.time}</dd></div>)}</dl></div>
            <div><h2 className="text-h3">Reach us</h2>
              <ul className="mt-4 space-y-2 text-stone-500">
                <li>{isPlaceholder(contact.phone) ? contact.phone : <a className="hover:text-ink-950" href={`tel:${contact.phone}`}>{contact.phone}</a>}</li>
                <li>{isPlaceholder(contact.whatsapp) ? contact.whatsapp : <a className="hover:text-ink-950" href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>}</li>
                <li>{isPlaceholder(contact.email) ? contact.email : <a className="hover:text-ink-950" href={`mailto:${contact.email}`}>{contact.email}</a>}</li>
                <li><a className="text-champagne-600 underline underline-offset-4 hover:text-ink-950" href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram<span className="sr-only"> (opens in a new tab)</span></a></li>
              </ul></div>
          </aside>
        </div>
      </Section>

      <section aria-label="Map" className="bg-sand-100">
        <div className="mx-auto max-w-wide px-5 py-16 md:px-10 lg:px-16">
          {mapReady ? (
            <iframe title={`Map showing ${siteConfig.name}`} src={contact.mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[28rem] w-full border-0" />
          ) : (
            <div className="flex h-[22rem] items-center justify-center border border-stone-300 text-center text-stone-500">The map appears here once the club&rsquo;s address is confirmed.</div>
          )}
        </div>
      </section>
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/faq/page.tsx"
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
EOF
cat << 'EOF' > "src/app/(site)/gallery/page.tsx"
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getGallery } from "@/sanity/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Gallery", description: "Photos and films from Radiant Health Club in Addis Ababa.", alternates: { canonical: "/gallery" } };

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Gallery", path: "/gallery" }]} />
      <PageHero label="Gallery" title="A look inside." intro="The spaces, the rituals and the people." />
      <Section surface="ivory" labelledBy="gallery-title" wide>
        <h2 id="gallery-title" className="sr-only">Photos and films</h2>
        <GalleryGrid items={items} />
        <div className="mt-16 text-center"><Button href={siteConfig.social.instagram} variant="secondary" tone="light">Follow us on Instagram</Button></div>
      </Section>
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/journal/[slug]/page.tsx"
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/dates";
import { getPost, getPosts } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getPost((await params).slug);
  if (!d) return {};
  const p = d.post;
  return { title: p.title, description: p.excerpt, alternates: { canonical: `/journal/${p.slug}` }, openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.publishedAt, images: [{ url: p.cover.src, alt: p.cover.alt }] } };
}

/** JOURNAL ARTICLE: header, cover, body, related reading. Includes Article structured data. */
export default async function ArticlePage({ params }: Props) {
  const d = await getPost((await params).slug);
  if (!d) notFound();
  const { post: p, related } = d;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Journal", path: "/journal" }, { name: p.title, path: `/journal/${p.slug}` }]} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.excerpt, image: [p.cover.src], ...(p.publishedAt ? { datePublished: p.publishedAt } : {}), author: { "@type": p.author ? "Person" : "Organization", name: p.author ?? siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.name } }} />

      <header className="bg-ink-950 pb-16 pt-40 text-ivory-50 md:pt-48">
        <div className="mx-auto max-w-4xl px-5 md:px-10">
          <p className="text-label uppercase text-champagne-400">{p.category ?? "Journal"}</p>
          <h1 className="mt-5 text-h1">{p.title}</h1>
          <p className="mt-6 text-stone-300">{[p.author && `By ${p.author}`, formatDate(p.publishedAt)].filter(Boolean).join(", ")}</p>
        </div>
      </header>

      <article className="bg-ivory-50 pb-20 md:pb-32">
        <div className="mx-auto max-w-wide px-5 md:px-10 lg:px-16">
          <div className="relative -mt-8 aspect-[16/9] md:-mt-12"><Photo src={p.cover.src} alt={p.cover.alt} fill preload sizes="100vw" /></div>
        </div>
        <div className="mx-auto mt-16 max-w-3xl px-5 md:px-10"><RichText body={p.body} paragraphs={p.paragraphs} /></div>
      </article>

      {related.length > 0 && (
        <Section surface="sand" labelledBy="related-title">
          <h2 id="related-title" className="text-h2">Keep reading</h2>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/journal/${r.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden"><Photo src={r.cover.src} alt={r.cover.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-5 text-h3 transition-colors group-hover:text-champagne-600">{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/journal/page.tsx"
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { journalIntro } from "@/content/journal";
import { getPosts } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Journal", description: "Notes on training, recovery and living well from Radiant Health Club.", alternates: { canonical: "/journal" } };

export default async function JournalPage() {
  const posts = await getPosts();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Journal", path: "/journal" }]} />
      <PageHero label="Journal" title={journalIntro.title} intro={journalIntro.text} />
      <Section surface="ivory" labelledBy="articles-title">
        <h2 id="articles-title" className="sr-only">Articles</h2>
        <JournalGrid posts={posts} />
      </Section>
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/membership/corporate/page.tsx"
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
EOF
cat << 'EOF' > "src/app/(site)/membership/page.tsx"
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
EOF
cat << 'EOF' > "src/app/(site)/page.tsx"
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { Facilities } from "@/components/home/Facilities";
import { Pillars } from "@/components/home/Pillars";
import { SpaTeaser } from "@/components/home/SpaTeaser";
import { MembershipTeaser } from "@/components/home/MembershipTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { JournalPreview } from "@/components/home/JournalPreview";
import { ClosingCta } from "@/components/home/ClosingCta";
import { getLatestPosts } from "@/sanity/lib/queries";
import { getTestimonials } from "@/sanity/lib/content";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} | Private health club in Addis Ababa` },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

/**
 * HOME. Surface rhythm: ink hero, ivory intro, ink facilities, ivory pillars,
 * sand spa, ink membership, ivory testimonials, sand journal, ink closing CTA.
 */
export default async function HomePage() {
  const [posts, testimonials] = await Promise.all([getLatestPosts(3), getTestimonials()]);
  return (
    <>
      <Hero />
      <Intro />
      <Facilities />
      <Pillars />
      <SpaTeaser />
      <MembershipTeaser />
      <Testimonials items={testimonials} />
      <JournalPreview posts={posts} />
      <ClosingCta />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/privacy/page.tsx"
import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() { return <LegalPage title="Privacy Policy" sections={privacy} />; }
EOF
cat << 'EOF' > "src/app/(site)/stories/page.tsx"
import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getTestimonials } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Success Stories", description: "Members share their experience of Radiant Health Club in Addis Ababa.", alternates: { canonical: "/stories" } };

/** SUCCESS STORIES: one featured quote, then the rest. Only testimonials with confirmed consent are shown (see getTestimonials). */
export default async function StoriesPage() {
  const all = await getTestimonials();
  const [lead, ...rest] = [...all].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Success Stories", path: "/stories" }]} />
      <PageHero label="Success stories" title="In members' words." intro="The people who make Radiant what it is." />
      {lead && (
        <Section surface="ivory" labelledBy="featured-story">
          <h2 id="featured-story" className="sr-only">Featured story</h2>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-serif text-h1 font-light leading-tight">&ldquo;{lead.quote}&rdquo;</blockquote>
            <figcaption className="mt-8 text-stone-500"><span className="block text-ink-950">{lead.name}</span>{lead.detail}</figcaption>
          </figure>
        </Section>
      )}
      {rest.length > 0 && (
        <Section surface="sand" labelledBy="more-stories">
          <h2 id="more-stories" className="text-h2">More stories</h2>
          <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((t, i) => (
              <li key={i}>
                <figure className="border-t border-stone-300 pt-8">
                  <blockquote className="font-serif text-h3 font-light leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-6 text-sm text-stone-500"><span className="block text-ink-950">{t.name}</span>{t.detail}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand title="Write your own story." />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/team/[slug]/page.tsx"
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getTeam, getTeamMember } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getTeam()).map((t) => ({ slug: t.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const m = await getTeamMember((await params).slug);
  if (!m) return {};
  const description = `${m.name}, ${m.role} at Radiant Health Club.`;
  return { title: m.name, description, alternates: { canonical: `/team/${m.slug}` }, openGraph: { title: m.name, description, images: [{ url: m.photo.src, alt: m.photo.alt }] } };
}

/** TEAM MEMBER profile. */
export default async function TeamMemberPage({ params }: Props) {
  const m = await getTeamMember((await params).slug);
  if (!m) notFound();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Team", path: "/team" }, { name: m.name, path: `/team/${m.slug}` }]} />
      <PageHero label={m.group} title={m.name} intro={m.role} />
      <Section surface="ivory" labelledBy="bio-title">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="relative aspect-[3/4] lg:col-span-4"><Photo src={m.photo.src} alt={m.photo.alt} fill preload sizes="(min-width: 1024px) 33vw, 100vw" /></div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="bio-title" className="sr-only">Biography</h2>
            <RichText body={m.body} paragraphs={m.paragraphs} />
            {m.specialties.length > 0 && (<><h3 className="mt-12 text-h3">Specialties</h3><ul className="mt-4 flex flex-wrap gap-2">{m.specialties.map((s) => <li key={s} className="border border-stone-300 px-4 py-1.5 text-sm text-stone-500">{s}</li>)}</ul></>)}
            {m.credentials.length > 0 && (<><h3 className="mt-12 text-h3">Qualifications</h3><ul className="mt-4 list-disc space-y-1 pl-5 text-stone-500">{m.credentials.map((c) => <li key={c}>{c}</li>)}</ul></>)}
            <Button href="/team" variant="text" tone="light" className="mt-12">All team members</Button>
          </div>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/team/page.tsx"
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { teamIntro } from "@/content/team";
import { getTeam } from "@/sanity/lib/content";

export const metadata: Metadata = { title: "Team", description: "Meet the coaches, therapists and hosts at Radiant Health Club.", alternates: { canonical: "/team" } };

const ORDER = ["Leadership", "Trainer", "Therapist", "Front of house"];
const LABELS: Record<string, string> = { Leadership: "Leadership", Trainer: "Trainers", Therapist: "Therapists", "Front of house": "Front of house" };

/** TEAM overview, grouped by role. Groups with no members are hidden. */
export default async function TeamPage() {
  const team = await getTeam();
  const groups = ORDER.filter((g) => team.some((t) => t.group === g));
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Team", path: "/team" }]} />
      <PageHero label="Team" title={teamIntro.title} intro={teamIntro.text} />
      {groups.map((g, gi) => (
        <Section key={g} surface={gi % 2 ? "sand" : "ivory"} labelledBy={`group-${gi}`}>
          <h2 id={`group-${gi}`} className="text-h2">{LABELS[g]}</h2>
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {team.filter((t) => t.group === g).map((m) => (
              <li key={m.slug}>
                <Link href={`/team/${m.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden"><Photo src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-5 text-h3 transition-colors group-hover:text-champagne-600">{m.name}</h3>
                  <p className="text-sm text-stone-500">{m.role}</p>
                  {m.specialties.length > 0 && <p className="mt-1 text-sm text-champagne-600">{m.specialties.join(", ")}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ))}
      <CtaBand title="Meet us in person." />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/terms/page.tsx"
import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };
export default function TermsPage() { return <LegalPage title="Terms" sections={terms} />; }
EOF
cat << 'EOF' > "src/app/(site)/wellness-spa/[slug]/page.tsx"
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Photo } from "@/components/ui/Photo";
import { RichText } from "@/components/ui/RichText";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getTreatment, getTreatments } from "@/sanity/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTreatments()).map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getTreatment((await params).slug);
  if (!d) return {};
  const t = d.treatment;
  return { title: t.title, description: t.summary, alternates: { canonical: `/wellness-spa/${t.slug}` }, openGraph: { title: t.title, description: t.summary, images: [{ url: t.image.src, alt: t.image.alt }] } };
}

/** TREATMENT detail. Prices are not published; the CTA is an enquiry. */
export default async function TreatmentPage({ params }: Props) {
  const d = await getTreatment((await params).slug);
  if (!d) notFound();
  const { treatment: t, related } = d;
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Wellness and Spa", path: "/wellness-spa" }, { name: t.title, path: `/wellness-spa/${t.slug}` }]} />
      <PageHero label={t.category} title={t.title} intro={t.summary} image={t.image} />
      <Section surface="ivory" labelledBy="about-treatment">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7"><h2 id="about-treatment" className="sr-only">About this treatment</h2><RichText body={t.body} paragraphs={t.paragraphs} /></div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <dl className="divide-y divide-stone-300 border-y border-stone-300">
              <div className="flex justify-between gap-6 py-3"><dt className="text-stone-500">Category</dt><dd>{t.category}</dd></div>
              {t.durationMinutes && <div className="flex justify-between gap-6 py-3"><dt className="text-stone-500">Duration</dt><dd>{t.durationMinutes} minutes</dd></div>}
              <div className="flex justify-between gap-6 py-3"><dt className="text-stone-500">Rates</dt><dd>On enquiry</dd></div>
            </dl>
          </aside>
        </div>
      </Section>
      {related.length > 0 && (
        <Section surface="sand" labelledBy="related-title">
          <h2 id="related-title" className="text-h2">You may also like</h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/wellness-spa/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden"><Photo src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                  <h3 className="mt-5 text-h3 transition-colors group-hover:text-champagne-600">{r.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
      <CtaBand title={`Reserve ${t.title.toLowerCase()}.`} text="Contact us to arrange your treatment." primary={{ label: "Enquire", href: "/contact" }} />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/(site)/wellness-spa/page.tsx"
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Photo } from "@/components/ui/Photo";
import { Button } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { spaIntro, spaJourney } from "@/content/spa";
import { getTreatments } from "@/sanity/lib/content";

export const metadata: Metadata = {
  title: "Wellness and Spa",
  description: "Moroccan bath, massage and restorative rituals at Radiant Health Club in Addis Ababa.",
  alternates: { canonical: "/wellness-spa" },
};

/** WELLNESS AND SPA overview: signature experience, treatment menu by category, the spa journey. */
export default async function SpaPage() {
  const treatments = await getTreatments();
  const signature = treatments.find((t) => t.isSignature) ?? treatments[0];
  const categories = Array.from(new Set(treatments.map((t) => t.category)));

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Wellness and Spa", path: "/wellness-spa" }]} />
      <PageHero label="Wellness and Spa" title={spaIntro.title} intro={spaIntro.text} image={spaIntro.hero} />

      {signature && (
        <Section surface="ivory" labelledBy="signature-title">
          <div className="grid items-center gap-14 lg:grid-cols-12">
            <div className="relative aspect-[4/5] lg:col-span-5"><Photo src={signature.image.src} alt={signature.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" /></div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeader id="signature-title" label="Signature experience" title={signature.title} intro={signature.summary} />
              <Button href={`/wellness-spa/${signature.slug}`} variant="secondary" tone="light" className="mt-10">Discover the experience</Button>
            </div>
          </div>
        </Section>
      )}

      <Section surface="sand" labelledBy="menu-title">
        <SectionHeader id="menu-title" label="Treatment menu" title="Choose your ritual." intro="Our team will help you choose. Contact us for availability and rates." />
        <div className="mt-16 space-y-20">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="border-b border-ink-950 pb-4 text-h3">{cat}</h3>
              <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {treatments.filter((t) => t.category === cat).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/wellness-spa/${t.slug}`} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden"><Photo src={t.image.src} alt={t.image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                      <h4 className="mt-5 font-serif text-h3 font-light transition-colors duration-500 group-hover:text-champagne-600">{t.title}</h4>
                      {t.durationMinutes && <p className="mt-1 text-sm text-champagne-600">{t.durationMinutes} minutes</p>}
                      <p className="mt-3 max-w-[38ch] text-stone-500">{t.summary}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section surface="ink" labelledBy="journey-title">
        <SectionHeader id="journey-title" tone="dark" label="The spa journey" title="Unhurried from start to finish." />
        <ol className="mt-14 grid gap-12 md:grid-cols-4 md:gap-8">
          {spaJourney.map((s, i) => (
            <li key={s.title} className="border-t border-ink-700 pt-8">
              <p aria-hidden className="font-serif text-h2 font-light text-champagne-400">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 text-h3">{s.title}</h3>
              <p className="mt-3 text-stone-300">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand title="Reserve your time." text="Contact us to arrange a treatment, or book a tour of the spa." primary={{ label: "Enquire about treatments", href: "/contact" }} secondary={{ label: "Book a Tour", href: "/book-a-tour" }} />
    </>
  );
}
EOF
cat << 'EOF' > "src/app/api/careers/route.ts"
import { z } from "zod";
import { applicationSchema, CV_EXTENSIONS, looksLikeCv, MAX_CV_BYTES } from "@/lib/careers";
import { sendPair, simpleMails } from "@/lib/email";
import { guard, jsonResponse as json } from "@/lib/form-route";
import { writeClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/careers (multipart/form-data): application with an optional CV.
 * Guard -> validate fields -> validate the file (size, extension AND real content) ->
 * upload the CV to the PRIVATE bookings dataset -> store the application -> email (CV attached for staff).
 */
export async function POST(req: Request) {
  const blocked = guard(req, "careers", MAX_CV_BYTES + 100_000);
  if (blocked) return blocked;

  let form: FormData;
  try { form = await req.formData(); } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  const text = (k: string) => { const v = form.get(k); return typeof v === "string" && v.trim() ? v : undefined; };
  const parsed = applicationSchema.safeParse({ fullName: text("fullName"), email: text("email"), phone: text("phone"), position: text("position"), message: text("message"), website: text("website") });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(z.flattenError(parsed.error).fieldErrors)) if (v?.[0]) errors[k] = v[0];
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;
  if (d.website) return json({ ok: true });

  // Optional CV.
  let cv: { name: string; type: string; buffer: Buffer } | undefined;
  const file = form.get("cv");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(CV_EXTENSIONS as readonly string[]).includes(ext)) return json({ ok: false, message: "Please check the highlighted fields.", errors: { cv: "Upload a PDF or Word document." } }, 422);
    if (file.size > MAX_CV_BYTES) return json({ ok: false, message: "Please check the highlighted fields.", errors: { cv: "Please upload a file under 4 MB." } }, 422);
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!looksLikeCv(ext, buffer)) return json({ ok: false, message: "Please check the highlighted fields.", errors: { cv: "That file does not look like a valid PDF or Word document." } }, 422);
    cv = { name: file.name.replace(/[^\w.\- ]/g, "_").slice(0, 120), type: file.type || "application/octet-stream", buffer };
  }

  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[careers] Sanity is not configured; cannot store application.");
    return json({ ok: false, message: "Applications are temporarily unavailable. Please contact the club directly." }, 503);
  }

  try {
    const asset = cv ? await writeClient.assets.upload("file", cv.buffer, { filename: cv.name, contentType: cv.type }) : undefined;
    const doc = await writeClient.create({
      _type: "jobApplication", fullName: d.fullName, email: d.email, phone: d.phone, position: d.position, message: d.message,
      ...(asset ? { cv: { _type: "file", asset: { _type: "reference", _ref: asset._id } } } : {}),
      status: "new", submittedAt: new Date().toISOString(),
    });
    const mails = simpleMails({
      first: d.fullName.split(" ")[0], guestSubject: "We've received your application", guestLead: "Thank you for your interest in joining the team. We have received your application and will be in touch if there is a suitable opportunity.",
      staffSubject: `New application: ${d.position ?? "General"}`, staffTitle: "New job application",
      rows: [["Name", d.fullName], ["Email", d.email], ...(d.phone ? [["Phone", d.phone]] : []), ["Position", d.position ?? "General introduction"], ...(d.message ? [["Message", d.message]] : []), ["CV", cv ? cv.name : "Not provided"]],
    });
    if (cv) mails.staff.attachments = [{ filename: cv.name, content: cv.buffer }];
    const sent = await sendPair(d.email, mails.guest, mails.staff);
    await writeClient.patch(doc._id).set({ emailStatus: `guest:${sent.guest ? "sent" : "failed"} staff:${sent.staff ? "sent" : "failed"}` }).commit().catch(() => undefined);
    return json({ ok: true });
  } catch (error) {
    console.error("[careers] Failed to store application:", error);
    return json({ ok: false, message: "We could not save your application. Please try again or contact the club directly." }, 500);
  }
}
EOF
cat << 'EOF' > "src/app/api/contact/route.ts"
import { z } from "zod";
import { contactSchema } from "@/lib/contact";
import { sendPair, simpleMails } from "@/lib/email";
import { guard, jsonResponse as json } from "@/lib/form-route";
import { writeClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/contact: guard, validate, store privately, email. Fails loudly if it cannot store the message. */
export async function POST(req: Request) {
  const blocked = guard(req, "contact");
  if (blocked) return blocked;

  let body: unknown;
  try { body = await req.json(); } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(z.flattenError(parsed.error).fieldErrors)) if (v?.[0]) errors[k] = v[0];
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;
  if (d.website) return json({ ok: true });

  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[contact] Sanity is not configured; cannot store message.");
    return json({ ok: false, message: "Messages are temporarily unavailable. Please contact the club directly." }, 503);
  }
  try {
    const doc = await writeClient.create({ _type: "contactMessage", fullName: d.fullName, email: d.email, phone: d.phone || undefined, topic: d.topic, message: d.message, status: "new", submittedAt: new Date().toISOString() });
    const mails = simpleMails({
      first: d.fullName.split(" ")[0], guestSubject: "We've received your message", guestLead: "Thank you for getting in touch. A member of our team will reply shortly.",
      staffSubject: `New message: ${d.topic}`, staffTitle: "New contact message",
      rows: [["Name", d.fullName], ["Email", d.email], ...(d.phone ? [["Phone", d.phone]] : []), ["Topic", d.topic], ["Message", d.message]],
    });
    const sent = await sendPair(d.email, mails.guest, mails.staff);
    await writeClient.patch(doc._id).set({ emailStatus: `guest:${sent.guest ? "sent" : "failed"} staff:${sent.staff ? "sent" : "failed"}` }).commit().catch(() => undefined);
    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to store message:", error);
    return json({ ok: false, message: "We could not send your message. Please try again or contact the club directly." }, 500);
  }
}
EOF
cat << 'EOF' > "src/app/api/corporate-enquiry/route.ts"
import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimited, type BookingResponse } from "@/lib/booking";
import { enquirySchema } from "@/lib/corporate";
import { sendEnquiryEmails } from "@/lib/email";
import { writeClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: BookingResponse, status = 200) => NextResponse.json(body, { status });

/**
 * POST /api/corporate-enquiry: same safeguards and flow as /api/class-booking.
 * same-origin check, size limit, rate limit, honeypot, zod validation, private storage, then Resend emails.
 * Fails loudly if it cannot store the enquiry. It never pretends to succeed.
 */
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return json({ ok: false, message: "Request not allowed." }, 403);

  const raw = await req.text();
  if (raw.length > 10_000) return json({ ok: false, message: "Request too large." }, 413);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`corporate:${ip}`)) return json({ ok: false, message: "Too many requests. Please try again in a few minutes." }, 429);

  let body: unknown;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(z.flattenError(parsed.error).fieldErrors)) if (v?.[0]) errors[k] = v[0];
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;
  if (d.website) return json({ ok: true }); // bot: pretend success, store nothing

  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[corporate] Sanity is not configured; cannot store enquiry.");
    return json({ ok: false, message: "Online enquiries are temporarily unavailable. Please contact the club directly." }, 503);
  }

  try {
    const doc = await writeClient.create({
      _type: "corporateEnquiry",
      company: d.company, fullName: d.fullName, role: d.role || undefined, email: d.email,
      phone: d.phone || undefined, teamSize: d.teamSize, message: d.message || undefined,
      status: "new", submittedAt: new Date().toISOString(),
    });
    const sent = await sendEnquiryEmails({ company: d.company, fullName: d.fullName, role: d.role || undefined, email: d.email, phone: d.phone || undefined, teamSize: d.teamSize, message: d.message || undefined });
    await writeClient.patch(doc._id).set({ emailStatus: `guest:${sent.guest ? "sent" : "failed"} staff:${sent.staff ? "sent" : "failed"}` }).commit().catch(() => undefined);
    return json({ ok: true });
  } catch (error) {
    console.error("[corporate] Failed to store enquiry:", error);
    return json({ ok: false, message: "We could not save your enquiry. Please try again or contact the club directly." }, 500);
  }
}
EOF
cat << 'EOF' > "src/components/careers/ApplicationForm.tsx"
"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError, Honeypot, SuccessPanel, fieldProps, inputClass } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

/** CAREERS APPLICATION FORM (multipart, optional CV up to 4 MB). Posts to /api/careers. */
export function ApplicationForm({ positions }: { positions: string[] }) {
  const { status, message, errors, submit } = useFormSubmit();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    void submit("/api/careers", { formData: f });
  }

  if (status === "done") return <SuccessPanel title="Application received.">Thank you. We have sent a confirmation to your email and will be in touch if there is a suitable opportunity.</SuccessPanel>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" encType="multipart/form-data">
      {status === "error" && <p role="alert" className="border border-error p-4 text-sm text-error">{message}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-sm">Full name<input type="text" name="fullName" required autoComplete="name" className={inputClass} {...fieldProps(errors, "fullName")} /><FieldError errors={errors} name="fullName" /></label>
        <label className="block text-sm">Email<input type="email" name="email" required autoComplete="email" className={inputClass} {...fieldProps(errors, "email")} /><FieldError errors={errors} name="email" /></label>
        <label className="block text-sm">Phone (optional)<input type="tel" name="phone" autoComplete="tel" className={inputClass} /></label>
        <label className="block text-sm">Position
          <select name="position" defaultValue="" className={inputClass}>
            <option value="">General introduction</option>{positions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">Tell us about yourself (optional)<textarea name="message" rows={5} maxLength={2000} className={inputClass} {...fieldProps(errors, "message")} /><FieldError errors={errors} name="message" /></label>
        <label className="block text-sm sm:col-span-2">CV (optional, PDF or Word, up to 4 MB)
          <input type="file" name="cv" accept=".pdf,.doc,.docx" className={`${inputClass} py-3`} {...fieldProps(errors, "cv")} /><FieldError errors={errors} name="cv" />
        </label>
      </div>
      <Honeypot />
      <div>
        <Button type="submit" size="lg" tone="light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Submit application"}</Button>
        <p className="mt-4 max-w-[52ch] text-sm text-stone-500">We use your details only to consider your application.</p>
      </div>
    </form>
  );
}
EOF
cat << 'EOF' > "src/components/contact/ContactForm.tsx"
"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError, Honeypot, SuccessPanel, fieldProps, inputClass } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { TOPICS } from "@/lib/contact";

/** CONTACT FORM: posts to /api/contact (validated again on the server). */
export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const { status, message, errors, submit } = useFormSubmit();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    void submit("/api/contact", { json: { fullName: f.get("fullName"), email: f.get("email"), phone: f.get("phone") || undefined, topic: f.get("topic") || undefined, message: f.get("message"), website: f.get("website") || undefined } });
  }

  if (status === "done") return <SuccessPanel title="Message sent.">Thank you. We have sent a confirmation to your email and will reply shortly.</SuccessPanel>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {status === "error" && <p role="alert" className="border border-error p-4 text-sm text-error">{message}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-sm">Full name<input type="text" name="fullName" required autoComplete="name" className={inputClass} {...fieldProps(errors, "fullName")} /><FieldError errors={errors} name="fullName" /></label>
        <label className="block text-sm">Email<input type="email" name="email" required autoComplete="email" className={inputClass} {...fieldProps(errors, "email")} /><FieldError errors={errors} name="email" /></label>
        <label className="block text-sm">Phone (optional)<input type="tel" name="phone" autoComplete="tel" className={inputClass} /></label>
        <label className="block text-sm">Topic
          <select name="topic" required defaultValue={TOPICS.includes(defaultTopic as (typeof TOPICS)[number]) ? defaultTopic : ""} className={inputClass} {...fieldProps(errors, "topic")}>
            <option value="" disabled>Select</option>{TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select><FieldError errors={errors} name="topic" />
        </label>
        <label className="block text-sm sm:col-span-2">Message<textarea name="message" rows={6} required maxLength={2000} className={inputClass} {...fieldProps(errors, "message")} /><FieldError errors={errors} name="message" /></label>
      </div>
      <Honeypot />
      <div>
        <Button type="submit" size="lg" tone="light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message"}</Button>
        <p className="mt-4 max-w-[52ch] text-sm text-stone-500">We use your details only to reply to your message.</p>
      </div>
    </form>
  );
}
EOF
cat << 'EOF' > "src/components/forms/fields.tsx"
import type { ReactNode } from "react";

/** Shared form building blocks (light surfaces). */
export const inputClass = "mt-2 block min-h-12 w-full border border-stone-300 bg-white px-4 text-ink-950 transition-colors focus:border-ink-950";

export const fieldProps = (errors: Record<string, string>, name: string) => ({
  "aria-invalid": errors[name] ? (true as const) : undefined,
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
});

export function FieldError({ errors, name }: { errors: Record<string, string>; name: string }) {
  return errors[name] ? <p id={`${name}-error`} className="mt-2 text-sm text-error">{errors[name]}</p> : null;
}

/** Hidden spam trap. People never see it; bots fill it in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="border border-stone-300 p-8 md:p-12">
      <h2 className="text-h2">{title}</h2>
      <p className="mt-5 max-w-[48ch] text-lead text-stone-500">{children}</p>
    </div>
  );
}
EOF
cat << 'EOF' > "src/components/forms/useFormSubmit.ts"
"use client";

import { useState } from "react";
import type { BookingResponse } from "@/lib/booking";

/** Shared client-side submit logic for forms: status, top-level message and per-field errors. */
export function useFormSubmit() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(url: string, body: { json?: unknown; formData?: FormData }) {
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch(url, body.formData ? { method: "POST", body: body.formData } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body.json) });
      const data = (await res.json()) as BookingResponse;
      if (data.ok) { setStatus("done"); return; }
      setErrors(data.errors ?? {});
      setMessage(data.message);
      setStatus("error");
    } catch {
      setMessage("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }
  return { status, message, errors, submit };
}
EOF
cat << 'EOF' > "src/components/gallery/GalleryGrid.tsx"
"use client";

import { useRef, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import type { GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Varied aspect ratios give the grid a masonry rhythm without needing image dimensions. */
const RATIOS = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[4/3]", "aspect-[4/5]", "aspect-[3/2]"];

/**
 * GALLERY: masonry grid with category filters and an accessible lightbox built on the native
 * <dialog> element (focus trap and Escape come for free). Arrow keys move between items.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState("All");
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);

  const cats = ["All", ...Array.from(new Set(items.map((i) => i.category)))];
  const visible = items.filter((i) => filter === "All" || i.category === filter);
  const current = visible[index];

  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const step = (d: number) => setIndex((i) => (i + d + visible.length) % visible.length);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="mb-12 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={filter === c} onClick={() => setFilter(c)} className={cn("min-h-11 border px-4 text-sm transition-colors duration-300", filter === c ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-stone-300 hover:border-ink-950")}>{c}</button>
        ))}
      </div>

      <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {visible.map((it, i) => (
          <li key={it.id} className="mb-4 break-inside-avoid">
            <button type="button" onClick={() => open(i)} className="group relative block w-full overflow-hidden" aria-label={`${it.kind === "video" ? "Play video" : "View photo"}: ${it.title}`}>
              <div className={cn("relative", RATIOS[i % RATIOS.length])}>
                <Photo src={it.image.src} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" />
                {it.kind === "video" && <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-ink-950/30"><span className="flex h-14 w-14 items-center justify-center border border-ivory-50 text-ivory-50">&#9654;</span></span>}
              </div>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label="Gallery viewer"
        onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
        onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }}
        className="m-auto h-[90vh] w-[min(96vw,80rem)] max-w-none bg-ink-950 p-0 text-ivory-50 backdrop:bg-ink-950/90"
      >
        {current && (
          <div className="relative flex h-full flex-col">
            <div className="relative min-h-0 flex-1">
              {current.kind === "video" && current.videoUrl ? (
                <video key={current.id} src={current.videoUrl} poster={current.image.src} controls playsInline className="h-full w-full object-contain" />
              ) : (
                <Photo key={current.id} src={current.image.src} alt={current.image.alt} fill sizes="96vw" className="object-contain" />
              )}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-ink-700 px-5 py-4">
              <p className="text-sm text-stone-300">{current.title} ({index + 1} of {visible.length})</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => step(-1)} className="min-h-11 border border-ink-700 px-4 text-sm hover:border-champagne-400">Previous</button>
                <button type="button" onClick={() => step(1)} className="min-h-11 border border-ink-700 px-4 text-sm hover:border-champagne-400">Next</button>
                <button type="button" onClick={() => dialog.current?.close()} className="min-h-11 border border-champagne-400 px-4 text-sm text-champagne-400 hover:bg-champagne-400 hover:text-ink-950">Close</button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
EOF
cat << 'EOF' > "src/components/home/MembershipTeaser.tsx"
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
EOF
cat << 'EOF' > "src/components/home/Testimonials.tsx"
"use client";

import { useRef } from "react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Testimonial } from "@/lib/types";

/**
 * HOME / 7. Testimonials: a scroll-snap carousel.
 * Deliberately NOT auto-advancing (accessibility: no moving content to chase).
 * Works with touch swipe, trackpad, keyboard (focusable list) and the arrow buttons.
 */
export function Testimonials({ items: testimonials }: { items: Testimonial[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const page = (dir: 1 | -1) => {
    const el = listRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow = "flex h-12 w-12 items-center justify-center border border-ink-950 text-ink-950 transition-colors duration-500 hover:bg-ink-950 hover:text-ivory-50";

  return (
    <Section surface="ivory" labelledBy="testimonials-title">
      <div className="flex items-end justify-between gap-6">
        <SectionHeader id="testimonials-title" label="Success stories" title="In members' words." />
        <div className="hidden gap-3 md:flex">
          <button type="button" className={arrow} aria-label="Previous testimonials" onClick={() => page(-1)}>
            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="M11 3 5 9l6 6" /></svg>
          </button>
          <button type="button" className={arrow} aria-label="Next testimonials" onClick={() => page(1)}>
            <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="m7 3 6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      <div role="region" aria-roledescription="carousel" aria-label="Member testimonials" className="mt-14">
        <ul
          ref={listRef}
          tabIndex={0}
          className="flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <li key={i} className="w-[85%] shrink-0 snap-start md:w-[46%] lg:w-[31%]">
              <figure className="border-t border-stone-300 pt-8">
                <blockquote className="font-serif text-h3 font-light leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 text-sm text-stone-500">
                  <span className="block text-ink-950">{t.name}</span>
                  {t.detail}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
EOF
cat << 'EOF' > "src/components/journal/JournalGrid.tsx"
"use client";

import Link from "next/link";
import { useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { formatDate } from "@/lib/dates";
import type { Post } from "@/lib/types";
import { cn } from "@/lib/utils";

/** JOURNAL INDEX: featured latest article, category filter, then the grid. Filtering is instant (client-side). */
export function JournalGrid({ posts }: { posts: Post[] }) {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => !!c)))];
  const filtered = posts.filter((p) => cat === "All" || p.category === cat);
  const [featured, ...rest] = filtered;

  return (
    <div>
      {cats.length > 2 && (
        <div role="group" aria-label="Filter by category" className="mb-14 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("min-h-11 border px-4 text-sm transition-colors duration-300", cat === c ? "border-ink-950 bg-ink-950 text-ivory-50" : "border-stone-300 hover:border-ink-950")}>{c}</button>
          ))}
        </div>
      )}
      <p className="sr-only" role="status" aria-live="polite">{filtered.length} articles shown</p>

      {featured && (
        <Link href={`/journal/${featured.slug}`} className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-[3/2] overflow-hidden lg:col-span-7"><Photo src={featured.cover.src} alt={featured.cover.alt} fill preload sizes="(min-width: 1024px) 58vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.03]" /></div>
          <div className="lg:col-span-5">
            <p className="text-sm text-champagne-600">{[featured.category, formatDate(featured.publishedAt)].filter(Boolean).join(", ")}</p>
            <h2 className="mt-3 text-h2 transition-colors duration-500 group-hover:text-champagne-600">{featured.title}</h2>
            <p className="mt-5 max-w-[44ch] text-lead text-stone-500">{featured.excerpt}</p>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/journal/${p.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden"><Photo src={p.cover.src} alt={p.cover.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]" /></div>
                <p className="mt-6 text-sm text-champagne-600">{[p.category, formatDate(p.publishedAt)].filter(Boolean).join(", ")}</p>
                <h3 className="mt-2 text-h3 transition-colors duration-500 group-hover:text-champagne-600">{p.title}</h3>
                <p className="mt-3 max-w-[40ch] text-stone-500">{p.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filtered.length === 0 && <p className="text-stone-500">No articles in this category yet.</p>}
    </div>
  );
}
EOF
cat << 'EOF' > "src/components/membership/ComparisonTable.tsx"
import type { Tier } from "@/lib/types";

const Check = () => (
  <>
    <svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-champagne-600"><path d="m3.5 9.5 3.5 3.5 7.5-8" /></svg>
    <span className="sr-only">Included</span>
  </>
);
const Dash = () => (
  <>
    <span aria-hidden className="mx-auto block h-px w-4 bg-stone-300" />
    <span className="sr-only">Not included</span>
  </>
);

/**
 * COMPARISON TABLE. Rows are the union of every tier's features, in order of first appearance,
 * so it adapts automatically to whatever is entered in Sanity.
 * Wide screens: a real table. Small screens: one list per tier (no sideways scrolling).
 */
export function ComparisonTable({ tiers }: { tiers: Tier[] }) {
  const rows = Array.from(new Set(tiers.flatMap((t) => t.features)));
  if (!rows.length) return null;

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Compare what is included in each membership</caption>
          <thead>
            <tr className="border-b border-ink-950">
              <th scope="col" className="py-5 pr-6 text-label font-semibold uppercase text-stone-500">Included</th>
              {tiers.map((t) => <th key={t.name} scope="col" className="px-4 py-5 text-center font-serif text-h3 font-light">{t.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r} className="border-b border-stone-300">
                <th scope="row" className="py-4 pr-6 font-normal text-stone-500">{r}</th>
                {tiers.map((t) => <td key={t.name} className="px-4 py-4 text-center">{t.features.includes(r) ? <Check /> : <Dash />}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-10 md:hidden">
        {tiers.map((t) => (
          <section key={t.name} aria-label={`${t.name} includes`}>
            <h3 className="border-b border-ink-950 pb-3 text-h3">{t.name}</h3>
            <ul className="divide-y divide-stone-300">
              {t.features.map((f) => <li key={f} className="py-3 text-stone-500">{f}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
EOF
cat << 'EOF' > "src/components/membership/CorporateForm.tsx"
"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { BookingResponse } from "@/lib/booking";
import { TEAM_SIZES } from "@/lib/corporate";

/** CORPORATE ENQUIRY FORM: posts to /api/corporate-enquiry (validated again on the server). Same a11y pattern as the booking form. */
export function CorporateForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/corporate-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: f.get("company"), fullName: f.get("fullName"), role: f.get("role") || undefined,
          email: f.get("email"), phone: f.get("phone") || undefined, teamSize: f.get("teamSize") || undefined,
          message: f.get("message") || undefined, website: f.get("website") || undefined,
        }),
      });
      const data = (await res.json()) as BookingResponse;
      if (data.ok) { setStatus("done"); return; }
      setErrors(data.errors ?? {});
      setMessage(data.message);
      setStatus("error");
    } catch {
      setMessage("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-stone-300 p-8 md:p-12">
        <h2 className="text-h2">Thank you.</h2>
        <p className="mt-5 max-w-[48ch] text-lead text-stone-500">Your enquiry has been received. A member of our team will be in touch shortly, and a copy has been sent to your email.</p>
      </div>
    );
  }

  const input = "mt-2 block min-h-12 w-full border border-stone-300 bg-white px-4 text-ink-950 transition-colors focus:border-ink-950";
  const field = (n: string) => ({ "aria-invalid": errors[n] ? true : undefined, "aria-describedby": errors[n] ? `${n}-error` : undefined });
  const err = (n: string) => errors[n] && <p id={`${n}-error`} className="mt-2 text-sm text-error">{errors[n]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {status === "error" && <p role="alert" className="border border-error p-4 text-sm text-error">{message}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">Company
          <input type="text" name="company" required autoComplete="organization" className={input} {...field("company")} />{err("company")}
        </label>
        <label className="block text-sm">Your name
          <input type="text" name="fullName" required autoComplete="name" className={input} {...field("fullName")} />{err("fullName")}
        </label>
        <label className="block text-sm">Your role (optional)
          <input type="text" name="role" autoComplete="organization-title" className={input} />
        </label>
        <label className="block text-sm">Work email
          <input type="email" name="email" required autoComplete="email" className={input} {...field("email")} />{err("email")}
        </label>
        <label className="block text-sm">Phone (optional)
          <input type="tel" name="phone" autoComplete="tel" className={input} />
        </label>
        <label className="block text-sm sm:col-span-2">Approximate team size
          <select name="teamSize" required defaultValue="" className={input} {...field("teamSize")}>
            <option value="" disabled>Select</option>
            {TEAM_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>{err("teamSize")}
        </label>
        <label className="block text-sm sm:col-span-2">How can we help? (optional)
          <textarea name="message" rows={5} maxLength={1500} className={input} {...field("message")} />{err("message")}
        </label>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <Button type="submit" size="lg" tone="light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send enquiry"}</Button>
        <p className="mt-4 max-w-[52ch] text-sm text-stone-500">We use your details only to respond to your enquiry.</p>
      </div>
    </form>
  );
}
EOF
cat << 'EOF' > "src/components/seo/FaqJsonLd.tsx"
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
EOF
cat << 'EOF' > "src/components/ui/Accordion.tsx"
/**
 * ACCORDION built on native <details>/<summary>: keyboard and screen-reader accessible
 * with zero JavaScript. Used for FAQs.
 */
export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-stone-300 border-y border-stone-300">
      {items.map((it) => (
        <details key={it.question} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-serif text-h3 font-light marker:hidden [&::-webkit-details-marker]:hidden">
            {it.question}
            <span aria-hidden className="relative h-4 w-4 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-500 ease-luxe group-open:rotate-90" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 text-stone-500">{it.answer}</p>
        </details>
      ))}
    </div>
  );
}
EOF
cat << 'EOF' > "src/components/ui/LegalPage.tsx"
import { Section } from "./Section";
import { PageHero } from "./PageHero";
import { LEGAL_IS_DRAFT, legalUpdated } from "@/content/legal";

/** Shared layout for Privacy and Terms. Shows a visible DRAFT notice until LEGAL_IS_DRAFT is set to false. */
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
EOF
cat << 'EOF' > "src/config/site.ts"
/**
 * SITE CONFIGURATION: single source of truth for facts that appear across the site.
 * Anything marked [PLACEHOLDER: ...] is unconfirmed. Replace it here, or (later) via
 * the "Site settings" document in Sanity. Placeholders are never emitted to structured data.
 */
export const siteConfig = {
  name: "Radiant Health Club",
  shortName: "Radiant",
  tagline: "Move well. Restore deeply. Belong.", // placeholder copy
  description:
    "A private health club in Addis Ababa for training, restoration and wellbeing.", // placeholder copy
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /** One-line change when the real Calendly link exists. */
  calendlyUrl: "https://calendly.com/radianthealthclub/tour",

  contact: {
    address: "[PLACEHOLDER: street address]",
    city: "Addis Ababa",
    country: "Ethiopia",
    phone: "[PLACEHOLDER: phone]",
    whatsapp: "[PLACEHOLDER: WhatsApp number]",
    email: "[PLACEHOLDER: email]",
    mapsUrl: "[PLACEHOLDER: Google Maps link]",
    /** Google Maps "Embed a map" iframe src URL. The map panel stays a placeholder until this is set. */
    mapsEmbedUrl: "[PLACEHOLDER: Google Maps embed URL]",
    geo: { lat: null as number | null, lng: null as number | null }, // [PLACEHOLDER: coordinates]
  },

  /** Display lines for the footer. Replace with confirmed hours. */
  hours: [
    { days: "Monday to Friday", time: "[PLACEHOLDER: hours]" },
    { days: "Saturday and Sunday", time: "[PLACEHOLDER: hours]" },
  ],

  social: {
    instagram: "https://www.instagram.com/radianthealthclub/",
  },

  /** Shown wherever pricing would appear. Prices are not published (client decision). */
  pricingCta: { label: "Contact us for rates", href: "/contact" },
} as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink & { children?: NavLink[] };

/** Primary navigation (header + mobile menu). */
export const primaryNav: NavItem[] = [
  { label: "Facilities", href: "/facilities" },
  { label: "Classes", href: "/classes" },
  { label: "Membership", href: "/membership" },
  { label: "Wellness and Spa", href: "/wellness-spa" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Success Stories", href: "/stories" },
      { label: "Journal", href: "/journal" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "The club",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Facilities", href: "/facilities" },
      { label: "Team", href: "/team" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Train and restore",
    links: [
      { label: "Classes and Programs", href: "/classes" },
      { label: "Wellness and Spa", href: "/wellness-spa" },
      { label: "Membership", href: "/membership" },
      { label: "Corporate Membership", href: "/membership/corporate" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Journal", href: "/journal" },
      { label: "Success Stories", href: "/stories" },
      { label: "FAQ", href: "/faq" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
EOF
cat << 'EOF' > "src/content/about.ts"
/** PLACEHOLDER About copy. No invented history: dates and milestones are placeholders. */
import { images, moreImages } from "@/lib/images";

export const about = {
  title: "Our story.",
  text: "A club built on the belief that wellbeing deserves time, space and care.",
  hero: { src: moreImages.lounge, alt: "A calm, warmly lit lounge at the club" },
  story: [
    "Radiant began with a simple idea: that a health club should feel like a retreat, not a chore. A place where serious training and genuine rest sit side by side.",
    "Every decision, from the layout of the training floor to the pace of a spa treatment, is made with the same question: does this help our members feel better?",
    "[PLACEHOLDER: founder's story and the club's history]",
  ],
  image: { src: images.intro, alt: "A treatment room with soft light" },
  principles: [
    { title: "Attention", text: "We notice the details, from technique on the floor to the temperature of the towels." },
    { title: "Calm", text: "Spaces and schedules designed to lower the noise, not add to it." },
    { title: "Belonging", text: "A community of members and staff who know one another by name." },
  ],
  timeline: [
    { year: "[PLACEHOLDER: year]", text: "[PLACEHOLDER: founding of the club]" },
    { year: "[PLACEHOLDER: year]", text: "[PLACEHOLDER: milestone, for example the opening of the spa]" },
    { year: "[PLACEHOLDER: year]", text: "[PLACEHOLDER: milestone]" },
  ],
};
EOF
cat << 'EOF' > "src/content/careers.ts"
/** PLACEHOLDER careers culture and benefits. Confirm every benefit before publishing. */
export const careersIntro = { title: "Build a career in wellbeing.", text: "Join a team that cares about craft, calm and the people it serves." };
export const careersValues = [
  { title: "Craft", text: "We take pride in doing small things properly." },
  { title: "Care", text: "We look after our members and each other." },
  { title: "Growth", text: "[PLACEHOLDER: confirm training and development opportunities]" },
];
EOF
cat << 'EOF' > "src/content/faq.ts"
/**
 * PLACEHOLDER FAQs, used until real ones are published in Sanity.
 * Policy facts (guests, trials, cancellations) are marked [PLACEHOLDER] on purpose.
 */
import type { Faq } from "@/lib/types";

export const placeholderFaqs: Faq[] = [
  { group: "Membership", question: "How do I join?", answer: "Book a private tour. Our team will show you the club, discuss your goals and guide you to the right membership." },
  { group: "Membership", question: "How much does membership cost?", answer: "Rates depend on the plan you choose and your circumstances. Please contact us and our team will share current rates." },
  { group: "Membership", question: "Can I bring a guest?", answer: "[PLACEHOLDER: confirm guest policy]" },
  { group: "Membership", question: "Do you offer corporate memberships?", answer: "Yes. We arrange plans for teams and organisations. Send an enquiry on the corporate membership page." },
  { group: "Membership", question: "Can I try the club before joining?", answer: "[PLACEHOLDER: confirm trial policy] A private tour is the best first step." },
  { group: "Classes", question: "How do I book a class?", answer: "Choose a class from the schedule and send a booking request. Our team will confirm by email or phone." },
  { group: "Spa", question: "How do I book a spa treatment?", answer: "[PLACEHOLDER: confirm spa booking process] Please contact us and we will arrange your visit." },
];
EOF
cat << 'EOF' > "src/content/gallery.ts"
/** PLACEHOLDER gallery. Replace via Sanity ("Gallery item") with club photography and video. */
import { images, moreImages } from "@/lib/images";
import type { GalleryItem } from "@/lib/types";

export const galleryCategories = ["Facilities", "Spa", "Classes", "Community"] as const;
const g = (id: string, title: string, category: string, src: string): GalleryItem => ({ id, title, kind: "photo", category, image: { src, alt: title } });

export const placeholderGallery: GalleryItem[] = [
  g("g1", "The training floor", "Facilities", images.gym),
  g("g2", "Spa stones and candle", "Spa", images.spaLarge),
  g("g3", "The pool", "Facilities", images.pool),
  g("g4", "Yoga in the studio", "Classes", images.studio),
  g("g5", "The steam room", "Spa", images.steam),
  g("g6", "Free weights", "Facilities", moreImages.weights),
  g("g7", "A quiet lounge", "Community", moreImages.lounge),
  g("g8", "Locker room", "Facilities", moreImages.lockers),
  g("g9", "Coaching on the floor", "Classes", moreImages.coach),
  g("g10", "Treatment room", "Spa", images.spaSmall),
];
EOF
cat << 'EOF' > "src/content/home.ts"
/**
 * HOME PAGE COPY: placeholder, luxury-toned. Swap for real copy later (or move to Sanity).
 * No invented facts: no awards, dates, prices, credentials or statistics.
 */
import { images } from "@/lib/images";

export const hero = {
  title: "Move well. Restore deeply. Belong.",
  text: "A private health club in Addis Ababa, designed for training, recovery and quiet.",
  /** Hero video: add a hosted MP4/WebM URL here when ready. Poster shows until then. */
  videoSrc: undefined as string | undefined,
  poster: images.heroPoster,
};

export const intro = {
  statement:
    "Radiant is a place to slow down and do the work that matters: training with intent, recovering with care, and spending time among people who value both.",
  body: "Every space has been considered, from the training floor to the bath house. Nothing is hurried and nothing is excessive. You arrive, and the day settles.",
  image: images.intro,
  imageAlt: "A calm treatment room with soft light and folded towels",
};

export const facilities = [
  { slug: "gym-floor", title: "The training floor", text: "Considered equipment, generous space and natural light.", image: images.gym, alt: "Weights and training equipment on the gym floor" },
  { slug: "pool", title: "The pool", text: "Still water for lengths, recovery and quiet.", image: images.pool, alt: "A swimming pool with marked lanes" },
  { slug: "studios", title: "The studios", text: "Rooms for yoga, mobility and small-group classes.", image: images.studio, alt: "A person practising yoga in a bright studio" },
  { slug: "sauna-steam", title: "Sauna and steam", text: "Heat and stillness to close the session.", image: images.steam, alt: "A warm, softly lit steam room" },
];

export const pillars = [
  { title: "Move", text: "Strength, conditioning and mobility programmes guided by coaches who listen before they prescribe." },
  { title: "Restore", text: "Time in the bath house, the sauna and the treatment rooms is part of the plan, not an extra." },
  { title: "Belong", text: "A members' club in the truest sense: familiar faces, unhurried service and a room that knows you." },
];

export const spa = {
  label: "Wellness and Spa",
  title: "Restoration, practised as a ritual.",
  text: "From the Moroccan bath to deep-tissue massage, each treatment is paced to let the body release what it has been holding. Arrive early. Leave later than you planned.",
  largeImage: images.spaLarge,
  largeAlt: "Smooth stones, a folded towel and a candle arranged on a spa table",
  smallImage: images.spaSmall,
  smallAlt: "A massage table prepared for a treatment",
};

/** PLACEHOLDER quotes. Replace with real, consented member words before launch. */
export const testimonials = [
  { quote: "The calmest hour of my day. I walk in tired and walk out clear.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
  { quote: "Serious training in a room that never feels like a gym.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
  { quote: "The bath house alone is worth the visit. The people make it a habit.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
  { quote: "Attentive without being intrusive. Exactly the standard I look for.", name: "[PLACEHOLDER: member name]", detail: "[PLACEHOLDER: membership detail]" },
];

export type JournalCard = { title: string; slug: string; excerpt: string; date?: string; image: string; alt: string; category?: string };

/** Shown until the first posts are published in Sanity. */
export const placeholderPosts: JournalCard[] = [
  { title: "Why recovery is part of the programme", slug: "why-recovery-is-part-of-the-programme", excerpt: "Rest is where adaptation happens. How to build it into your week.", image: images.steam, alt: "A softly lit steam room", category: "Recovery" },
  { title: "A beginner's guide to the Moroccan bath", slug: "beginners-guide-to-the-moroccan-bath", excerpt: "What to expect, how to prepare and why it is worth the time.", image: images.spaLarge, alt: "Spa stones and a towel", category: "Wellness" },
  { title: "Strength training after thirty", slug: "strength-training-after-thirty", excerpt: "Simple principles for building strength that lasts.", image: images.gym, alt: "Weights on the training floor", category: "Training" },
];
EOF
cat << 'EOF' > "src/content/journal.ts"
/** PLACEHOLDER journal articles (generic, non-medical). Slugs match the Home preview. Replace via Sanity ("Journal post"). */
import { images } from "@/lib/images";
import type { Post } from "@/lib/types";

export const journalIntro = { title: "The journal.", text: "Notes on training, recovery and living well." };

export const placeholderJournal: Post[] = [
  { slug: "why-recovery-is-part-of-the-programme", title: "Why recovery is part of the programme", excerpt: "Rest is where adaptation happens. How to build it into your week.", category: "Recovery", author: "Radiant", cover: { src: images.steam, alt: "A softly lit steam room" }, paragraphs: ["Training is only half of the picture. The time you spend recovering is when your body adapts to the work you have done.", "Build recovery into your week as deliberately as you plan your sessions: sleep, gentle movement, and time in the steam room or bath house.", "[PLACEHOLDER: replace with a real article]"] },
  { slug: "beginners-guide-to-the-moroccan-bath", title: "A beginner's guide to the Moroccan bath", excerpt: "What to expect, how to prepare and why it is worth the time.", category: "Wellness", author: "Radiant", cover: { src: images.spaLarge, alt: "Spa stones and a towel" }, paragraphs: ["The Moroccan bath is a slow, sensory ritual. Plan to arrive early and leave time afterwards to rest.", "Tell your therapist about anything you would like them to know, and let the experience set its own pace.", "[PLACEHOLDER: replace with a real article]"] },
  { slug: "strength-training-after-thirty", title: "Strength training after thirty", excerpt: "Simple principles for building strength that lasts.", category: "Training", author: "Radiant", cover: { src: images.gym, alt: "Weights on the training floor" }, paragraphs: ["Strength is built through consistency more than intensity. Start with the fundamentals and progress steadily.", "A coach can help you find the right starting point and keep your technique sound as the load increases.", "[PLACEHOLDER: replace with a real article]"] },
];
EOF
cat << 'EOF' > "src/content/legal.ts"
/**
 * DRAFT LEGAL COPY: generic starting text, NOT legal advice.
 * Must be reviewed and completed by a qualified lawyer before launch.
 * While LEGAL_IS_DRAFT is true, a visible notice appears on both pages. Set it to false only after review.
 */
export const LEGAL_IS_DRAFT = true;
export const legalUpdated = "[PLACEHOLDER: date]";

type Section = { heading: string; paragraphs: string[] };

export const privacy: Section[] = [
  { heading: "Who we are", paragraphs: ["Radiant Health Club (\"we\", \"us\") operates this website. [PLACEHOLDER: registered company name and address]. You can contact us using the details on our Contact page."] },
  { heading: "Information we collect", paragraphs: ["We collect information you give us when you book a class, send a corporate or general enquiry, apply for a job, or book a tour. This may include your name, email address, phone number, the details of your request, and any CV you upload.", "Tours are booked through Calendly, which collects the details you enter into its scheduler under its own privacy policy."] },
  { heading: "How we use it", paragraphs: ["We use your information to respond to your request, confirm bookings, manage membership enquiries and assess job applications. We do not sell your personal information."] },
  { heading: "Who we share it with", paragraphs: ["We use trusted service providers to run the website and handle your requests, including a content and data platform (Sanity), an email delivery service (Resend), a scheduling service (Calendly) and [PLACEHOLDER: hosting provider]. They process data only to provide those services."] },
  { heading: "How long we keep it", paragraphs: ["[PLACEHOLDER: retention periods for bookings, enquiries and job applications]"] },
  { heading: "Your rights", paragraphs: ["Depending on the law that applies to you ([PLACEHOLDER: applicable data protection law]), you may have the right to access, correct or delete your personal information. To make a request, contact us using the details on our Contact page."] },
  { heading: "Cookies and analytics", paragraphs: ["[PLACEHOLDER: describe any analytics or cookies once chosen. The site does not currently set advertising cookies.]"] },
  { heading: "Changes", paragraphs: ["We may update this policy from time to time. The date above shows when it was last changed."] },
];

export const terms: Section[] = [
  { heading: "Using this website", paragraphs: ["By using this website you agree to these terms. Please do not use the site if you do not agree with them."] },
  { heading: "Bookings and enquiries", paragraphs: ["Booking forms on this website submit a request. A request is not a confirmed place until our team confirms it to you. We may decline or reschedule a request, for example if a class is full or cancelled."] },
  { heading: "Membership", paragraphs: ["Membership is subject to separate membership terms provided when you join. [PLACEHOLDER: link or reference to membership agreement]"] },
  { heading: "Health information", paragraphs: ["Content on this website is for general information and is not medical advice. Please consult a qualified professional before starting a new exercise programme or treatment, especially if you have a health condition or injury."] },
  { heading: "Intellectual property", paragraphs: ["The content, design and images on this website belong to Radiant Health Club or its licensors and may not be copied or reused without permission."] },
  { heading: "Liability", paragraphs: ["[PLACEHOLDER: limitation of liability, to be set by legal counsel]"] },
  { heading: "Governing law", paragraphs: ["[PLACEHOLDER: governing law and jurisdiction]"] },
  { heading: "Changes", paragraphs: ["We may update these terms from time to time. Continued use of the site means you accept the updated terms."] },
];
EOF
cat << 'EOF' > "src/content/membership.ts"
/**
 * PLACEHOLDER membership content. Tier names and features are illustrative; pricing is never shown.
 * Features are cumulative so the comparison table reads clearly. Replace via Sanity "Membership tier".
 */
import type { Tier } from "@/lib/types";

export const membershipIntro = {
  title: "Membership, shaped around how you live.",
  text: "Choose the level of access that suits your routine. Our team will guide you to the right fit.",
};

export const placeholderTiers: Tier[] = [
  { name: "Essential", text: "Full access to the training floor, studios and pool.", features: ["Training floor", "Studios and group classes", "Pool", "Locker rooms"] },
  { name: "Signature", text: "Everything in Essential, with the full wellness experience.", features: ["Training floor", "Studios and group classes", "Pool", "Locker rooms", "Sauna, steam and bath house", "Priority class booking", "Guest privileges"], featured: true },
  { name: "Private", text: "A tailored membership with dedicated coaching and care.", features: ["Training floor", "Studios and group classes", "Pool", "Locker rooms", "Sauna, steam and bath house", "Priority class booking", "Guest privileges", "Personal training", "Spa treatment allowance", "Concierge scheduling"] },
];

export const joiningSteps = [
  { title: "Visit", text: "Book a private tour and see the club for yourself." },
  { title: "Talk", text: "Meet the team, share your goals and ask anything you like." },
  { title: "Join", text: "Choose your membership and we will take care of the rest." },
];

export const corporateIntro = {
  title: "Wellbeing for the people who move your business.",
  text: "Corporate memberships give your team access to the club, with arrangements tailored to your organisation.",
};

export const corporateBenefits = [
  { title: "Tailored access", text: "Plans shaped around your team's size, schedules and goals." },
  { title: "One point of contact", text: "A dedicated member of our team handles onboarding and questions." },
  { title: "Wellbeing that shows", text: "A place for teams to train, recover and spend time well together." },
  { title: "Flexible arrangements", text: "[PLACEHOLDER: confirm corporate terms, billing and eligibility]" },
];
EOF
cat << 'EOF' > "src/content/spa.ts"
/**
 * PLACEHOLDER spa content. No invented durations, prices or ingredients.
 * Durations stay empty until confirmed; add them in Sanity ("Spa treatment").
 */
import { images, moreImages } from "@/lib/images";
import type { Treatment } from "@/lib/types";

export const spaIntro = {
  title: "Restoration, practised as a ritual.",
  text: "A calm, unhurried space to release what the day has held. Arrive early. Leave later than you planned.",
  hero: { src: images.spaLarge, alt: "Smooth stones, a folded towel and a candle arranged on a spa table" },
};

export const spaJourney = [
  { title: "Arrive", text: "Settle in with a few quiet minutes before your treatment begins." },
  { title: "Cleanse", text: "Begin with steam or the bath house to warm and prepare the body." },
  { title: "Restore", text: "Your treatment, paced and tailored to what you need that day." },
  { title: "Rest", text: "Linger in the lounge. There is no rush to leave." },
];

export const spaCategories = ["Bath rituals", "Massage", "Journeys"] as const;

const t = (p: Omit<Treatment, "durationMinutes"> ): Treatment => p;

export const placeholderTreatments: Treatment[] = [
  t({ slug: "moroccan-bath", title: "The Moroccan Bath", category: "Bath rituals", isSignature: true, summary: "Steam, a full-body exfoliation and a deep cleanse, in the traditional manner.", image: { src: images.steam, alt: "A softly lit steam room" }, paragraphs: ["Our signature ritual. Warmth and steam open the body, followed by a traditional exfoliation that leaves skin renewed and the mind quiet.", "Allow time to rest afterwards. This is a treatment to be taken slowly."] }),
  t({ slug: "relaxation-massage", title: "Relaxation Massage", category: "Massage", isSignature: false, summary: "Long, flowing strokes to ease the body and settle the mind.", image: { src: images.spaSmall, alt: "A massage table prepared for a treatment" }, paragraphs: ["A gentle massage designed for deep rest. Pressure is tailored to you, and the room is yours for as long as you need."] }),
  t({ slug: "deep-tissue-massage", title: "Deep Tissue Massage", category: "Massage", isSignature: false, summary: "Focused work on tension held in muscles and joints.", image: { src: moreImages.coach, alt: "A therapist preparing for a deep tissue treatment" }, paragraphs: ["Firm, targeted work to release areas of tightness, ideal alongside a training programme. Tell your therapist where you hold tension."] }),
  t({ slug: "hot-stone-massage", title: "Hot Stone Massage", category: "Massage", isSignature: false, summary: "Warmed stones and unhurried strokes for profound relaxation.", image: { src: images.spaLarge, alt: "Smooth stones arranged beside a candle" }, paragraphs: ["Heat melts tension before the hands begin. A deeply grounding treatment, especially restorative in the evening."] }),
  t({ slug: "bath-and-massage-journey", title: "Bath and Massage Journey", category: "Journeys", isSignature: false, summary: "The Moroccan bath followed by a massage, as one continuous experience.", image: { src: moreImages.lounge, alt: "A quiet lounge with soft seating" }, paragraphs: ["Our most complete experience: cleanse, restore and rest in a single, unhurried visit."] }),
];
EOF
cat << 'EOF' > "src/content/team.ts"
/** PLACEHOLDER team. Names, roles and credentials are NOT real. Replace via Sanity ("Team member"). Portraits are stand-ins. */
import { images, moreImages } from "@/lib/images";
import type { TeamMember } from "@/lib/types";

export const teamIntro = { title: "The people behind the club.", text: "Coaches, therapists and hosts who take pride in the details." };

const m = (slug: string, group: string, role: string, src: string, specialties: string[]): TeamMember => ({
  slug, name: `[PLACEHOLDER: name ${slug.split("-").pop()}]`, group, role, specialties,
  photo: { src, alt: `Portrait placeholder for ${role.toLowerCase()}` }, credentials: ["[PLACEHOLDER: verified qualifications]"],
  paragraphs: ["[PLACEHOLDER: biography]", "A considered, attentive approach to every member, whatever their goals."],
});

export const placeholderTeam: TeamMember[] = [
  m("leadership-1", "Leadership", "Founder", moreImages.lounge, ["Vision", "Hospitality"]),
  m("leadership-2", "Leadership", "General Manager", moreImages.lounge, ["Operations", "Member experience"]),
  m("trainer-1", "Trainer", "Head Coach", moreImages.coach, ["Strength", "Programming"]),
  m("trainer-2", "Trainer", "Personal Trainer", moreImages.weights, ["Conditioning", "Mobility"]),
  m("trainer-3", "Trainer", "Yoga Instructor", images.studio, ["Yoga", "Breathwork"]),
  m("therapist-1", "Therapist", "Senior Spa Therapist", images.spaSmall, ["Massage", "Moroccan bath"]),
];
EOF
cat << 'EOF' > "src/lib/careers.ts"
import { z } from "zod";

export const MAX_CV_BYTES = 4 * 1024 * 1024; // 4 MB: stays under typical serverless request limits (~4.5 MB)
export const CV_EXTENSIONS = ["pdf", "doc", "docx"] as const;

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  position: z.string().trim().max(150).optional(),
  message: z.string().trim().max(2000, "Please keep your message under 2000 characters.").optional(),
  website: z.string().max(200).optional(), // honeypot
});

/** Checks a file's real content (magic bytes), not just its name: PDF, legacy .doc or .docx (zip). */
export function looksLikeCv(ext: string, bytes: Uint8Array): boolean {
  const starts = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (ext === "pdf") return starts([0x25, 0x50, 0x44, 0x46]); // %PDF
  if (ext === "docx") return starts([0x50, 0x4b, 0x03, 0x04]); // PK..
  if (ext === "doc") return starts([0xd0, 0xcf, 0x11, 0xe0]); // OLE
  return false;
}
EOF
cat << 'EOF' > "src/lib/contact.ts"
import { z } from "zod";

export const TOPICS = ["Membership", "Classes", "Wellness and Spa", "Corporate", "Careers", "Something else"] as const;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  topic: z.enum(TOPICS, { error: "Choose a topic." }),
  message: z.string().trim().min(5, "Please write a short message.").max(2000, "Please keep your message under 2000 characters."),
  website: z.string().max(200).optional(), // honeypot, checked in the route
});
EOF
cat << 'EOF' > "src/lib/corporate.ts"
import { z } from "zod";

export const TEAM_SIZES = ["Up to 10", "11 to 50", "51 to 200", "More than 200"] as const;

/** Server-side validation for the corporate enquiry form. */
export const enquirySchema = z.object({
  company: z.string().trim().min(2, "Enter your company name.").max(150),
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  role: z.string().trim().max(100).optional(),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  teamSize: z.enum(TEAM_SIZES, { error: "Choose an approximate team size." }),
  message: z.string().trim().max(1500, "Please keep your message under 1500 characters.").optional(),
  /** Honeypot: checked in the route, which pretends success. */
  website: z.string().max(200).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
EOF
cat << 'EOF' > "src/lib/dates.ts"
/** "12 March 2026" (en-GB). Returns undefined for missing or invalid dates. */
export function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d);
}
EOF
cat << 'EOF' > "src/lib/email.ts"
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

/** Escape user-supplied text before placing it in HTML email. */
export const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export type BookingEmailData = {
  classTitle: string;
  sessionLabel?: string;
  preferredDateLabel: string;
  fullName: string;
  email: string;
  phone?: string;
  isMember: boolean;
  notes?: string;
};

const shell = (inner: string) => `<!doctype html><html><body style="margin:0;background:#f8f4ec;font-family:Helvetica,Arial,sans-serif;color:#0d0c0a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff">
<tr><td style="background:#0d0c0a;padding:28px 32px;color:#f8f4ec;font-family:Georgia,serif;font-size:26px;letter-spacing:.02em">Radiant <span style="font-size:11px;letter-spacing:.3em;color:#c8a96a;text-transform:uppercase">Health Club</span></td></tr>
<tr><td style="padding:32px;line-height:1.65;font-size:15px">${inner}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #e6dfd2;font-size:12px;color:#7a7468">${esc(siteConfig.name)}, ${esc(siteConfig.contact.city)}</td></tr>
</table></td></tr></table></body></html>`;

const rows = (d: BookingEmailData) =>
  [
    ["Class", d.classTitle],
    d.sessionLabel ? ["Session", d.sessionLabel] : null,
    ["Preferred date", d.preferredDateLabel],
    ["Name", d.fullName],
    ["Email", d.email],
    d.phone ? ["Phone", d.phone] : null,
    ["Member", d.isMember ? "Yes" : "Not yet"],
    d.notes ? ["Notes", d.notes] : null,
  ].filter((r): r is string[] => !!r);

const rowsTable = (r: string[][]) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border-top:1px solid #e6dfd2">${r
    .map(([k, v]) => `<tr><td style="padding:10px 0;border-bottom:1px solid #e6dfd2;color:#7a7468;width:130px;vertical-align:top">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #e6dfd2;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>`;

/** Guest confirmation. Honest wording: this is a request, not a guaranteed place. */
export function guestEmail(d: BookingEmailData) {
  return {
    subject: `We've received your request: ${d.classTitle}`,
    html: shell(`<p>Dear ${esc(d.fullName.split(" ")[0])},</p>
<p>Thank you for your request. We have received it and our team will confirm your place by email or phone.</p>${table(d)}
<p>If anything needs to change, simply reply to this email.</p><p>We look forward to welcoming you.</p>`),
    text: `Dear ${d.fullName.split(" ")[0]},\n\nThank you for your request. We have received it and our team will confirm your place by email or phone.\n\n${rows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nIf anything needs to change, reply to this email.\n\n${siteConfig.name}`,
  };
}

/** Internal notification for the front desk. */
export function staffEmail(d: BookingEmailData) {
  return {
    subject: `New class request: ${d.classTitle} (${d.preferredDateLabel})`,
    html: shell(`<p><strong>New class booking request</strong></p>${table(d)}<p>Reply to this email to contact the guest directly.</p>`),
    text: `New class booking request\n\n${rows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  };
}

const table = (d: BookingEmailData) => rowsTable(rows(d));

export type Mail = { subject: string; html: string; text: string; attachments?: { filename: string; content: Buffer }[] };

/**
 * Sends a pair of emails: an acknowledgement to the guest and a notification to the front desk.
 * Shared by every form (class booking, corporate enquiry). Never throws; reports what happened.
 */
export async function sendPair(guestTo: string, guest: Mail, staff: Mail): Promise<{ guest: boolean; staff: boolean }> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.BOOKING_FROM_EMAIL;
  const staffTo = process.env.BOOKING_NOTIFY_EMAIL;
  if (!key || !from) {
    console.warn("[email] Resend not configured (RESEND_API_KEY / BOOKING_FROM_EMAIL). Emails skipped.");
    return { guest: false, staff: false };
  }
  const resend = new Resend(key);
  const send = async (to: string, mail: Mail, replyTo?: string) => {
    try {
      const { error } = await resend.emails.send({ from, to, subject: mail.subject, html: mail.html, text: mail.text, ...(mail.attachments ? { attachments: mail.attachments } : {}), ...(replyTo ? { replyTo } : {}) });
      if (error) { console.error("[email] Resend error:", error); return false; }
      return true;
    } catch (e) {
      console.error("[email] Resend failure:", e);
      return false;
    }
  };
  const [g, s] = await Promise.all([send(guestTo, guest, staffTo), staffTo ? send(staffTo, staff, guestTo) : Promise.resolve(false)]);
  return { guest: g, staff: s };
}

export const sendBookingEmails = (d: BookingEmailData) => sendPair(d.email, guestEmail(d), staffEmail(d));

/* ---------------------------- Corporate enquiry ---------------------------- */
export type EnquiryEmailData = { company: string; fullName: string; role?: string; email: string; phone?: string; teamSize: string; message?: string };

const enquiryRows = (d: EnquiryEmailData) =>
  [["Company", d.company], ["Name", d.fullName], d.role ? ["Role", d.role] : null, ["Email", d.email], d.phone ? ["Phone", d.phone] : null, ["Team size", d.teamSize], d.message ? ["Message", d.message] : null].filter((r): r is string[] => !!r);

export function enquiryGuestEmail(d: EnquiryEmailData): Mail {
  const first = d.fullName.split(" ")[0];
  return {
    subject: "Thank you for your corporate membership enquiry",
    html: shell(`<p>Dear ${esc(first)},</p><p>Thank you for your enquiry on behalf of ${esc(d.company)}. A member of our team will be in touch shortly to discuss how we can help.</p>${rowsTable(enquiryRows(d))}<p>If you would like to add anything, simply reply to this email.</p>`),
    text: `Dear ${first},\n\nThank you for your enquiry on behalf of ${d.company}. A member of our team will be in touch shortly.\n\n${enquiryRows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${siteConfig.name}`,
  };
}

export function enquiryStaffEmail(d: EnquiryEmailData): Mail {
  return {
    subject: `New corporate enquiry: ${d.company} (${d.teamSize})`,
    html: shell(`<p><strong>New corporate membership enquiry</strong></p>${rowsTable(enquiryRows(d))}<p>Reply to this email to contact them directly.</p>`),
    text: `New corporate membership enquiry\n\n${enquiryRows(d).map(([k, v]) => `${k}: ${v}`).join("\n")}`,
  };
}

export const sendEnquiryEmails = (d: EnquiryEmailData) => sendPair(d.email, enquiryGuestEmail(d), enquiryStaffEmail(d));

/**
 * Generic acknowledgement + staff notification for simple forms (contact, careers).
 * `rows` are label/value pairs shown in both emails; values are HTML-escaped.
 */
export function simpleMails(o: { first: string; guestSubject: string; guestLead: string; staffSubject: string; staffTitle: string; rows: string[][] }): { guest: Mail; staff: Mail } {
  const list = o.rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return {
    guest: {
      subject: o.guestSubject,
      html: shell(`<p>Dear ${esc(o.first)},</p><p>${esc(o.guestLead)}</p>${rowsTable(o.rows)}<p>If you would like to add anything, simply reply to this email.</p>`),
      text: `Dear ${o.first},\n\n${o.guestLead}\n\n${list}\n\n${siteConfig.name}`,
    },
    staff: { subject: o.staffSubject, html: shell(`<p><strong>${esc(o.staffTitle)}</strong></p>${rowsTable(o.rows)}<p>Reply to this email to contact them directly.</p>`), text: `${o.staffTitle}\n\n${list}` },
  };
}
EOF
cat << 'EOF' > "src/lib/form-route.ts"
import { NextResponse } from "next/server";
import { rateLimited, type BookingResponse } from "./booking";

export const jsonResponse = (body: BookingResponse, status = 200) => NextResponse.json(body, { status });

/**
 * Shared pre-flight for form API routes: same-origin check, declared-size limit, rate limit.
 * Returns a Response to send back if the request should be rejected, otherwise null.
 */
export function guard(req: Request, key: string, maxBytes = 10_000): NextResponse | null {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return jsonResponse({ ok: false, message: "Request not allowed." }, 403);
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > maxBytes) return jsonResponse({ ok: false, message: "Request too large." }, 413);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${key}:${ip}`)) return jsonResponse({ ok: false, message: "Too many requests. Please try again in a few minutes." }, 429);
  return null;
}
EOF
cat << 'EOF' > "src/lib/types.ts"
import type { PortableTextBlock } from "next-sanity";

export type Img = { src: string; alt: string };

/** Body copy is either Sanity rich text (`body`) or placeholder paragraphs (`paragraphs`). */
export type Facility = {
  slug: string;
  title: string;
  summary: string;
  hero: Img;
  gallery: Img[];
  amenities: string[];
  paragraphs?: string[];
  body?: PortableTextBlock[];
};

export type ClassType = {
  slug: string;
  title: string;
  category: string;
  level: string;
  durationMinutes?: number;
  summary: string;
  image: Img;
  instructors: string[];
  paragraphs?: string[];
  body?: PortableTextBlock[];
};

export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type Day = (typeof DAYS)[number];

export type Session = {
  id: string;
  day: Day;
  startTime: string; // "HH:MM" 24h
  classSlug: string;
  classTitle: string;
  level: string;
  instructor?: string;
  studio?: string;
  durationMinutes?: number;
};

export type Tier = { name: string; text: string; features: string[]; featured?: boolean; ctaLabel?: string };

export type Treatment = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  durationMinutes?: number;
  isSignature: boolean;
  image: Img;
  paragraphs?: string[];
  body?: PortableTextBlock[];
};

export type Faq = { question: string; answer: string; group: string };

export type TeamMember = { slug: string; name: string; group: string; role: string; specialties: string[]; photo: Img; credentials: string[]; paragraphs?: string[]; body?: PortableTextBlock[] };
export type Post = { slug: string; title: string; excerpt: string; publishedAt?: string; category?: string; author?: string; cover: Img; paragraphs?: string[]; body?: PortableTextBlock[] };
export type Testimonial = { quote: string; name: string; detail?: string; featured?: boolean };
export type GalleryItem = { id: string; title: string; kind: "photo" | "video"; category: string; image: Img; videoUrl?: string };
export type Job = { slug: string; title: string; department?: string; employmentType?: string; paragraphs?: string[]; body?: PortableTextBlock[] };
EOF
cat << 'EOF' > "src/sanity/lib/content.ts"
/**
 * CONTENT LAYER: one place that turns Sanity documents into the shapes the pages use,
 * and falls back to placeholder content while Sanity is empty or not connected.
 * Pages never talk to Sanity directly.
 */
import type { PortableTextBlock } from "next-sanity";
import { placeholderFacilities } from "@/content/facilities";
import { placeholderClasses, placeholderSessions } from "@/content/classes";
import { placeholderTiers } from "@/content/membership";
import { placeholderTreatments } from "@/content/spa";
import { placeholderFaqs } from "@/content/faq";
import { placeholderTeam } from "@/content/team";
import { placeholderJournal } from "@/content/journal";
import { placeholderGallery } from "@/content/gallery";
import { testimonials as placeholderTestimonials } from "@/content/home";
import { DAYS, type ClassType, type Day, type Facility, type Faq, type GalleryItem, type Img, type Job, type Post, type Session, type TeamMember, type Testimonial, type Tier, type Treatment } from "@/lib/types";
import { sanityFetch } from "./fetch";
import { urlFor } from "./image";

type SanityImg = { alt?: string; asset?: unknown } | null | undefined;

/** Convert a Sanity image to a sized, auto-format URL. Returns undefined when there is no asset. */
function img(source: SanityImg, w: number, h?: number): Img | undefined {
  if (!source?.asset) return undefined;
  let b = urlFor(source as never).width(w).auto("format");
  if (h) b = b.height(h).fit("crop");
  return { src: b.url(), alt: source.alt ?? "" };
}
const orPlaceholder = (i: Img | undefined, fallback: Img): Img => i ?? fallback;

/* ------------------------------- Facilities ------------------------------- */
type SFacility = { slug: string; title: string; summary?: string; hero?: SanityImg; gallery?: SanityImg[]; amenities?: string[]; description?: PortableTextBlock[] };

export async function getFacilities(): Promise<Facility[]> {
  const docs = await sanityFetch<SFacility[]>(
    `*[_type == "facility" && defined(slug.current)] | order(order asc, title asc){
      "slug": slug.current, title, summary, "hero": heroImage, gallery, amenities, description }`,
  );
  if (!docs.length) return placeholderFacilities;
  return docs.map((d) => ({
    slug: d.slug,
    title: d.title,
    summary: d.summary ?? "",
    hero: orPlaceholder(img(d.hero, 2000, 1200), placeholderFacilities[0].hero),
    gallery: (d.gallery ?? []).map((g) => img(g, 1400, 1000)).filter((x): x is Img => !!x),
    amenities: d.amenities ?? [],
    body: d.description,
  }));
}

export async function getFacility(slug: string) {
  const all = await getFacilities();
  const i = all.findIndex((f) => f.slug === slug);
  if (i === -1) return null;
  return { facility: all[i], next: all[(i + 1) % all.length], total: all.length };
}

/* --------------------------------- Classes -------------------------------- */
type SClass = { slug: string; title: string; category?: string; level?: string; durationMinutes?: number; summary?: string; description?: PortableTextBlock[]; image?: SanityImg; instructors?: (string | null)[] };

export async function getClasses(): Promise<ClassType[]> {
  const docs = await sanityFetch<SClass[]>(
    `*[_type == "classType" && defined(slug.current)] | order(title asc){
      "slug": slug.current, title, category, level, durationMinutes, summary, description, image,
      "instructors": instructors[]->name }`,
  );
  if (!docs.length) return placeholderClasses;
  return docs.map((d) => ({
    slug: d.slug,
    title: d.title,
    category: d.category ?? "Classes",
    level: d.level ?? "All levels",
    durationMinutes: d.durationMinutes,
    summary: d.summary ?? "",
    image: orPlaceholder(img(d.image, 1400, 1000), placeholderClasses[0].image),
    instructors: (d.instructors ?? []).filter((x): x is string => !!x),
    body: d.description,
  }));
}

export async function getClass(slug: string) {
  return (await getClasses()).find((c) => c.slug === slug) ?? null;
}

type SSession = { _id: string; day: Day; startTime: string; studio?: string; instructor?: string; classSlug?: string; classTitle?: string; level?: string; durationMinutes?: number };

export async function getSessions(): Promise<Session[]> {
  const docs = await sanityFetch<SSession[]>(
    `*[_type == "classSession" && defined(class->slug.current)]{
      _id, day, startTime, studio, "instructor": instructor->name,
      "classSlug": class->slug.current, "classTitle": class->title,
      "level": class->level, "durationMinutes": class->durationMinutes }`,
  );
  if (!docs.length) return placeholderSessions;
  return docs
    .map((d) => ({ id: d._id, day: d.day, startTime: d.startTime, classSlug: d.classSlug!, classTitle: d.classTitle!, level: d.level ?? "All levels", instructor: d.instructor, studio: d.studio, durationMinutes: d.durationMinutes }))
    .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.startTime.localeCompare(b.startTime));
}

/* ------------------------------ Membership tiers --------------------------- */
type STier = { name: string; tagline?: string; features?: string[]; isFeatured?: boolean; ctaLabel?: string };

export async function getTiers(): Promise<Tier[]> {
  const docs = await sanityFetch<STier[]>(`*[_type == "membershipTier"] | order(order asc){ name, tagline, features, isFeatured, ctaLabel }`);
  if (!docs.length) return placeholderTiers;
  return docs.map((d) => ({ name: d.name, text: d.tagline ?? "", features: d.features ?? [], featured: !!d.isFeatured, ctaLabel: d.ctaLabel }));
}

/* --------------------------------- Spa ------------------------------------ */
type STreatment = { slug: string; title: string; category?: string; summary?: string; durationMinutes?: number; isSignature?: boolean; image?: SanityImg; description?: PortableTextBlock[] };

export async function getTreatments(): Promise<Treatment[]> {
  const docs = await sanityFetch<STreatment[]>(
    `*[_type == "treatment" && defined(slug.current)] | order(isSignature desc, title asc){
      "slug": slug.current, title, category, summary, durationMinutes, isSignature, image, description }`,
  );
  if (!docs.length) return placeholderTreatments;
  return docs.map((d) => ({
    slug: d.slug, title: d.title, category: d.category ?? "Treatments", summary: d.summary ?? "",
    durationMinutes: d.durationMinutes, isSignature: !!d.isSignature,
    image: orPlaceholder(img(d.image, 1600, 1100), placeholderTreatments[0].image),
    body: d.description,
  }));
}

export async function getTreatment(slug: string) {
  const all = await getTreatments();
  const t = all.find((x) => x.slug === slug);
  if (!t) return null;
  return { treatment: t, related: all.filter((x) => x.slug !== slug).slice(0, 3) };
}

/* ---------------------------------- FAQ ----------------------------------- */
type SFaq = { question: string; answer: string; group?: string };

export async function getFaqs(group?: string): Promise<Faq[]> {
  const docs = await sanityFetch<SFaq[]>(`*[_type == "faqItem"] | order(order asc){ question, answer, group }`);
  const all: Faq[] = docs.length ? docs.map((d) => ({ question: d.question, answer: d.answer, group: d.group ?? "General" })) : placeholderFaqs;
  return group ? all.filter((f) => f.group === group) : all;
}

/* --------------------------------- Team ----------------------------------- */
type STeam = { slug: string; name: string; group?: string; role?: string; specialties?: string[]; photo?: SanityImg; credentials?: string[]; bio?: PortableTextBlock[] };

export async function getTeam(): Promise<TeamMember[]> {
  const docs = await sanityFetch<STeam[]>(
    `*[_type == "teamMember" && defined(slug.current)] | order(order asc, name asc){ "slug": slug.current, name, group, role, specialties, photo, credentials, bio }`,
  );
  if (!docs.length) return placeholderTeam;
  return docs.map((d) => ({ slug: d.slug, name: d.name, group: d.group ?? "Trainer", role: d.role ?? "", specialties: d.specialties ?? [], photo: orPlaceholder(img(d.photo, 1200, 1600), { src: placeholderTeam[0].photo.src, alt: d.name }), credentials: d.credentials ?? [], body: d.bio }));
}
export async function getTeamMember(slug: string) {
  return (await getTeam()).find((t) => t.slug === slug) ?? null;
}

/* -------------------------------- Journal --------------------------------- */
type SPost = { slug: string; title: string; excerpt?: string; publishedAt?: string; category?: string; author?: string; cover?: SanityImg; body?: PortableTextBlock[] };

export async function getPosts(): Promise<Post[]> {
  const docs = await sanityFetch<SPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){ "slug": slug.current, title, excerpt, publishedAt, "category": categories[0]->title, "author": author->name, "cover": coverImage, body }`,
  );
  if (!docs.length) return placeholderJournal;
  return docs.map((d) => ({ slug: d.slug, title: d.title, excerpt: d.excerpt ?? "", publishedAt: d.publishedAt, category: d.category, author: d.author, cover: orPlaceholder(img(d.cover, 1800, 1200), { src: placeholderJournal[0].cover.src, alt: d.title }), body: d.body }));
}
export async function getPost(slug: string) {
  const all = await getPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) return null;
  const related = [...all.filter((p) => p.slug !== slug && p.category === post.category), ...all.filter((p) => p.slug !== slug && p.category !== post.category)].slice(0, 3);
  return { post, related };
}

/* ------------------------------ Testimonials ------------------------------ */
type STestimonial = { quote: string; name: string; detail?: string; featured?: boolean };

/** Only testimonials with confirmed written consent are ever returned. */
export async function getTestimonials(): Promise<Testimonial[]> {
  const docs = await sanityFetch<STestimonial[]>(`*[_type == "testimonial" && consentConfirmed == true] | order(featured desc, _createdAt desc){ quote, name, detail, featured }`);
  return docs.length ? docs : placeholderTestimonials;
}

/* --------------------------------- Gallery -------------------------------- */
type SGallery = { _id: string; title?: string; kind?: "photo" | "video"; category?: string; videoUrl?: string; image?: SanityImg };

export async function getGallery(): Promise<GalleryItem[]> {
  const docs = await sanityFetch<SGallery[]>(`*[_type == "galleryItem"] | order(order asc, _createdAt desc){ _id, title, kind, category, videoUrl, image }`);
  const items = docs.flatMap((d) => {
    const i = img(d.image, 1800);
    return i ? [{ id: d._id, title: d.title ?? i.alt, kind: d.kind ?? "photo", category: d.category ?? "Facilities", image: i, videoUrl: d.videoUrl } as GalleryItem] : [];
  });
  return items.length ? items : placeholderGallery;
}

/* ---------------------------------- Careers ------------------------------- */
type SJob = { slug: string; title: string; department?: string; employmentType?: string; description?: PortableTextBlock[] };

/** Open roles only. An empty list is valid (the page shows an "introduce yourself" state). */
export async function getJobs(): Promise<Job[]> {
  const docs = await sanityFetch<SJob[]>(`*[_type == "jobOpening" && isOpen == true && defined(slug.current)] | order(_createdAt desc){ "slug": slug.current, title, department, employmentType, description }`);
  return docs.map((d) => ({ slug: d.slug, title: d.title, department: d.department, employmentType: d.employmentType, body: d.description }));
}
EOF
cat << 'EOF' > "src/sanity/schemaTypes/content.ts"
import { defineField, defineType } from "sanity";
import { slugField } from "./shared";

/** Compact helper so every document gets consistent titles/previews. */
const media = (name = "image", title = "Image") => defineField({ name, title, type: "imageWithAlt" });

/* ------------------------------------------------------------------ */
/* Site-wide settings (singleton)                                      */
/* ------------------------------------------------------------------ */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "address", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "whatsapp", type: "string" }),
    defineField({ name: "email", type: "string", validation: (r) => r.email() }),
    defineField({ name: "mapsUrl", title: "Google Maps link", type: "url" }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "days", type: "string" }), defineField({ name: "time", type: "string" })], preview: { select: { title: "days", subtitle: "time" } } }],
    }),
    defineField({ name: "calendlyUrl", title: "Calendly link (Book a Tour)", type: "url" }),
    defineField({ name: "instagram", type: "url" }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

/* ------------------------------------------------------------------ */
/* Classes                                                             */
/* ------------------------------------------------------------------ */
export const classType = defineType({
  name: "classType",
  title: "Class",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "category", type: "string", options: { list: ["Strength", "Conditioning", "Mind and body", "Studio cycling", "Aqua", "Personal training"] } }),
    defineField({ name: "level", type: "string", options: { list: ["All levels", "Beginner", "Intermediate", "Advanced"] } }),
    defineField({ name: "durationMinutes", type: "number", validation: (r) => r.min(10).max(180) }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required().max(240) }),
    defineField({ name: "description", type: "richText" }),
    media(),
    defineField({ name: "instructors", type: "array", of: [{ type: "reference", to: [{ type: "teamMember" }] }] }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

export const classSession = defineType({
  name: "classSession",
  title: "Class session (schedule)",
  type: "document",
  description: "One recurring slot in the weekly schedule.",
  fields: [
    defineField({ name: "class", type: "reference", to: [{ type: "classType" }], validation: (r) => r.required() }),
    defineField({ name: "day", type: "string", options: { list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] }, validation: (r) => r.required() }),
    defineField({ name: "startTime", type: "string", description: "24-hour time, e.g. 07:30", validation: (r) => r.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/, { name: "HH:MM" }) }),
    defineField({ name: "instructor", type: "reference", to: [{ type: "teamMember" }] }),
    defineField({ name: "studio", type: "string" }),
  ],
  preview: { select: { title: "class.title", day: "day", time: "startTime" }, prepare: ({ title, day, time }) => ({ title, subtitle: `${day} ${time}` }) },
});

/**
 * Class booking SUBMISSIONS. Stored in the PRIVATE "bookings" dataset (see sanity.config.ts),
 * created only by the server-side API route, never by the browser.
 * Class details are stored as plain text because the datasets are separate (no references).
 */
export const classBooking = defineType({
  name: "classBooking",
  title: "Class booking",
  type: "document",
  fields: [
    defineField({ name: "classSlug", type: "string", readOnly: true }),
    defineField({ name: "classTitle", type: "string", readOnly: true }),
    defineField({ name: "sessionLabel", type: "string", readOnly: true }),
    defineField({ name: "preferredDate", type: "date", readOnly: true }),
    defineField({ name: "fullName", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "isMember", title: "Is a member", type: "boolean", readOnly: true }),
    defineField({ name: "notes", type: "text", readOnly: true }),
    defineField({ name: "emailStatus", type: "string", readOnly: true }),
    defineField({ name: "status", type: "string", options: { list: ["new", "confirmed", "cancelled"] }, initialValue: "new" }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: { select: { title: "fullName", subtitle: "classTitle" } },
});

/** Corporate membership ENQUIRIES. Stored in the PRIVATE "bookings" dataset, created only by the server route. */
export const corporateEnquiry = defineType({
  name: "corporateEnquiry",
  title: "Corporate enquiry",
  type: "document",
  fields: [
    defineField({ name: "company", type: "string", readOnly: true }),
    defineField({ name: "fullName", type: "string", readOnly: true }),
    defineField({ name: "role", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "teamSize", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", readOnly: true }),
    defineField({ name: "emailStatus", type: "string", readOnly: true }),
    defineField({ name: "status", type: "string", options: { list: ["new", "contacted", "closed"] }, initialValue: "new" }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: { select: { title: "company", subtitle: "fullName" } },
});

/** General contact messages. PRIVATE dataset, created only by the server route. */
export const contactMessage = defineType({
  name: "contactMessage",
  title: "Contact message",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "topic", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", readOnly: true }),
    defineField({ name: "emailStatus", type: "string", readOnly: true }),
    defineField({ name: "status", type: "string", options: { list: ["new", "replied", "closed"] }, initialValue: "new" }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: { select: { title: "fullName", subtitle: "topic" } },
});

/** Job applications, including the uploaded CV (private dataset assets are not public). */
export const jobApplication = defineType({
  name: "jobApplication",
  title: "Job application",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "phone", type: "string", readOnly: true }),
    defineField({ name: "position", type: "string", readOnly: true }),
    defineField({ name: "message", type: "text", readOnly: true }),
    defineField({ name: "cv", title: "CV", type: "file", readOnly: true }),
    defineField({ name: "emailStatus", type: "string", readOnly: true }),
    defineField({ name: "status", type: "string", options: { list: ["new", "reviewing", "interview", "rejected", "hired"] }, initialValue: "new" }),
    defineField({ name: "submittedAt", type: "datetime", readOnly: true }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: { select: { title: "fullName", subtitle: "position" } },
});

/* ------------------------------------------------------------------ */
/* People, places, offers                                              */
/* ------------------------------------------------------------------ */
export const teamMember = defineType({
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    slugField("name"),
    defineField({ name: "group", type: "string", options: { list: ["Trainer", "Therapist", "Leadership", "Front of house"], layout: "radio" }, validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "specialties", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    media("photo", "Portrait (3:4)"),
    defineField({ name: "bio", type: "richText" }),
    defineField({ name: "credentials", type: "array", of: [{ type: "string" }], description: "Only list verified qualifications." }),
    defineField({ name: "order", type: "number", description: "Lower numbers appear first." }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "photo" } },
});

export const facility = defineType({
  name: "facility",
  title: "Facility",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.max(240) }),
    media("heroImage", "Hero image"),
    defineField({ name: "description", type: "richText" }),
    defineField({ name: "gallery", type: "array", of: [{ type: "imageWithAlt" }] }),
    defineField({ name: "amenities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", media: "heroImage" } },
});

export const treatment = defineType({
  name: "treatment",
  title: "Spa treatment",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "category", type: "string", options: { list: ["Bath rituals", "Massage", "Facials and body", "Journeys"] } }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.max(240) }),
    defineField({ name: "durationMinutes", type: "number", description: "Optional. Leave empty until confirmed." }),
    media(),
    defineField({ name: "description", type: "richText" }),
    defineField({ name: "isSignature", title: "Signature experience", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

/** Pricing is NOT published: tiers carry a CTA, not a price (client decision). */
export const membershipTier = defineType({
  name: "membershipTier",
  title: "Membership tier",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "isFeatured", type: "boolean", initialValue: false }),
    defineField({ name: "ctaLabel", type: "string", initialValue: "Contact us for rates" }),
    defineField({ name: "order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "tagline" } },
});

/* ------------------------------------------------------------------ */
/* Journal                                                             */
/* ------------------------------------------------------------------ */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [defineField({ name: "name", type: "string", validation: (r) => r.required() }), media("photo", "Photo"), defineField({ name: "bio", type: "text", rows: 3 })],
  preview: { select: { title: "name", media: "photo" } },
});

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [defineField({ name: "title", type: "string", validation: (r) => r.required() }), slugField()],
});

export const post = defineType({
  name: "post",
  title: "Journal post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required().max(240) }),
    media("coverImage", "Cover image (3:2)"),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] }),
    defineField({ name: "body", type: "richText" }),
    defineField({ name: "seo", type: "seo" }),
  ],
  orderings: [{ title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "coverImage" } },
});

/* ------------------------------------------------------------------ */
/* Gallery, social proof, FAQ, careers                                 */
/* ------------------------------------------------------------------ */
export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "kind", type: "string", options: { list: ["photo", "video"], layout: "radio" }, initialValue: "photo" }),
    media("image", "Photo or video poster frame"),
    defineField({ name: "videoUrl", type: "url", description: "Video CDN link (Mux/Cloudinary). Only for videos." }),
    defineField({ name: "category", type: "string", options: { list: ["Facilities", "Spa", "Classes", "Community"] } }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", type: "string", description: "e.g. Member since 2023" }),
    media("photo", "Photo (optional)"),
    defineField({ name: "consentConfirmed", title: "Written consent received", type: "boolean", initialValue: false, validation: (r) => r.custom((v) => v === true || "Confirm you hold written consent before publishing.") }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "name", subtitle: "quote" } },
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "group", type: "string", options: { list: ["Membership", "Classes", "Spa", "Facilities", "Policies"] } }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "question", subtitle: "group" } },
});

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "department", type: "string" }),
    defineField({ name: "employmentType", type: "string", options: { list: ["Full-time", "Part-time", "Contract"] } }),
    defineField({ name: "description", type: "richText" }),
    defineField({ name: "isOpen", title: "Accepting applications", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "department" } },
});
EOF
cat << 'EOF' > "src/sanity/schemaTypes/index.ts"
import type { SchemaTypeDefinition } from "sanity";
import { imageWithAlt, richText, seo } from "./shared";
import * as content from "./content";

const { classBooking, corporateEnquiry, contactMessage, jobApplication, ...publicContent } = content;

/** Public content workspace: shared building blocks first, then documents. */
export const schemaTypes: SchemaTypeDefinition[] = [imageWithAlt, richText, seo, ...Object.values(publicContent)];

/** Private bookings workspace: form submissions only (class bookings, corporate enquiries, contact messages, job applications). */
export const bookingSchemaTypes: SchemaTypeDefinition[] = [classBooking, corporateEnquiry, contactMessage, jobApplication];
EOF
echo "Wrote 57 files."
