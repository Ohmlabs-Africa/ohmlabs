import type { Metadata } from "next";
import AuthForm from "@/components/auth/authForm";

export const metadata: Metadata = {
  title: "Forgot Password | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--color-brand-bg-deep)] px-4 py-16">
      <AuthForm mode="forgot-password" />
    </main>
  );
}
