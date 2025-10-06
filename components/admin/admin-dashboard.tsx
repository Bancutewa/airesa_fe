"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Bot, Activity, Shield, Database, MessageSquare } from "lucide-react"
import { UserManagement } from "./user-management"
import { AIMonitoring } from "./ai-monitoring"
import { ActivityLogs } from "./activity-logs"
import { PermissionsManagement } from "./permissions-management"
import { DataManagement } from "./data-management"
import { FeedbackAnalysis } from "./feedback-analysis"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Quản trị</h1>
        <p className="text-muted-foreground">Quản lý hệ thống, người dùng và giám sát AI</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 lg:w-auto">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Người dùng</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="gap-2">
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">AI</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Dữ liệu</span>
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Phân quyền</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Hoạt động</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Phản hồi</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <AIMonitoring />
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <DataManagement />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <PermissionsManagement />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <ActivityLogs />
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <FeedbackAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
