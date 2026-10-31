const partners = [
  { name: "ASCH", href: "https://www.asch.africa/" },
  { name: "ON DEMAND", href: "https://www.ondemandke.com/" },
];

export function Partners() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-t border-[var(--color-brand-border)] bg-[var(--color-brand-bg-main)]"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--color-brand-accent)]">
            Working together
          </p>
          <h2
            id="partners-heading"
            className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Our Partners
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-brand-text-secondary)]">
            Meet the organisations helping us build a more connected digital
            ecosystem.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {partners.map((partner) => (
            <li key={partner.name}>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-24 min-w-0 items-center justify-center rounded-2xl border border-[var(--color-brand-border)] bg-[var(--color-brand-bg-deep)] px-1 py-5 text-center transition duration-300 hover:-translate-y-1 hover:border-[var(--color-brand-accent)] hover:bg-white/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-brand-accent)] sm:min-h-36 sm:px-5 sm:py-8"
              >
                <span className="whitespace-nowrap text-[clamp(0.55rem,2.8vw,1.875rem)] font-black tracking-wide text-white transition-colors group-hover:text-[var(--color-brand-accent)]">
                  {partner.name}
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}

          {[1, 2].map((slot) => (
            <li
              key={slot}
              aria-label="Partner slot available"
              className="flex min-h-24 min-w-0 items-center justify-center rounded-2xl border border-dashed border-[var(--color-brand-border)] px-1 py-5 text-center sm:min-h-36 sm:px-5 sm:py-8"
            >
              <span className="text-[clamp(0.5rem,2.5vw,0.875rem)] font-medium text-[var(--color-brand-text-muted)]">
                Partner logo coming soon
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
