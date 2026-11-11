import { Header } from "./Header";
import { Footer } from "./Footer";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

/** Public site chrome: skip link, sticky header, main landmark, footer. Shared by the site layout and the 404 page. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-ivory-50 font-sans text-ink-950">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-champagne-400 focus:px-4 focus:py-3 focus:text-ink-950"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <LocalBusinessJsonLd />
    </div>
  );
}
