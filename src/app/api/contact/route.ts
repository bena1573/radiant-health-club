import { z } from "zod";
import { contactSchema } from "@/lib/contact";
import { sendPair, simpleMails } from "@/lib/email";
import { guard, jsonResponse as json } from "@/lib/form-route";
import { writeClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** POST /api/contact: guard, validate, store privately, email. Fails loudly if it cannot store the message. */
export async function POST(req: Request) {
  const blocked = guard(req, "contact");
  if (blocked) return blocked;

  let body: unknown;
  try { body = await req.json(); } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(z.flattenError(parsed.error).fieldErrors)) if (v?.[0]) errors[k] = v[0];
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;
  if (d.website) return json({ ok: true });

  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[contact] Sanity is not configured; cannot store message.");
    return json({ ok: false, message: "Messages are temporarily unavailable. Please contact the club directly." }, 503);
  }
  try {
    const doc = await writeClient.create({ _type: "contactMessage", fullName: d.fullName, email: d.email, phone: d.phone || undefined, topic: d.topic, message: d.message, status: "new", submittedAt: new Date().toISOString() });
    const mails = simpleMails({
      first: d.fullName.split(" ")[0], guestSubject: "We've received your message", guestLead: "Thank you for getting in touch. A member of our team will reply shortly.",
      staffSubject: `New message: ${d.topic}`, staffTitle: "New contact message",
      rows: [["Name", d.fullName], ["Email", d.email], ...(d.phone ? [["Phone", d.phone]] : []), ["Topic", d.topic], ["Message", d.message]],
    });
    const sent = await sendPair(d.email, mails.guest, mails.staff);
    await writeClient.patch(doc._id).set({ emailStatus: `guest:${sent.guest ? "sent" : "failed"} staff:${sent.staff ? "sent" : "failed"}` }).commit().catch(() => undefined);
    return json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to store message:", error);
    return json({ ok: false, message: "We could not send your message. Please try again or contact the club directly." }, 500);
  }
}
