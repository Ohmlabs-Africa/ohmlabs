import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Project Outcomes & Business Transformations',
  description:
    'Explore how OHM Labs Africa helps teams modernise operations, unify business systems, build data intelligence, and automate delivery across critical workflows.',
  alternates: {
    canonical: '/projects',
  },
};

const projects = [
  {
    title: 'Operations platform modernisation',
    summary:
      'Unified ERP, inventory, and reporting workflows for a growing business with fragmented operational data.',
    impact: 'Reduced manual process overhead and improved reporting visibility across teams.',
  },
  {
    title: 'Cloud data and analytics rollout',
    summary:
      'Built scalable pipelines and dashboarding to help leadership monitor performance across regions and business units.',
    impact: 'Enabled faster decision-making with cleaner, trusted data and real-time operational insight.',
  },
  {
    title: 'AI workflow automation',
    summary:
      'Automated repetitive tasks and knowledge flows to help teams move faster without adding operational bottlenecks.',
    impact: 'Improved productivity while preserving consistency in service delivery and communication.',
  },
];

export default function ProjectsPage() {
  return (
    <main className="bg-brand-bg-deep text-white">
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-28 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
            Project work
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
            Technology built around business outcomes.
          </h1>
          <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
            We help organisations improve visibility, simplify complexity, and scale their operations through thoughtful technology design and operational delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-12">
        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-brand-border bg-brand-bg-main p-8"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">
                    Client transformation
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-white">{project.title}</h2>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex rounded-full border border-brand-border px-5 py-3 text-sm font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent"
                >
                  Discuss a similar project
                </Link>
              </div>

              <p className="mt-6 max-w-3xl text-base leading-7 text-brand-text-secondary">
                {project.summary}
              </p>

              <div className="mt-6 rounded-xl border border-brand-border bg-brand-bg-deep p-4 text-brand-text-secondary">
                <span className="font-semibold text-white">Impact:</span> {project.impact}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
