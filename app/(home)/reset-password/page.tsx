import type { Metadata } from "next";
import AuthForm from "@/components/auth/authForm";

export const metadata: Metadata = {
  title: "Reset Password | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-[70vh] bg-[var(--color-brand-bg-main)] px-4 py-16">
      <AuthForm mode="reset-password" />
    </main>
  );
}
