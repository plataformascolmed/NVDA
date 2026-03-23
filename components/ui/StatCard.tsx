import { cn, formatCOP } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
  label: string
  value: number | string
  icon?: LucideIcon
  isCurrency?: boolean
  trend?: string
}

export const StatCard = ({ label, value, icon: Icon, isCurrency = true, trend }: StatCardProps) => {
  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-6 hover:border-[#76b900]/30 transition-all group">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">{label}</p>
        {Icon && (
          <div className="rounded-lg bg-white/5 p-2 group-hover:bg-[#76b900]/10 group-hover:text-[#76b900] transition-colors">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {typeof value === 'number' && isCurrency ? formatCOP(value) : value}
        </h3>
        {trend && (
          <span className="text-xs font-medium text-[#76b900]">{trend}</span>
        )}
      </div>
    </div>
  )
}
