"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, BarChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, MessageSquare, Clock, ThumbsUp, AlertCircle } from "lucide-react"

const conversationData = [
  { hour: "00:00", count: 12 },
  { hour: "04:00", count: 8 },
  { hour: "08:00", count: 45 },
  { hour: "12:00", count: 78 },
  { hour: "16:00", count: 92 },
  { hour: "20:00", count: 56 },
]

const responseTimeData = [
  { day: "T2", time: 1.2 },
  { day: "T3", time: 1.5 },
  { day: "T4", time: 1.1 },
  { day: "T5", time: 1.8 },
  { day: "T6", time: 1.3 },
  { day: "T7", time: 1.0 },
  { day: "CN", time: 0.9 },
]

const topQueries = [
  { query: "Tìm căn hộ 2 phòng ngủ", count: 234, satisfaction: 4.5 },
  { query: "Giá nhà ở quận 2", count: 189, satisfaction: 4.2 },
  { query: "So sánh bất động sản", count: 156, satisfaction: 4.7 },
  { query: "Đặt lịch xem nhà", count: 142, satisfaction: 4.8 },
  { query: "Biểu đồ giá thị trường", count: 98, satisfaction: 4.3 },
]

export function AIMonitoring() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng hội thoại</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+18.2%</span> so với tuần trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Thời gian phản hồi TB</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2s</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">Cải thiện 0.3s</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Độ hài lòng</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5.0</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.2</span> điểm
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lỗi AI</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-green-500">-12</span> so với tuần trước
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Hội thoại theo giờ</CardTitle>
            <CardDescription>24 giờ qua</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Số hội thoại",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversationData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="hour" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thời gian phản hồi</CardTitle>
            <CardDescription>Trung bình theo ngày (giây)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                time: {
                  label: "Thời gian (s)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="var(--color-time)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-time)", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Câu hỏi phổ biến</CardTitle>
          <CardDescription>Top 5 câu hỏi được hỏi nhiều nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topQueries.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.query}</p>
                    <p className="text-sm text-muted-foreground">{item.count} lượt hỏi</p>
                  </div>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {item.satisfaction}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
