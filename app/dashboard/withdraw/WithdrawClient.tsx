"use client"
import { useState, useTransition } from "react"
import { createWithdrawAction } from "./actions"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { formatCOP } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { 
  Building, 
  Wallet, 
  ArrowDownCircle, 
  ShieldCheck, 
  Clock,
  Gem,
  CheckCircle2,
  ChevronRight
} from "lucide-react"

const BANCOS = [
  "Nequi", "Daviplata", "Bancolombia", "Davivienda", "Banco de Bogotá", "BBVA", "ScotiaBank Colpatria"
]

export default function WithdrawClient({ profile }: { profile: any }) {
  const [step, setStep] = useState(1)
  const [isPending, startTransition] = useTransition()
  const [amount, setAmount] = useState(0)

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await createWithdrawAction(formData)
      if (result?.success) {
        toast.success("Solicitud de retiro enviada con éxito")
        setStep(3)
      } else {
        toast.error(result?.error || "Error al procesar el retiro")
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-10">
      {/* ── HEADER DE LUJO ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <ArrowDownCircle className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Retirar Capital</h1>
            <p className="text-gray-500 font-bold text-sm tracking-widest flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#76b900]" /> LIQUIDEZ INSTANTÁNEA NVDA
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Saldo Disponible</p>
          <p className="text-2xl font-black text-[#76b900]">{formatCOP(profile?.balance || 0)}</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#1e1e2e] rounded-[40px] p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/[0.03] blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <form action={handleSubmit} className="space-y-10 relative z-10">
          <input type="hidden" name="amount" value={amount} />
          {step === 1 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  Monto a Retirar (Mínimo $10.000)
                </label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-600">$</span>
                  <input 
                    type="number"
                    required
                    placeholder="0"
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-24 bg-[#0a0a0f] border-2 border-[#1e1e2e] rounded-3xl pl-12 pr-8 text-4xl font-black text-white focus:border-red-500/50 outline-none transition-all placeholder:text-gray-800"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-4">
                 <div className="flex items-center justify-between text-sm">
                   <span className="text-gray-500 font-bold uppercase tracking-widest">Comisión de NVDA</span>
                   <span className="text-white font-black">$ 0 COP</span>
                 </div>
                 <div className="h-[1px] bg-white/5 w-full" />
                 <div className="flex items-center justify-between">
                   <span className="text-gray-400 font-bold text-lg">Total a Recibir</span>
                   <span className="text-[#76b900] font-black text-2xl">{formatCOP(amount)}</span>
                 </div>
              </div>

              <Button 
                type="button"
                onClick={() => {
                  if (amount < 10000) return toast.error("El monto mínimo es $10.000")
                  if (amount > (profile?.balance || 0)) return toast.error("Saldo insuficiente")
                  setStep(2)
                }}
                className="w-full h-16 bg-white text-black hover:bg-white/90 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl"
              >
                Configurar Datos Bancarios <ChevronRight className="ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Entidad Bancaria</label>
                  <select 
                    name="bank_name"
                    required
                    className="w-full h-14 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 text-white outline-none focus:border-red-500/50"
                  >
                    {BANCOS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Tipo de Cuenta</label>
                  <select 
                     name="account_type"
                     className="w-full h-14 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 text-white outline-none focus:border-red-500/50"
                  >
                    <option value="Savings">Ahorros</option>
                    <option value="Current">Corriente</option>
                    <option value="Virtual">Billetera Virtual (Nequi/Daviplata)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Número de Cuenta</label>
                  <Input name="account_number" placeholder="Ej: 310..." required className="h-14 bg-[#0a0a0f]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Titular de Cuenta</label>
                  <Input name="account_name" placeholder="Tu nombre completo" defaultValue={profile?.name} required className="h-14 bg-[#0a0a0f]" />
                </div>
              </div>

              {/* RESUMEN FINAL */}
              <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex items-center gap-4">
                 <Clock className="h-10 w-10 text-red-500" />
                 <div>
                   <p className="text-white font-bold tracking-tight">Proceso de Verificación</p>
                   <p className="text-xs text-gray-500">Tu retiro será procesado en un máximo de 24 horas hábiles por nuestro equipo de tesorería.</p>
                 </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-1/3 h-16 rounded-2xl font-bold uppercase"
                >
                  Atrás
                </Button>
                <Button 
                  type="submit"
                  disabled={isPending}
                  className="flex-1 h-16 bg-red-500 text-white hover:bg-red-600 rounded-2xl font-black uppercase tracking-widest text-lg shadow-[0_10px_30px_rgba(239,68,68,0.2)]"
                >
                  {isPending ? "Solicitando..." : "Confirmar Retiro"}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-10 space-y-6 animate-fadeIn">
               <div className="h-24 w-24 bg-[#76b900]/10 rounded-full flex items-center justify-center text-[#76b900] mx-auto mb-4 border border-[#76b900]/20">
                  <CheckCircle2 className="h-12 w-12" />
               </div>
               <h2 className="text-3xl font-black text-white uppercase tracking-tighter">¡Solicitud Exitosa!</h2>
               <p className="text-gray-500 max-w-md mx-auto">
                 Hemos recibido tu orden de retiro por <span className="text-white font-bold">{formatCOP(amount)}</span>. 
                 Recibirás tus fondos en las próximas 24 horas. ✨🏆🚀
               </p>
               <a href="/dashboard">
                  <Button className="h-14 px-8 bg-white text-black hover:bg-white/90 rounded-xl font-bold uppercase tracking-widest">
                    Volver al Dashboard
                  </Button>
               </a>
            </div>
          )}
        </form>
      </div>

      {/* ADVERTENCIA DE SEGURIDAD */}
      <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-[0.2em]">
        <Gem className="h-3 w-3" /> NVDA CAPITAL PARTNERS • SISTEMA DE LIQUIDACIÓN DE ACTIVOS PROTEGIDO
      </div>
    </div>
  )
}
