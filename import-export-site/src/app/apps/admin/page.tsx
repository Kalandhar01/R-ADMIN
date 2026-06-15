import type { Metadata } from "next";
import { AdminDashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Admin Dashboard | Ractysh Global Trade",
};

export default function AdminPage() {
  return <AdminDashboardClient />;
}
