import type { Metadata } from "next"
import { ChatInterface } from "@/components/chat/chat-interface"

export const metadata: Metadata = {
  title: "Tư vấn AI - RealEstate AI",
  description: "Trò chuyện với AI để tìm bất động sản phù hợp",
}

export default function HomePage() {
  return (
    <div className="container max-w-5xl py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-balance mb-3">Tư vấn bất động sản thông minh</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          Hỏi AI về bất động sản, nhận tư vấn chi tiết và đặt lịch xem nhà ngay
        </p>
      </div>

      <ChatInterface />
    </div>
  )
}
