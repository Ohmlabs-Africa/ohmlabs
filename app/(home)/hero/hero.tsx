'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';

const kalam = Kalam({ subsets: ['latin'], weight: '700' });

interface BackgroundSlide {
  url: string;
  headline: string;
  subpitch: string;
}

const slides: BackgroundSlide[] = [

  {
    url: "/videowebdesign.png", 
    headline: 'Build for Scale',
    subpitch: 'From rapid prototyping to enterprise-grade web applications, we deploy scalable solutions using modern tech stacks.',
  },
  {
    url: "/vidwebdesign.png", 
    headline: 'Business Systems',
    subpitch: 'Bridging the gap between standard, out-of-the-box software and complex, industry-specific business processes with leading ERP suites.',
  },
  {
    url: "/data.jpg",
    headline: 'Data Excellence',
    subpitch: 'Architecting secure, compliant cloud and on-site data pipelines utilizing GCP and Azure for real-time decisions.',
  },
  {
    url: "/erp.jpg", 
    headline: 'AI Innovation',
    subpitch: 'Building custom AI agents to automate repetitive processes, keeping your business ahead of the innovation curve.',
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); 
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-brand-bg-deep">
      {/* Dynamic Background Image Layers */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          style={{ backgroundImage: `url('${slide.url}')` }}
        />
      ))}

      {/* Cinematic Vignette Overlay Mask */}
          <div
              className="absolute inset-0"
              style={{
                  background:
                      "linear-gradient(180deg, rgba(0,0,0,.55) 0%, rgba(0,0,0,.75) 45%, rgba(20,20,20,.96) 100%)",
              }}
          />
      {/* Pitch Content Display */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
       <span className={`${kalam.className} inline-flex items-center gap-3 uppercase text-3xl md:text-5xl font-black tracking-[0.2em]`}>
        <span className="text-white">OHM</span>
        <span className="text-brand-accent">LABS</span>
        <span className="text-white">AFRICA</span>
      </span>
              
        {/* Dynamic Typography Transition */}
        <h1 className="text-3xl font-black tracking-tighter text-white sm:text-6xl min-h-[120px] transition-all duration-700 ease-out transform translate-y-0">
          {slides[currentSlide].headline}
        </h1>
        
        <p className="mt-3 text-base sm:text-lg leading-relaxed text-gray-300 max-w-3xl mx-auto min-h-[80px] transition-all duration-700 ease-out">
          {slides[currentSlide].subpitch}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/contact"
            className="rounded bg-brand-accent px-8 py-3.5 text-sm font-bold text-white shadow-2xl transition-all hover:bg-brand-accent-hover hover:scale-105 active:scale-95"
          >
            Scale With Certainty
          </Link>
          <Link href="/solutions" className="text-sm font-bold leading-6 text-gray-300 hover:text-white transition-colors flex items-center gap-2">
            Explore Solutions <span aria-hidden="true" className="text-brand-accent">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}