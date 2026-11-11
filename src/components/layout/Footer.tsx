import Link from "next/link";
import { footerNav, legalNav, siteConfig } from "@/config/site";
import { isPlaceholder } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

/**
 * FOOTER: server component. Contact facts come from siteConfig,
 * so one edit updates every page. Unconfirmed facts show as [PLACEHOLDER].
 * Newsletter signup is intentionally not here yet: it needs a real provider
 * (see README, "Open items") and we don't ship fake forms.
 */
export function Footer() {
  const { contact, hours, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ivory-50">
      <Container wide className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs font-serif text-2xl font-light leading-snug text-stone-300">{siteConfig.tagline}</p>
            <Button href="/book-a-tour" variant="secondary" className="mt-8">
              Book a Tour
            </Button>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-sans text-label font-semibold uppercase text-champagne-400">{group.title}</h2>
                <ul className="mt-5 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-stone-300 transition-colors hover:text-ivory-50">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <address className="not-italic lg:col-span-3">
            <h2 className="font-sans text-label font-semibold uppercase text-champagne-400">Visit</h2>
            <p className="mt-5 text-sm leading-relaxed text-stone-300">
              {contact.address}
              <br />
              {contact.city}, {contact.country}
            </p>
            <dl className="mt-5 space-y-1 text-sm text-stone-300">
              {hours.map((h) => (
                <div key={h.days} className="flex flex-col">
                  <dt className="text-ivory-50">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 space-y-1 text-sm text-stone-300">
              {isPlaceholder(contact.phone) ? contact.phone : <a className="hover:text-ivory-50" href={`tel:${contact.phone}`}>{contact.phone}</a>}
              <br />
              {isPlaceholder(contact.email) ? contact.email : <a className="hover:text-ivory-50" href={`mailto:${contact.email}`}>{contact.email}</a>}
            </p>
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-sm text-champagne-400 underline underline-offset-8 hover:text-champagne-200"
            >
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </address>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-ink-700 pt-8 text-xs text-stone-500 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-ivory-50">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
