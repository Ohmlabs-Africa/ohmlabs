"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError, apiRequest } from "@/lib/api";
import { toast } from "sonner";

type AuthMode = "login" | "forgot-password" | "reset-password";

const titles: Record<AuthMode, string> = {
  login: "Admin sign in",
  "forgot-password": "Reset your password",
  "reset-password": "Choose a new password",
};

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        const result = await apiRequest<{
          accessToken: string;
          user: { role: string };
        }>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        if (result.user.role !== "admin") {
          await apiRequest<null>("/api/auth/logout", { method: "POST" });
          setError("This account does not have admin dashboard access.");
          return;
        }
        sessionStorage.setItem("ohmlabs_access_token", result.accessToken);
        toast.success("Signed in successfully.");
        router.push("/dashboard");
        return;
      }

      if (mode === "forgot-password") {
        await apiRequest<null>("/api/auth/forgot-password", {
          method: "POST",
          body: JSON.stringify({ email }),
        });
        toast.success("If an account exists for that email, a password reset link will be sent.");
        return;
      }

      const token = new URLSearchParams(window.location.search).get("token") || "";
      if (!token) {
        setError("This password reset link is missing its token. Request a new link.");
        return;
      }
      await apiRequest<null>("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      toast.success("Your password has been reset. You can now sign in.");
    } catch (submitError) {
      const message = submitError instanceof ApiError ? submitError.message : "The request could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-7 shadow-2xl md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">OHM Labs</p>
      <h1 className="mt-3 text-3xl font-bold text-white">{titles[mode]}</h1>
      <form className="mt-8 space-y-5" onSubmit={submit}>
        {mode !== "reset-password" && (
          <label className="block text-sm text-[var(--color-brand-text-secondary)]">
            Email address
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
            />
          </label>
        )}
        {(mode === "login" || mode === "reset-password") && (
          <label className="block text-sm text-[var(--color-brand-text-secondary)]">
            {mode === "login" ? "Password" : "New password"}
            <input
              required
              minLength={8}
              type="password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
            />
          </label>
        )}
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[var(--color-brand-accent)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-brand-accent-hover)] disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Please wait..." : mode === "login" ? "Sign in" : mode === "forgot-password" ? "Send reset link" : "Reset password"}
        </button>
      </form>
      <nav className="mt-6 flex flex-wrap justify-between gap-3 text-sm text-[var(--color-brand-text-secondary)]">
        {mode !== "login" && <Link className="hover:text-white" href="/login">Back to sign in</Link>}
        {mode === "login" && <Link className="hover:text-white" href="/forgot-password">Forgot password?</Link>}
        {mode === "reset-password" && <Link className="hover:text-white" href="/forgot-password">Request a reset link</Link>}
      </nav>
    </section>
  );
}
