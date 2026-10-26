import type { Metadata } from "next";
import ClientAuthForm from "@/components/auth/clientAuthForm";
import HomeLink from "@/components/auth/homeLink";

export const metadata: Metadata = {
  title: "Client Registration | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function ClientRegistrationPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[var(--color-brand-bg-main)] px-4 py-16">
      <HomeLink />
      <ClientAuthForm mode="register" />
    </main>
  );
}
