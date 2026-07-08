'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BackgroundSlide {
  url: string;
  headline: string;
  subpitch: string;
}

const slides: BackgroundSlide[] = [
  {
    url: '/erp.jpg',
    headline: 'Tranquility in Entropy',
    subpitch: 'Harmonizing disconnected operational frameworks into unified, scalable ERP environments.',
  },
  {
    url: '/cloud.png',
    headline: 'Data-Driven Execution',
    subpitch: 'Engineering pristine, high-availability cloud pipeline architectures for modern enterprise data.',
  },
  {
    url: '/clouddesign.png',
    headline: 'Automated AI Architectures',
    subpitch: 'Deploying custom workflows and context-isolated technical solutions that outpace industry trends.',
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-brand-bg-deep">
      {/* Dynamic Background Image Layers */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-25 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ backgroundImage: `url('${slide.url}')` }}
        />
      ))}

      {/* Cinematic Vignette Overlay Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg-deep/50 via-brand-bg-deep/80 to-brand-bg-deep" />

      {/* Pitch Content Display */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center rounded bg-brand-accent/20 px-3 py-1 text-xs font-bold text-brand-accent-glow backdrop-blur-md mb-6 uppercase tracking-widest">
          Agile Certainty Enabled
        </span>
        
        {/* Dynamic Typography Transition */}
        <h1 className="text-4xl font-black tracking-tighter text-brand-text-primary sm:text-6xl min-h-[120px] transition-all duration-500">
          {slides[currentSlide].headline}
        </h1>
        
        <p className="mt-6 text-base sm:text-lg leading-relaxed text-brand-text-secondary max-w-2xl mx-auto min-h-[60px] transition-all duration-500">
          {slides[currentSlide].subpitch}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/register"
            className="rounded bg-brand-accent px-6 py-3 text-sm font-bold text-brand-text-primary shadow-2xl transition-all hover:bg-brand-accent-hover active:scale-98"
          >
            Initialize Infrastructure
          </Link>
          <Link href="/about" className="text-sm font-bold leading-6 text-brand-text-secondary hover:text-brand-text-primary transition-colors">
            Our Methods <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}