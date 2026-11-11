"use client";

import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FieldError, Honeypot, SuccessPanel, fieldProps, inputClass } from "@/components/forms/fields";
import { useFormSubmit } from "@/components/forms/useFormSubmit";
import { TOPICS } from "@/lib/contact";

/** CONTACT FORM: posts to /api/contact (validated again on the server). */
export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const { status, message, errors, submit } = useFormSubmit();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    void submit("/api/contact", { json: { fullName: f.get("fullName"), email: f.get("email"), phone: f.get("phone") || undefined, topic: f.get("topic") || undefined, message: f.get("message"), website: f.get("website") || undefined } });
  }

  if (status === "done") return <SuccessPanel title="Message sent.">Thank you. We have sent a confirmation to your email and will reply shortly.</SuccessPanel>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {status === "error" && <p role="alert" className="border border-error p-4 text-sm text-error">{message}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-sm">Full name<input type="text" name="fullName" required autoComplete="name" className={inputClass} {...fieldProps(errors, "fullName")} /><FieldError errors={errors} name="fullName" /></label>
        <label className="block text-sm">Email<input type="email" name="email" required autoComplete="email" className={inputClass} {...fieldProps(errors, "email")} /><FieldError errors={errors} name="email" /></label>
        <label className="block text-sm">Phone (optional)<input type="tel" name="phone" autoComplete="tel" className={inputClass} /></label>
        <label className="block text-sm">Topic
          <select name="topic" required defaultValue={TOPICS.includes(defaultTopic as (typeof TOPICS)[number]) ? defaultTopic : ""} className={inputClass} {...fieldProps(errors, "topic")}>
            <option value="" disabled>Select</option>{TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select><FieldError errors={errors} name="topic" />
        </label>
        <label className="block text-sm sm:col-span-2">Message<textarea name="message" rows={6} required maxLength={2000} className={inputClass} {...fieldProps(errors, "message")} /><FieldError errors={errors} name="message" /></label>
      </div>
      <Honeypot />
      <div>
        <Button type="submit" size="lg" tone="light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message"}</Button>
        <p className="mt-4 max-w-[52ch] text-sm text-stone-500">We use your details only to reply to your message.</p>
      </div>
    </form>
  );
}
