"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Calendar, BarChart3, Users } from "lucide-react"
import { PropertyManagement } from "./property-management"
import { AppointmentCalendar } from "./appointment-calendar"
import { AgencyAnalytics } from "./agency-analytics"
import { CustomerManagement } from "./customer-management"

export function AgencyDashboard() {
  const [activeTab, setActiveTab] = useState("properties")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Quản lý BĐS</h1>
        <p className="text-muted-foreground">Quản lý bất động sản, lịch hẹn và khách hàng của bạn</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="properties" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Bất động sản</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Lịch hẹn</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Báo cáo</span>
          </TabsTrigger>
          <TabsTrigger value="customers" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Khách hàng</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <PropertyManagement />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <AppointmentCalendar />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <AgencyAnalytics />
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <CustomerManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}
