import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          About Our Operations
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">
          We build integrated digital environments, specializing in data pipeline management, robust software frameworks, and cross-functional enterprise automation.
        </p>
        <div className="mt-10 flex items-center justify-center">
          <Link
            href="/"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Back to Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}