import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Learn how OHM Labs Africa uses cookies and website analytics on this site.',
  alternates: {
    canonical: '/cookies',
  },
};

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-white sm:px-8 lg:px-12">
      <h1 className="text-4xl font-black tracking-tight text-white">Cookie Policy</h1>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        OHM Labs Africa may use cookies or related technologies to improve website performance, understand visitor behaviour, and provide a better user experience. Cookies may be used for analytics, site security, and core functionality.
      </p>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        You can manage cookie settings in your browser at any time, though limiting cookies may affect some website features and analytics insights.
      </p>
    </main>
  );
}
