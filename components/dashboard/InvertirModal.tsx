"use client"
import { useState, useTransition } from "react"
import { ShoppingCart, X } from "lucide-react"
import { formatPlanCOP } from "@/lib/utils"
import { investInPlanAction } from "@/app/dashboard/planes/actions"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

interface Plan {
  name: string
  cost: number
  daily: number
  duration: number
  total: number
  requirement: string
}

export const InvertirModal = ({ plan, isOpen, onClose }: { plan: Plan, isOpen: boolean, onClose: () => void }) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (!isOpen) return null

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await investInPlanAction({
        planName: plan.name,
        amount: plan.cost,
        dailyReturn: plan.daily,
        totalReturn: plan.total,
        duration: plan.duration
      })

      if (result.success) {
        toast.success(result.message)
        onClose()
        router.refresh()
        router.push("/dashboard")
      } else {
        toast.error(result.message)
        if (result.code === 'INSUFFICIENT_BALANCE') {
          setTimeout(() => router.push("/dashboard/deposit"), 2000)
        }
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111118] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-[#1e1e2e] animate-in zoom-in-95 duration-200">
        <div className="relative h-32 bg-gradient-to-r from-[#76b900] to-[#b4f91e] flex flex-col items-center justify-center text-black">
          <button onClick={onClose} className="absolute top-4 right-4 text-black/60 hover:text-black">
            <X className="h-6 w-6" />
          </button>
          <ShoppingCart className="h-10 w-10 mb-2" />
          <h3 className="font-bold text-xl">Confirmar Inversión</h3>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-[#0a0a0f] border border-[#1e1e2e] p-4 rounded-xl space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Plan Seleccionado:</span>
              <span className="font-bold text-white">{plan.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Costo de Inversión:</span>
              <span className="font-bold text-[#76b900]">{formatPlanCOP(plan.cost)}</span>
            </div>
            <hr className="border-[#1e1e2e]" />
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ganancia Diaria:</span>
              <span className="text-[#76b900] font-bold">{formatPlanCOP(plan.daily)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Ganancia Total:</span>
              <span className="font-bold text-[#76b900]">{formatPlanCOP(plan.total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duración:</span>
              <span className="font-bold text-white">{plan.duration} días</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleConfirm}
              disabled={isPending}
              className="w-full bg-gradient-to-r from-[#76b900] to-[#b4f91e] text-black font-bold py-4 rounded-xl shadow-lg shadow-green-500/30 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                "Confirmar Inversión"
              )}
            </button>
            <button 
                onClick={onClose}
                className="w-full py-3 text-gray-500 font-medium text-sm mt-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
