"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, TrendingUp } from "lucide-react"
import type { Property } from "./property-card"

interface ComparisonModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  properties: Property[]
}

export function ComparisonModal({ open, onOpenChange, properties }: ComparisonModalProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const calculatePricePerSqm = (price: number, area: number) => {
    return formatPrice(price / area)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>So sánh bất động sản</DialogTitle>
          <DialogDescription>So sánh chi tiết {properties.length} bất động sản</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {properties.map((property) => (
            <div key={property.id} className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  className="object-cover w-full h-full"
                />
              </div>

              <div>
                <Badge variant="secondary" className="mb-2">
                  {property.type}
                </Badge>
                <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Giá</span>
                  <span className="font-semibold text-primary">{formatPrice(property.price)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    Diện tích
                  </span>
                  <span className="font-medium">{property.area}m²</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Giá/m²
                  </span>
                  <span className="font-medium">{calculatePricePerSqm(property.price, property.area)}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    Phòng ngủ
                  </span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    Phòng tắm
                  </span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
