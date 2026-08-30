import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Learn how OHM Labs Africa uses cookies and website analytics on this site.',
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
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
              Cookie Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-brand-text-muted">
              Learn how OHM Labs Africa uses cookies and related technologies
              across this website.
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 space-y-10">

            <section>
              <p className="text-base leading-8 text-brand-text-secondary">
                OHM Labs Africa may use cookies or related technologies to
                improve website performance, understand visitor behaviour, and
                provide a better user experience. Cookies may be used for
                analytics, site security, and core functionality.
              </p>
            </section>

            <section className="rounded-2xl border border-brand-border bg-brand-bg-card p-7 sm:p-8">
              <h2 className="text-xl font-bold text-brand-text-primary">
                How Cookies Are Used
              </h2>

              <p className="mt-4 text-base leading-8 text-brand-text-secondary">
                Cookies and related technologies may help us understand how
                visitors interact with the website, maintain essential site
                functionality, support security, and improve overall website
                performance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-brand-text-primary">
                Managing Cookies
              </h2>

              <p className="mt-4 text-base leading-8 text-brand-text-secondary">
                You can manage cookie settings in your browser at any time.
                However, limiting or disabling cookies may affect some website
                features and may limit the analytics insights available to us.
              </p>
            </section>

            {/* Notice */}
            <div className="border-l-2 border-brand-accent pl-6">
              <p className="text-sm leading-7 text-brand-text-muted">
                Cookie preferences can be managed through your browser
                settings. Essential website functionality may depend on
                certain cookies or related technologies.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}