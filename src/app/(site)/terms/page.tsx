import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { terms } from "@/content/legal";

export const metadata: Metadata = { title: "Terms", alternates: { canonical: "/terms" } };
export default function TermsPage() { return <LegalPage title="Terms" sections={terms} />; }
