import type { Metadata } from "next"
import { AgencyDashboard } from "@/components/agency/agency-dashboard"

export const metadata: Metadata = {
  title: "Quản lý BĐS - RealEstate AI",
  description: "Dashboard quản lý bất động sản cho môi giới",
}

export default function AgencyPage() {
  return <AgencyDashboard />
}
