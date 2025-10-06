import { NextResponse } from "next/server"

const mockAppointments = [
  {
    id: "1",
    property_id: "1",
    date: "2024-02-15",
    time: "10:00",
    status: "confirmed",
    notes: "Khách hàng muốn xem vào buổi sáng",
    created_at: "2024-01-20T10:00:00Z",
    properties: {
      title: "Căn hộ cao cấp Vinhomes Central Park",
      address: "Vinhomes Central Park, 208 Nguyễn Hữu Cảnh",
      price: 5500000000,
    },
  },
  {
    id: "2",
    property_id: "2",
    date: "2024-02-16",
    time: "14:00",
    status: "pending",
    notes: "Khách hàng quan tâm đến khu vườn",
    created_at: "2024-01-21T10:00:00Z",
    properties: {
      title: "Nhà phố hiện đại Thảo Điền",
      address: "Khu Thảo Điền, Quận 2",
      price: 12000000000,
    },
  },
]

export async function GET(req: Request) {
  try {
    return NextResponse.json(mockAppointments)
  } catch (error) {
    console.error("[v0] Appointments API error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi lấy dữ liệu" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const newAppointment = {
      id: String(mockAppointments.length + 1),
      ...body,
      status: "pending",
      created_at: new Date().toISOString(),
    }

    return NextResponse.json(newAppointment)
  } catch (error) {
    console.error("[v0] Create appointment error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi tạo lịch hẹn" }, { status: 500 })
  }
}
