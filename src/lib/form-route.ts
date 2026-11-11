import { NextResponse } from "next/server";
import { rateLimited, type BookingResponse } from "./booking";

export const jsonResponse = (body: BookingResponse, status = 200) => NextResponse.json(body, { status });

/**
 * Shared pre-flight for form API routes: same-origin check, declared-size limit, rate limit.
 * Returns a Response to send back if the request should be rejected, otherwise null.
 */
export function guard(req: Request, key: string, maxBytes = 10_000): NextResponse | null {
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) return jsonResponse({ ok: false, message: "Request not allowed." }, 403);
  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > maxBytes) return jsonResponse({ ok: false, message: "Request too large." }, 413);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(`${key}:${ip}`)) return jsonResponse({ ok: false, message: "Too many requests. Please try again in a few minutes." }, 429);
  return null;
}
