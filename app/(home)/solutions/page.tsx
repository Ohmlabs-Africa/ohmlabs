'use client';

import { useState } from 'react';
import Link from 'next/link';

const solutions = [
  {
    id: '01',
    category: 'SOFTWARE',
    title: 'Custom Software',
    headline: 'Software built around the way you work.',
    description:
      'From rapid prototypes to enterprise-grade applications, we engineer scalable digital products that solve real operational problems.',
    services: [
      'Custom web applications',
      'Enterprise applications',
      'RESTful & GraphQL APIs',
      'System integrations',
      'Scalable application architecture',
    ],
    technologies: ['React', 'TypeScript', 'FastAPI', 'Django'],
  },
  {
    id: '02',
    category: 'BUSINESS SYSTEMS',
    title: 'ERP & CRM',
    headline: 'One connected system for your operation.',
    description:
      'We implement, customise and integrate business systems to bring finance, HR, sales, inventory and operations into a unified workflow.',
    services: [
      'ERP implementation',
      'Odoo development & customisation',
      'Zoho ecosystem integration',
      'CRM & sales automation',
      'Finance & HR systems',
      'Inventory & operations',
    ],
    technologies: ['Odoo', 'Zoho', 'CRM', 'ERP'],
  },
  {
    id: '03',
    category: 'DATA',
    title: 'Data & Analytics',
    headline: 'Turn your data into operational clarity.',
    description:
      'We build secure data infrastructure and analytics solutions that bring fragmented information together and make it easier to act on.',
    services: [
      'Data pipeline engineering',
      'ETL / ELT automation',
      'Cloud data infrastructure',
      'Analytical databases',
      'Business intelligence',
      'Real-time dashboards',
    ],
    technologies: ['Google Cloud', 'Azure', 'ETL / ELT', 'Analytics'],
  },
  {
    id: '04',
    category: 'AI & AUTOMATION',
    title: 'AI Solutions',
    headline: 'Automate work. Empower your team.',
    description:
      'We create intelligent automation solutions that reduce repetitive work, connect business processes and help organisations operate more efficiently.',
    services: [
      'Custom AI agents',
      'Process automation',
      'Intelligent workflows',
      'AI-powered business processes',
      'Automated data operations',
    ],
    technologies: ['AI Agents', 'Automation', 'APIs', 'Workflows'],
  },
];

const solutionStats = [
  { value: '04', label: 'Core solution areas' },
  { value: '360°', label: 'Technology approach' },
  { value: '01', label: 'Connected ecosystem' },
];

export default function SolutionsPage() {
  const [activeSolution, setActiveSolution] = useState(0);

  const solution = solutions[activeSolution];

  return (
    <main className="min-h-screen bg-brand-bg-deep text-brand-text-primary">

      {/* HERO */}
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
              Our Solutions
            </p>

            <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-7xl">
              Technology that{' '}
              <span className="text-brand-accent">works together.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-text-secondary">
              From custom software and enterprise systems to data
              infrastructure and AI automation, OHM Labs Africa builds
              connected solutions designed around your organisation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
              >
                Discuss your challenge
              </Link>

              <a
                href="#solutions"
                className="rounded-xl border border-brand-border-muted px-6 py-3 text-sm font-semibold text-brand-text-secondary transition-colors hover:border-brand-accent hover:text-white"
              >
                Explore solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-brand-border bg-brand-bg-main">
        <div className="mx-auto grid max-w-7xl divide-y divide-brand-border px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-8">
          {solutionStats.map((stat) => (
            <div
              key={stat.label}
              className="px-6 py-8 first:pl-0 sm:px-10"
            >
              <p className="text-3xl font-bold text-brand-accent">
                {stat.value}
              </p>

              <p className="mt-2 text-sm text-brand-text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOLUTIONS */}
      <section id="solutions" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

        <div className="mb-14 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
            What we solve
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            From digital friction to connected operations.
          </h2>

          <p className="mt-5 leading-7 text-brand-text-muted">
            Select a solution to explore how we can help modernise,
            integrate and scale your technology environment.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">

          {/* SOLUTION NAVIGATION */}
          <div className="space-y-3">
            {solutions.map((item, index) => {
              const active = index === activeSolution;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSolution(index)}
                  className={`group w-full rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? 'border-brand-accent bg-brand-bg-card'
                      : 'border-brand-border bg-brand-bg-main hover:border-brand-border-muted'
                  }`}
                >
                  <div className="flex items-start gap-5">

                    <span
                      className={`text-sm font-bold ${
                        active
                          ? 'text-brand-accent'
                          : 'text-brand-text-muted'
                      }`}
                    >
                      {item.id}
                    </span>

                    <div className="flex-1">
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-brand-text-muted">
                        {item.category}
                      </p>

                      <h3 className="mt-1 text-lg font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-brand-text-muted">
                        {item.headline}
                      </p>
                    </div>

                    <span
                      className={`text-xl transition-transform ${
                        active ? 'translate-x-1 text-brand-accent' : ''
                      }`}
                    >
                      →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE SOLUTION */}
          <div className="rounded-2xl border border-brand-border bg-brand-bg-card p-8 sm:p-10">

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-widest text-brand-accent">
                {solution.id}
              </span>

              <span className="rounded-full border border-brand-border-muted px-3 py-1 text-[10px] font-semibold tracking-widest text-brand-text-muted">
                {solution.category}
              </span>
            </div>

            <h3 className="mt-7 text-3xl font-bold sm:text-4xl">
              {solution.title}
            </h3>

            <p className="mt-4 text-xl font-medium text-brand-text-secondary">
              {solution.headline}
            </p>

            <p className="mt-5 max-w-2xl leading-8 text-brand-text-muted">
              {solution.description}
            </p>

            {/* SERVICES */}
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                What we deliver
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {solution.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 rounded-xl border border-brand-border bg-brand-bg-main p-4"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />

                    <span className="text-sm text-brand-text-secondary">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNOLOGIES */}
            <div className="mt-8 flex flex-wrap gap-2">
              {solution.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-brand-border-muted px-3 py-1.5 text-xs text-brand-text-muted"
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATION */}
      <section className="border-y border-brand-border bg-brand-bg-main">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
                One ecosystem
              </p>

              <h2 className="mt-4 text-3xl font-bold sm:text-5xl">
                Your technology should communicate.
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-brand-text-secondary">
                Software, ERP, CRM, data and automation should not operate as
                isolated systems. We design solutions that connect these
                layers so information can move where it is needed.
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-flex rounded-xl border border-brand-accent px-6 py-3 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
              >
                Build your ecosystem
              </Link>
            </div>

            {/* ECOSYSTEM VISUAL */}
            <div className="grid grid-cols-2 gap-3">

              <div className="rounded-2xl border border-brand-border bg-brand-bg-card p-6">
                <span className="text-xs font-bold text-brand-accent">
                  01
                </span>

                <h3 className="mt-4 font-bold">
                  Software
                </h3>

                <p className="mt-2 text-sm text-brand-text-muted">
                  Applications & APIs
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-bg-card p-6">
                <span className="text-xs font-bold text-brand-accent">
                  02
                </span>

                <h3 className="mt-4 font-bold">
                  Business Systems
                </h3>

                <p className="mt-2 text-sm text-brand-text-muted">
                  ERP & CRM
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-bg-card p-6">
                <span className="text-xs font-bold text-brand-accent">
                  03
                </span>

                <h3 className="mt-4 font-bold">
                  Data
                </h3>

                <p className="mt-2 text-sm text-brand-text-muted">
                  Pipelines & analytics
                </p>
              </div>

              <div className="rounded-2xl border border-brand-accent bg-brand-bg-card p-6">
                <span className="text-xs font-bold text-brand-accent">
                  04
                </span>

                <h3 className="mt-4 font-bold">
                  AI
                </h3>

                <p className="mt-2 text-sm text-brand-text-muted">
                  Automation & agents
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">

          <div className="rounded-2xl border border-brand-border bg-brand-bg-card p-8 sm:p-12">

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-accent">
              Ready when you are
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-bold sm:text-5xl">
              Tell us where the friction is.
              <br />
              We will help you engineer the way forward.
            </h2>

            <p className="mt-6 max-w-2xl leading-8 text-brand-text-muted">
              Start with a challenge, a process or an idea. We can help turn
              it into a practical technology solution built for scale.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent-hover"
            >
              Start a conversation
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}