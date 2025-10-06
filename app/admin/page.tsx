import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Quản trị - RealEstate AI",
  description: "Dashboard quản trị hệ thống",
}

export default function AdminPage() {
  return <AdminDashboard />
}
