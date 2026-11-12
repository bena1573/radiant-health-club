import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: "is5yfv70",
    NEXT_PUBLIC_SANITY_DATASET: "production",
    NEXT_PUBLIC_SANITY_API_VERSION: "2025-01-01",
    SANITY_BOOKINGS_DATASET: "bookings",
    NEXT_PUBLIC_SITE_URL: "https://radiant-health-club-j5loethon-unity-tech.vercel.app",
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  compiler: { styledComponents: true },
  poweredByHeader: false,
};

export default nextConfig;