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
    // alt: 'Cloud Infrastructure systems integration',
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
    }, 5000); // Shuffles every 5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Dynamic Background Image Layers */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-30 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ backgroundImage: `url('${slide.url}')` }}
        />
      ))}

      {/* Premium Vignette Overlay Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950" />

      {/* Pitch Content Display */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 backdrop-blur-md mb-6 uppercase tracking-wider">
          Agile Certainty Enabled
        </span>
        
        {/* Dynamic Typography Transition */}
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl min-h-[120px] transition-all duration-500">
          {slides[currentSlide].headline}
        </h1>
        
        <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto min-h-[60px] transition-all duration-500">
          {slides[currentSlide].subpitch}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/register"
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all hover:scale-102"
          >
            Initialize Infrastructure
          </Link>
          <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-slate-300 transition-colors">
            Our Methods <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}