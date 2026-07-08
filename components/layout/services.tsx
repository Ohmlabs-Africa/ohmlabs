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
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-20 border-t border-brand-border bg-brand-bg-deep">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-brand-text-primary sm:text-4xl">Our Expertise</h2>
        <p className="mt-4 text-base text-brand-text-muted">Tailored digital transformations built for structural growth.</p>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="rounded bg-brand-bg-main p-8 border border-brand-border hover:border-brand-border-muted transition-colors">
            <span className="inline-flex items-center rounded bg-brand-accent/10 px-2.5 py-0.5 text-xs font-bold text-brand-accent uppercase tracking-wider mb-4">
              {service.tag}
            </span>
            <h3 className="text-lg font-bold text-brand-text-primary">{service.title}</h3>
            <p className="mt-3 text-sm text-brand-text-secondary leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}