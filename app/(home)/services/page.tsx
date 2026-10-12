import type { Metadata } from 'next';
import Link from 'next/link';
import { capabilities } from '@/components/features/data/features';

export const metadata: Metadata = {
  title: 'Software Development, ERP & Cloud Services',
  description:
    'OHM Labs Africa provides custom software development, ERP implementation, cloud infrastructure, business intelligence and AI automation services for organisations ready to scale.',
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return (
    <main className="bg-brand-bg-deep text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
            Our services
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Digital systems that turn operational complexity into momentum.
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
            From custom software and ERP transformation to data platforms and AI automation, we design resilient technology ecosystems that help businesses run better and grow faster.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-brand-accent px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
            >
              Book a strategy call
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-brand-border px-8 py-4 text-sm font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent"
            >
              See our project work
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <article
                key={capability.id}
                id={capability.id}
                className="rounded-2xl border border-brand-border bg-brand-bg-main p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-text-muted">
                    {capability.short}
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-white">{capability.title}</h2>
                <p className="mt-4 text-base leading-7 text-brand-text-secondary">
                  {capability.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {capability.technologies.slice(0, 4).map((technology) => (
                    <li
                      key={technology}
                      className="rounded-full border border-brand-border bg-brand-bg-deep px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-text-muted"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-brand-border bg-brand-bg-main">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:px-8 lg:grid-cols-3 lg:px-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">Strategy</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Business-first architecture</h2>
            <p className="mt-4 text-base leading-7 text-brand-text-secondary">
              We align technology choices to your goals, operational constraints and growth plans.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">Delivery</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Practical and measurable</h2>
            <p className="mt-4 text-base leading-7 text-brand-text-secondary">
              Every engagement is designed to improve process visibility, reduce friction and scale with confidence.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">Support</p>
            <h2 className="mt-4 text-2xl font-bold text-white">Long-term partnership</h2>
            <p className="mt-4 text-base leading-7 text-brand-text-secondary">
              We stay close to your business after launch to optimise adoption, performance and operational resilience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
