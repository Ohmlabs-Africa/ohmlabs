import { HeroSection } from '@/app/(home)/hero/hero';
import { ServicesList } from '@/components/layout/services';
import { GalleryGrid } from '@/components/layout/gallery';
import { FeaturesList } from '@/app/(home)/hero/features';

export default function LandingPage() {
  return (
    <div className="bg-color-brand-bg-deep">
      <HeroSection />
      <FeaturesList />
      <ServicesList />
      <GalleryGrid />
    </div>
  );
}