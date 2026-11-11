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
