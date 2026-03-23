import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: 'PENDING' | 'REVIEWING' | 'APPROVED' | 'REJECTED' | 'ADMIN' | 'INVESTOR' | 'default'
  className?: string
}

const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
  const variants = {
    PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    REVIEWING: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    APPROVED: 'bg-green-500/10 text-green-400 border-green-500/20',
    COMPLETED: 'bg-[#76b900]/10 text-[#76b900] border-[#76b900]/20',
    REJECTED: 'bg-red-500/10 text-red-500 border-red-500/20',
    CANCELLED: 'bg-red-500/10 text-red-500 border-red-500/20',
    ADMIN: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    INVESTOR: 'bg-nvgreen/10 text-nvgreen border-nvgreen/20',
    default: 'bg-white/5 text-gray-400 border-white/10'
  }

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold border",
      variants[variant as keyof typeof variants] || variants.default,
      className
    )}>
      {children}
    </span>
  )
}

export { Badge }
