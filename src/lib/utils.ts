import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isPlaceholder(value?: string | null): boolean {
  return !value || value.startsWith("[PLACEHOLDER");
}
