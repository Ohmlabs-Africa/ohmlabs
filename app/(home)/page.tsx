import { HeroSection } from '@/app/(home)/hero/hero';
import { ServicesList } from '@/components/layout/services';
import { GalleryGrid } from '@/components/layout/gallery';
import { FeaturesList } from '@/app/(home)/hero/features';

export default function LandingPage() {
  return (
    <div className="bg-slate-950">
      <HeroSection />
      <FeaturesList />
      <ServicesList />
      <GalleryGrid />
    </div>
  );
}