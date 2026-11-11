import { z } from "zod";
import { applicationSchema, CV_EXTENSIONS, looksLikeCv, MAX_CV_BYTES } from "@/lib/careers";
import { sendPair, simpleMails } from "@/lib/email";
import { guard, jsonResponse as json } from "@/lib/form-route";
import { writeClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/careers (multipart/form-data): application with an optional CV.
 * Guard -> validate fields -> validate the file (size, extension AND real content) ->
 * upload the CV to the PRIVATE bookings dataset -> store the application -> email (CV attached for staff).
 */
export async function POST(req: Request) {
  const blocked = guard(req, "careers", MAX_CV_BYTES + 100_000);
  if (blocked) return blocked;

  let form: FormData;
  try { form = await req.formData(); } catch { return json({ ok: false, message: "Invalid request." }, 400); }

  const text = (k: string) => { const v = form.get(k); return typeof v === "string" && v.trim() ? v : undefined; };
  const parsed = applicationSchema.safeParse({ fullName: text("fullName"), email: text("email"), phone: text("phone"), position: text("position"), message: text("message"), website: text("website") });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const [k, v] of Object.entries(z.flattenError(parsed.error).fieldErrors)) if (v?.[0]) errors[k] = v[0];
    return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
  }
  const d = parsed.data;
  if (d.website) return json({ ok: true });

  // Optional CV.
  let cv: { name: string; type: string; buffer: Buffer } | undefined;
  const file = form.get("cv");
  if (file instanceof File && file.size > 0) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!(CV_EXTENSIONS as readonly string[]).includes(ext)) return json({ ok: false, message: "Please check the highlighted fields.", errors: { cv: "Upload a PDF or Word document." } }, 422);
    if (file.size > MAX_CV_BYTES) return json({ ok: false, message: "Please check the highlighted fields.", errors: { cv: "Please upload a file under 4 MB." } }, 422);
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!looksLikeCv(ext, buffer)) return json({ ok: false, message: "Please check the highlighted fields.", errors: { cv: "That file does not look like a valid PDF or Word document." } }, 422);
    cv = { name: file.name.replace(/[^\w.\- ]/g, "_").slice(0, 120), type: file.type || "application/octet-stream", buffer };
  }

  if (!isSanityConfigured || !process.env.SANITY_API_WRITE_TOKEN) {
    console.error("[careers] Sanity is not configured; cannot store application.");
    return json({ ok: false, message: "Applications are temporarily unavailable. Please contact the club directly." }, 503);
  }

  try {
    const asset = cv ? await writeClient.assets.upload("file", cv.buffer, { filename: cv.name, contentType: cv.type }) : undefined;
    const doc = await writeClient.create({
      _type: "jobApplication", fullName: d.fullName, email: d.email, phone: d.phone, position: d.position, message: d.message,
      ...(asset ? { cv: { _type: "file", asset: { _type: "reference", _ref: asset._id } } } : {}),
      status: "new", submittedAt: new Date().toISOString(),
    });
    const mails = simpleMails({
      first: d.fullName.split(" ")[0], guestSubject: "We've received your application", guestLead: "Thank you for your interest in joining the team. We have received your application and will be in touch if there is a suitable opportunity.",
      staffSubject: `New application: ${d.position ?? "General"}`, staffTitle: "New job application",
      rows: [["Name", d.fullName], ["Email", d.email], ...(d.phone ? [["Phone", d.phone]] : []), ["Position", d.position ?? "General introduction"], ...(d.message ? [["Message", d.message]] : []), ["CV", cv ? cv.name : "Not provided"]],
    });
    if (cv) mails.staff.attachments = [{ filename: cv.name, content: cv.buffer }];
    const sent = await sendPair(d.email, mails.guest, mails.staff);
    await writeClient.patch(doc._id).set({ emailStatus: `guest:${sent.guest ? "sent" : "failed"} staff:${sent.staff ? "sent" : "failed"}` }).commit().catch(() => undefined);
    return json({ ok: true });
  } catch (error) {
    console.error("[careers] Failed to store application:", error);
    return json({ ok: false, message: "We could not save your application. Please try again or contact the club directly." }, 500);
  }
}
