import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg-deep/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tighter text-brand-accent hover:text-brand-accent-glow transition-colors">
          Ohm<span className="text-brand-text-primary">Labs</span>
        </Link>
        <nav className="hidden md:flex items-center gap-x-6 text-sm font-medium text-brand-text-secondary">
          <Link href="/" className="hover:text-brand-text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-brand-text-primary transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-x-4">
          <Link href="/login" className="text-sm font-medium text-brand-text-secondary hover:text-brand-text-primary transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="rounded bg-brand-accent px-4 py-1.5 text-sm font-medium text-brand-text-primary transition-all hover:bg-brand-accent-hover active:scale-98">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}