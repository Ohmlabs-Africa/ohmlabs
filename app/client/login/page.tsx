import type { Metadata } from "next";
import ClientAuthForm from "@/components/auth/clientAuthForm";

export const metadata: Metadata = {
  title: "Client Sign In | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function ClientLoginPage() {
  return (
    <main className="min-h-screen bg-[var(--color-brand-bg-main)] px-4 py-16">
      <ClientAuthForm mode="login" />
    </main>
  );
}
