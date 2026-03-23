import { formatDate, formatCOP } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Deposit } from "@/lib/types"

export const TransactionTable = ({ transactions }: { transactions: Deposit[] }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-[#1e1e2e]">
        <p className="text-gray-500 mb-4">No tienes transacciones registradas aún.</p>
        <a href="/dashboard/deposit">
          <button className="text-[#76b900] font-medium hover:underline">Hacer mi primer depósito</button>
        </a>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#1e1e2e]">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#111118] text-gray-400 uppercase text-[10px] tracking-widest border-b border-[#1e1e2e]">
          <tr>
            <th className="px-6 py-4 font-medium">Fecha</th>
            <th className="px-6 py-4 font-medium">Concepto</th>
            <th className="px-6 py-4 font-medium">Monto</th>
            <th className="px-6 py-4 font-medium">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e1e2e] bg-[#0a0a0f]">
          {transactions.map((t) => (
            <tr key={t.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-6 py-4 text-gray-300 font-mono">
                {formatDate(t.created_at)}
              </td>
              <td className="px-6 py-4">
                <span className="text-white font-medium">Depósito de Inversión</span>
                {t.bank_ref && <p className="text-[10px] text-gray-500 mt-0.5">Ref: {t.bank_ref}</p>}
              </td>
              <td className="px-6 py-4 text-white font-bold">
                {formatCOP(t.amount)}
              </td>
              <td className="px-6 py-4">
                <Badge variant={t.status}>{t.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
