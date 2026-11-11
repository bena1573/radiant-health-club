import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import { siteConfig } from "@/config/site";

/**
 * ROOT LAYOUT: html/body, global CSS and default metadata only.
 * The public site chrome (header/footer) lives in app/(site)/layout.tsx so the
 * CMS Studio at /studio doesn't inherit it. Fonts are self-hosted via Fontsource
 * (no third-party requests).
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Addis Ababa`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#0d0c0a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
