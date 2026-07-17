import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-color-brand-bg-deep text-slate-100 antialiased selection:bg-color-brand-accent-hover/30">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}