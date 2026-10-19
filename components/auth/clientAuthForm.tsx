"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError, apiRequest } from "@/lib/api";
import { toast } from "sonner";

interface ClientAuthFormProps {
  mode: "login" | "register";
}

export default function ClientAuthForm({ mode }: ClientAuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (mode === "register") {
        const result = await apiRequest<{ notificationSent: boolean }>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
        setSubmitted(true);
        if (result.notificationSent) {
          toast.success("Registration received. OHM Labs will email you after reviewing your request.");
        } else {
          toast.warning("Your registration was received, but OHM Labs could not be notified automatically.");
        }
        return;
      }

      const result = await apiRequest<{
        accessToken: string;
        user: { role: string };
      }>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (result.user.role !== "client") {
        await apiRequest<null>("/api/auth/logout", { method: "POST" });
        setError("Use the administrator sign-in page for this account.");
        return;
      }
      sessionStorage.setItem("ohmlabs_client_access_token", result.accessToken);
      toast.success("Signed in successfully.");
      router.push("/client/dashboard");
    } catch (submitError) {
      const message = submitError instanceof ApiError
        ? submitError.message
        : "The request could not be completed. Please try again.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="mx-auto w-full max-w-md rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-7 shadow-2xl md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">OHM Labs Client Portal</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Request received</h1>
        <p className="mt-4 text-sm leading-6 text-[var(--color-brand-text-secondary)]">
          Your account is pending admin approval. You’ll be able to sign in after OHM Labs reviews your request.
        </p>
        <Link href="/client/login" className="mt-6 inline-flex rounded-xl bg-[var(--color-brand-accent)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-accent-hover)]">
          Go to client sign in
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-7 shadow-2xl md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">OHM Labs Client Portal</p>
      <h1 className="mt-3 text-3xl font-bold text-white">{mode === "login" ? "Client sign in" : "Create your account"}</h1>
      <p className="mt-2 text-sm text-[var(--color-brand-text-secondary)]">
        {mode === "login" ? "Sign in to view your projects and collaborate with your team." : "Your account will be available after an administrator approves it."}
      </p>
      <form className="mt-8 space-y-5" onSubmit={submit}>
        {mode === "register" && (
          <label className="block text-sm text-[var(--color-brand-text-secondary)]">
            Full name
            <input
              required
              minLength={2}
              maxLength={120}
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
            />
          </label>
        )}
        <label className="block text-sm text-[var(--color-brand-text-secondary)]">
          Email address
          <input
            required
            type="email"
            maxLength={254}
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
          />
        </label>
        <label className="block text-sm text-[var(--color-brand-text-secondary)]">
          Password
          <input
            required
            minLength={8}
            maxLength={128}
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
          />
        </label>
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-xl bg-[var(--color-brand-accent)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-brand-accent-hover)] disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? "Please wait..." : mode === "login" ? "Sign in" : "Request account"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-[var(--color-brand-text-secondary)]">
        {mode === "login" ? (
          <>Need a client account? <Link className="font-medium text-[var(--color-brand-accent-glow)] hover:text-white" href="/client/register">Register</Link></>
        ) : (
          <>Already registered? <Link className="font-medium text-[var(--color-brand-accent-glow)] hover:text-white" href="/client/login">Sign in</Link></>
        )}
      </p>
    </section>
  );
}
