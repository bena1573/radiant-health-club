"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError, Honeypot, SuccessPanel, fieldProps, inputClass } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";

/** CAREERS APPLICATION FORM (multipart, optional CV up to 4 MB). Posts to /api/careers. */
export function ApplicationForm({ positions }: { positions: string[] }) {
  const { status, message, errors, submit } = useFormSubmit();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    void submit("/api/careers", { formData: f });
  }

  if (status === "done") return <SuccessPanel title="Application received.">Thank you. We have sent a confirmation to your email and will be in touch if there is a suitable opportunity.</SuccessPanel>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8" encType="multipart/form-data">
      {status === "error" && <p role="alert" className="border border-error p-4 text-sm text-error">{message}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-sm">Full name<input type="text" name="fullName" required autoComplete="name" className={inputClass} {...fieldProps(errors, "fullName")} /><FieldError errors={errors} name="fullName" /></label>
        <label className="block text-sm">Email<input type="email" name="email" required autoComplete="email" className={inputClass} {...fieldProps(errors, "email")} /><FieldError errors={errors} name="email" /></label>
        <label className="block text-sm">Phone (optional)<input type="tel" name="phone" autoComplete="tel" className={inputClass} /></label>
        <label className="block text-sm">Position
          <select name="position" defaultValue="" className={inputClass}>
            <option value="">General introduction</option>{positions.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">Tell us about yourself (optional)<textarea name="message" rows={5} maxLength={2000} className={inputClass} {...fieldProps(errors, "message")} /><FieldError errors={errors} name="message" /></label>
        <label className="block text-sm sm:col-span-2">CV (optional, PDF or Word, up to 4 MB)
          <input type="file" name="cv" accept=".pdf,.doc,.docx" className={`${inputClass} py-3`} {...fieldProps(errors, "cv")} /><FieldError errors={errors} name="cv" />
        </label>
      </div>
      <Honeypot />
      <div>
        <Button type="submit" size="lg" tone="light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Submit application"}</Button>
        <p className="mt-4 max-w-[52ch] text-sm text-stone-500">We use your details only to consider your application.</p>
      </div>
    </form>
  );
}
