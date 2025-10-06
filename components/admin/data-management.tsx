"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Download, Upload, RefreshCw, Trash2, HardDrive } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function DataManagement() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng dữ liệu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 GB</div>
            <p className="text-xs text-muted-foreground mt-1">Đang sử dụng 48% dung lượng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Backup gần nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 giờ trước</div>
            <Badge variant="secondary" className="mt-1 bg-green-500/10 text-green-500 border-green-500/20">
              Thành công
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bản ghi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48,392</div>
            <p className="text-xs text-muted-foreground mt-1">Tổng số bản ghi trong DB</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
            <CardDescription>Sao lưu và khôi phục dữ liệu hệ thống</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full gap-2 bg-transparent" variant="outline">
              <Download className="h-4 w-4" />
              Tải xuống Backup
            </Button>
            <Button className="w-full gap-2 bg-transparent" variant="outline">
              <Upload className="h-4 w-4" />
              Khôi phục từ Backup
            </Button>
            <Button className="w-full gap-2">
              <RefreshCw className="h-4 w-4" />
              Tạo Backup mới
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Import & Export</CardTitle>
            <CardDescription>Nhập và xuất dữ liệu bất động sản</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full gap-2 bg-transparent" variant="outline">
              <Upload className="h-4 w-4" />
              Import từ CSV
            </Button>
            <Button className="w-full gap-2 bg-transparent" variant="outline">
              <Download className="h-4 w-4" />
              Export sang CSV
            </Button>
            <Button className="w-full gap-2 bg-transparent" variant="outline">
              <Download className="h-4 w-4" />
              Export sang Excel
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thống kê dữ liệu</CardTitle>
          <CardDescription>Phân tích chi tiết dữ liệu trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10">
                  <Database className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Bất động sản</p>
                  <p className="text-sm text-muted-foreground">Tổng số bất động sản trong hệ thống</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">1,248</p>
                <p className="text-xs text-muted-foreground">bản ghi</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                  <Database className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Người dùng</p>
                  <p className="text-sm text-muted-foreground">Tài khoản đã đăng ký</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">3,847</p>
                <p className="text-xs text-muted-foreground">bản ghi</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10">
                  <Database className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Lịch hẹn</p>
                  <p className="text-sm text-muted-foreground">Tổng số lịch hẹn đã tạo</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">12,847</p>
                <p className="text-xs text-muted-foreground">bản ghi</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10">
                  <Database className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium">Hội thoại AI</p>
                  <p className="text-sm text-muted-foreground">Lịch sử chat với AI</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">30,450</p>
                <p className="text-xs text-muted-foreground">bản ghi</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Vùng nguy hiểm</CardTitle>
          <CardDescription>Các thao tác không thể hoàn tác</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="destructive" className="w-full gap-2">
            <Trash2 className="h-4 w-4" />
            Xóa tất cả dữ liệu tạm
          </Button>
          <Button variant="destructive" className="w-full gap-2">
            <HardDrive className="h-4 w-4" />
            Reset cơ sở dữ liệu
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
