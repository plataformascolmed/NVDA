import { createClient } from "@/lib/supabase/server"
import { StatCard } from "@/components/ui/StatCard"
import { Badge } from "@/components/ui/Badge"
import { Gift, Share2, Users, ArrowUpRight, ShieldCheck } from "lucide-react"

export default async function ReferralsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('referral_code')
    .eq('id', user?.id)
    .single()

  const { count: referralsCount } = await supabase
    .from('referrals')
    .select('*', { count: 'exact' })
    .eq('owner_id', user?.id)

  const { data: referrals } = await supabase
    .from('referrals')
    .select('*')
    .eq('owner_id', user?.id)
    .order('created_at', { ascending: false })

  // Calcular bonos totales de referidos completados
  const totalBonuses = referrals?.reduce((acc: number, curr: any) => acc + (Number(curr.bonus) || 0), 0) || 0

  const shareUrl = `https://nvdacapital.co/auth/register?ref=${profile?.referral_code}`

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tighter">Programa de Referidos</h1>
        <p className="text-gray-500 font-medium">Haz crecer la comunidad y gana bonos exclusivos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Tu Código" value={profile?.referral_code || "---"} icon={Gift} isCurrency={false} />
        <StatCard label="Referidos Registrados" value={referralsCount || 0} icon={Users} isCurrency={false} />
        <StatCard label="Bonos Ganados" value={totalBonuses} icon={ArrowUpRight} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111118]/80 backdrop-blur-xl border border-[#1e1e2e] rounded-[40px] p-10 space-y-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#76b900]/5 blur-3xl rounded-full" />
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-[#76b900]" /> Comparte tu enlace
          </h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            Invita a otros a unirse a NVDA Capital. Al realizar su primera inversión, recibirás un bono del 10% del monto invertido.
          </p>
          
          <div className="p-5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-2xl flex items-center justify-between group/copy">
            <span className="text-[10px] font-mono text-gray-500 truncate mr-4">{shareUrl}</span>
            <button className="text-[10px] font-black text-[#76b900] bg-[#76b900]/10 px-4 py-2 rounded-xl hover:bg-[#76b900]/20 transition-all shrink-0 uppercase tracking-widest border border-[#76b900]/10">
              Copiar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 px-4 py-4 bg-[#25D366]/5 text-[#25D366] rounded-2xl font-bold text-[10px] hover:bg-[#25D366]/10 transition-all border border-[#25D366]/10 uppercase tracking-widest">
              WhatsApp
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-4 bg-[#0088cc]/5 text-[#0088cc] rounded-2xl font-bold text-[10px] hover:bg-[#0088cc]/10 transition-all border border-[#0088cc]/10 uppercase tracking-widest">
              Telegram
            </button>
          </div>
        </div>

        <div className="bg-[#111118]/80 backdrop-blur-xl border border-[#1e1e2e] rounded-[40px] p-10 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#76b900]" /> Recompensas NVDA
          </h3>
          <div className="space-y-8">
            {[
              { t: "1. Comparte", d: "Envía el enlace a una persona interesada en invertir." },
              { t: "2. Registro", d: "Tu referido debe completar el registro con tu código oficial." },
              { t: "3. Recibe", d: "Obtén un bono del 10% sobre la primera inversión de tu referido." },
            ].map((step) => (
              <div key={step.t} className="flex gap-5">
                <div className="h-8 w-8 rounded-xl bg-[#76b900]/10 border border-[#76b900]/20 flex items-center justify-center text-xs text-[#76b900] font-black shrink-0 shadow-[0_0_10px_rgba(118,185,0,0.1)]">
                  {step.t.charAt(0)}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white uppercase tracking-tight">{step.t}</h5>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#111118]/80 backdrop-blur-xl border border-[#1e1e2e] rounded-[40px] p-10">
        <h3 className="text-xl font-bold text-white mb-8">Historial de Referidos</h3>
        {referrals && referrals.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-[#1e1e2e]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0a0a0f] text-[10px] text-gray-500 uppercase tracking-[0.2em] font-black">
                <tr>
                  <th className="px-6 py-5">Email del Referido</th>
                  <th className="px-6 py-5">Fecha de Registro</th>
                  <th className="px-6 py-5">Bono Generado</th>
                  <th className="px-6 py-5">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e2e]">
                {referrals.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-5 text-white font-bold tracking-tight">{r.referred_email}</td>
                    <td className="px-6 py-5 text-gray-500 font-mono text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-5">
                      <span className={r.bonus > 0 ? "text-[#76b900] font-black" : "text-gray-600 font-bold"}>
                        {r.bonus > 0 ? `$${r.bonus.toLocaleString()}` : "$0"}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <Badge variant={r.status === 'COMPLETED' ? 'COMPLETED' : 'PENDING'}>{r.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-[#1e1e2e] rounded-[30px] bg-white/[0.01]">
            <Users className="h-12 w-12 text-gray-800 mx-auto mb-4" />
            <p className="text-gray-600 text-sm font-bold uppercase tracking-widest">Aún no tienes referidos registrados.</p>
          </div>
        )}
      </div>
    </div>
  )
}
