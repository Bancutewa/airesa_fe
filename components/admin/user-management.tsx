"use client"

import { useState } from "react"
import { Search, MoreVertical, UserPlus, Ban, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "agency" | "customer"
  status: "active" | "suspended" | "pending"
  joinDate: string
  lastActive: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@realestate.ai",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "5 phút trước",
  },
  {
    id: "2",
    name: "Công ty BĐS ABC",
    email: "abc@agency.com",
    role: "agency",
    status: "active",
    joinDate: "2024-03-20",
    lastActive: "2 giờ trước",
  },
  {
    id: "3",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    role: "customer",
    status: "active",
    joinDate: "2024-06-10",
    lastActive: "1 ngày trước",
  },
  {
    id: "4",
    name: "Công ty BĐS XYZ",
    email: "xyz@agency.com",
    role: "agency",
    status: "pending",
    joinDate: "2024-12-28",
    lastActive: "Chưa kích hoạt",
  },
]

export function UserManagement() {
  const [users] = useState<User[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")

  const roleColors = {
    admin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    agency: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    customer: "bg-green-500/10 text-green-500 border-green-500/20",
  }

  const roleLabels = {
    admin: "Quản trị viên",
    agency: "Môi giới",
    customer: "Khách hàng",
  }

  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    suspended: "bg-red-500/10 text-red-500 border-red-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  }

  const statusLabels = {
    active: "Hoạt động",
    suspended: "Tạm khóa",
    pending: "Chờ duyệt",
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    pending: users.filter((u) => u.status === "pending").length,
    agencies: users.filter((u) => u.role === "agency").length,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Đang hoạt động</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Chờ duyệt</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Môi giới</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.agencies}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Quản lý người dùng</CardTitle>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Thêm người dùng
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày tham gia</TableHead>
                  <TableHead>Hoạt động gần nhất</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Không tìm thấy người dùng
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={roleColors[user.role]}>{roleLabels[user.role]}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[user.status]}>{statusLabels[user.status]}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                      <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {user.status === "pending" && (
                              <DropdownMenuItem className="gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Phê duyệt
                              </DropdownMenuItem>
                            )}
                            {user.status === "active" && (
                              <DropdownMenuItem className="gap-2 text-destructive">
                                <Ban className="h-4 w-4" />
                                Tạm khóa
                              </DropdownMenuItem>
                            )}
                            {user.status === "suspended" && (
                              <DropdownMenuItem className="gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Mở khóa
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
