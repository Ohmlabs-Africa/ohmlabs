import ProposalForm from "@/components/contact/proposalForm"; // Your current proposal component

export const metadata = {
  title: "Request a Proposal | OhmLabs",
  description: "Submit your project requirements for a tailored implementation roadmap.",
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