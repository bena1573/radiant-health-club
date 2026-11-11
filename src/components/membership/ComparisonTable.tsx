import type { Tier } from "@/lib/types";

const Check = () => <><svg aria-hidden width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-champagne-600"><path d="m3.5 9.5 3.5 3.5 7.5-8" /></svg><span className="sr-only">Included</span></>;
const Dash = () => <><span aria-hidden className="mx-auto block h-px w-4 bg-stone-300" /><span className="sr-only">Not included</span></>;

export function ComparisonTable({ tiers }: { tiers: Tier[] }) {
  const rows = Array.from(new Set(tiers.flatMap((t) => t.features)));
  if (!rows.length) return null;
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead><tr className="border-b border-ink-950"><th scope="col" className="py-5 pr-6 text-label font-semibold uppercase text-stone-500">Included</th>{tiers.map((t) => <th key={t.name} scope="col" className="px-4 py-5 text-center font-serif text-h3 font-light">{t.name}</th>)}</tr></thead>
          <tbody>{rows.map((r) => (<tr key={r} className="border-b border-stone-300"><th scope="row" className="py-4 pr-6 font-normal text-stone-500">{r}</th>{tiers.map((t) => <td key={t.name} className="px-4 py-4 text-center">{t.features.includes(r) ? <Check /> : <Dash />}</td>)}</tr>))}</tbody>
        </table>
      </div>
      <div className="space-y-10 md:hidden">{tiers.map((t) => (<section key={t.name} aria-label={`${t.name} includes`}><h3 className="border-b border-ink-950 pb-3 text-h3">{t.name}</h3><ul className="divide-y divide-stone-300">{t.features.map((f) => <li key={f} className="py-3 text-stone-500">{f}</li>)}</ul></section>))}</div>
    </>
  );
}