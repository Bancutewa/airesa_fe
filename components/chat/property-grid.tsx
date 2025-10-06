"use client"

import { PropertyCard, type Property } from "./property-card"

interface PropertyGridProps {
  properties: Property[]
  onViewDetails?: (property: Property) => void
  onBookViewing?: (property: Property) => void
}

export function PropertyGrid({ properties, onViewDetails, onBookViewing }: PropertyGridProps) {
  if (properties.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Không tìm thấy bất động sản phù hợp</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onViewDetails={onViewDetails}
          onBookViewing={onBookViewing}
        />
      ))}
    </div>
  )
}
