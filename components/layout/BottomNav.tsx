"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Share2, User } from "lucide-react"
import { cn } from "@/lib/utils"

export const BottomNav = () => {
  const pathname = usePathname()

  const tabs = [
    { name: "Inicio", icon: Home, href: "/dashboard" },
    { name: "Invitar", icon: Share2, href: "/dashboard/share" },
    { name: "Perfil", icon: User, href: "/dashboard/profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60px] bg-[#0a0a0f]/80 backdrop-blur-md border-t border-[#1e1e2e] z-[40] grid grid-cols-3 lg:hidden">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link 
            key={tab.name} 
            href={tab.href} 
            className="flex flex-col items-center justify-center gap-1"
          >
            <tab.icon className={cn("h-6 w-6", isActive ? "text-[#76b900]" : "text-gray-400")} />
            <span className={cn("text-[10px] font-medium", isActive ? "text-[#76b900]" : "text-gray-400")}>
              {tab.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
