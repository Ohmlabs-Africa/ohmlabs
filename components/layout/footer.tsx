export function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg-deep py-12 text-center text-sm text-brand-text-muted">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-brand-text-secondary font-medium tracking-wide">
          OhmLabs — Tranquility in entropy.
        </p>
        <p className="text-xs">
          &copy; {new Date().getFullYear()} OhmLabs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}