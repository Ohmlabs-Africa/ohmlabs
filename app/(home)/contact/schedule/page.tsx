import CalendarBooking from "@/components/contact/calenderBooking";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Book a Discovery Call | OhmLabs Africa",
  description: "Schedule a discovery call with OHM Labs Africa to discuss software, ERP, cloud, data, or AI transformation.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/contact/schedule',
  },
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-[var(--color-brand-bg-main)] px-4 py-16 md:px-8">
      <div className="mx-auto max-w-5xl">
        <CalendarBooking />
      </div>
    </main>
  );
}