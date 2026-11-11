import { z } from "zod";

export const MAX_CV_BYTES = 4 * 1024 * 1024; // 4 MB: stays under typical serverless request limits (~4.5 MB)
export const CV_EXTENSIONS = ["pdf", "doc", "docx"] as const;

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100),
  email: z.email("Enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional(),
  position: z.string().trim().max(150).optional(),
  message: z.string().trim().max(2000, "Please keep your message under 2000 characters.").optional(),
  website: z.string().max(200).optional(), // honeypot
});

/** Checks a file's real content (magic bytes), not just its name: PDF, legacy .doc or .docx (zip). */
export function looksLikeCv(ext: string, bytes: Uint8Array): boolean {
  const starts = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (ext === "pdf") return starts([0x25, 0x50, 0x44, 0x46]); // %PDF
  if (ext === "docx") return starts([0x50, 0x4b, 0x03, 0x04]); // PK..
  if (ext === "doc") return starts([0xd0, 0xcf, 0x11, 0xe0]); // OLE
  return false;
}
