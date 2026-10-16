import type { Metadata } from "next";
import FontSubmissionForm from "@/components/contact/fontSubmissionForm";

export const metadata: Metadata = {
  title: "Submit a Font | OhmLabs Africa",
  description: "Submit a typeface to the OHM Labs team for review.",
  robots: { index: false, follow: true },
};

export default function FontSubmissionPage() {
  return (
    <main className="min-h-screen bg-[var(--color-brand-bg-main)] px-4 py-16 md:px-8">
      <FontSubmissionForm />
    </main>
  );
}
