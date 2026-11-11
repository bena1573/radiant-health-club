import { PortableText, type PortableTextBlock, type PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 first:mt-0">{children}</p>,
    h2: ({ children }) => <h2 className="mt-12 text-h2 first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 text-h3 first:mt-0">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="mt-8 border-l border-champagne-400 pl-6 font-serif text-h3 font-light">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-champagne-600 underline underline-offset-4 hover:text-ink-950">{children}</a>
    ),
  },
};

export function RichText({ body, paragraphs }: { body?: PortableTextBlock[]; paragraphs?: string[] }) {
  return (
    <div className="max-w-[62ch] text-lead text-stone-500">
      {body?.length ? <PortableText value={body} components={components} /> : paragraphs?.map((p, i) => <p key={i} className="mt-6 first:mt-0">{p}</p>)}
    </div>
  );
}