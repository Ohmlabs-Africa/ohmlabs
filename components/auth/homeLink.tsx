import Link from "next/link";
import { House } from "lucide-react";

export default function HomeLink() {
  return (
    <Link
      href="/"
      aria-label="Return to the OHM Labs homepage"
      className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] px-3 py-2 text-sm font-medium text-[var(--color-brand-text-secondary)] transition-colors hover:border-[var(--color-brand-accent)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] sm:left-6 sm:top-6"
    >
      <House size={16} aria-hidden="true" />
      <span>Home</span>
    </Link>
  );
}
