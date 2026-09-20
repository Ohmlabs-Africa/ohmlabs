import ProposalForm from "@/components/contact/proposalForm"; // Your current proposal component
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Request a Proposal | OhmLabs Africa",
  description: "Submit your project requirements for a tailored implementation roadmap.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/contact/proposal',
  },
};

export default function ProposalPage() {
  return (
    <main className="min-h-screen bg-[var(--color-brand-bg-main)] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <ProposalForm />
      </div>
    </main>
  );
}