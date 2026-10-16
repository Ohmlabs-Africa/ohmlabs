"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiRequest, apiUrl } from "@/lib/api";

interface DashboardStats {
  users: { total: number; active: number };
  signins: { total: number; last30Days: number; today: number };
  submissions: {
    total: number;
    byType: { contact: number; font_submission: number; calendar_booking: number };
  };
}

interface Submission {
  _id: string;
  type: string;
  name: string;
  email: string;
  company?: string;
  message?: string;
  fontName?: string;
  fontFileUrl?: string;
  bookingDate?: string;
  bookingTime?: string;
  timezone?: string;
  service?: string;
  details?: Record<string, unknown>;
  notificationSent?: boolean;
  attachments: Array<{
    storageKey: string;
    originalName: string;
    contentType: string;
    size: number;
  }>;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        let token = sessionStorage.getItem("ohmlabs_access_token");
        if (!token) {
          const refreshed = await apiRequest<{ accessToken: string }>("/api/auth/refresh", { method: "POST" });
          token = refreshed.accessToken;
          sessionStorage.setItem("ohmlabs_access_token", token);
        }

        const loadDashboard = async (accessToken: string) => {
          const authorization = { Authorization: `Bearer ${accessToken}` };
          const [statsResult, submissionResult] = await Promise.all([
            apiRequest<DashboardStats>("/api/admin/dashboard/stats", {
              headers: authorization,
            }),
            apiRequest<Submission[]>("/api/admin/submissions", {
              headers: authorization,
            }),
          ]);
          return [statsResult, submissionResult] as const;
        };

        try {
          const [statsResult, submissionResult] = await loadDashboard(token);
          if (!cancelled) {
            setStats(statsResult);
            setSubmissions(submissionResult);
          }
        } catch (requestError) {
          if (!(requestError instanceof ApiError) || requestError.status !== 401) throw requestError;
          const refreshed = await apiRequest<{ accessToken: string }>("/api/auth/refresh", { method: "POST" });
          sessionStorage.setItem("ohmlabs_access_token", refreshed.accessToken);
          const [statsResult, submissionResult] = await loadDashboard(refreshed.accessToken);
          if (!cancelled) {
            setStats(statsResult);
            setSubmissions(submissionResult);
          }
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof ApiError ? loadError.message : "Dashboard statistics could not be loaded.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void loadStats();
    return () => { cancelled = true; };
  }, []);

  async function signOut() {
    try {
      await apiRequest<null>("/api/auth/logout", { method: "POST" });
    } catch (signOutError) {
      setError(signOutError instanceof ApiError ? signOutError.message : "Could not sign out. Please try again.");
      return;
    }
    sessionStorage.removeItem("ohmlabs_access_token");
    router.push("/login");
  }

  async function downloadAttachment(submission: Submission, storageKey: string, fileName: string) {
    const token = sessionStorage.getItem("ohmlabs_access_token");
    if (!token) {
      setError("Your admin session has expired. Please sign in again.");
      return;
    }

    try {
      const response = await fetch(apiUrl(`/api/admin/submissions/${submission._id}/attachments/${encodeURIComponent(storageKey)}`), {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new ApiError("The attachment could not be downloaded.", response.status);
      const downloadUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    } catch (downloadError) {
      setError(downloadError instanceof ApiError ? downloadError.message : "The attachment could not be downloaded.");
    }
  }

  const cards = stats ? [
    { label: "Active users", value: `${stats.users.active} / ${stats.users.total}` },
    { label: "Sign-ins today", value: stats.signins.today },
    { label: "Sign-ins, last 30 days", value: stats.signins.last30Days },
    { label: "All-time sign-ins", value: stats.signins.total },
    { label: "All submissions", value: stats.submissions.total },
    { label: "Contact / proposal forms", value: stats.submissions.byType.contact },
    { label: "Font submissions", value: stats.submissions.byType.font_submission },
    { label: "Calendar bookings", value: stats.submissions.byType.calendar_booking },
  ] : [];

  return (
    <main className="min-h-[70vh] bg-[var(--color-brand-bg-main)] px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">Admin</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Dashboard</h1>
          </div>
          <button onClick={() => void signOut()} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:border-[var(--color-brand-accent)]">
            Sign out
          </button>
        </header>
        {isLoading && <p className="text-[var(--color-brand-text-secondary)]">Loading dashboard...</p>}
        {error && (
          <div role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-300">
            {error} <a className="ml-2 underline" href="/login">Sign in again</a>
          </div>
        )}
        {!isLoading && stats && (
          <>
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((card) => (
                <article key={card.label} className="rounded-2xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-5">
                  <h2 className="text-sm text-[var(--color-brand-text-secondary)]">{card.label}</h2>
                  <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
                </article>
              ))}
            </section>
            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold text-white">Frontend submissions</h2>
              {submissions.length === 0 ? (
                <p className="text-[var(--color-brand-text-secondary)]">No submissions received yet.</p>
              ) : (
                <div className="space-y-4">
                  {submissions.map((submission) => (
                    <article key={submission._id} className="rounded-2xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{submission.name}</h3>
                          <p className="text-sm text-[var(--color-brand-text-secondary)]">
                            <a href={`mailto:${submission.email}`} className="underline">{submission.email}</a>
                            {submission.company ? ` · ${submission.company}` : ""}
                          </p>
                        </div>
                        <span className="rounded-full border border-[var(--color-brand-border-muted)] px-3 py-1 text-xs text-[var(--color-brand-accent)]">
                          {(submission.type || "contact").replaceAll("_", " ")}
                        </span>
                      </div>
                      <p className="mt-3 text-xs text-[var(--color-brand-text-muted)]">
                        {new Date(submission.createdAt).toLocaleString()}
                      </p>
                      {submission.fontName && <p className="mt-3 text-sm text-white">Font: {submission.fontName}</p>}
                      {submission.service && <p className="mt-3 text-sm text-white">Service: {submission.service}</p>}
                      {submission.bookingDate && (
                        <p className="mt-1 text-sm text-[var(--color-brand-text-secondary)]">
                          Booking: {new Date(submission.bookingDate).toLocaleString()} {submission.bookingTime && `(${submission.bookingTime})`} {submission.timezone}
                        </p>
                      )}
                      {submission.message && <p className="mt-3 whitespace-pre-wrap text-sm text-[var(--color-brand-text-secondary)]">{submission.message}</p>}
                      {submission.type === "calendar_booking" && !submission.notificationSent && (
                        <p className="mt-2 text-sm text-amber-400">Booking email notification is pending.</p>
                      )}
                      {submission.details && (
                        <dl className="mt-3 grid gap-x-5 gap-y-1 text-sm sm:grid-cols-2">
                          {Object.entries(submission.details).map(([key, value]) => (
                            <div key={key} className="flex gap-2">
                              <dt className="text-[var(--color-brand-text-muted)]">{key}:</dt>
                              <dd className="break-words text-[var(--color-brand-text-secondary)]">
                                {Array.isArray(value) ? value.join(", ") : typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                      {submission.fontFileUrl && (
                        <a href={submission.fontFileUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-[var(--color-brand-accent)] underline">
                          Open submitted font URL
                        </a>
                      )}
                      {submission.attachments.length > 0 && (
                        <ul className="mt-3 space-y-2">
                          {submission.attachments.map((attachment) => (
                            <li key={attachment.storageKey}>
                              <button
                                className="text-sm text-[var(--color-brand-accent)] underline"
                                onClick={() => void downloadAttachment(submission, attachment.storageKey, attachment.originalName)}
                              >
                                Download {attachment.originalName} ({Math.ceil(attachment.size / 1024)} KB)
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
