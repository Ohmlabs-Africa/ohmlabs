interface FeatureItem {
  num: string;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  { num: '01', title: 'Modular Architecture', description: 'Isolate functional boundaries cleanly. Route logic steps dynamically through scalable backend schemas without layout shifts.' },
  { num: '02', title: 'Role Isolation', description: 'Pre-routed structures engineered to separate secure enterprise metrics cleanly from generic public viewport paths.' },
  { num: '03', title: 'Server-Side Speed', description: 'Leverage instant edge cache compilation to render and ship lightweight HTML directly to your clients instantly.' }
];

export function FeaturesList() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-t border-brand-border bg-brand-bg-deep">
      <div className="mx-auto max-w-2xl lg:mx-0 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-brand-text-primary sm:text-4xl">System Advantages</h2>
        <p className="mt-4 text-base text-brand-text-muted">Engineered configurations built to address structural bottlenecks directly.</p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {features.map((feat) => (
          <div key={feat.num} className="flex flex-col rounded bg-brand-bg-main p-8 border border-brand-border hover:border-brand-accent/40 transition-all duration-300 group">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-brand-accent/10 text-brand-accent font-black mb-4 group-hover:bg-brand-accent group-hover:text-brand-text-primary transition-colors">
              {feat.num}
            </div>
            <h3 className="text-lg font-bold text-brand-text-primary">{feat.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-text-secondary">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}