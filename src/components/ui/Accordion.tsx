export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-stone-300 border-y border-stone-300">
      {items.map((it) => (
        <details key={it.question} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-serif text-h3 font-light marker:hidden [&::-webkit-details-marker]:hidden">
            {it.question}
            <span aria-hidden className="relative h-4 w-4 shrink-0">
              <span className="absolute inset-x-0 top-1/2 h-px bg-current" />
              <span className="absolute inset-y-0 left-1/2 w-px bg-current transition-transform duration-500 ease-luxe group-open:rotate-90" />
            </span>
          </summary>
          <p className="max-w-[62ch] pb-6 text-stone-500">{it.answer}</p>
        </details>
      ))}
    </div>
  );
}