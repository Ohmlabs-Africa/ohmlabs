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
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:h-24 lg:px-12">
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center text-base font-black tracking-[0.04em] sm:text-lg lg:text-xl"
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

          <nav className="hidden items-center gap-7 lg:flex xl:gap-10">
            <Link
              href="/"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-secondary transition-colors hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-secondary transition-colors hover:text-white"
            >
              About
            </Link>

            <Link
              href="/services"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-secondary transition-colors hover:text-white"
            >
              Services
            </Link>

            <Link
              href="/projects"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-secondary transition-colors hover:text-white"
            >
              Projects
            </Link>

            <Link
              href="/contact"
              className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-text-secondary transition-colors hover:text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-brand-border-muted px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all  duration-300
              bg-brand-accent
              hover:scale-105
              hover:bg-brand-accent-hover
              sm:w-auto"
            >
              Let&apos;s Talk
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
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