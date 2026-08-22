import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About OHM Labs Africa',
  description:
    'Learn how OHM Labs Africa helps organisations across Africa modernise operations with custom software, ERP systems, analytics, and AI-driven automation.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
          About us
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Digital transformation built for the realities of modern business.
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          OHM Labs Africa partners with ambitious organisations to design smarter systems, unify fragmented operations, and unlock growth through technology.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 text-left md:grid-cols-2">
        <section className="rounded-2xl border border-brand-border bg-brand-bg-card p-8">
          <h2 className="text-2xl font-bold text-white">Our focus</h2>
          <p className="mt-4 text-base leading-7 text-brand-text-secondary">
            We specialise in software engineering, ERP strategy, cloud infrastructure, data architecture, and AI-enabled automation. Our work is built around operational clarity, business performance, and long-term scalability.
          </p>
        </section>

        <section className="rounded-2xl border border-brand-border bg-brand-bg-card p-8">
          <h2 className="text-2xl font-bold text-white">Why organisations choose us</h2>
          <p className="mt-4 text-base leading-7 text-brand-text-secondary">
            We combine strategic thinking with practical delivery. From discovery and solution design to implementation and support, we work as a hands-on technology partner focused on measurable outcomes.
          </p>
        </section>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Link
          href="/"
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}