'use client';

import { useState } from 'react';
import Link from 'next/link';

const capabilities = [
  {
    number: '01',
    title: 'Software Development',
    short: 'Scalable digital products built around your business.',
    description:
      'From rapid prototypes to enterprise-grade web applications, we build secure, maintainable systems using modern technologies and scalable architectures.',
    tags: ['React', 'TypeScript', 'APIs', 'Scalable Architecture'],
  },
  {
    number: '02',
    title: 'Business Systems',
    short: 'ERP and CRM systems adapted to how you actually operate.',
    description:
      'We bridge the gap between standard ERP platforms and complex business processes through implementation, customization and integration.',
    tags: ['Odoo', 'Zoho', 'ERP', 'CRM'],
  },
  {
    number: '03',
    title: 'Data Excellence',
    short: 'Turn fragmented data into operational clarity.',
    description:
      'We design secure data pipelines, analytical infrastructure and interactive dashboards that help organisations make faster, better-informed decisions.',
    tags: ['GCP', 'Azure', 'ETL / ELT', 'Analytics'],
  },
  {
    number: '04',
    title: 'AI & Automation',
    short: 'Automate repetitive work and create intelligent workflows.',
    description:
      'We build AI-powered agents and process automation solutions that reduce manual effort and allow teams to focus on higher-value work.',
    tags: ['AI Agents', 'Automation', 'Intelligent Workflows'],
  },
];

const principles = [
  {
    title: 'Understand',
    description:
      'We start with your business processes, challenges and objectives before recommending technology.',
  },
  {
    title: 'Engineer',
    description:
      'We design practical systems that are secure, maintainable and capable of scaling with your organisation.',
  },
  {
    title: 'Integrate',
    description:
      'We connect systems, data and workflows so technology works as one ecosystem rather than isolated tools.',
  },
  {
    title: 'Scale',
    description:
      'We build with the future in mind, giving your organisation room to grow without rebuilding from scratch.',
  },
];

export default function AboutPage() {
  const [activeCapability, setActiveCapability] = useState(0);

  return (
    <main className="bg-brand-bg-deep text-brand-text-primary">
      {/* Hero */}
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
              About OHM Labs Africa
            </p>

            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-brand-text-primary sm:text-7xl">
              We bring{' '}
              <span className="text-brand-accent">certainty</span> to
              digital complexity.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-brand-text-secondary">
              OHM Labs Africa helps organisations move from disconnected
              systems, manual workflows and fragmented data to integrated
              technology that enables them to operate, adapt and scale.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
              >
                Work with us
              </Link>

              <Link
                href="/services"
                className="rounded-xl border border-brand-border-muted px-6 py-3 text-sm font-semibold text-brand-text-secondary transition-colors hover:border-brand-accent hover:text-white"
              >
                Explore our capabilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b border-brand-border bg-brand-bg-main">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.5fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Our philosophy
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Technology should be a catalyst, not friction.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-brand-text-secondary">
            <p>
              Modern organisations often find themselves at a digital
              crossroads: applications do not communicate, critical data sits
              in silos, and repetitive manual processes consume valuable time.
            </p>

            <p>
              At OHM Labs Africa, we believe technology should simplify that
              complexity. We bring together software engineering, business
              systems, data infrastructure and AI automation to create
              connected digital environments.
            </p>

            <p className="font-semibold text-brand-text-primary">
              Our goal is simple: help organisations scale with certainty.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
            What we do
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Technology engineered around your operation.
          </h2>

          <p className="mt-5 leading-7 text-brand-text-muted">
            Our capabilities work independently or together as one integrated
            technology ecosystem.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Navigation */}
          <div className="space-y-3">
            {capabilities.map((capability, index) => (
              <button
                key={capability.number}
                onClick={() => setActiveCapability(index)}
                className={`w-full rounded-2xl border p-5 text-left transition-all ${
                  activeCapability === index
                    ? 'border-brand-accent bg-brand-bg-card'
                    : 'border-brand-border bg-brand-bg-main hover:border-brand-border-muted'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-sm font-bold text-brand-accent">
                    {capability.number}
                  </span>

                  <div>
                    <h3 className="font-bold text-brand-text-primary">
                      {capability.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-brand-text-muted">
                      {capability.short}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active capability */}
          <div className="min-h-[350px] rounded-2xl border border-brand-border bg-brand-bg-card p-8 sm:p-10">
            <span className="text-sm font-bold tracking-widest text-brand-accent">
              {capabilities[activeCapability].number}
            </span>

            <h3 className="mt-5 text-3xl font-bold">
              {capabilities[activeCapability].title}
            </h3>

            <p className="mt-5 max-w-2xl text-base leading-8 text-brand-text-secondary">
              {capabilities[activeCapability].description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {capabilities[activeCapability].tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-brand-border-muted px-3 py-1.5 text-xs font-medium text-brand-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="border-y border-brand-border bg-brand-bg-main">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
                How we work
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Practical thinking.
                <br />
                Serious engineering.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-brand-border bg-brand-border sm:grid-cols-2">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="bg-brand-bg-card p-7 transition-colors hover:bg-brand-bg-main"
                >
                  <span className="text-sm font-bold text-brand-accent">
                    0{index + 1}
                  </span>

                  <h3 className="mt-4 text-xl font-bold">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-brand-text-muted">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="rounded-2xl border border-brand-border bg-brand-bg-card p-8 sm:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
                Agile Certainty
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                Build systems that are ready for what comes next.
              </h2>

              <p className="mt-6 max-w-2xl leading-8 text-brand-text-secondary">
                Whether you are modernising an existing operation, connecting
                fragmented systems or building something entirely new, OHM
                Labs Africa can help turn technology into an operational
                advantage.
              </p>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="inline-flex rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}