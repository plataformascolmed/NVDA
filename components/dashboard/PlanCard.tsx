"use client"
import { ShoppingCart } from "lucide-react"
import { formatPlanCOP } from "@/lib/utils"

interface Plan {
  name: string
  cost: number
  daily: number
  duration: number
  total: number
  requirement: string
}

export const PlanCard = ({ plan, onInvest }: { plan: Plan, onInvest: (plan: Plan) => void }) => {
  return (
    <div className="bg-[#111118] rounded-2xl overflow-hidden shadow-sm border border-[#1e1e2e] hover:border-[#76b900]/30 transition-all flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-r from-[#76b900] to-[#b4f91e] text-black font-bold text-center py-2 text-xs tracking-wider uppercase">
        {plan.name}
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-y-4 mb-6">
          <div>
            <p className="font-bold text-xl text-[#76b900]">{formatPlanCOP(plan.cost)}</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Inversión</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-xl text-white">{plan.duration} días</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Duración</p>
          </div>
          <div>
            <p className="font-bold text-lg text-white">{formatPlanCOP(plan.daily)}</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Ganancia Diaria</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-[#76b900]">{formatPlanCOP(plan.total)}</p>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Ganancia Total</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[#76b900] font-semibold text-xs leading-relaxed">
            {plan.requirement}
          </p>
          <p className="text-gray-300 text-[10px] uppercase tracking-widest font-bold mt-1">Requisitos de inversión</p>
        </div>

        <button
          onClick={() => onInvest(plan)}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-[#76b900] to-[#b4f91e] text-black font-bold rounded-lg py-3.5 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all flex items-center justify-center gap-2"
        >
          <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-[-15deg]" />
          <ShoppingCart className="h-5 w-5" />
          <span>Invertir ahora</span>
        </button>
      </div>
    </div>
  )
}
