"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ComparisonModal } from "./comparison-modal"
import { BookingModal } from "./booking-modal"
import type { Property } from "./property-card"

export type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  metadata?: {
    properties?: Property[]
    mapData?: {
      properties: Array<{
        id: string
        title: string
        location: string
        lat: number
        lng: number
      }>
      center?: { lat: number; lng: number }
    }
    chartData?: {
      data: Array<{ month: string; price: number }>
      title: string
      description?: string
    }
  }
}

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Căn hộ cao cấp Vinhomes Central Park",
    price: 5500000000,
    location: "Bình Thạnh, TP. Hồ Chí Minh",
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    type: "Căn hộ",
    image: "/modern-apartment-building.png",
    status: "available",
  },
  {
    id: "2",
    title: "Nhà phố hiện đại Thảo Điền",
    price: 12000000000,
    location: "Quận 2, TP. Hồ Chí Minh",
    area: 120,
    bedrooms: 4,
    bathrooms: 3,
    type: "Nhà phố",
    image: "/modern-townhouse.png",
    status: "available",
  },
]

const mockChartData = [
  { month: "T1", price: 4.5 },
  { month: "T2", price: 4.7 },
  { month: "T3", price: 4.8 },
  { month: "T4", price: 5.0 },
  { month: "T5", price: 5.2 },
  { month: "T6", price: 5.5 },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý AI của RealEstate. Tôi có thể giúp bạn tìm kiếm bất động sản, so sánh giá cả, và đặt lịch xem nhà. Bạn đang tìm loại bất động sản nào?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [comparisonProperties, setComparisonProperties] = useState<Property[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null)
  const [showBooking, setShowBooking] = useState(false)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response with rich content
    setTimeout(() => {
      const lowerContent = content.toLowerCase()
      let aiMessage: Message

      if (lowerContent.includes("tìm") || lowerContent.includes("căn hộ") || lowerContent.includes("nhà")) {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Tôi đã tìm thấy 2 bất động sản phù hợp với yêu cầu của bạn. Dưới đây là danh sách:",
          timestamp: new Date(),
          metadata: {
            properties: mockProperties,
            mapData: {
              properties: mockProperties.map((p) => ({
                id: p.id,
                title: p.title,
                location: p.location,
                lat: 10.8231 + Math.random() * 0.1,
                lng: 106.6297 + Math.random() * 0.1,
              })),
            },
          },
        }
      } else if (lowerContent.includes("giá") || lowerContent.includes("biểu đồ")) {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Đây là biểu đồ giá trung bình của căn hộ tại khu vực Bình Thạnh trong 6 tháng qua:",
          timestamp: new Date(),
          metadata: {
            chartData: {
              data: mockChartData,
              title: "Giá trung bình căn hộ - Bình Thạnh",
              description: "Đơn vị: tỷ VND",
            },
          },
        }
      } else {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Tôi có thể giúp bạn:\n• Tìm kiếm bất động sản theo yêu cầu\n• Xem biểu đồ giá thị trường\n• So sánh các bất động sản\n• Đặt lịch xem nhà\n\nBạn muốn làm gì?",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleViewDetails = (property: Property) => {
    console.log("[v0] View details:", property)
  }

  const handleBookViewing = (property: Property) => {
    setBookingProperty(property)
    setShowBooking(true)
  }

  const handleCompareProperties = (properties: Property[]) => {
    setComparisonProperties(properties)
    setShowComparison(true)
  }

  return (
    <>
      <Card className="flex flex-col h-[calc(100vh-16rem)]">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onBookViewing={handleBookViewing}
          onCompareProperties={handleCompareProperties}
        />
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </Card>

      <ComparisonModal open={showComparison} onOpenChange={setShowComparison} properties={comparisonProperties} />

      <BookingModal open={showBooking} onOpenChange={setShowBooking} property={bookingProperty} />
    </>
  )
}
