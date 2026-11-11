import { z } from "zod";
import { addDays, todayInAddis } from "./format";

/** Max days ahead a class can be requested. */
export const MAX_DAYS_AHEAD = 60;

/** Server-side validation for the class-booking form. Never trust the browser. */
export const bookingSchema = z.object({
  classSlug: z.string().trim().min(1, "Choose a class.").max(100),
  sessionId: z.string().trim().max(120).optional(),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date.")
    .refine((d) => d >= todayInAddis(), "Choose today or a future date.")
    .refine((d) => d <= addDays(todayInAddis(), MAX_DAYS_AHEAD), `Choose a date within the next ${MAX_DAYS_AHEAD} days.`),
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.string().email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  isMember: z.boolean(),
  notes: z.string().trim().max(1000, "Please keep notes under 1000 characters.").optional(),
  website: z.string().max(200).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export type BookingResponse =
  | { ok: true }
  | { ok: false; message: string; errors?: Record<string, string> };

const hits = new Map<string, number[]>();
export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  return recent.length > limit;
}