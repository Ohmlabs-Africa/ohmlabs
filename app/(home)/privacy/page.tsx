import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how OHM Labs Africa handles information collected through our website and client engagements.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 text-white sm:px-8 lg:px-12">
      <h1 className="text-4xl font-black tracking-tight text-white">Privacy Policy</h1>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        OHM Labs Africa values the privacy of every person who interacts with our website, proposals, or business communications. We collect contact information only when it is provided voluntarily through forms, email correspondence, or meetings.
      </p>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        Information may be used to respond to enquiries, scope projects, manage client relationships, and improve the quality of the services we provide. We do not sell personal data and only share it with trusted partners where strictly necessary to deliver agreed services.
      </p>
      <p className="mt-6 text-base leading-7 text-brand-text-secondary">
        We apply reasonable safeguards to protect data and retain it only for as long as required for business, legal, or compliance purposes.
      </p>
    </main>
  );
}
