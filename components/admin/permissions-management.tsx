"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Permission {
  id: string
  name: string
  description: string
  roles: {
    admin: boolean
    agency: boolean
    customer: boolean
  }
}

const permissions: Permission[] = [
  {
    id: "1",
    name: "Quản lý người dùng",
    description: "Tạo, sửa, xóa tài khoản người dùng",
    roles: { admin: true, agency: false, customer: false },
  },
  {
    id: "2",
    name: "Quản lý bất động sản",
    description: "Thêm, sửa, xóa bất động sản",
    roles: { admin: true, agency: true, customer: false },
  },
  {
    id: "3",
    name: "Xem báo cáo",
    description: "Truy cập báo cáo và phân tích",
    roles: { admin: true, agency: true, customer: false },
  },
  {
    id: "4",
    name: "Đặt lịch xem nhà",
    description: "Tạo và quản lý lịch hẹn",
    roles: { admin: true, agency: true, customer: true },
  },
  {
    id: "5",
    name: "Sử dụng AI chatbot",
    description: "Trò chuyện với AI để tìm bất động sản",
    roles: { admin: true, agency: true, customer: true },
  },
  {
    id: "6",
    name: "Quản lý phân quyền",
    description: "Cấu hình quyền truy cập hệ thống",
    roles: { admin: true, agency: false, customer: false },
  },
]

export function PermissionsManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Quản trị viên</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Toàn quyền</div>
            <p className="text-xs text-muted-foreground mt-1">Truy cập tất cả tính năng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Môi giới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/6</div>
            <p className="text-xs text-muted-foreground mt-1">quyền được cấp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/6</div>
            <p className="text-xs text-muted-foreground mt-1">quyền được cấp</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ma trận phân quyền</CardTitle>
          <CardDescription>Cấu hình quyền truy cập cho từng vai trò</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {permissions.map((permission) => (
              <div key={permission.id} className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">{permission.name}</h4>
                  <p className="text-sm text-muted-foreground">{permission.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pl-4 border-l-2 border-border">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${permission.id}-admin`} className="flex items-center gap-2 cursor-pointer">
                      <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
                        Quản trị viên
                      </Badge>
                    </Label>
                    <Switch id={`${permission.id}-admin`} checked={permission.roles.admin} disabled />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${permission.id}-agency`} className="flex items-center gap-2 cursor-pointer">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                        Môi giới
                      </Badge>
                    </Label>
                    <Switch id={`${permission.id}-agency`} checked={permission.roles.agency} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${permission.id}-customer`} className="flex items-center gap-2 cursor-pointer">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                        Khách hàng
                      </Badge>
                    </Label>
                    <Switch id={`${permission.id}-customer`} checked={permission.roles.customer} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
