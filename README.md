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
