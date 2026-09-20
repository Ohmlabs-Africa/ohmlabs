'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Kalam } from 'next/font/google';

const kalam = Kalam({
  subsets: ['latin'],
  weight: '700',
});

interface BackgroundSlide {
  url: string;
  headline: string;
  subpitch: string;
}

const slides: BackgroundSlide[] = [
  {
    url: '/Comp-hero1.jpg',
    headline: 'Software Development',
    subpitch:
      'From rapid prototyping to enterprise-grade web applications, we deploy scalable solutions using modern tech stacks. Architecting modern, type-safe web interfaces with React while building clean, performant RESTful and GraphQL APIs.',
  },
  {
    url: '/Comp-hero2.jpg',
    headline: 'ERP Business Systems',
    subpitch:
      'Bridging the gap between standard ERP software and complex business processes. We transform fragmented operations into unified, high-performing enterprise solutions.',
  },
  {
    url: '/Comp-hero3.jpg',
    headline: 'Data Management & Analytics',
    subpitch:
      'Architecting secure cloud and on-premise data platforms using Azure, GCP and Microsoft Fabric. We specialize in ETL pipelines, dashboards, cloud storage, governance and real-time analytics.',
  },
  {
    url: '/Comp-hero4.jpg',
    headline: 'Artificial Intelligence',
    subpitch:
      'Building intelligent AI solutions and automation that streamline workflows, improve productivity and unlock new opportunities for business growth.',
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        px-4
        pt-24
        pb-16
        sm:px-6
        lg:px-8
      "
    >
      {/* Background Images */}

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-110'
          }`}
          style={{
            backgroundImage: `url(${slide.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Dark Overlay */}

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.72) 45%, rgba(20,20,20,.96) 100%)',
        }}
      />

      {/* Content */}

      <div className="relative z-10 mx-auto flex w-full max-w-10xl flex-col items-center text-center">

        {/* Logo */}

        <span
          className={`${kalam.className} mb-3 inline-flex items-center gap-1 uppercase text-3xl font-bold tracking-wide sm:gap-2 sm:text-2xl md:text-3xl lg:text-4xl`}
        >
          <span className="text-white">OHM</span>

          <span className="text-brand-accent">
            LABS
          </span>

          <span className="text-white">
            AFRICA
          </span>
        </span>

        {/* Heading */}

        <h1
          className="
            max-w-5xl
            text-4xl
            font-black
            leading-tight
            tracking-tight
            text-white
            transition-all
            duration-700
            ease-out

            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          "
        >
          {slides[currentSlide].headline}
        </h1>

        {/* Description */}

        <p
          className="
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-brand-text-secondary

            sm:text-lg
            md:max-w-3xl
            md:text-xl
          "
        >
          {slides[currentSlide].subpitch}
        </p>

        {/* CTA */}

        <div
          className="
            mt-10
            flex
            w-full
            flex-col
            items-center
            gap-4

            sm:w-auto
            sm:flex-row
          "
        >
          <Link
            href="/contact"
            className="
              w-full
              rounded-full
              bg-brand-accent
              px-8
              py-4
              text-center
              text-sm
              font-semibold
              text-white
              shadow-xl
              transition-all
              duration-300

              hover:scale-105
              hover:bg-brand-accent-hover

              sm:w-auto
            "
          >
            Scale With Certainty
          </Link>

          <Link
            href="/services"
            className="
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-white
              transition-colors
              duration-300
              hover:text-brand-accent
            "
          >
            Explore Services

            <span className="text-brand-accent text-lg">
              →
            </span>
          </Link>
        </div>

        {/* Slide Indicators */}

        <div className="mt-12 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-10 bg-brand-accent'
                  : 'w-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}