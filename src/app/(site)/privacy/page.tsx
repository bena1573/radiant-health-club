import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacy } from "@/content/legal";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };
export default function PrivacyPage() { return <LegalPage title="Privacy Policy" sections={privacy} />; }
