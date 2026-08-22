import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the general terms governing engagements with OHM Labs Africa.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-white sm:px-8 lg:px-12">
      <h1 className="text-4xl font-black tracking-tight text-white">Terms of Service</h1>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        By engaging with OHM Labs Africa, you agree to work with our team under the scope, pricing, and delivery timelines defined in the relevant proposal or contract. Final responsibilities, milestones, and support terms are clarified before project delivery begins.
      </p>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        We provide technology strategy, implementation, and support services in good faith and aim to deliver reliable, well-documented outcomes. However, all services are subject to the assumptions, dependencies, and information provided by the client at the time of engagement.
      </p>
    </main>
  );
}
