interface ServiceItem {
  title: string;
  description: string;
  tag: string;
}

const services: ServiceItem[] = [
  { title: "Software Development", description: "Building modern, scalable web applications with cutting-edge architectures.", tag: "Core" },
  { title: "Data Management & Analytics", description: "Optimizing subnational estimates, dynamic data pipelines, and reporting systems.", tag: "Data" },
  { title: "ERP Implementations", description: "Streamlining business operations, resource allocation, and digital infrastructures.", tag: "Enterprise" },
];

export function ServicesList() {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-slate-800/60">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Expertise</h2>
        <p className="mt-4 text-base text-slate-400">Tailored digital transformations built for structural growth.</p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="rounded-xl bg-slate-950 p-8 border border-slate-800 hover:border-slate-700 transition-colors">
            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-4">
              {service.tag}
            </span>
            <h3 className="text-lg font-semibold text-white">{service.title}</h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}