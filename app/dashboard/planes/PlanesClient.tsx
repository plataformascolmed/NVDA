"use client"
import { useState } from "react"
import { PlanCard } from "@/components/dashboard/PlanCard"
import { InvertirModal } from "@/components/dashboard/InvertirModal"
import { cn } from "@/lib/utils"

import { CATEGORIES, PLANS_DATA as PLANS } from "@/lib/plans"

export const PlanesClient = () => {
  const [activeTab, setActiveTab] = useState('standard')
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInvest = (plan: any) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="h-5 w-1 bg-[#76b900] rounded-full" />
          Planes de Inversión
        </h2>
      </div>

      <div className="flex bg-[#111118] rounded-xl p-1 border border-[#1e1e2e] mb-10 overflow-hidden">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "flex-1 py-3 text-xs font-bold transition-all duration-300 rounded-md",
              activeTab === cat.id 
                ? "bg-gradient-to-r from-[#76b900] to-[#b4f91e] text-black shadow-md shadow-green-500/20" 
                : "text-gray-400 hover:text-gray-600"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
        {(PLANS as any)[activeTab].map((plan: any, idx: number) => (
          <PlanCard 
            key={`${activeTab}-${idx}`} 
            plan={plan} 
            onInvest={handleInvest} 
          />
        ))}
      </div>

      {selectedPlan && (
        <InvertirModal 
          plan={selectedPlan} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  )
}
