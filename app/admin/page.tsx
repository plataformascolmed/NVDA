import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { Badge } from "@/components/ui/Badge"
import { formatCOP, formatDate } from "@/lib/utils"
import { Users, Mail, Settings, ShieldCheck, TrendingUp, Wallet } from "lucide-react"

export default async function AdminUsersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Protección extra de rol
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user?.id).single()
  const isAdmin = profile?.role?.toUpperCase() === 'ADMIN' || user?.email === 'admin@nvdacapital.co';
  
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-8">
        <div className="max-w-md text-center bg-[#111118] border border-red-500/20 p-10 rounded-3xl">
          <ShieldCheck className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Acceso No Autorizado</h1>
          <p className="text-gray-500 mb-6">Esta zona está reservada exclusivamente para la gerencia de NVDA Capital Partners.</p>
          <a href="/dashboard">
            <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all">
              Volver al Dashboard
            </button>
          </a>
        </div>
      </div>
    )
  }

  // Obtener todos los perfiles vía Admin Client (by-passing RLS)
  const { data: users } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-[#76b900]/10 rounded-2xl flex items-center justify-center text-[#76b900]">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
            <p className="text-gray-500 text-sm">Control centralizado de inversionistas</p>
          </div>
        </div>
        <div className="bg-[#111118] border border-[#1e1e2e] px-4 py-2 rounded-xl flex items-center gap-3">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Total Usuarios</p>
          <span className="text-xl font-bold text-white">{users?.length || 0}</span>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0a0a0f] text-gray-400 uppercase text-[10px] tracking-widest border-b border-[#1e1e2e]">
              <tr>
                <th className="px-6 py-5 font-bold">Inversionista</th>
                <th className="px-6 py-5 font-bold">Datos Financieros</th>
                <th className="px-6 py-5 font-bold">Referido por</th>
                <th className="px-6 py-5 font-bold">Fecha Registro</th>
                <th className="px-6 py-5 font-bold">Rol</th>
                <th className="px-6 py-5 font-bold">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {users?.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-gradient-to-tr from-[#1e1e2e] to-[#2e2e3e] rounded-xl flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-bold tracking-tight">{u.name}</p>
                        <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {u.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 space-y-2 font-mono">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-400">Balance:</span>
                        <span className="text-xs text-[#76b900] font-bold">{formatCOP(u.balance)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-400">Retornos:</span>
                        <span className="text-xs text-blue-400 font-bold">{formatCOP(u.total_returns)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {u.referred_by ? (
                      <Badge variant="INVESTOR">{u.referred_by}</Badge>
                    ) : (
                      <span className="text-gray-600 text-[10px] uppercase font-bold">Orgánico</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-medium">
                    {formatDate(u.created_at)}
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={u.role}>{u.role}</Badge>
                  </td>
                  <td className="px-6 py-5">
                    <button className="h-9 w-9 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all">
                      <Settings className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
