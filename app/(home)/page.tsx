import { HeroSection } from '@/app/(home)/hero/hero';
import { ServicesList } from '@/components/layout/services';
import { GalleryGrid } from '@/components/layout/gallery';
import FeaturesPlanet from '@/app/(home)/features/features';
import ProcessTimeline from '@/app/(home)/features/timeline';

export default function LandingPage() {
  return (
    <div className="bg-color-brand-bg-deep">
      <HeroSection />      
      <FeaturesPlanet />
      <ProcessTimeline />
      <ServicesList />
      <GalleryGrid />
    </div>
  );
}