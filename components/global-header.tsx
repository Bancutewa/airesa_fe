"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, MessageSquare, LayoutDashboard, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function GlobalHeader() {
  const pathname = usePathname()

  const navigation = [
    { name: "Tư vấn AI", href: "/", icon: MessageSquare },
    { name: "Quản lý BĐS", href: "/agency", icon: Building2 },
    { name: "Quản trị", href: "/admin", icon: LayoutDashboard },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-sans text-lg font-semibold">RealEstate AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

              return (
                <Link key={item.href} href={item.href}>
                  <Button variant="ghost" className={cn("gap-2", isActive && "bg-accent text-accent-foreground")}>
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-4 w-4" />
            <span className="sr-only">Cài đặt</span>
          </Button>
          <Button>Đăng nhập</Button>
        </div>
      </div>
    </header>
  )
}
