import { createClient } from "@/lib/supabase/server"
import { Building2, Landmark, Wallet, ShieldCheck, Mail } from "lucide-react"
import { Badge } from "@/components/ui/Badge"

export default async function BankDataPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const bankData = [
    { label: "Banco", val: "Bancolombia", icon: Landmark },
    { label: "Tipo", val: "Ahorros", icon: Wallet },
    { label: "Número", val: "123-456789-12", icon: Building2 },
    { label: "Titular", val: "NVDA Capital Partners SAS", icon: ShieldCheck },
    { label: "Concepto", val: user?.email, icon: Mail },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Canales de Fondeo</h1>
        <p className="text-gray-500">Información oficial para gestionar tus inversiones</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Landmark className="h-5 w-5 text-[#76b900]" /> Bancolombia
            </h3>
            <Badge variant="APPROVED">Disponible 24/7</Badge>
          </div>

          <div className="space-y-4">
            {bankData.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-4 bg-[#0a0a0f] border border-[#1e1e2e] rounded-2xl group transition-all">
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-gray-500 group-hover:text-[#76b900] transition-colors" />
                  <span className="text-sm text-gray-400">{item.label}</span>
                </div>
                <span className="text-sm font-bold text-white tracking-tight">{item.val}</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#76b900]/5 border border-[#76b900]/10 rounded-2xl">
            <p className="text-xs text-[#76b900] leading-relaxed italic">
              * Recuerda enviar el comprobante en la sección de depósitos después de transferir.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-bold text-white">Métodos Adicionales</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 bg-[#111118] border border-[#1e1e2e] rounded-3xl flex items-center justify-between group cursor-pointer hover:border-[#76b900]/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 font-bold text-xl">P</div>
                <div>
                  <h5 className="font-bold text-white">PSE</h5>
                  <p className="text-xs text-gray-500">Pagos instantáneos desde cualquier banco</p>
                </div>
              </div>
              <Badge>Próximamente</Badge>
            </div>

            <div className="p-6 bg-[#111118] border border-[#1e1e2e] rounded-3xl flex items-center justify-between group cursor-pointer hover:border-[#b4f91e]/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 font-bold text-xl">N</div>
                <div>
                  <h5 className="font-bold text-white">Nequi / Daviplata</h5>
                  <p className="text-xs text-gray-500">Transferencias móviles directas</p>
                </div>
              </div>
              <Badge>Habilitado</Badge>
            </div>
          </div>

          <div className="p-8 border border-dashed border-[#1e1e2e] rounded-3xl bg-white/[0.01]">
            <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#76b900]" /> ¿Es seguro?
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Todas las transacciones de NVDA Capital Partners SAS están auditadas por nuestro equipo financiero. Nuestro NIT 901.234.567-8 certifica nuestra legalidad en el territorio colombiano bajo normas de gestión de capital privado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
