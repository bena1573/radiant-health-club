import { client } from "./client";
import { isSanityConfigured } from "../env";
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}, fallback: unknown = []): Promise<T> {
  if (!isSanityConfigured) return fallback as T;
  try { return await client.fetch<T>(query, params, { next: { revalidate: 60 } }); } catch { return fallback as T; }
}
