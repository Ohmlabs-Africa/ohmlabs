"use client";

import { useState } from "react";
import { ApiError, apiRequest } from "@/lib/api";

export default function FontSubmissionForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [fontName, setFontName] = useState("");
  const [fontFile, setFontFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function submitFont(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!fontFile) {
      setError("Please select a font file to submit.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    const payload = new FormData();
    payload.set("type", "font_submission");
    payload.set("name", name);
    payload.set("email", email);
    payload.set("company", company);
    payload.set("fontName", fontName);
    payload.set("fontFile", fontFile);

    try {
      await apiRequest("/api/submissions", { method: "POST", body: payload });
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof ApiError ? submitError.message : "Your font could not be submitted. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-6 shadow-2xl md:p-10">
      {submitted ? (
        <div className="py-8 text-center">
          <h1 className="text-3xl font-bold text-white">Font received</h1>
          <p className="mt-3 text-[var(--color-brand-text-secondary)]">
            Thank you, {name}. Our team will review your font submission.
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">Font Submission</p>
          <h1 className="mt-3 text-3xl font-bold text-white">Share your typeface</h1>
          <p className="mt-2 text-sm text-[var(--color-brand-text-secondary)]">
            Send us your font file and contact details. Accepted formats: TTF, OTF, WOFF, and WOFF2; maximum file size 10 MB.
          </p>

          <form className="mt-8 space-y-5" onSubmit={submitFont}>
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
            <label className="block text-sm text-[var(--color-brand-text-secondary)]">
              Company (optional)
              <input
                maxLength={160}
                autoComplete="organization"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
              />
            </label>
            <label className="block text-sm text-[var(--color-brand-text-secondary)]">
              Font name
              <input
                required
                maxLength={160}
                value={fontName}
                onChange={(event) => setFontName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white outline-none focus:border-[var(--color-brand-accent)]"
              />
            </label>
            <label className="block text-sm text-[var(--color-brand-text-secondary)]">
              Font file
              <input
                required
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                onChange={(event) => setFontFile(event.target.files?.[0] || null)}
                className="mt-2 block w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-[var(--color-brand-accent)] file:px-3 file:py-2 file:text-white"
              />
            </label>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[var(--color-brand-accent)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--color-brand-accent-hover)] disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit font"}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
