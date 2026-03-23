import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { StatCard } from "@/components/ui/StatCard"
import { InvestmentChart } from "@/components/dashboard/InvestmentChart"
import { TransactionTable } from "@/components/dashboard/TransactionTable"
import { PlanesClient } from "./planes/PlanesClient"
import { ALL_PLANS } from "@/lib/plans"
import { 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  Users2,
  Gem
} from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  // Obtener perfil, depósitos, referidos e inversiones
  const [profileRes, allDepositsRes, referralsRes, investmentsRes] = await Promise.all([
    supabaseAdmin.from('profiles').select('*').eq('id', user?.id).single(),
    supabaseAdmin.from('deposits').select('*').eq('user_id', user?.id).order('created_at', { ascending: false }),
    supabaseAdmin.from('referrals').select('*', { count: 'exact' }).eq('owner_id', user?.id),
    supabaseAdmin.from('investments').select('*').eq('user_id', user?.id).eq('status', 'ACTIVE')
  ])

  const profile = profileRes.data
  const allDeposits = allDepositsRes.data || []
  const referralsCount = referralsRes.count || 0
  const activeInvestments = investmentsRes.data || []

  // ── LÓGICA DE RENDIMIENTO DIARIO (Basada en inversiones reales) ──
  let dynamicTotalReturns = 0
  let activePlansCount = activeInvestments.length
  let primaryPlanName = "Ninguno"

  if (activeInvestments.length > 0) {
    primaryPlanName = activeInvestments[0].plan_name

    activeInvestments.forEach(inv => {
      const msPerDay = 1000 * 60 * 60 * 24
      const daysPassed = Math.floor((new Date().getTime() - new Date(inv.start_date).getTime()) / msPerDay)
      const effectiveDays = Math.min(Math.max(0, daysPassed), inv.duration_days)
      dynamicTotalReturns += (effectiveDays * inv.daily_return)
    })
  }

  return (
    <div className="space-y-10">
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
            Hola, {profile?.name?.split(' ')[0] || 'Inversionista'} <Gem className="h-6 w-6 text-[#76b900]" />
          </h1>
          <p className="text-gray-500 font-medium">Panel de control de NVDA Capital Partners</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#111118] border border-[#1e1e2e] shadow-xl">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-black">Certificación</p>
            <p className="text-sm font-black text-[#76b900] uppercase tracking-tighter">Premium Verified</p>
          </div>
          <div className="h-3 w-3 rounded-full bg-[#76b900] animate-pulse shadow-[0_0_10px_#76b900]" />
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Saldo Disponible" 
          value={profile?.balance || 0} 
          icon={Wallet} 
          trend="+12% este mes"
        />
        <StatCard 
          label="Plan Activo" 
          value={activePlansCount > 1 ? `${activePlansCount} Planes` : primaryPlanName} 
          icon={BarChart3} 
          isCurrency={false}
          trend={activePlansCount > 0 ? "Generando ingresos" : "Sin inversión"}
        />
        <StatCard 
          label="Retornos Totales" 
          value={dynamicTotalReturns} 
          icon={TrendingUp} 
          trend="+5.2% acumulado"
        />
        <StatCard 
          label="Referidos Activos" 
          value={referralsCount} 
          icon={Users2} 
          isCurrency={false}
          trend={`${referralsCount} inversionistas`}
        />
      </div>

      {/* ── PLANES DE INVERSIÓN ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
           <div className="h-6 w-1 bg-[#76b900] rounded-full" />
           <h2 className="text-xl font-bold text-white uppercase tracking-wider">Mercado de Capitales</h2>
        </div>
        <PlanesClient />
      </div>

      {/* ── CHART ── */}
      <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8">
        <InvestmentChart totalInvested={activePlansCount > 0 ? (activeInvestments.reduce((acc: number, curr: any) => acc + Number(curr.amount_invested), 0)) : 0} />
      </div>

      {/* ── TRANSACTIONS ── */}
      <div className="space-y-6 pb-20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
          <a href="/dashboard/deposit" className="text-xs font-black text-[#76b900] uppercase tracking-widest hover:text-white transition-colors">
            Historial de Bóveda
          </a>
        </div>
        <TransactionTable transactions={allDeposits.slice(0, 5)} />
      </div>
    </div>
  )
}
