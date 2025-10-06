import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalHeader } from "@/components/global-header"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "RealEstate AI - Tư vấn bất động sản thông minh",
  description: "Nền tảng tư vấn bất động sản được hỗ trợ bởi AI",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <GlobalHeader />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
