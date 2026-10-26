import type { Metadata } from "next";
import AuthForm from "@/components/auth/authForm";
import HomeLink from "@/components/auth/homeLink";

export const metadata: Metadata = {
  title: "Forgot Password | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="relative grid min-h-screen place-items-center bg-[var(--color-brand-bg-deep)] px-4 py-16">
      <HomeLink />
      <AuthForm mode="forgot-password" />
    </main>
  );
}
