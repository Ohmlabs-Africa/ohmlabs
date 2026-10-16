import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <AdminDashboard />;
}
