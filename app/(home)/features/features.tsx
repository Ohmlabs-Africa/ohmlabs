import { capabilities } from '@/components/features/data/features';

export default function FeaturesPlanet() {
  return (
    <section className="border-t border-brand-border bg-brand-bg-deep py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
            Our Specialty
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-brand-text-primary sm:text-4xl">
            Built to move ambitious organisations forward
          </h2>
          <p className="mt-5 text-lg leading-8 text-brand-text-muted">
            From custom software to enterprise data systems, we design resilient digital ecosystems that scale with your growth.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <article
                key={capability.id}
                className="group rounded-2xl border border-brand-border bg-brand-bg-main p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-text-muted">
                    {capability.short}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-brand-text-primary">
                  {capability.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-brand-text-secondary">
                  {capability.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {capability.technologies.slice(0, 4).map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-brand-border bg-brand-bg-deep/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-text-muted"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}