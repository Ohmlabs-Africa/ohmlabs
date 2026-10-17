"use client";

import {
  Activity,
  AlertCircle,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Bell,
  CalendarDays,
  ChevronDown,
  Clock3,
  ExternalLink,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Paperclip,
  Search,
  Type,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError, apiRequest, apiUrl } from "@/lib/api";

type SubmissionStatus = "new" | "in_progress" | "closed";
type SubmissionType = "contact" | "font_submission" | "calendar_booking";
type StatusFilter = "all" | SubmissionStatus;
type TypeFilter = "all" | SubmissionType;
type SortKey = "name" | "type" | "status" | "createdAt";

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
  type: SubmissionType;
  status: SubmissionStatus;
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

const pageSize = 10;
const dashboardPalette: CSSProperties & Record<string, string> = {
  "--color-slate-100": "var(--color-brand-text-primary)",
  "--color-slate-200": "var(--color-brand-text-secondary)",
  "--color-slate-300": "var(--color-brand-text-secondary)",
  "--color-slate-400": "var(--color-brand-text-muted)",
  "--color-slate-500": "var(--color-brand-text-muted)",
  "--color-slate-600": "var(--color-brand-text-muted)",
  "--color-red-200": "var(--color-brand-accent-glow)",
  "--color-red-300": "var(--color-brand-accent-glow)",
};
const typeLabels: Record<SubmissionType, string> = {
  contact: "Proposal",
  font_submission: "Font",
  calendar_booking: "Booking",
};
const statusLabels: Record<SubmissionStatus, string> = {
  new: "New",
  in_progress: "In progress",
  closed: "Closed",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortAscending, setSortAscending] = useState(false);
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState("");
  const [expandedId, setExpandedId] = useState("");

  const getAdminToken = useCallback(async () => {
    let token = sessionStorage.getItem("ohmlabs_access_token");
    if (!token) {
      const refreshed = await apiRequest<{ accessToken: string }>("/api/auth/refresh", { method: "POST" });
      token = refreshed.accessToken;
      sessionStorage.setItem("ohmlabs_access_token", token);
    }
    return token;
  }, []);

  const loadDashboard = useCallback(async (token: string) => {
    const headers = { Authorization: `Bearer ${token}` };
    const [statsResult, submissionResult] = await Promise.all([
      apiRequest<DashboardStats>("/api/admin/dashboard/stats", { headers }),
      apiRequest<Submission[]>("/api/admin/submissions", { headers }),
    ]);
    return [statsResult, submissionResult] as const;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      try {
        const token = await getAdminToken();
        let data: Awaited<ReturnType<typeof loadDashboard>>;
        try {
          data = await loadDashboard(token);
        } catch (requestError) {
          if (!(requestError instanceof ApiError) || requestError.status !== 401) throw requestError;
          const refreshed = await apiRequest<{ accessToken: string }>("/api/auth/refresh", { method: "POST" });
          sessionStorage.setItem("ohmlabs_access_token", refreshed.accessToken);
          data = await loadDashboard(refreshed.accessToken);
        }
        if (!cancelled) {
          setStats(data[0]);
          setSubmissions(data[1]);
          setIsAuthorized(true);
        }
      } catch (loadError) {
        if (cancelled) return;
        sessionStorage.removeItem("ohmlabs_access_token");
        if (loadError instanceof ApiError && loadError.status === 403) {
          toast.error("Administrator access is required to view this page.");
        } else if (loadError instanceof ApiError && loadError.status !== 401) {
          setError(loadError.message);
          setIsLoading(false);
          return;
        }
        router.replace("/login");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void initialize();
    return () => { cancelled = true; };
  }, [getAdminToken, loadDashboard, router]);

  async function signOut() {
    try {
      await apiRequest<null>("/api/auth/logout", { method: "POST" });
      sessionStorage.removeItem("ohmlabs_access_token");
      router.replace("/login");
    } catch (signOutError) {
      const message = signOutError instanceof ApiError ? signOutError.message : "Could not sign out. Please try again.";
      setError(message);
      toast.error(message);
    }
  }

  async function updateStatus(submission: Submission, status: SubmissionStatus) {
    if (submission.status === status) return;
    setUpdatingId(submission._id);
    setError("");
    try {
      let token = await getAdminToken();
      let updated: Submission;
      try {
        updated = await apiRequest<Submission>(`/api/admin/submissions/${submission._id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status }),
        });
      } catch (requestError) {
        if (!(requestError instanceof ApiError) || requestError.status !== 401) throw requestError;
        const refreshed = await apiRequest<{ accessToken: string }>("/api/auth/refresh", { method: "POST" });
        token = refreshed.accessToken;
        sessionStorage.setItem("ohmlabs_access_token", token);
        updated = await apiRequest<Submission>(`/api/admin/submissions/${submission._id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify({ status }),
        });
      }
      setSubmissions((current) => current.map((item) => item._id === updated._id ? updated : item));
      toast.success("Submission status updated.");
    } catch (updateError) {
      const message = updateError instanceof ApiError ? updateError.message : "The submission status could not be updated.";
      setError(message);
      toast.error(message);
      if (updateError instanceof ApiError && updateError.status === 403) {
        sessionStorage.removeItem("ohmlabs_access_token");
        router.replace("/login");
      }
    } finally {
      setUpdatingId("");
    }
  }

  async function downloadAttachment(submission: Submission, storageKey: string, fileName: string) {
    const token = sessionStorage.getItem("ohmlabs_access_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    try {
      const response = await fetch(apiUrl(`/api/admin/submissions/${submission._id}/attachments/${encodeURIComponent(storageKey)}`), {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new ApiError(response.status === 401 ? "Your admin session has expired." : "The attachment could not be downloaded.", response.status);
      const objectUrl = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch (downloadError) {
      const message = downloadError instanceof ApiError ? downloadError.message : "The attachment could not be downloaded.";
      setError(message);
      toast.error(message);
      if (downloadError instanceof ApiError && downloadError.status === 401) router.replace("/login");
    }
  }

  const filteredSubmissions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return submissions
      .filter((item) => typeFilter === "all" || item.type === typeFilter)
      .filter((item) => statusFilter === "all" || item.status === statusFilter)
      .filter((item) => !query || [item.name, item.email, item.company, item.message, item.service, item.fontName]
        .some((value) => value?.toLowerCase().includes(query)))
      .sort((left, right) => {
        let comparison = 0;
        if (sortKey === "createdAt") comparison = new Date(left.createdAt).getTime() - new Date(right.createdAt).getTime();
        else comparison = String(left[sortKey] || "").localeCompare(String(right[sortKey] || ""));
        return sortAscending ? comparison : -comparison;
      });
  }, [search, sortAscending, sortKey, statusFilter, submissions, typeFilter]);

  const pageCount = Math.max(1, Math.ceil(filteredSubmissions.length / pageSize));
  const visibleSubmissions = filteredSubmissions.slice((page - 1) * pageSize, page * pageSize);
  const newCount = submissions.filter(({ status }) => status === "new").length;
  const recentSubmissions = [...submissions]
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())
    .slice(0, 5);
  const cards = stats ? [
    { label: "Total submissions", value: stats.submissions.total, detail: "All received records", icon: Inbox },
    { label: "Active users", value: stats.users.active, detail: `${stats.users.total} total accounts`, icon: Users },
    { label: "Sign-ins today", value: stats.signins.today, detail: `${stats.signins.last30Days} in the last 30 days`, icon: Activity },
    { label: "New to review", value: newCount, detail: "Currently marked as new", icon: Clock3 },
  ] : [];

  if (isLoading || !isAuthorized) {
    return (
      <main style={dashboardPalette} className="grid min-h-screen place-items-center bg-[var(--color-brand-bg-deep)] px-6 text-slate-300">
        {error ? (
          <div className="max-w-md text-center">
            <AlertCircle size={24} className="mx-auto text-red-300" />
            <p role="alert" className="mt-3 text-sm text-slate-200">{error}</p>
            <div className="mt-5 flex justify-center gap-4 text-sm">
              <button onClick={() => window.location.reload()} className="font-medium text-[var(--color-brand-accent-glow)] hover:text-white">Try again</button>
              <button onClick={() => router.replace("/login")} className="text-slate-400 hover:text-white">Sign in</button>
            </div>
          </div>
        ) : (
          <p role="status" className="flex items-center gap-3 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--color-brand-accent)]" />
            Verifying administrator access...
          </p>
        )}
      </main>
    );
  }

  function sortBy(key: SortKey) {
    if (key === sortKey) setSortAscending((current) => !current);
    else {
      setSortKey(key);
      setSortAscending(key !== "createdAt");
    }
  }

  function navLink(id: string, label: string, Icon: typeof LayoutDashboard) {
    return (
      <a
        href={`#${id}`}
        onClick={() => { setSidebarOpen(false); setActiveSection(id); }}
        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${activeSection === id ? "bg-white/10 font-medium text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
      >
        <Icon size={18} aria-hidden="true" />
        <span>{label}</span>
        {id === "submissions" && newCount > 0 && (
          <span className="ml-auto rounded-full bg-[var(--color-brand-accent)]/15 px-2 py-0.5 text-xs text-red-300">{newCount}</span>
        )}
      </a>
    );
  }

  return (
    <main style={dashboardPalette} className="min-h-screen bg-[var(--color-brand-bg-deep)] text-slate-100">
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
        />
      )}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-[var(--color-brand-border)] bg-[var(--color-brand-bg-main)] px-4 py-5 transition-transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-2 pb-8">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--color-brand-accent)] text-sm font-bold text-white">O</div>
          <div>
            <p className="text-sm font-semibold text-white">OHM Labs</p>
            <p className="text-xs text-slate-500">Admin workspace</p>
          </div>
          <button className="ml-auto rounded p-1 text-slate-400 hover:text-white md:hidden" aria-label="Close navigation" onClick={() => setSidebarOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
        <nav aria-label="Dashboard navigation" className="space-y-1">
          {navLink("overview", "Overview", LayoutDashboard)}
          {navLink("submissions", "Submissions", FileText)}
        </nav>

        <div className="mt-auto border-t border-[var(--color-brand-border)] pt-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">AD</div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white">Administrator</p>
              <p className="text-xs text-slate-500">Admin account</p>
            </div>
          </div>
          <button
            onClick={() => void signOut()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]"
          >
            <LogOut size={18} aria-hidden="true" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-h-screen md:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-[var(--color-brand-border)] bg-[var(--color-brand-bg-deep)]/95 px-4 backdrop-blur md:px-8">
          <button className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white md:hidden" aria-label="Open navigation" onClick={() => setSidebarOpen(true)}>
            <Menu size={20} />
          </button>
          <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
            <div>
              <p className="hidden text-xs text-slate-500 sm:block">OHM Labs / Workspace</p>
              <h1 className="text-base font-semibold text-white">Overview</h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setStatusFilter("new");
                  setPage(1);
                  setActiveSection("submissions");
                  document.getElementById("submissions")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]"
                aria-label={`${newCount} new submissions`}
              >
                <Bell size={19} />
                {newCount > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[var(--color-brand-accent)]" />}
              </button>
              <span className="hidden h-8 w-px bg-white/10 sm:block" />
              <span className="hidden text-sm text-slate-300 sm:block">Administrator</span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1440px] px-4 py-7 md:px-8 md:py-9">
          {error && (
            <div role="alert" className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <p className="flex-1">{error}</p>
              <button className="text-red-200 underline" onClick={() => setError("")}>Dismiss</button>
            </div>
          )}

          <section id="overview" aria-labelledby="overview-heading" className="scroll-mt-24">
            <div className="mb-6">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--color-brand-accent-glow)]">Overview</p>
              <h2 id="overview-heading" className="mt-1 text-2xl font-semibold tracking-tight text-white">Good to see you</h2>
              <p className="mt-1 text-sm text-slate-400">A live snapshot of sign-ins and frontend submissions.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {cards.map(({ label, value, detail, icon: Icon }) => (
                <article key={label} className="rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-slate-400">{label}</p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
                    </div>
                    <span className="rounded-lg bg-white/[0.06] p-2.5 text-slate-300"><Icon size={18} /></span>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">{detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.8fr)]">
              <section id="submissions" aria-labelledby="submissions-heading" className="scroll-mt-24 overflow-hidden rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)]">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--color-brand-border)] p-5">
                  <div>
                    <h2 id="submissions-heading" className="text-base font-semibold text-white">Submissions</h2>
                    <p className="mt-1 text-sm text-slate-500">{filteredSubmissions.length} matching records</p>
                  </div>
                  <div className="flex w-full flex-wrap gap-2 sm:w-auto">
                    <label className="relative min-w-[200px] flex-1 sm:flex-none">
                      <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        aria-label="Search submissions"
                        type="search"
                        value={search}
                        onChange={(event) => { setSearch(event.target.value); setPage(1); }}
                        placeholder="Search submissions"
                        className="w-full rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-[var(--color-brand-accent)]"
                      />
                    </label>
                    <label className="sr-only" htmlFor="submission-type-filter">Filter by submission type</label>
                    <select
                      id="submission-type-filter"
                      value={typeFilter}
                      onChange={(event) => { setTypeFilter(event.target.value as TypeFilter); setPage(1); }}
                      className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2 text-sm text-slate-300 outline-none focus:border-[var(--color-brand-accent)]"
                    >
                      <option value="all">All types</option>
                      <option value="contact">Proposals</option>
                      <option value="font_submission">Fonts</option>
                      <option value="calendar_booking">Bookings</option>
                    </select>
                    <label className="sr-only" htmlFor="submission-status-filter">Filter by status</label>
                    <select
                      id="submission-status-filter"
                      value={statusFilter}
                      onChange={(event) => { setStatusFilter(event.target.value as StatusFilter); setPage(1); }}
                      className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2 text-sm text-slate-300 outline-none focus:border-[var(--color-brand-accent)]"
                    >
                      <option value="all">All statuses</option>
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>

                {isLoading ? (
                  <div role="status" className="space-y-3 p-5">
                    <span className="sr-only">Loading submissions</span>
                    {[0, 1, 2].map((item) => <div key={item} className="h-12 animate-pulse rounded-lg bg-white/[0.05]" />)}
                  </div>
                ) : filteredSubmissions.length === 0 ? (
                  <div className="px-5 py-14 text-center">
                    <Inbox size={24} className="mx-auto text-slate-500" />
                    <h3 className="mt-3 text-sm font-medium text-white">{submissions.length ? "No matching submissions" : "No submissions yet"}</h3>
                    <p className="mt-1 text-sm text-slate-500">{submissions.length ? "Try changing your search or filters." : "New frontend proposals, font submissions, and bookings will appear here."}</p>
                    {submissions.length > 0 && (
                      <button
                        onClick={() => { setSearch(""); setTypeFilter("all"); setStatusFilter("all"); setPage(1); }}
                        className="mt-4 text-sm font-medium text-[var(--color-brand-accent-glow)] hover:text-white"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[760px] text-left text-sm">
                        <thead className="bg-white/[0.025] text-xs uppercase tracking-wide text-slate-500">
                          <tr>
                            {([
                              ["name", "Contact"],
                              ["type", "Type"],
                              ["status", "Status"],
                              ["createdAt", "Received"],
                            ] as const).map(([key, label]) => (
                              <th key={key} scope="col" className="px-5 py-3 font-medium">
                                <button onClick={() => sortBy(key)} className="inline-flex items-center gap-1.5 hover:text-white">
                                  {label}
                                  {sortKey === key ? (sortAscending ? <ArrowUpWideNarrow size={14} /> : <ArrowDownWideNarrow size={14} />) : null}
                                </button>
                              </th>
                            ))}
                            <th scope="col" className="px-5 py-3 font-medium">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-brand-border)]">
                          {visibleSubmissions.map((submission) => (
                            <SubmissionRows
                              key={submission._id}
                              submission={submission}
                              expanded={expandedId === submission._id}
                              updating={updatingId === submission._id}
                              onExpand={() => setExpandedId((current) => current === submission._id ? "" : submission._id)}
                              onStatusChange={(status) => void updateStatus(submission, status)}
                              onDownload={(storageKey, name) => void downloadAttachment(submission, storageKey, name)}
                            />
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="flex items-center justify-between border-t border-[var(--color-brand-border)] px-5 py-3">
                      <p className="text-xs text-slate-500">
                        Showing {filteredSubmissions.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredSubmissions.length)} of {filteredSubmissions.length}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPage((current) => Math.max(1, current - 1))}
                          disabled={page <= 1}
                          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                          disabled={page >= pageCount}
                          className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </section>

              <aside aria-labelledby="activity-heading" className="rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)]">
                <div className="border-b border-[var(--color-brand-border)] p-5">
                  <h2 id="activity-heading" className="text-base font-semibold text-white">Recent activity</h2>
                  <p className="mt-1 text-sm text-slate-500">Latest incoming submissions</p>
                </div>
                {recentSubmissions.length === 0 ? (
                  <p className="px-5 py-10 text-center text-sm text-slate-500">Activity will appear when submissions arrive.</p>
                ) : (
                  <ol className="divide-y divide-[var(--color-brand-border)]">
                    {recentSubmissions.map((submission) => (
                      <li key={submission._id} className="flex gap-3 px-5 py-4">
                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-slate-300">
                          {submission.type === "font_submission" ? <Type size={16} /> : submission.type === "calendar_booking" ? <CalendarDays size={16} /> : <FileText size={16} />}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm text-slate-200"><span className="font-medium text-white">{submission.name}</span> sent a {typeLabels[submission.type]?.toLowerCase() || "submission"}</p>
                          <p className="mt-1 text-xs text-slate-500">{formatDate(submission.createdAt)}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </aside>
            </div>
          </section>

          {stats && (
            <section aria-labelledby="breakdown-heading" className="mt-6 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-5">
              <div className="mb-5">
                <h2 id="breakdown-heading" className="text-base font-semibold text-white">Submission breakdown</h2>
                <p className="mt-1 text-sm text-slate-500">Counts by type from all received submissions</p>
              </div>
              <div className="space-y-4">
                <BreakdownRow label="Proposals" value={stats.submissions.byType.contact} total={stats.submissions.total} icon={FileText} />
                <BreakdownRow label="Font submissions" value={stats.submissions.byType.font_submission} total={stats.submissions.total} icon={Type} />
                <BreakdownRow label="Calendar bookings" value={stats.submissions.byType.calendar_booking} total={stats.submissions.total} icon={CalendarDays} />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}

function BreakdownRow({ icon: Icon, label, value, total }: { icon: typeof FileText; label: string; value: number; total: number }) {
  const percentage = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 sm:grid-cols-[minmax(130px,0.7fr)_minmax(100px,2fr)_70px] sm:gap-4">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <Icon size={16} className="shrink-0 text-slate-500" />
        <span>{label}</span>
      </div>
      <div
        className="col-span-2 h-2 overflow-hidden rounded-full bg-white/[0.07] sm:col-span-1 sm:col-start-2 sm:row-start-1"
        role="img"
        aria-label={`${label}: ${value} of ${total} submissions, ${percentage}%`}
      >
        <div className="h-full rounded-full bg-[var(--color-brand-accent)]" style={{ width: `${percentage}%` }} />
      </div>
      <p className="col-start-2 row-start-1 text-right text-sm text-white sm:col-start-3">{value} <span className="text-xs text-slate-500">({percentage}%)</span></p>
    </div>
  );
}

function SubmissionRows({
  submission,
  expanded,
  updating,
  onExpand,
  onStatusChange,
  onDownload,
}: {
  submission: Submission;
  expanded: boolean;
  updating: boolean;
  onExpand: () => void;
  onStatusChange: (status: SubmissionStatus) => void;
  onDownload: (storageKey: string, name: string) => void;
}) {
  return (
    <>
      <tr className="hover:bg-white/[0.025]">
        <td className="px-5 py-4">
          <p className="font-medium text-white">{submission.name}</p>
          <a href={`mailto:${submission.email}`} className="mt-0.5 block text-xs text-slate-500 hover:text-slate-300">{submission.email}</a>
        </td>
        <td className="px-5 py-4">
          <span className="rounded-md bg-white/[0.06] px-2 py-1 text-xs text-slate-300">{typeLabels[submission.type] || "Submission"}</span>
        </td>
        <td className="px-5 py-4">
          <label className="sr-only" htmlFor={`status-${submission._id}`}>Update status for {submission.name}</label>
          <div className="relative inline-flex items-center">
            <select
              id={`status-${submission._id}`}
              value={submission.status}
              disabled={updating}
              onChange={(event) => onStatusChange(event.target.value as SubmissionStatus)}
              className={`appearance-none rounded-full border py-1 pl-2.5 pr-7 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)] disabled:opacity-60 ${submission.status === "new" ? "border-amber-400/20 bg-amber-400/10 text-amber-200" : submission.status === "closed" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : "border-sky-400/20 bg-sky-400/10 text-sky-200"}`}
            >
              {Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            <ChevronDown size={12} className="pointer-events-none absolute right-2 text-current" />
          </div>
        </td>
        <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-400">{formatDate(submission.createdAt)}</td>
        <td className="px-5 py-4">
          <button onClick={onExpand} className="rounded-md px-2 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]">
            {expanded ? "Hide" : "View"}
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-white/[0.02]">
          <td colSpan={5} className="px-5 py-4">
            <div className="grid gap-4 text-sm md:grid-cols-2">
              <div>
                {submission.company && <p className="mb-2 text-slate-300"><span className="text-slate-500">Company:</span> {submission.company}</p>}
                {submission.service && <p className="mb-2 text-slate-300"><span className="text-slate-500">Service:</span> {submission.service}</p>}
                {submission.fontName && <p className="mb-2 text-slate-300"><span className="text-slate-500">Font:</span> {submission.fontName}</p>}
                {submission.bookingDate && <p className="mb-2 text-slate-300"><span className="text-slate-500">Booking:</span> {formatDate(submission.bookingDate)} {submission.bookingTime && `(${submission.bookingTime})`} {submission.timezone}</p>}
                {submission.type === "calendar_booking" && !submission.notificationSent && <p className="mb-2 text-amber-300">Booking email notification is pending.</p>}
                {submission.message && <p className="mt-3 whitespace-pre-wrap text-slate-300">{submission.message}</p>}
              </div>
              <div>
                {submission.details && Object.keys(submission.details).length > 0 && (
                  <dl className="grid gap-2 sm:grid-cols-2">
                    {Object.entries(submission.details).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-xs text-slate-500">{key}</dt>
                        <dd className="break-words text-slate-300">{Array.isArray(value) ? value.join(", ") : typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {submission.fontFileUrl && <a href={submission.fontFileUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm text-[var(--color-brand-accent-glow)] hover:text-white">Open font URL <ExternalLink size={13} /></a>}
                {submission.attachments.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {submission.attachments.map((attachment) => (
                      <li key={attachment.storageKey}>
                        <button onClick={() => onDownload(attachment.storageKey, attachment.originalName)} className="inline-flex items-center gap-2 text-sm text-[var(--color-brand-accent-glow)] hover:text-white">
                          <Paperclip size={14} /> {attachment.originalName} ({Math.ceil(attachment.size / 1024)} KB)
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {!submission.company && !submission.service && !submission.fontName && !submission.bookingDate && !submission.message && !submission.details && !submission.fontFileUrl && submission.attachments.length === 0 && (
                  <p className="text-sm text-slate-500">No additional details were provided.</p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
