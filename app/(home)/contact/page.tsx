import type { Metadata } from 'next';
import ContactHero from '@/components/contact/contact';

export const metadata: Metadata = {
  title: 'Contact OhmLabs Africa',
  description:
    'Talk to OhmLabs Africa about software development, ERP modernization, cloud migration, data engineering, and AI automation for your organisation.',
  alternates: {
    canonical: '/contact',
  },
};

export default function LetsTalkPage() {
  return (
    <main className="bg-[var(--color-brand-bg-main)]">
      <ContactHero />
    </main>
  );
}