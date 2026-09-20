'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-brand-border bg-brand-bg-deep/95 shadow-lg backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-18 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center text-lg font-black sm:text-xl lg:text-2xl"
          >
            <span className="text-white transition-colors duration-300 group-hover:text-brand-text-secondary">
              OHM
            </span>

            <span className="mx-1 text-brand-accent transition-transform duration-300 group-hover:scale-110">
              LABS
            </span>
            {/* <span className="text-white transition-colors duration-300 group-hover:text-brand-text-secondary">
              AFRICA
            </span> */}
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="text-sm font-medium text-brand-text-secondary transition hover:text-brand-accent"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-sm font-medium text-brand-text-secondary transition hover:text-brand-accent"
            >
              About
            </Link>

            <Link
              href="/services"
              className="text-sm font-medium text-brand-text-secondary transition hover:text-brand-accent"
            >
              Services
            </Link>

            <Link
              href="/projects"
              className="text-sm font-medium text-brand-text-secondary transition hover:text-brand-accent"
            >
              Projects
            </Link>

            <Link
              href="/contact"
              className="text-sm font-medium text-brand-text-secondary transition hover:text-brand-accent"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="rounded-full bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-accent-hover hover:scale-105"
            >
              Let&apos;s Talk
            </Link>
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
          >
            {mobileOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}

        <div
          className={`overflow-hidden transition-all duration-300 lg:hidden ${
            mobileOpen
              ? 'max-h-96 border-t border-brand-border bg-brand-bg-deep/95 backdrop-blur-xl'
              : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col px-5 py-4">

            <Link
              href="/"
              className="rounded-lg px-4 py-3 text-brand-text-secondary transition hover:bg-brand-bg-card hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            <Link
              href="/about"
              className="rounded-lg px-4 py-3 text-brand-text-secondary transition hover:bg-brand-bg-card hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>

            <Link
              href="/services"
              className="rounded-lg px-4 py-3 text-brand-text-secondary transition hover:bg-brand-bg-card hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </Link>

            <Link
              href="/projects"
              className="rounded-lg px-4 py-3 text-brand-text-secondary transition hover:bg-brand-bg-card hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Projects
            </Link>

            <Link
              href="/contact"
              className="rounded-lg px-4 py-3 text-brand-text-secondary transition hover:bg-brand-bg-card hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="mt-4 rounded-full bg-brand-accent py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
              onClick={() => setMobileOpen(false)}
            >
              Let&apos;s Talk
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}