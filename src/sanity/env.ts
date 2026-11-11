/** Sanity environment values. Missing project ID = CMS not connected yet; the site still builds. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
export const isSanityConfigured = projectId.length > 0;

/** Private dataset for booking submissions (contains personal data). Create it as PRIVATE in Sanity. */
export const bookingsDataset = process.env.SANITY_BOOKINGS_DATASET ?? "bookings";