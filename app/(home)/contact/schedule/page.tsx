import CalendarBooking from "@/components/contact/calenderBooking";

export const metadata = {
  title: "Book a Discovery Call | OhmLabs",
  description: "Schedule a complimentary consultation with our technology consultants.",
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