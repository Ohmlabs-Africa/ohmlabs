import type { Metadata } from "next";
import AuthForm from "@/components/auth/authForm";

export const metadata: Metadata = {
  title: "Admin Sign In | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-[70vh] bg-[var(--color-brand-bg-main)] px-4 py-16">
      <AuthForm mode="login" />
    </main>
  );
}
