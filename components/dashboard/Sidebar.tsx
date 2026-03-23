"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  ArrowUpCircle, 
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Wallet,
  ArrowDownCircle,
  Users2,
  Menu,
  X
} from "lucide-react"
import { logoutAction } from "@/app/auth/actions"

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Depositar", href: "/dashboard/deposit", icon: Wallet },
  { name: "Retirar Capital", href: "/dashboard/withdraw", icon: ArrowDownCircle },
  { name: "Referidos", href: "/dashboard/referrals", icon: Users2 },
]

const adminLinks = [
  { name: "Gestionar Clientes", href: "/admin", icon: ShieldCheck },
  { name: "Aprobación de QR", href: "/admin/deposits", icon: CreditCard },
  { name: "Aprobación de Retiros", href: "/admin/withdrawals", icon: ArrowDownCircle },
]

export const Sidebar = ({ user, profile }: { user: any, profile: any }) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const isAdmin = profile?.role?.toUpperCase() === 'ADMIN' || user?.email === 'admin@nvdacapital.co';

  return (
    <>
      {/* Botón Hamburguesa Móvil */}
      <div className="lg:hidden fixed top-6 right-6 z-[10001]">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-[#111118] border border-[#1e1e2e] rounded-2xl text-white shadow-2xl"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Overlay Móvil */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Aside principal */}
      <aside className={cn(
        "w-[280px] h-screen bg-[#111118] border-r border-[#1e1e2e] flex flex-col fixed left-0 top-0 z-[9999] transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-8">
          <Link href="/" className="flex items-center">
            <div className="relative h-20 w-full">
              <Image 
                src="/logo.png" 
                alt="NVDA Logo" 
                fill 
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        <div className="px-4 py-2 mb-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#76b900] to-[#b4f91e] flex items-center justify-center text-black font-bold shrink-0">
              {user?.user_metadata?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.user_metadata?.name || 'Usuario'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                  isActive 
                    ? "bg-[#76b900]/10 text-[#76b900] border border-[#76b900]/10 shadow-[0_0_15px_rgba(118,185,0,0.05)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <div className="flex items-center gap-3">
                  <link.icon className={cn("h-5 w-5", isActive ? "text-[#76b900]" : "group-hover:text-white")} />
                  <span className="text-sm font-medium">{link.name}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            )
          })}

          {isAdmin && (
            <>
              <div className="pt-6 pb-2 px-4">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Zona Admin</span>
              </div>
              {adminLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-xl transition-all group",
                      isActive 
                        ? "bg-[#76b900]/10 text-[#76b900] border border-[#76b900]/10" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className={cn("h-5 w-5", isActive ? "text-[#76b900]" : "group-hover:text-white")} />
                      <span className="text-sm font-medium">{link.name}</span>
                    </div>
                    {isActive && <ChevronRight className="h-4 w-4" />}
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        <div className="p-4 border-t border-[#1e1e2e]">
          <button
            onClick={() => logoutAction()}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/5 rounded-xl transition-colors group"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}
