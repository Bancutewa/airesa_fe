"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Star } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const ratingData = [
  { rating: "5 sao", count: 234 },
  { rating: "4 sao", count: 189 },
  { rating: "3 sao", count: 67 },
  { rating: "2 sao", count: 23 },
  { rating: "1 sao", count: 12 },
]

interface Feedback {
  id: string
  user: string
  rating: number
  comment: string
  category: "positive" | "negative" | "neutral"
  timestamp: string
}

const mockFeedback: Feedback[] = [
  {
    id: "1",
    user: "Nguyễn Văn A",
    rating: 5,
    comment: "AI rất thông minh, giúp tôi tìm được căn hộ phù hợp chỉ trong 10 phút!",
    category: "positive",
    timestamp: "2 giờ trước",
  },
  {
    id: "2",
    user: "Trần Thị B",
    rating: 4,
    comment: "Giao diện đẹp, dễ sử dụng. Tuy nhiên đôi khi AI phản hồi hơi chậm.",
    category: "positive",
    timestamp: "5 giờ trước",
  },
  {
    id: "3",
    user: "Lê Văn C",
    rating: 2,
    comment: "AI không hiểu đúng yêu cầu của tôi, phải hỏi lại nhiều lần.",
    category: "negative",
    timestamp: "1 ngày trước",
  },
  {
    id: "4",
    user: "Phạm Thị D",
    rating: 5,
    comment: "Tuyệt vời! So sánh bất động sản rất chi tiết và trực quan.",
    category: "positive",
    timestamp: "1 ngày trước",
  },
  {
    id: "5",
    user: "Hoàng Văn E",
    rating: 3,
    comment: "Tính năng tốt nhưng cần thêm nhiều bất động sản hơn.",
    category: "neutral",
    timestamp: "2 ngày trước",
  },
]

export function FeedbackAnalysis() {
  const categoryColors = {
    positive: "bg-green-500/10 text-green-500 border-green-500/20",
    negative: "bg-red-500/10 text-red-500 border-red-500/20",
    neutral: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  }

  const categoryLabels = {
    positive: "Tích cực",
    negative: "Tiêu cực",
    neutral: "Trung lập",
  }

  const stats = {
    total: 525,
    positive: 423,
    negative: 35,
    avgRating: 4.6,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng phản hồi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">Trong 30 ngày qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá TB</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">{stats.avgRating}</div>
              <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Trên thang 5 sao</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tích cực</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-green-500">{stats.positive}</div>
              <ThumbsUp className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{((stats.positive / stats.total) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tiêu cực</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-red-500">{stats.negative}</div>
              <ThumbsDown className="h-5 w-5 text-red-500" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{((stats.negative / stats.total) * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phân bố đánh giá</CardTitle>
          <CardDescription>Số lượng đánh giá theo mức sao</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: {
                label: "Số lượng",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="rating" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
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
          <CardTitle>Phản hồi gần đây</CardTitle>
          <CardDescription>Ý kiến từ người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedback.map((feedback) => (
              <div key={feedback.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{feedback.user}</p>
                    <Badge className={categoryColors[feedback.category]}>{categoryLabels[feedback.category]}</Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: feedback.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{feedback.comment}</p>
                <p className="text-xs text-muted-foreground">{feedback.timestamp}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
