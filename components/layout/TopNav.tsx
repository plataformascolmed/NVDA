"use client"
import Link from "next/link"
import { Wallet, ArrowUp, Gift, Users } from "lucide-react"

export const TopNav = () => {
  const items = [
    { name: "Depósito", icon: Wallet, href: "/dashboard/deposit" },
    { name: "Retiro", icon: ArrowUp, href: "/dashboard/retiro" },
    { name: "Bono", icon: Gift, href: "/dashboard/share" },
    { name: "Nosotros", icon: Users, href: "/about" },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 h-[72px] bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1e1e2e] z-[40] flex items-center px-4 lg:hidden">
      <div className="max-w-xl mx-auto w-full flex justify-between items-center">
        {items.map((item) => (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#76b900] to-[#b4f91e] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
              <item.icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] text-gray-500 font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
