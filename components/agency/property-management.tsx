"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PropertyFormModal } from "./property-form-modal"
import type { Property } from "@/components/chat/property-card"

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
  {
    id: "3",
    title: "Biệt thự vườn Thủ Đức",
    price: 18000000000,
    location: "Thủ Đức, TP. Hồ Chí Minh",
    area: 200,
    bedrooms: 5,
    bathrooms: 4,
    type: "Biệt thự",
    image: "/luxury-villa-garden.png",
    status: "pending",
  },
]

export function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>(mockProperties)
  const [searchQuery, setSearchQuery] = useState("")
  const [showPropertyForm, setShowPropertyForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

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

  const handleAddProperty = () => {
    setEditingProperty(null)
    setShowPropertyForm(true)
  }

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property)
    setShowPropertyForm(true)
  }

  const handleDeleteProperty = (id: string) => {
    setProperties(properties.filter((p) => p.id !== id))
  }

  const filteredProperties = properties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Danh sách bất động sản</CardTitle>
            <Button onClick={handleAddProperty} className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm BĐS
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên BĐS</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Địa điểm</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Diện tích</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Không tìm thấy bất động sản
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell className="text-muted-foreground">{property.location}</TableCell>
                      <TableCell className="font-semibold">{formatPrice(property.price)}</TableCell>
                      <TableCell>{property.area}m²</TableCell>
                      <TableCell>
                        <Badge className={statusColors[property.status]}>{statusLabels[property.status]}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-4 w-4" />
                              Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-destructive"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PropertyFormModal
        open={showPropertyForm}
        onOpenChange={setShowPropertyForm}
        property={editingProperty}
        onSave={(property) => {
          if (editingProperty) {
            setProperties(properties.map((p) => (p.id === property.id ? property : p)))
          } else {
            setProperties([...properties, { ...property, id: Date.now().toString() }])
          }
          setShowPropertyForm(false)
        }}
      />
    </>
  )
}
