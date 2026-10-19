"use client";

import {
  Activity,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlus,
  ClipboardList,
  FolderKanban,
  LifeBuoy,
  LogOut,
  MessageCircle,
  Plus,
  RefreshCw,
  Send,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError, apiRequest } from "@/lib/api";

type PortalRole = "admin" | "client";
type TaskStatus = "todo" | "in_progress" | "in_review" | "blocked" | "completed";
type TicketStatus = "open" | "in_progress" | "resolved";
type ProjectStatus = "planned" | "in_progress" | "on_hold" | "completed";
type Priority = "low" | "normal" | "high" | "urgent";

interface Person {
  _id: string;
  name: string;
  email: string;
  role?: "admin" | "client";
}

interface PortalUser extends Person {
  role: PortalRole;
  createdAt: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: Priority;
  owner: Person;
  members: Array<{ user: Person; role: string }>;
  startDate?: string;
  dueDate?: string;
  progress: number;
  taskCounts: { total: number; completed: number };
  createdAt: string;
  updatedAt: string;
}

interface ProjectTask {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: Person;
  createdBy: Person;
  dueDate?: string;
}

interface ProjectTicket {
  _id: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: Priority;
  createdBy: Person;
  createdAt: string;
}

interface ProjectMessage {
  _id: string;
  message: string;
  author: Person;
  createdAt: string;
}

interface PortalStats {
  projects: number;
  openTasks: number;
  completedTasks: number;
  openTickets: number;
  signins: number;
}

const taskStatuses: Array<{ value: TaskStatus; label: string }> = [
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "in_review", label: "In review" },
  { value: "blocked", label: "Blocked" },
  { value: "completed", label: "Completed" },
];
const projectStatuses: Array<{ value: ProjectStatus; label: string }> = [
  { value: "planned", label: "Planned" },
  { value: "in_progress", label: "In progress" },
  { value: "on_hold", label: "On hold" },
  { value: "completed", label: "Completed" },
];
const priorityOptions: Array<{ value: Priority; label: string }> = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];
const ticketStatuses: Array<{ value: TicketStatus; label: string }> = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In progress" },
  { value: "resolved", label: "Resolved" },
];
function formatDate(value?: string) {
  if (!value) return "No due date";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

export default function ProjectPortal({ role }: { role: PortalRole }) {
  const router = useRouter();
  const isAdmin = role === "admin";
  const apiRoot = isAdmin ? "/api/admin" : "/api/client";
  const authStorageKey = isAdmin ? "ohmlabs_access_token" : "ohmlabs_client_access_token";
  const signInUrl = isAdmin ? "/login" : "/client/login";

  const [user, setUser] = useState<PortalUser | null>(null);
  const [stats, setStats] = useState<PortalStats | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [tickets, setTickets] = useState<ProjectTicket[]>([]);
  const [messages, setMessages] = useState<ProjectMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"tasks" | "tickets" | "chat">("tasks");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskPriority, setTaskPriority] = useState<Priority>("normal");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [chatMessage, setChatMessage] = useState("");

  const request = useCallback(async <T,>(path: string, options: RequestInit = {}) => {
    const refreshAccessToken = async () => {
      const refreshed = await apiRequest<{ accessToken: string }>("/api/auth/refresh", { method: "POST" });
      sessionStorage.setItem(authStorageKey, refreshed.accessToken);
      return refreshed.accessToken;
    };
    let token = sessionStorage.getItem(authStorageKey);
    if (!token) token = await refreshAccessToken();
    const makeRequest = (accessToken: string) => apiRequest<T>(path, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
    });
    try {
      return await makeRequest(token);
    } catch (requestError) {
      if (!(requestError instanceof ApiError) || requestError.status !== 401) throw requestError;
      token = await refreshAccessToken();
      return makeRequest(token);
    }
  }, [authStorageKey]);

  const loadProjectWorkspace = useCallback(async (projectId: string) => {
    if (!projectId) {
      setTasks([]);
      setTickets([]);
      setMessages([]);
      return;
    }
    const [taskData, ticketData, messageData] = await Promise.all([
      request<ProjectTask[]>(`${apiRoot}/projects/${projectId}/tasks`),
      request<ProjectTicket[]>(`${apiRoot}/projects/${projectId}/tickets`),
      request<ProjectMessage[]>(`${apiRoot}/projects/${projectId}/messages`),
    ]);
    setTasks(taskData);
    setTickets(ticketData);
    setMessages(messageData);
  }, [apiRoot, request]);

  const reloadProjects = useCallback(async () => {
    const data = await request<Project[]>(`${apiRoot}/projects`);
    setProjects(data);
    return data;
  }, [apiRoot, request]);

  const reloadStats = useCallback(async () => {
    const data = await request<PortalStats>(`${apiRoot}/project-stats`);
    setStats(data);
  }, [apiRoot, request]);

  useEffect(() => {
    let cancelled = false;
    async function initialize() {
      try {
        const [currentUser, dashboardStats, projectData] = await Promise.all([
          request<PortalUser>(`${apiRoot}/me`),
          request<PortalStats>(`${apiRoot}/project-stats`),
          request<Project[]>(`${apiRoot}/projects`),
        ]);
        if (cancelled) return;
        if (currentUser.role !== role) {
          await apiRequest<null>("/api/auth/logout", { method: "POST" });
          sessionStorage.removeItem(authStorageKey);
          router.replace(signInUrl);
          return;
        }
        const requestedProjectId = new URLSearchParams(window.location.search).get("project");
        const initialProject = projectData.find((project) => project._id === requestedProjectId) || projectData[0];
        if (initialProject) await loadProjectWorkspace(initialProject._id);
        if (cancelled) return;
        setUser(currentUser);
        setStats(dashboardStats);
        setProjects(projectData);
        setSelectedProjectId(initialProject?._id || "");
      } catch (loadError) {
        if (cancelled) return;
        const message = loadError instanceof ApiError ? loadError.message : "The workspace could not be loaded.";
        if (loadError instanceof ApiError && loadError.status === 403) {
          toast.error("This account does not have access to this workspace.");
        } else if (loadError instanceof ApiError && loadError.status !== 401) {
          setError(message);
          setIsLoading(false);
          return;
        }
        sessionStorage.removeItem(authStorageKey);
        router.replace(signInUrl);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void initialize();
    return () => { cancelled = true; };
  }, [apiRoot, authStorageKey, loadProjectWorkspace, request, role, router, signInUrl]);

  const selectedProject = projects.find((project) => project._id === selectedProjectId) || null;
  const canManageMembers = Boolean(selectedProject && (
    isAdmin || selectedProject.owner._id === user?._id
  ));
  const projectMembers = useMemo(() => selectedProject?.members.map(({ user: member }) => member) || [], [selectedProject]);

  function selectProject(projectId: string) {
    setSelectedProjectId(projectId);
    setTasks([]);
    setTickets([]);
    setMessages([]);
    void loadProjectWorkspace(projectId).catch((loadError: unknown) => {
      const message = loadError instanceof ApiError ? loadError.message : "Project details could not be loaded.";
      setError(message);
      if (loadError instanceof ApiError && (loadError.status === 401 || loadError.status === 403)) {
        sessionStorage.removeItem(authStorageKey);
        router.replace(signInUrl);
      }
    });
  }

  async function signOut() {
    try {
      await apiRequest<null>("/api/auth/logout", { method: "POST" });
      sessionStorage.removeItem(authStorageKey);
      router.replace(signInUrl);
    } catch (signOutError) {
      const message = signOutError instanceof ApiError ? signOutError.message : "Could not sign out. Please try again.";
      setError(message);
      toast.error(message);
    }
  }

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const description = String(form.get("description") || "").trim();
    const dueDate = String(form.get("dueDate") || "");
    if (!name) return;
    setIsSaving(true);
    try {
      const project = await request<Project>(`${apiRoot}/projects`, {
        method: "POST",
        body: JSON.stringify({ name, description, dueDate: dueDate || undefined }),
      });
      const refreshed = await reloadProjects();
      setProjects(refreshed);
      selectProject(project._id);
      setShowProjectForm(false);
      await reloadStats();
      toast.success("Project created.");
    } catch (saveError) {
      const message = saveError instanceof ApiError ? saveError.message : "The project could not be created.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function addMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProject) return;
    setIsSaving(true);
    try {
      await request<Project>(`${apiRoot}/projects/${selectedProject._id}/members`, {
        method: "POST",
        body: JSON.stringify({ email: memberEmail }),
      });
      setMemberEmail("");
      await reloadProjects();
      toast.success("Project member added.");
    } catch (memberError) {
      const message = memberError instanceof ApiError ? memberError.message : "The project member could not be added.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function changeProjectStatus(status: ProjectStatus) {
    if (!selectedProject) return;
    try {
      const updated = await request<Project>(`${apiRoot}/projects/${selectedProject._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setProjects((items) => items.map((item) => item._id === updated._id ? { ...item, ...updated } : item));
      toast.success("Project status updated.");
    } catch (projectError) {
      const message = projectError instanceof ApiError ? projectError.message : "The project status could not be updated.";
      setError(message);
      toast.error(message);
    }
  }

  async function changeProjectPriority(priority: Priority) {
    if (!selectedProject) return;
    try {
      const updated = await request<Project>(`${apiRoot}/projects/${selectedProject._id}`, {
        method: "PATCH",
        body: JSON.stringify({ priority }),
      });
      setProjects((items) => items.map((item) => item._id === updated._id ? { ...item, ...updated } : item));
      toast.success("Project priority updated.");
    } catch (projectError) {
      const message = projectError instanceof ApiError ? projectError.message : "The project priority could not be updated.";
      setError(message);
      toast.error(message);
    }
  }

  async function createTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProject || !taskTitle.trim()) return;
    setIsSaving(true);
    try {
      await request<ProjectTask>(`${apiRoot}/projects/${selectedProject._id}/tasks`, {
        method: "POST",
        body: JSON.stringify({
          title: taskTitle.trim(),
          description: taskDescription.trim(),
          dueDate: taskDueDate || undefined,
          assignee: taskAssignee || undefined,
          priority: taskPriority,
        }),
      });
      setTaskTitle("");
      setTaskDescription("");
      setTaskDueDate("");
      setTaskAssignee("");
      setTaskPriority("normal");
      await Promise.all([loadProjectWorkspace(selectedProject._id), reloadProjects(), reloadStats()]);
      toast.success("Task added to the project.");
    } catch (taskError) {
      const message = taskError instanceof ApiError ? taskError.message : "The task could not be created.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function changeTaskStatus(task: ProjectTask, status: TaskStatus) {
    if (!selectedProject) return;
    try {
      const updated = await request<ProjectTask>(`${apiRoot}/projects/${selectedProject._id}/tasks/${task._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setTasks((items) => items.map((item) => item._id === task._id ? updated : item));
      await Promise.all([reloadProjects(), reloadStats()]);
      toast.success("Task updated.");
    } catch (taskError) {
      const message = taskError instanceof ApiError ? taskError.message : "The task could not be updated.";
      setError(message);
      toast.error(message);
    }
  }

  async function deleteTask(task: ProjectTask) {
    if (!selectedProject || !window.confirm(`Delete task “${task.title}”?`)) return;
    try {
      await request<null>(`${apiRoot}/projects/${selectedProject._id}/tasks/${task._id}`, { method: "DELETE" });
      await Promise.all([loadProjectWorkspace(selectedProject._id), reloadProjects(), reloadStats()]);
      toast.success("Task deleted.");
    } catch (taskError) {
      const message = taskError instanceof ApiError ? taskError.message : "The task could not be deleted.";
      setError(message);
      toast.error(message);
    }
  }

  async function createTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProject || !ticketTitle.trim() || !ticketDescription.trim()) return;
    setIsSaving(true);
    try {
      await request<ProjectTicket>(`${apiRoot}/projects/${selectedProject._id}/tickets`, {
        method: "POST",
        body: JSON.stringify({ title: ticketTitle.trim(), description: ticketDescription.trim() }),
      });
      setTicketTitle("");
      setTicketDescription("");
      await loadProjectWorkspace(selectedProject._id);
      await reloadStats();
      toast.success("Support ticket raised.");
    } catch (ticketError) {
      const message = ticketError instanceof ApiError ? ticketError.message : "The ticket could not be raised.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function changeTicketStatus(ticket: ProjectTicket, status: TicketStatus) {
    if (!selectedProject) return;
    try {
      const updated = await request<ProjectTicket>(`${apiRoot}/projects/${selectedProject._id}/tickets/${ticket._id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setTickets((items) => items.map((item) => item._id === ticket._id ? updated : item));
      await reloadStats();
      toast.success("Ticket status updated.");
    } catch (ticketError) {
      const message = ticketError instanceof ApiError ? ticketError.message : "The ticket could not be updated.";
      setError(message);
      toast.error(message);
    }
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedProject || !chatMessage.trim()) return;
    setIsSaving(true);
    try {
      await request<ProjectMessage>(`${apiRoot}/projects/${selectedProject._id}/messages`, {
        method: "POST",
        body: JSON.stringify({ message: chatMessage.trim() }),
      });
      setChatMessage("");
      await loadProjectWorkspace(selectedProject._id);
    } catch (messageError) {
      const message = messageError instanceof ApiError ? messageError.message : "The chat message could not be sent.";
      setError(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function refreshWorkspace() {
    if (!selectedProject) return;
    try {
      await Promise.all([loadProjectWorkspace(selectedProject._id), reloadProjects()]);
      toast.success("Project workspace refreshed.");
    } catch (refreshError) {
      const message = refreshError instanceof ApiError ? refreshError.message : "Could not refresh the project.";
      setError(message);
      toast.error(message);
    }
  }

  if (isLoading) {
    return <main className="grid min-h-screen place-items-center bg-[var(--color-brand-bg-deep)] text-sm text-[var(--color-brand-text-secondary)]">Checking your account access…</main>;
  }
  if (!user) {
    return (
      <main className="grid min-h-screen place-items-center bg-[var(--color-brand-bg-deep)] px-5 text-center">
        <div>
          <p role="alert" className="text-sm text-red-300">{error || "Your workspace could not be loaded."}</p>
          <button onClick={() => window.location.reload()} className="mt-4 rounded-lg bg-[var(--color-brand-accent)] px-4 py-2 text-sm text-white">Try again</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-brand-bg-deep)] text-[var(--color-brand-text-primary)]">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--color-brand-border)] bg-[var(--color-brand-bg-main)] p-5 md:flex">
          <Link href="/" className="text-lg font-bold tracking-wide text-white">OHM <span className="text-[var(--color-brand-accent)]">LABS</span></Link>
          <p className="mt-1 text-xs text-[var(--color-brand-text-muted)]">{isAdmin ? "Admin project workspace" : "Client project workspace"}</p>
          <div className="mt-9 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--color-brand-text-muted)]">Projects</h2>
            <button onClick={() => setShowProjectForm((value) => !value)} aria-label="Create project" className="rounded-md p-1.5 text-[var(--color-brand-text-secondary)] hover:bg-white/10 hover:text-white">
              <Plus size={16} />
            </button>
          </div>
          <nav aria-label="Projects" className="mt-3 space-y-1">
            {projects.map((project) => (
              <button
                key={project._id}
                onClick={() => selectProject(project._id)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm ${selectedProjectId === project._id ? "bg-white/10 text-white" : "text-[var(--color-brand-text-secondary)] hover:bg-white/5"}`}
              >
                <FolderKanban size={16} className="shrink-0 text-[var(--color-brand-accent-glow)]" />
                <span className="truncate">{project.name}</span>
              </button>
            ))}
            {projects.length === 0 && <p className="px-3 py-2 text-xs text-[var(--color-brand-text-muted)]">No projects yet.</p>}
          </nav>
          <div className="mt-auto border-t border-[var(--color-brand-border)] pt-4">
            <p className="truncate text-sm font-medium text-white">{user.name}</p>
            <p className="truncate text-xs text-[var(--color-brand-text-muted)]">{user.email}</p>
            <button onClick={() => void signOut()} className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-brand-text-secondary)] hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]">
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="flex min-h-16 items-center justify-between border-b border-[var(--color-brand-border)] px-4 py-3 md:px-8">
            <div>
              <p className="text-xs text-[var(--color-brand-text-muted)]">{isAdmin ? "Administrator" : "Client portal"} / Projects</p>
              <h1 className="text-lg font-semibold text-white">{selectedProject?.name || "Project workspace"}</h1>
            </div>
            <div className="flex items-center gap-2">
              {selectedProject && <button onClick={() => void refreshWorkspace()} className="rounded-lg border border-[var(--color-brand-border-muted)] p-2 text-[var(--color-brand-text-secondary)] hover:bg-white/5" aria-label="Refresh project data"><RefreshCw size={17} /></button>}
              <button onClick={() => setShowProjectForm((value) => !value)} className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-accent)] px-3 py-2 text-sm font-medium text-white hover:bg-[var(--color-brand-accent-hover)]">
                <CirclePlus size={16} /> <span className="hidden sm:inline">New project</span><span className="sm:hidden">New</span>
              </button>
              <button onClick={() => void signOut()} aria-label="Sign out" className="rounded-lg border border-[var(--color-brand-border-muted)] p-2 text-[var(--color-brand-text-secondary)] hover:bg-white/5 md:hidden"><LogOut size={17} /></button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
            {error && <div role="alert" className="flex items-center justify-between gap-3 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"><span>{error}</span><button onClick={() => setError("")} className="underline">Dismiss</button></div>}

            {showProjectForm && (
              <section className="rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-5">
                <h2 className="font-semibold text-white">Create a project</h2>
                <form onSubmit={(event) => void createProject(event)} className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr_1fr_auto]">
                  <label className="text-xs text-[var(--color-brand-text-muted)]">Project name
                    <input required name="name" maxLength={160} className="mt-1.5 w-full rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                  </label>
                  <label className="text-xs text-[var(--color-brand-text-muted)]">Description
                    <input name="description" maxLength={5000} className="mt-1.5 w-full rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                  </label>
                  <label className="text-xs text-[var(--color-brand-text-muted)]">Due date
                    <input type="date" name="dueDate" className="mt-1.5 w-full rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]" />
                  </label>
                  <button disabled={isSaving} className="self-end rounded-lg bg-[var(--color-brand-accent)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-accent-hover)] disabled:opacity-50">{isSaving ? "Creating…" : "Create project"}</button>
                </form>
              </section>
            )}

            <section aria-label="Workspace summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              <Metric icon={FolderKanban} label="Projects" value={stats?.projects ?? 0} />
              <Metric icon={ClipboardList} label="Open tasks" value={stats?.openTasks ?? 0} />
              <Metric icon={Check} label="Completed tasks" value={stats?.completedTasks ?? 0} />
              <Metric icon={LifeBuoy} label="Open tickets" value={stats?.openTickets ?? 0} />
              <Metric icon={Activity} label={isAdmin ? "Sign-ins" : "My sign-ins"} value={stats?.signins ?? 0} />
            </section>

            {!selectedProject ? (
              <section className="rounded-xl border border-dashed border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-main)] px-6 py-16 text-center">
                <FolderKanban size={30} className="mx-auto text-[var(--color-brand-text-muted)]" />
                <h2 className="mt-4 text-lg font-semibold text-white">Start a project workspace</h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-brand-text-muted)]">Create a project to organize tasks, raise support tickets, and keep project conversations in one place.</p>
                <button onClick={() => setShowProjectForm(true)} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-accent)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-accent-hover)]"><Plus size={16} /> Create project</button>
              </section>
            ) : (
              <>
                <section className="rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-semibold text-white">{selectedProject.name}</h2>
                        <label className="sr-only" htmlFor="project-status">Project status</label>
                        {canManageMembers ? (
                          <select id="project-status" value={selectedProject.status} onChange={(event) => void changeProjectStatus(event.target.value as ProjectStatus)} className="rounded-full border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-2.5 py-1 text-xs text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]">
                            {projectStatuses.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                          </select>
                        ) : <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-[var(--color-brand-text-secondary)]">{selectedProject.status.replaceAll("_", " ")}</span>}
                        <label className="sr-only" htmlFor="project-priority">Project priority</label>
                        {canManageMembers ? (
                          <select id="project-priority" value={selectedProject.priority} onChange={(event) => void changeProjectPriority(event.target.value as Priority)} className="rounded-full border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-2.5 py-1 text-xs text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]">
                            {priorityOptions.map(({ value, label }) => <option key={value} value={value}>{label} priority</option>)}
                          </select>
                        ) : <span className="text-xs text-[var(--color-brand-text-muted)]">{selectedProject.priority} priority</span>}
                      </div>
                      <p className="mt-2 text-sm text-[var(--color-brand-text-secondary)]">{selectedProject.description || "No project description yet."}</p>
                      <p className="mt-3 flex items-center gap-2 text-xs text-[var(--color-brand-text-muted)]"><CalendarDays size={14} /> Due {formatDate(selectedProject.dueDate)} <span className="mx-1">·</span> Owner: {selectedProject.owner.name}</p>
                    </div>
                    <div className="w-full max-w-xs">
                      <div className="mb-2 flex justify-between text-xs"><span className="text-[var(--color-brand-text-muted)]">Task progress</span><span className="text-white">{selectedProject.progress}%</span></div>
                      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-brand-bg-deep)]"><div className="h-full rounded-full bg-[var(--color-brand-accent)] transition-all" style={{ width: `${selectedProject.progress}%` }} /></div>
                      <p className="mt-2 text-xs text-[var(--color-brand-text-muted)]">{selectedProject.taskCounts.completed} of {selectedProject.taskCounts.total} tasks complete</p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[var(--color-brand-border)] pt-4">
                    <Users size={16} className="text-[var(--color-brand-text-muted)]" />
                    <span className="mr-1 text-xs text-[var(--color-brand-text-muted)]">Team</span>
                    {projectMembers.map((member) => (
                      <span key={member._id} title={member.email} className="rounded-full border border-[var(--color-brand-border-muted)] px-2.5 py-1 text-xs text-[var(--color-brand-text-secondary)]">{member.name}{member.role === "admin" ? " · Admin" : ""}</span>
                    ))}
                    {canManageMembers && (
                      <form onSubmit={(event) => void addMember(event)} className="ml-auto flex w-full gap-2 sm:w-auto">
                        <input required type="email" value={memberEmail} onChange={(event) => setMemberEmail(event.target.value)} placeholder="Client or admin email" aria-label="Email of approved project member or admin" className="min-w-0 flex-1 rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2 text-xs text-white outline-none focus:border-[var(--color-brand-accent)] sm:w-52" />
                        <button disabled={isSaving} className="inline-flex items-center gap-1 rounded-lg border border-[var(--color-brand-border-muted)] px-3 py-2 text-xs text-white hover:bg-white/5 disabled:opacity-50"><Plus size={14} /> Add member</button>
                      </form>
                    )}
                  </div>
                </section>

                <section className="overflow-hidden rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)]">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-brand-border)] px-4 py-3">
                    <nav aria-label="Project sections" className="flex gap-1">
                      <TabButton active={activeTab === "tasks"} onClick={() => setActiveTab("tasks")} icon={ClipboardList}>Tasks</TabButton>
                      <TabButton active={activeTab === "tickets"} onClick={() => setActiveTab("tickets")} icon={LifeBuoy}>Tickets</TabButton>
                      <TabButton active={activeTab === "chat"} onClick={() => setActiveTab("chat")} icon={MessageCircle}>Project chat</TabButton>
                    </nav>
                    <button onClick={() => void refreshWorkspace()} className="inline-flex items-center gap-1.5 px-2 py-1.5 text-xs text-[var(--color-brand-text-muted)] hover:text-white"><RefreshCw size={14} /> Refresh</button>
                  </div>

                  {activeTab === "tasks" && (
                    <div className="p-4 md:p-5">
                      <form onSubmit={(event) => void createTask(event)} className="grid gap-2 md:grid-cols-[1.2fr_0.9fr_0.9fr_1fr_auto]">
                        <input required maxLength={200} value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} placeholder="Add a task…" aria-label="Task title" className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                        <input type="date" value={taskDueDate} onChange={(event) => setTaskDueDate(event.target.value)} aria-label="Task due date" className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]" />
                        <select value={taskPriority} onChange={(event) => setTaskPriority(event.target.value as Priority)} aria-label="Task priority" className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]">
                          {priorityOptions.map(({ value, label }) => <option key={value} value={value}>{label} priority</option>)}
                        </select>
                        <select value={taskAssignee} onChange={(event) => setTaskAssignee(event.target.value)} aria-label="Assign task" className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]">
                          <option value="">Unassigned</option>
                          {projectMembers.map((member) => <option key={member._id} value={member._id}>{member.name}</option>)}
                        </select>
                        <button disabled={isSaving} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-brand-accent)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-accent-hover)] disabled:opacity-50"><Plus size={16} /> Add task</button>
                        <input value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} maxLength={5000} placeholder="Description (optional)" aria-label="Task description" className="md:col-span-5 rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                      </form>
                      <div className="mt-5 divide-y divide-[var(--color-brand-border)]">
                        {tasks.map((task) => (
                          <article key={task._id} className="flex flex-wrap items-center gap-3 py-3">
                            <div className={`h-2.5 w-2.5 rounded-full ${task.status === "completed" ? "bg-emerald-400" : task.status === "blocked" ? "bg-red-400" : "bg-[var(--color-brand-accent)]"}`} />
                            <div className="min-w-[150px] flex-1">
                              <p className={`text-sm font-medium ${task.status === "completed" ? "text-[var(--color-brand-text-muted)] line-through" : "text-white"}`}>{task.title}</p>
                              <p className="mt-1 text-xs text-[var(--color-brand-text-muted)]">{task.assignee ? `Assigned to ${task.assignee.name}` : "Unassigned"} · {task.priority} priority · Due {formatDate(task.dueDate)}</p>
                              {task.description && <p className="mt-1 line-clamp-2 text-xs text-[var(--color-brand-text-secondary)]">{task.description}</p>}
                            </div>
                            <label className="sr-only" htmlFor={`task-${task._id}`}>Task status</label>
                            <select id={`task-${task._id}`} value={task.status} onChange={(event) => void changeTaskStatus(task, event.target.value as TaskStatus)} className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-2 py-1.5 text-xs text-[var(--color-brand-text-secondary)] outline-none focus:border-[var(--color-brand-accent)]">
                              {taskStatuses.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                            </select>
                            {(isAdmin || selectedProject.owner._id === user._id || task.createdBy._id === user._id) && (
                              <button onClick={() => void deleteTask(task)} aria-label={`Delete task ${task.title}`} className="rounded p-2 text-xs text-[var(--color-brand-text-muted)] hover:bg-red-400/10 hover:text-red-300">Delete</button>
                            )}
                          </article>
                        ))}
                        {tasks.length === 0 && <EmptyState title="No tasks yet" detail="Add the first task above to track work on this project." />}
                      </div>
                    </div>
                  )}

                  {activeTab === "tickets" && (
                    <div className="p-4 md:p-5">
                      <form onSubmit={(event) => void createTicket(event)} className="grid gap-2 md:grid-cols-[1fr_auto]">
                        <input required maxLength={200} value={ticketTitle} onChange={(event) => setTicketTitle(event.target.value)} placeholder="Ticket title" aria-label="Ticket title" className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                        <button disabled={isSaving} className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[var(--color-brand-accent)] px-4 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-brand-accent-hover)] disabled:opacity-50"><Plus size={16} /> Raise ticket</button>
                        <textarea required maxLength={5000} rows={2} value={ticketDescription} onChange={(event) => setTicketDescription(event.target.value)} placeholder="Describe the issue or request" aria-label="Ticket description" className="md:col-span-2 rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                      </form>
                      <div className="mt-5 space-y-3">
                        {tickets.map((ticket) => (
                          <article key={ticket._id} className="rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-bg-main)] p-4">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div><h3 className="text-sm font-semibold text-white">{ticket.title}</h3><p className="mt-1 text-xs text-[var(--color-brand-text-muted)]">Raised by {ticket.createdBy.name} · {formatDate(ticket.createdAt)}</p></div>
                              {isAdmin || ticket.createdBy._id === user._id ? (
                                <label className="sr-only" htmlFor={`ticket-${ticket._id}`}>Ticket status</label>
                              ) : null}
                              {(isAdmin || ticket.createdBy._id === user._id) ? (
                                <select id={`ticket-${ticket._id}`} value={ticket.status} onChange={(event) => void changeTicketStatus(ticket, event.target.value as TicketStatus)} className="rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-2 py-1.5 text-xs text-[var(--color-brand-text-secondary)]">
                                  {ticketStatuses.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                                </select>
                              ) : <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-[var(--color-brand-text-secondary)]">{ticket.status.replaceAll("_", " ")}</span>}
                            </div>
                            <p className="mt-3 whitespace-pre-wrap text-sm text-[var(--color-brand-text-secondary)]">{ticket.description}</p>
                          </article>
                        ))}
                        {tickets.length === 0 && <EmptyState title="No tickets yet" detail="Raise a support ticket if your project needs attention." />}
                      </div>
                    </div>
                  )}

                  {activeTab === "chat" && (
                    <div className="flex min-h-[420px] flex-col p-4 md:p-5">
                      <div className="flex-1 space-y-3">
                        {messages.map((message) => (
                          <article key={message._id} className="max-w-3xl rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-bg-main)] p-3">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <p className="text-xs font-semibold text-white">{message.author.name}</p>
                              <time className="text-[11px] text-[var(--color-brand-text-muted)]">{new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(message.createdAt))}</time>
                            </div>
                            <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--color-brand-text-secondary)]">{message.message}</p>
                          </article>
                        ))}
                        {messages.length === 0 && <EmptyState title="Start the project conversation" detail="Messages are visible to members of this project." />}
                      </div>
                      <form onSubmit={(event) => void sendMessage(event)} className="mt-5 flex gap-2 border-t border-[var(--color-brand-border)] pt-4">
                        <label className="sr-only" htmlFor="project-chat-message">Chat message</label>
                        <input id="project-chat-message" required maxLength={5000} value={chatMessage} onChange={(event) => setChatMessage(event.target.value)} placeholder="Write a project message…" className="min-w-0 flex-1 rounded-lg border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3 py-2.5 text-sm text-white outline-none focus:border-[var(--color-brand-accent)]" />
                        <button disabled={isSaving} aria-label="Send message" className="rounded-lg bg-[var(--color-brand-accent)] px-4 text-white hover:bg-[var(--color-brand-accent-hover)] disabled:opacity-50"><Send size={17} /></button>
                      </form>
                      <p className="mt-2 text-xs text-[var(--color-brand-text-muted)]">Chat is not real-time; use Refresh to load new messages.</p>
                    </div>
                  )}
                </section>
              </>
            )}

            <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--color-brand-text-muted)]">
              <span className="inline-flex items-center gap-1.5"><Activity size={13} /> Your workspace is protected by your account permissions.</span>
              {user.createdAt && <span>Account created {formatDate(user.createdAt)}</span>}
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof FolderKanban; label: string; value: number }) {
  return (
    <article className="flex items-center gap-3 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-4">
      <span className="rounded-lg bg-white/5 p-2.5 text-[var(--color-brand-accent-glow)]"><Icon size={18} /></span>
      <div><p className="text-xs text-[var(--color-brand-text-muted)]">{label}</p><p className="mt-1 text-xl font-semibold text-white">{value}</p></div>
    </article>
  );
}

function TabButton({ active, onClick, icon: Icon, children }: { active: boolean; onClick: () => void; icon: typeof ClipboardList; children: React.ReactNode }) {
  return (
    <button onClick={onClick} aria-current={active ? "page" : undefined} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? "bg-white/10 font-medium text-white" : "text-[var(--color-brand-text-muted)] hover:bg-white/5 hover:text-white"}`}>
      <Icon size={16} /> {children} <ChevronRight size={13} className="hidden sm:block" />
    </button>
  );
}

function EmptyState({ title, detail }: { title: string; detail: string }) {
  return <div className="py-8 text-center"><p className="text-sm font-medium text-white">{title}</p><p className="mt-1 text-xs text-[var(--color-brand-text-muted)]">{detail}</p></div>;
}
