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
