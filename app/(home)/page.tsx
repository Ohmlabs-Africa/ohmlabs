import type { Metadata } from 'next';
import { HeroSection } from '@/app/(home)/hero/hero';
import FeaturesPlanet from '@/app/(home)/features/features';
import ProcessTimeline from '@/app/(home)/features/timeline';

export const metadata: Metadata = {
  title: 'Software Development, ERP & AI Solutions in Africa',
  description:
    'OHM Labs Africa builds custom software, ERP systems, cloud infrastructure, and AI automation for businesses that need scalable digital transformation.',
  alternates: {
    canonical: '/',
  },
};

export default function LandingPage() {
  return (
    <div className="bg-color-brand-bg-deep">
      <HeroSection />
      <FeaturesPlanet />
      <ProcessTimeline />
      {/* <Partners  /> */}
    </div>
  );
}