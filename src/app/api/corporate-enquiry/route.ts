import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimited, type BookingResponse } from "@/lib/booking";
import { enquirySchema } from "@/lib/corporate";
import { sendEnquiryEmails } from "@/lib/email";
import { writeClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: BookingResponse, status = 200) => NextResponse.json(body, { status });

/**
 * POST /api/corporate-enquiry: same safeguards and flow as /api/class-booking.
 * same-origin check, size limit, rate limit, honeypot, zod validation, private storage, then Resend emails.
 * Fails loudly if it cannot store the enquiry. It never pretends to succeed.
 */
export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return json({ ok: false, message: "Request not allowed." }, 403);

  const raw = await req.text();
  if (raw.length > 10_000) return json({ ok: false, message: "Request too large." }, 413);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`corporate:${ip}`)) return json({ ok: false, message: "Too many requests. Please try again in a few minutes." }, 429);

  let body: unknown;
  try { body = JSON.parse(raw); } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(z.flattenError(parsed.error).fieldErrors)) if (v?.[0]) errors[k] = v[0];
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;
  if (d.website) return json({ ok: true }); // bot: pretend success, store nothing

  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[corporate] Sanity is not configured; cannot store enquiry.");
    return json({ ok: false, message: "Online enquiries are temporarily unavailable. Please contact the club directly." }, 503);
  }

  try {
    const doc = await writeClient.create({
      _type: "corporateEnquiry",
      company: d.company, fullName: d.fullName, role: d.role || undefined, email: d.email,
      phone: d.phone || undefined, teamSize: d.teamSize, message: d.message || undefined,
      status: "new", submittedAt: new Date().toISOString(),
    });
    const sent = await sendEnquiryEmails({ company: d.company, fullName: d.fullName, role: d.role || undefined, email: d.email, phone: d.phone || undefined, teamSize: d.teamSize, message: d.message || undefined });
    await writeClient.patch(doc._id).set({ emailStatus: `guest:${sent.guest ? "sent" : "failed"} staff:${sent.staff ? "sent" : "failed"}` }).commit().catch(() => undefined);
    return json({ ok: true });
  } catch (error) {
    console.error("[corporate] Failed to store enquiry:", error);
    return json({ ok: false, message: "We could not save your enquiry. Please try again or contact the club directly." }, 500);
  }
}
