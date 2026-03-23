"use client"
import { useTransition } from "react"
import { updateDepositStatusAction } from "./actions"
import { Badge } from "@/components/ui/Badge"
import { formatCOP, formatDate } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { 
  ArrowUpCircle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Search,
  Building2
} from "lucide-react"

export default function AdminDepositsClient({ deposits: initialDeposits }: { deposits: any[] }) {
  const [isPending, startTransition] = useTransition()

  const handleStatusUpdate = async (id: string, status: string, userId: string, amount: number) => {
    if (!confirm(`¿Estás seguro de cambiar el estado a ${status}?`)) return

    startTransition(async () => {
      const result = await updateDepositStatusAction(id, status, userId, amount)
      if (result.success) {
        toast.success(`Depósito ${status === 'COMPLETED' ? 'Aprobado' : 'Rechazado'} correctamente`)
        window.location.reload()
      } else {
        toast.error(result.error || "Error al actualizar")
      }
    })
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-[#76b900]/10 rounded-2xl flex items-center justify-center text-[#76b900]">
            <ArrowUpCircle className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Solicitudes de Depósito</h1>
            <p className="text-gray-500 text-sm">Control de flujo de caja entrante</p>
          </div>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl overflow-hidden p-8 space-y-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
          <input 
            placeholder="Buscar por referencia o email..."
            className="w-full h-12 bg-[#0a0a0f] border border-[#1e1e2e] rounded-2xl pl-12 pr-4 text-sm text-white outline-none focus:border-[#76b900] transition-all"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#1e1e2e]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#16161f] text-gray-500 uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-5 font-bold">Inversionista</th>
                <th className="px-6 py-5 font-bold">Capital</th>
                <th className="px-6 py-5 font-bold">Ref. Bancaria</th>
                <th className="px-6 py-5 font-bold">Fecha</th>
                <th className="px-6 py-5 font-bold">Estado</th>
                <th className="px-6 py-5 font-bold text-center">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2e]">
              {initialDeposits?.map((d: any) => (
                <tr key={d.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-5">
                    <p className="text-white font-bold tracking-tight">{d.profiles?.name || "N/A"}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{d.profiles?.email || "N/A"}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[#76b900] font-bold text-lg">{formatCOP(d.amount)}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <Building2 className="h-3 w-3 text-gray-500" />
                       <span className="text-xs font-mono text-gray-400 font-bold">{d.bank_ref}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-500 font-medium font-mono text-xs">
                    {formatDate(d.created_at)}
                  </td>
                  <td className="px-6 py-5">
                    <Badge variant={d.status}>{d.status}</Badge>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      {d.status === 'PENDING' && (
                        <>
                          <button 
                            disabled={isPending}
                            onClick={() => handleStatusUpdate(d.id, 'COMPLETED', d.user_id, d.amount)}
                            className="h-10 px-4 bg-[#76b900]/10 hover:bg-[#76b900]/20 text-[#76b900] rounded-xl flex items-center gap-2 transition-all border border-[#76b900]/10 font-bold text-xs"
                          >
                            <CheckCircle2 className="h-4 w-4" /> Aprobar
                          </button>
                          <button 
                            disabled={isPending}
                            onClick={() => handleStatusUpdate(d.id, 'REJECTED', d.user_id, d.amount)}
                            className="h-10 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl flex items-center gap-2 transition-all border border-red-500/10 font-bold text-xs"
                          >
                            <XCircle className="h-4 w-4" /> Rechazar
                          </button>
                        </>
                      )}
                      <button className="h-10 w-10 bg-white/5 hover:bg-white/10 text-gray-500 rounded-xl flex items-center justify-center transition-all border border-white/5">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
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
