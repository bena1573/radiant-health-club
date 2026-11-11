import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Sanity-hosted images. Add your video CDN (Mux/Cloudinary) here later.
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      // TEMPORARY placeholder photography. Remove once Sanity/club assets replace it.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Sanity Studio ships styled-components; this keeps it happy in the App Router.
  compiler: { styledComponents: true },
  poweredByHeader: false,
};

export default nextConfig;
