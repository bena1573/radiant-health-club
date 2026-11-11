import type { ReactNode } from "react";

/** Shared form building blocks (light surfaces). */
export const inputClass = "mt-2 block min-h-12 w-full border border-stone-300 bg-white px-4 text-ink-950 transition-colors focus:border-ink-950";

export const fieldProps = (errors: Record<string, string>, name: string) => ({
  "aria-invalid": errors[name] ? (true as const) : undefined,
  "aria-describedby": errors[name] ? `${name}-error` : undefined,
});

export function FieldError({ errors, name }: { errors: Record<string, string>; name: string }) {
  return errors[name] ? <p id={`${name}-error`} className="mt-2 text-sm text-error">{errors[name]}</p> : null;
}

/** Hidden spam trap. People never see it; bots fill it in. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

export function SuccessPanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="border border-stone-300 p-8 md:p-12">
      <h2 className="text-h2">{title}</h2>
      <p className="mt-5 max-w-[48ch] text-lead text-stone-500">{children}</p>
    </div>
  );
}
