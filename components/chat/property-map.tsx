"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  properties: Array<{
    id: string
    title: string
    location: string
    lat: number
    lng: number
  }>
  center?: { lat: number; lng: number }
}

export function PropertyMap({ properties, center }: PropertyMapProps) {
  // Placeholder for Google Maps integration
  const mapCenter = center || { lat: 10.8231, lng: 106.6297 } // Ho Chi Minh City

  return (
    <Card className="my-4">
      <CardHeader>
        <CardTitle>Bản đồ vị trí</CardTitle>
        <CardDescription>Hiển thị {properties.length} bất động sản trên bản đồ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {/* Placeholder for actual Google Maps */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Google Maps sẽ được tích hợp ở đây</p>
              <p className="text-xs text-muted-foreground mt-1">
                Tọa độ: {mapCenter.lat.toFixed(4)}, {mapCenter.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {properties.slice(0, 3).map((property) => (
            <div key={property.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">{property.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{property.location}</p>
              </div>
            </div>
          ))}
          {properties.length > 3 && (
            <p className="text-xs text-muted-foreground text-center pt-2">+{properties.length - 3} bất động sản khác</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
