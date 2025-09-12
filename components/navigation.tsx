"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CreditCard, Home, BarChart3, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/prediction", label: "Prediction", icon: CreditCard },
    { href: "/analysis", label: "Analysis", icon: BarChart3 },
    { href: "/help", label: "Help", icon: HelpCircle },
  ]

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
            <CreditCard className="h-6 w-6 text-blue-600" />
            Credit Predictor
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn("flex items-center gap-2", isActive && "bg-blue-600 hover:bg-blue-700")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
