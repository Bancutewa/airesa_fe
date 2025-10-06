import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    let response =
      "Xin chào! Tôi là trợ lý AI bất động sản. Tôi có thể giúp bạn tìm kiếm, so sánh và tư vấn về bất động sản. Bạn cần tôi hỗ trợ gì?"

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("tìm") || lowerMessage.includes("căn hộ") || lowerMessage.includes("nhà")) {
      response =
        "Tôi đã tìm thấy một số bất động sản phù hợp với yêu cầu của bạn. Dưới đây là danh sách các bất động sản nổi bật:"
    } else if (lowerMessage.includes("giá") || lowerMessage.includes("bao nhiêu")) {
      response =
        "Giá bất động sản hiện tại đang có xu hướng tăng nhẹ. Tôi có thể cung cấp biểu đồ phân tích giá chi tiết cho bạn."
    } else if (lowerMessage.includes("so sánh")) {
      response = "Tôi sẽ giúp bạn so sánh các bất động sản. Hãy cho tôi biết bạn muốn so sánh những bất động sản nào?"
    } else if (lowerMessage.includes("đặt lịch") || lowerMessage.includes("xem nhà")) {
      response = "Tôi có thể giúp bạn đặt lịch xem nhà. Bạn muốn xem bất động sản nào và vào thời gian nào?"
    }

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({ response })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return NextResponse.json({ error: "Có lỗi xảy ra khi xử lý yêu cầu" }, { status: 500 })
  }
}
