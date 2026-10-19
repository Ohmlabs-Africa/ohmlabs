import type { Metadata } from "next";
import ProjectPortal from "@/components/client/projectPortal";

export const metadata: Metadata = {
  title: "Client Workspace | OhmLabs Africa",
  robots: { index: false, follow: false },
};

export default function ClientDashboardPage() {
  return <ProjectPortal role="client" />;
}
