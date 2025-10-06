"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Property } from "@/components/chat/property-card"

interface PropertyFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property: Property | null
  onSave: (property: Property) => void
}

export function PropertyFormModal({ open, onOpenChange, property, onSave }: PropertyFormModalProps) {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: "",
    price: 0,
    location: "",
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
    type: "Căn hộ",
    status: "available",
    image: "",
  })

  useEffect(() => {
    if (property) {
      setFormData(property)
    } else {
      setFormData({
        title: "",
        price: 0,
        location: "",
        area: 0,
        bedrooms: 0,
        bathrooms: 0,
        type: "Căn hộ",
        status: "available",
        image: "",
      })
    }
  }, [property, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Property)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property ? "Chỉnh sửa bất động sản" : "Thêm bất động sản mới"}</DialogTitle>
          <DialogDescription>Điền thông tin chi tiết về bất động sản</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Tên bất động sản *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="VD: Căn hộ cao cấp Vinhomes"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Loại hình *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Căn hộ">Căn hộ</SelectItem>
                  <SelectItem value="Nhà phố">Nhà phố</SelectItem>
                  <SelectItem value="Biệt thự">Biệt thự</SelectItem>
                  <SelectItem value="Đất nền">Đất nền</SelectItem>
                  <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Còn trống</SelectItem>
                  <SelectItem value="pending">Đang xử lý</SelectItem>
                  <SelectItem value="sold">Đã bán</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="location">Địa điểm *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="VD: Bình Thạnh, TP. Hồ Chí Minh"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Giá (VND) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                placeholder="5500000000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Diện tích (m²) *</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
                placeholder="85"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Số phòng ngủ *</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                placeholder="2"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Số phòng tắm *</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                placeholder="2"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="image">URL hình ảnh</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button type="submit">{property ? "Cập nhật" : "Thêm mới"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
