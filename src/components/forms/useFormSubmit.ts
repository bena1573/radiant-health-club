"use client";

import { useState } from "react";
import type { BookingResponse } from "@/lib/booking";

/** Shared client-side submit logic for forms: status, top-level message and per-field errors. */
export function useFormSubmit() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(url: string, body: { json?: unknown; formData?: FormData }) {
    setStatus("sending");
    setErrors({});
    try {
      const res = await fetch(url, body.formData ? { method: "POST", body: body.formData } : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body.json) });
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
  return { status, message, errors, submit };
}
