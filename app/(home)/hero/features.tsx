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
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24 border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-2xl lg:mx-0 mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">System Advantages</h2>
        <p className="mt-4 text-base text-slate-400">Engineered configurations built to address structural bottlenecks directly.</p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {features.map((feat) => (
          <div key={feat.num} className="flex flex-col rounded-2xl bg-slate-900/40 p-8 border border-slate-900 hover:border-indigo-500/20 transition-all duration-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 font-bold mb-4">
              {feat.num}
            </div>
            <h3 className="text-lg font-semibold text-white">{feat.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{feat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}