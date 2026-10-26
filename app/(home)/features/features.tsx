import { capabilities } from '@/components/features/data/features';

export default function FeaturesPlanet() {
  return (
    <section
      id="capabilities"
      className="relative isolate overflow-hidden border-t border-brand-border bg-brand-bg-deep bg-[url('/Collage.png')] bg-cover bg-[center_42%] py-16 sm:py-20 lg:py-24 max-sm:bg-[center_38%]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.92)_0%,rgba(20,20,20,0.88)_45%,rgba(20,20,20,0.95)_100%)]"
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 border-b border-brand-border pb-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:pb-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accent">
            Our Specialty
            </p>
            <h2 className="mt-6 max-w-5xl text-[clamp(2.25rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-brand-text-primary">
              Built to move ambitious organisations forward
            </h2>
          </div>
          <p className="max-w-lg text-base leading-7 text-brand-text-secondary lg:justify-self-end lg:pb-2 lg:text-lg lg:leading-8">
            From custom software to enterprise data systems, we design resilient digital ecosystems that scale with your growth.
          </p>
        </div>

        <div className="mt-8">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;

            return (
              <a
                key={capability.id}
                href={`/services#${capability.id}`}
                className="group grid gap-5 border-b border-brand-border py-7 transition-colors duration-300 hover:bg-brand-bg-main/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent sm:py-9 lg:grid-cols-[0.12fr_0.7fr_1fr_48px] lg:items-center lg:gap-8 lg:px-5"
              >
                <span className="flex items-center gap-3 text-xs font-medium tabular-nums text-brand-text-muted">
                  <span className="text-brand-accent">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" className="h-4 w-4 lg:hidden" />
                </span>

                <h3 className="text-2xl font-medium tracking-[-0.04em] text-brand-text-primary transition-colors duration-300 group-hover:text-brand-accent sm:text-3xl lg:text-4xl">
                  {capability.title}
                </h3>

                <p className="max-w-2xl text-sm leading-6 text-brand-text-secondary sm:text-base sm:leading-7">
                  {capability.description}
                </p>

                <span
                  aria-hidden="true"
                  className="hidden h-11 w-11 items-center justify-center rounded-full border border-brand-border-muted text-brand-text-secondary transition-all duration-300 group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white group-hover:translate-x-1 lg:flex"
                >
                  →
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-text-muted">
          Software <span className="px-2 text-brand-accent">/</span> Cloud <span className="px-2 text-brand-accent">/</span> ERP <span className="px-2 text-brand-accent">/</span> Data <span className="px-2 text-brand-accent">/</span> AI
        </p>
      </div>
    </section>
  );
}