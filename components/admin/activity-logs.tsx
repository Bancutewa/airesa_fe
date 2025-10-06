"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, User, Building2, Settings, Database, Shield } from "lucide-react"

interface ActivityLog {
  id: string
  user: string
  action: string
  type: "user" | "property" | "system" | "data" | "permission"
  timestamp: string
  details: string
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    user: "Admin User",
    action: "Tạo người dùng mới",
    type: "user",
    timestamp: "2025-01-06 14:30:25",
    details: "Tạo tài khoản môi giới cho Công ty BĐS XYZ",
  },
  {
    id: "2",
    user: "Công ty BĐS ABC",
    action: "Thêm bất động sản",
    type: "property",
    timestamp: "2025-01-06 13:15:10",
    details: "Thêm Căn hộ cao cấp Vinhomes Central Park",
  },
  {
    id: "3",
    user: "System",
    action: "Backup dữ liệu",
    type: "system",
    timestamp: "2025-01-06 12:00:00",
    details: "Backup tự động hoàn tất thành công",
  },
  {
    id: "4",
    user: "Admin User",
    action: "Cập nhật quyền",
    type: "permission",
    timestamp: "2025-01-06 11:45:30",
    details: "Cấp quyền quản lý cho Công ty BĐS ABC",
  },
  {
    id: "5",
    user: "Công ty BĐS ABC",
    action: "Xóa bất động sản",
    type: "property",
    timestamp: "2025-01-06 10:20:15",
    details: "Xóa Nhà phố cũ đã bán",
  },
  {
    id: "6",
    user: "Admin User",
    action: "Import dữ liệu",
    type: "data",
    timestamp: "2025-01-06 09:30:00",
    details: "Import 150 bất động sản từ file CSV",
  },
]

export function ActivityLogs() {
  const [logs] = useState<ActivityLog[]>(mockLogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const typeIcons = {
    user: User,
    property: Building2,
    system: Settings,
    data: Database,
    permission: Shield,
  }

  const typeColors = {
    user: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    property: "bg-green-500/10 text-green-500 border-green-500/20",
    system: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    data: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    permission: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  const typeLabels = {
    user: "Người dùng",
    property: "Bất động sản",
    system: "Hệ thống",
    data: "Dữ liệu",
    permission: "Phân quyền",
  }

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = filterType === "all" || log.type === filterType

    return matchesSearch && matchesType
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nhật ký hoạt động</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm hoạt động..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Lọc theo loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="user">Người dùng</SelectItem>
              <SelectItem value="property">Bất động sản</SelectItem>
              <SelectItem value="system">Hệ thống</SelectItem>
              <SelectItem value="data">Dữ liệu</SelectItem>
              <SelectItem value="permission">Phân quyền</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">Không tìm thấy hoạt động nào</div>
          ) : (
            filteredLogs.map((log) => {
              const Icon = typeIcons[log.type]
              return (
                <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted shrink-0">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex-1">
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">bởi {log.user}</p>
                      </div>
                      <Badge className={typeColors[log.type]}>{typeLabels[log.type]}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                    <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
