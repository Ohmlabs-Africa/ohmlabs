import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Review the general terms governing engagements with OHM Labs Africa.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-bg-deep text-brand-text-primary">
      <section className="border-b border-brand-border bg-brand-bg-main">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:px-8 lg:px-12">
          
          {/* Header */}
          <div className="border-b border-brand-border pb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
              Legal
            </p>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-brand-text-primary sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-text-muted">
              The general terms governing engagements with OHM Labs Africa.
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 space-y-10">

            <section>
              <p className="text-base leading-8 text-brand-text-secondary">
                By engaging with OHM Labs Africa, you agree to work with our
                team under the scope, pricing and delivery timelines defined
                in the relevant proposal or contract. Final responsibilities,
                milestones and support terms are clarified before project
                delivery begins.
              </p>
            </section>

            <section className="rounded-2xl border border-brand-border bg-brand-bg-card p-7 sm:p-8">
              <h2 className="text-xl font-bold text-brand-text-primary">
                Service Delivery
              </h2>

              <p className="mt-4 text-base leading-8 text-brand-text-secondary">
                We provide technology strategy, implementation and support
                services in good faith and aim to deliver reliable,
                well-documented outcomes. However, all services are subject to
                the assumptions, dependencies and information provided by the
                client at the time of engagement.
              </p>
            </section>

            {/* Agreement notice */}
            <div className="border-l-2 border-brand-accent pl-6">
              <p className="text-sm leading-7 text-brand-text-muted">
                Specific project responsibilities, milestones, pricing and
                support arrangements are governed by the applicable proposal,
                statement of work or contract.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}