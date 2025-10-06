"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Clock, MapPin, User, Phone } from "lucide-react"
import { vi } from "date-fns/locale"
import { format } from "date-fns"

interface Appointment {
  id: string
  propertyTitle: string
  customerName: string
  customerPhone: string
  date: Date
  time: string
  location: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

const mockAppointments: Appointment[] = [
  {
    id: "1",
    propertyTitle: "Căn hộ cao cấp Vinhomes Central Park",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    date: new Date(2025, 0, 15),
    time: "10:00",
    location: "Bình Thạnh, TP. Hồ Chí Minh",
    status: "confirmed",
  },
  {
    id: "2",
    propertyTitle: "Nhà phố hiện đại Thảo Điền",
    customerName: "Trần Thị B",
    customerPhone: "0907654321",
    date: new Date(2025, 0, 15),
    time: "14:00",
    location: "Quận 2, TP. Hồ Chí Minh",
    status: "pending",
  },
  {
    id: "3",
    propertyTitle: "Biệt thự vườn Thủ Đức",
    customerName: "Lê Văn C",
    customerPhone: "0909876543",
    date: new Date(2025, 0, 16),
    time: "09:00",
    location: "Thủ Đức, TP. Hồ Chí Minh",
    status: "confirmed",
  },
]

export function AppointmentCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [appointments] = useState<Appointment[]>(mockAppointments)

  const statusColors = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    confirmed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
  }

  const statusLabels = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    completed: "Hoàn thành",
    cancelled: "Đã hủy",
  }

  const selectedDateAppointments = appointments.filter(
    (apt) =>
      selectedDate &&
      apt.date.getDate() === selectedDate.getDate() &&
      apt.date.getMonth() === selectedDate.getMonth() &&
      apt.date.getFullYear() === selectedDate.getFullYear(),
  )

  const appointmentDates = appointments.map((apt) => apt.date)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Lịch</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            locale={vi}
            className="rounded-md border"
            modifiers={{
              hasAppointment: appointmentDates,
            }}
            modifiersStyles={{
              hasAppointment: {
                fontWeight: "bold",
                textDecoration: "underline",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Lịch hẹn - {selectedDate ? format(selectedDate, "PPP", { locale: vi }) : "Chọn ngày"}</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateAppointments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Không có lịch hẹn nào trong ngày này</p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedDateAppointments.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{appointment.propertyTitle}</h4>
                        <Badge className={statusColors[appointment.status]}>{statusLabels[appointment.status]}</Badge>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === "pending" && (
                          <>
                            <Button size="sm" variant="outline">
                              Xác nhận
                            </Button>
                            <Button size="sm" variant="outline">
                              Hủy
                            </Button>
                          </>
                        )}
                        {appointment.status === "confirmed" && (
                          <Button size="sm" variant="outline">
                            Hoàn thành
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{appointment.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{appointment.customerPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="line-clamp-1">{appointment.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
