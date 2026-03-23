"use client"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { formatCOP } from "@/lib/utils"

const data = [
  { name: "Ene", val: 500000 },
  { name: "Feb", val: 1200000 },
  { name: "Mar", val: 2400000 },
  { name: "Abr", val: 3100000 },
  { name: "May", val: 4000000 },
  { name: "Jun", val: 5500000 },
  { name: "Jul", val: 7200000 },
  { name: "Ago", val: 8900000 },
  { name: "Sep", val: 10500000 },
  { name: "Oct", val: 12400000 },
  { name: "Nov", val: 15000000 },
  { name: "Dic", val: 18500000 },
]

export const InvestmentChart = ({ totalInvested = 0 }: { totalInvested?: number }) => {
  // Ajustamos la escala simalada al total invertido real del usuario
  const chartData = data.map(d => ({
    ...d,
    val: totalInvested > 0 ? (d.val * (totalInvested / 18500000)) : d.val
  }))

  return (
    <div className="h-[350px] w-full rounded-xl border border-[#1e1e2e] bg-[#111118] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-bold text-white">Crecimiento Estimado</h4>
        <p className="text-xs text-gray-500 italic">Basado en tu inversión actual</p>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#76b900" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#76b900" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2e" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#4b5563" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#4b5563" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "#16161f", border: "1px solid #1e1e2e", borderRadius: "8px" }}
            itemStyle={{ color: "#76b900" }}
            formatter={(value: number) => [formatCOP(value), "Inversión"]}
          />
          <Area
            type="monotone"
            dataKey="val"
            stroke="#76b900"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorVal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
