import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Read how OHM Labs Africa handles information collected through our website and client engagements.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-text-muted">
              How OHM Labs Africa handles information collected through our
              website and client engagements.
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 space-y-10">

            {/* Introduction */}
            <section>
              <p className="text-base leading-8 text-brand-text-secondary">
                OHM Labs Africa values the privacy of every person who
                interacts with our website, proposals, or business
                communications. We collect contact information only when it
                is provided voluntarily through forms, email correspondence,
                or meetings.
              </p>
            </section>

            {/* Use of Information */}
            <section className="rounded-2xl border border-brand-border bg-brand-bg-card p-7 sm:p-8">
              <h2 className="text-xl font-bold text-brand-text-primary">
                How We Use Information
              </h2>

              <p className="mt-4 text-base leading-8 text-brand-text-secondary">
                Information may be used to respond to enquiries, scope
                projects, manage client relationships and improve the quality
                of the services we provide.
              </p>
            </section>

            {/* Data Sharing */}
            <section>
              <h2 className="text-xl font-bold text-brand-text-primary">
                Data Sharing
              </h2>

              <p className="mt-4 text-base leading-8 text-brand-text-secondary">
                We do not sell personal data and only share it with trusted
                partners where strictly necessary to deliver agreed services.
              </p>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-xl font-bold text-brand-text-primary">
                Data Protection and Retention
              </h2>

              <p className="mt-4 text-base leading-8 text-brand-text-secondary">
                We apply reasonable safeguards to protect data and retain it
                only for as long as required for business, legal, or
                compliance purposes.
              </p>
            </section>

            {/* Privacy Notice */}
            <div className="border-l-2 border-brand-accent pl-6">
              <p className="text-sm leading-7 text-brand-text-muted">
                We aim to handle personal information responsibly and
                transparently throughout our business and client engagements.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}