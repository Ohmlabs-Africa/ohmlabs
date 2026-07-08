import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-900 text-slate-100">
      {/* Universal Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Platform<span className="text-indigo-400">X</span>
          </Link>
          <nav className="hidden md:flex items-center gap-x-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-x-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white">
              Sign In
            </Link>
            <Link href="/register" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Render Container */}
      <main className="flex-1">{children}</main>

      {/* Universal Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} PlatformX. All rights reserved.</p>
      </footer>
    </div>
  );
}