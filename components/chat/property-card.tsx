"use client"

import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export interface Property {
  id: string
  title: string
  price: number
  location: string
  area: number
  bedrooms: number
  bathrooms: number
  type: string
  image: string
  status: "available" | "pending" | "sold"
}

interface PropertyCardProps {
  property: Property
  onViewDetails?: (property: Property) => void
  onBookViewing?: (property: Property) => void
}

export function PropertyCard({ property, onViewDetails, onBookViewing }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const statusColors = {
    available: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    sold: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  const statusLabels = {
    available: "Còn trống",
    pending: "Đang xử lý",
    sold: "Đã bán",
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img src={property.image || "/placeholder.svg"} alt={property.title} className="object-cover w-full h-full" />
        <Badge className={`absolute top-3 right-3 ${statusColors[property.status]}`}>
          {statusLabels[property.status]}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="secondary" className="mb-2">
            {property.type}
          </Badge>
          <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        <div className="text-2xl font-bold text-primary mb-4">{formatPrice(property.price)}</div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            <span>{property.area}m²</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms} PN</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms} WC</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onViewDetails?.(property)}>
          Chi tiết
        </Button>
        <Button
          className="flex-1 gap-2"
          onClick={() => onBookViewing?.(property)}
          disabled={property.status === "sold"}
        >
          <Calendar className="h-4 w-4" />
          Đặt lịch xem
        </Button>
      </CardFooter>
    </Card>
  )
}
