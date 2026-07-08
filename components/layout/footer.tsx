export function Footer() {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-center text-sm text-slate-500">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 font-medium">OhmLabs — Tranquility in entropy.</p>
        <p>&copy; {new Date().getFullYear()} OhmLabs. All rights reserved.</p>
      </div>
    </footer>
  );
}