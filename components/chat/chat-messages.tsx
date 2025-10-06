"use client"

import { useEffect, useRef } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bot, User, ArrowLeftRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PropertyGrid } from "./property-grid"
import { PropertyMap } from "./property-map"
import { PriceChart } from "./price-chart"
import type { Message } from "./chat-interface"
import type { Property } from "./property-card"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
  onViewDetails?: (property: Property) => void
  onBookViewing?: (property: Property) => void
  onCompareProperties?: (properties: Property[]) => void
}

export function ChatMessages({
  messages,
  isLoading,
  onViewDetails,
  onBookViewing,
  onCompareProperties,
}: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <ScrollArea className="flex-1 p-4" ref={scrollRef}>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}>
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={cn(message.role === "assistant" && "bg-primary text-primary-foreground")}>
                  {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>

              <div className={cn("flex flex-col gap-1 max-w-[80%]", message.role === "user" && "items-end")}>
                <div
                  className={cn(
                    "rounded-lg px-4 py-2",
                    message.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground",
                  )}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            {/* Render rich content for assistant messages */}
            {message.role === "assistant" && message.metadata && (
              <div className="ml-11 mt-2">
                {message.metadata.properties && message.metadata.properties.length > 0 && (
                  <>
                    <PropertyGrid
                      properties={message.metadata.properties}
                      onViewDetails={onViewDetails}
                      onBookViewing={onBookViewing}
                    />
                    {message.metadata.properties.length > 1 && (
                      <Button
                        variant="outline"
                        className="gap-2 mt-2 bg-transparent"
                        onClick={() => onCompareProperties?.(message.metadata.properties)}
                      >
                        <ArrowLeftRight className="h-4 w-4" />
                        So sánh {message.metadata.properties.length} bất động sản
                      </Button>
                    )}
                  </>
                )}

                {message.metadata.mapData && (
                  <PropertyMap
                    properties={message.metadata.mapData.properties}
                    center={message.metadata.mapData.center}
                  />
                )}

                {message.metadata.chartData && (
                  <PriceChart
                    data={message.metadata.chartData.data}
                    title={message.metadata.chartData.title}
                    description={message.metadata.chartData.description}
                  />
                )}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1 bg-muted rounded-lg px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
              <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
