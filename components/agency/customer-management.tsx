"use client"

import { useState } from "react"
import { Search, MoreVertical, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  status: "active" | "inactive" | "potential"
  appointmentCount: number
  lastContact: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    email: "nguyenvana@email.com",
    phone: "0901234567",
    status: "active",
    appointmentCount: 3,
    lastContact: "2 ngày trước",
  },
  {
    id: "2",
    name: "Trần Thị B",
    email: "tranthib@email.com",
    phone: "0907654321",
    status: "potential",
    appointmentCount: 1,
    lastContact: "1 tuần trước",
  },
  {
    id: "3",
    name: "Lê Văn C",
    email: "levanc@email.com",
    phone: "0909876543",
    status: "active",
    appointmentCount: 5,
    lastContact: "Hôm qua",
  },
  {
    id: "4",
    name: "Phạm Thị D",
    email: "phamthid@email.com",
    phone: "0905555555",
    status: "inactive",
    appointmentCount: 0,
    lastContact: "3 tháng trước",
  },
]

export function CustomerManagement() {
  const [customers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")

  const statusColors = {
    active: "bg-green-500/10 text-green-500 border-green-500/20",
    potential: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  }

  const statusLabels = {
    active: "Đang hoạt động",
    potential: "Tiềm năng",
    inactive: "Không hoạt động",
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách khách hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
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
                <TableHead>Khách hàng</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lịch hẹn</TableHead>
                <TableHead>Liên hệ gần nhất</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Không tìm thấy khách hàng
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{customer.email}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[customer.status]}>{statusLabels[customer.status]}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{customer.appointmentCount}</span> lịch hẹn
                    </TableCell>
                    <TableCell className="text-muted-foreground">{customer.lastContact}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Nhắn tin
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Phone className="h-4 w-4" />
                            Gọi điện
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Mail className="h-4 w-4" />
                            Gửi email
                          </DropdownMenuItem>
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
  )
}
