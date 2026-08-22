import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist or may have moved.',
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg-deep px-6 py-24 text-white">
      <div className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-accent">
          404 Error
        </p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
          This page can&apos;t be found.
        </h1>
        <p className="mt-6 text-lg leading-8 text-brand-text-secondary">
          The link may be outdated, or the page may have moved. Let&apos;s get you back to the work that matters.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-full bg-brand-accent px-8 py-4 text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
          >
            Go back home
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-brand-border px-8 py-4 text-sm font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent"
          >
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
