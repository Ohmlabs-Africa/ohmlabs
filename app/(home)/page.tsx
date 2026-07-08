import Link from 'next/link';
import { ServicesList } from '@/components/layout/services';
import { GalleryGrid } from '@/components/layout/gallery';

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden">
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 text-center sm:pt-24 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Decorative Badge */}
          <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
            Next.js App Router Matrix Enabled
          </span>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Automate Data Workflows with Dynamic Forms
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto">
            Build production-ready schemas, collect robust payloads, and securely manage system infrastructures across specialized analytics sectors.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all"
            >
              Initialize Workspace
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-slate-300 transition-colors">
              Learn architecture <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Feature Item 1 */}
            <div className="flex flex-col rounded-2xl bg-slate-800/50 p-8 border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 font-bold mb-4">
                01
              </div>
              <h3 className="text-lg font-semibold text-white">Dynamic Form Engines</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Render highly conditional data schemas instantly from centralized database configurations without redeploying code.
              </p>
            </div>

            {/* Feature Item 2 */}
            <div className="flex flex-col rounded-2xl bg-slate-800/50 p-8 border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 font-bold mb-4">
                02
              </div>
              <h3 className="text-lg font-semibold text-white">Role Isolation</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Pre-routed structures engineered to separate secure Admin dashboard metrics cleanly from end-user operation views.
              </p>
            </div>

            {/* Feature Item 3 */}
            <div className="flex flex-col rounded-2xl bg-slate-800/50 p-8 border border-slate-800/80 hover:border-indigo-500/30 transition-all duration-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/10 text-indigo-400 font-bold mb-4">
                03
              </div>
              <h3 className="text-lg font-semibold text-white">Server-Side Speed</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Leverage instant static server rendering to deliver lightweight HTML structures to the viewport immediately.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* 2. Custom Services Section Component */}
      <ServicesList />

      {/* 3. Custom Bento Box Photo Gallery Component */}
      <GalleryGrid />

    </div>
  );
}