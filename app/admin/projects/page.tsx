import type { Metadata } from "next";
import ProjectPortal from "@/components/client/projectPortal";

export const metadata: Metadata = {
  title: "Admin Projects | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function AdminProjectsPage() {
  return <ProjectPortal role="admin" />;
}
