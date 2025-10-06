import { NextResponse } from "next/server"

const mockProperties = [
  {
    id: "1",
    title: "Căn hộ cao cấp Vinhomes Central Park",
    description: "Căn hộ 2 phòng ngủ view sông Saigon, nội thất đầy đủ, tiện nghi hiện đại",
    type: "apartment",
    price: 5500000000,
    area: 85.5,
    bedrooms: 2,
    bathrooms: 2,
    address: "Vinhomes Central Park, 208 Nguyễn Hữu Cảnh",
    city: "Hồ Chí Minh",
    district: "Bình Thạnh",
    images: ["/modern-apartment-building.png"],
    amenities: ["Hồ bơi", "Gym", "Công viên", "Siêu thị", "Bảo vệ 24/7"],
    status: "available",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Nhà phố hiện đại Thảo Điền",
    description: "Nhà phố 3 tầng, thiết kế hiện đại, khu vực an ninh cao cấp",
    type: "house",
    price: 12000000000,
    area: 150,
    bedrooms: 4,
    bathrooms: 3,
    address: "Khu Thảo Điền, Quận 2",
    city: "Hồ Chí Minh",
    district: "Quận 2",
    images: ["/modern-townhouse.png"],
    amenities: ["Sân vườn", "Gara ô tô", "Sân thượng", "Bảo vệ 24/7"],
    status: "available",
    created_at: "2024-01-14T10:00:00Z",
  },
  {
    id: "3",
    title: "Biệt thự nghỉ dưỡng Đà Lạt",
    description: "Biệt thự view núi, không gian yên tĩnh, phù hợp nghỉ dưỡng",
    type: "villa",
    price: 8500000000,
    area: 250,
    bedrooms: 5,
    bathrooms: 4,
    address: "Phường 4, Đà Lạt",
    city: "Lâm Đồng",
    district: "Đà Lạt",
    images: ["/luxury-villa-garden.png"],
    amenities: ["Sân vườn rộng", "BBQ", "Hồ bơi riêng", "View núi"],
    status: "available",
    created_at: "2024-01-13T10:00:00Z",
  },
  {
    id: "4",
    title: "Căn hộ studio The Sun Avenue",
    description: "Studio 35m2, full nội thất, giá tốt cho người độc thân",
    type: "apartment",
    price: 2200000000,
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    address: "The Sun Avenue, 28 Mai Chí Thọ",
    city: "Hồ Chí Minh",
    district: "Quận 2",
    images: ["/modern-apartment-building.png"],
    amenities: ["Hồ bơi", "Gym", "Siêu thị", "Bảo vệ 24/7"],
    status: "available",
    created_at: "2024-01-12T10:00:00Z",
  },
  {
    id: "5",
    title: "Văn phòng hạng A Bitexco",
    description: "Văn phòng 100m2, tầng cao, view đẹp, phù hợp công ty startup",
    type: "office",
    price: 45000000,
    area: 100,
    bedrooms: 0,
    bathrooms: 2,
    address: "Tòa nhà Bitexco Financial Tower",
    city: "Hồ Chí Minh",
    district: "Quận 1",
    images: ["/modern-apartment-building.png"],
    amenities: ["Điều hòa trung tâm", "Thang máy cao tốc", "Bãi đỗ xe", "Bảo vệ 24/7"],
    status: "available",
    created_at: "2024-01-11T10:00:00Z",
  },
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = Number.parseInt(searchParams.get("offset") || "0")
    const type = searchParams.get("type")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")

    let filteredProperties = [...mockProperties]

    if (type) {
      filteredProperties = filteredProperties.filter((p) => p.type === type)
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price >= Number.parseFloat(minPrice))
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter((p) => p.price <= Number.parseFloat(maxPrice))
    }

    const paginatedProperties = filteredProperties.slice(offset, offset + limit)

    return NextResponse.json({
      properties: paginatedProperties,
      total: filteredProperties.length,
      limit,
      offset,
    })
  } catch (error) {
    console.error("[v0] Properties API error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi lấy dữ liệu" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newProperty = {
      id: String(mockProperties.length + 1),
      ...body,
      created_at: new Date().toISOString(),
      status: "available",
    }

    return NextResponse.json(newProperty)
  } catch (error) {
    console.error("[v0] Create property error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi tạo bất động sản" }, { status: 500 })
  }
}
