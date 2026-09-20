import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About OHM Labs Africa',
  description:
    'Learn how OHM Labs Africa helps organisations across Africa modernise operations with custom software, ERP systems, analytics, and AI-driven automation.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
