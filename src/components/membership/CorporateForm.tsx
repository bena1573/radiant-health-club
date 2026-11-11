"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { BookingResponse } from "@/lib/booking";
import { TEAM_SIZES } from "@/lib/corporate";

/** CORPORATE ENQUIRY FORM: posts to /api/corporate-enquiry (validated again on the server). Same a11y pattern as the booking form. */
export function CorporateForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch("/api/corporate-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: f.get("company"), fullName: f.get("fullName"), role: f.get("role") || undefined,
          email: f.get("email"), phone: f.get("phone") || undefined, teamSize: f.get("teamSize") || undefined,
          message: f.get("message") || undefined, website: f.get("website") || undefined,
        }),
      });
      const data = (await res.json()) as BookingResponse;
      if (data.ok) { setStatus("done"); return; }
      setErrors(data.errors ?? {});
      setMessage(data.message);
      setStatus("error");
    } catch {
      setMessage("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="border border-stone-300 p-8 md:p-12">
        <h2 className="text-h2">Thank you.</h2>
        <p className="mt-5 max-w-[48ch] text-lead text-stone-500">Your enquiry has been received. A member of our team will be in touch shortly, and a copy has been sent to your email.</p>
      </div>
    );
  }

  const input = "mt-2 block min-h-12 w-full border border-stone-300 bg-white px-4 text-ink-950 transition-colors focus:border-ink-950";
  const field = (n: string) => ({ "aria-invalid": errors[n] ? true : undefined, "aria-describedby": errors[n] ? `${n}-error` : undefined });
  const err = (n: string) => errors[n] && <p id={`${n}-error`} className="mt-2 text-sm text-error">{errors[n]}</p>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {status === "error" && <p role="alert" className="border border-error p-4 text-sm text-error">{message}</p>}
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block text-sm sm:col-span-2">Company
          <input type="text" name="company" required autoComplete="organization" className={input} {...field("company")} />{err("company")}
        </label>
        <label className="block text-sm">Your name
          <input type="text" name="fullName" required autoComplete="name" className={input} {...field("fullName")} />{err("fullName")}
        </label>
        <label className="block text-sm">Your role (optional)
          <input type="text" name="role" autoComplete="organization-title" className={input} />
        </label>
        <label className="block text-sm">Work email
          <input type="email" name="email" required autoComplete="email" className={input} {...field("email")} />{err("email")}
        </label>
        <label className="block text-sm">Phone (optional)
          <input type="tel" name="phone" autoComplete="tel" className={input} />
        </label>
        <label className="block text-sm sm:col-span-2">Approximate team size
          <select name="teamSize" required defaultValue="" className={input} {...field("teamSize")}>
            <option value="" disabled>Select</option>
            {TEAM_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>{err("teamSize")}
        </label>
        <label className="block text-sm sm:col-span-2">How can we help? (optional)
          <textarea name="message" rows={5} maxLength={1500} className={input} {...field("message")} />{err("message")}
        </label>
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div>
        <Button type="submit" size="lg" tone="light" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send enquiry"}</Button>
        <p className="mt-4 max-w-[52ch] text-sm text-stone-500">We use your details only to respond to your enquiry.</p>
      </div>
    </form>
  );
}
