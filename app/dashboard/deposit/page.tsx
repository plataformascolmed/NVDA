"use client"
import { useState, useTransition } from "react"
import { createDepositAction, getActivePaymentConfigAction } from "./actions"
import { useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { formatCOP } from "@/lib/utils"
import { toast } from "react-hot-toast"
import Image from "next/image"
import { 
  ArrowRight, 
  ArrowLeft, 
  Copy, 
  Check, 
  ShieldCheck, 
  Building2, 
  History,
  Info,
  ChevronDown
} from "lucide-react"
import { ALL_PLANS } from "@/lib/plans"

export default function DepositPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState<number>(0)
  const [isPending, startTransition] = useTransition()
  const [copied, setCopied] = useState<string | null>(null)
  const [paymentConfig, setPaymentConfig] = useState<any>(null)

  useEffect(() => {
    if (step === 2 && !paymentConfig) {
      getActivePaymentConfigAction().then(setPaymentConfig)
    }
  }, [step, paymentConfig])

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    toast.success("Copiado al portapapeles")
    setTimeout(() => setCopied(null), 2000)
  }

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await createDepositAction(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Solicitud enviada correctamente")
      }
    })
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 underline decoration-[#76b900]/30 underline-offset-8">Invertir Capital</h1>
          <p className="text-gray-500">Sigue los pasos para fondear tu cuenta</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111118] border border-[#1e1e2e] rounded-full shadow-inner">
          {[1, 2, 3].map((s) => (
            <div 
              key={s}
              className={`h-2 w-8 rounded-full transition-all duration-500 ${
                step >= s ? "bg-[#76b900] shadow-[0_0_10px_rgba(118,185,0,0.5)]" : "bg-[#1e1e2e]"
              }`}
            />
          ))}
        </div>
      </div>

      <form action={handleSubmit}>
        {/* ── PERSISTENCIA DE DATOS (Hidden Fields) ── */}
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="planName" value={ALL_PLANS.find(p => p.cost === amount)?.name || ""} />

        {/* ── PASO 1: SELECCIÓN DE PLAN ── */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 space-y-8 shadow-2xl">
              <div className="space-y-4">
                <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#76b900]" />
                  Selecciona tu producto
                </label>
                
                <div className="relative group">
                  <select 
                    name="planName"
                    onChange={(e) => {
                      const selected = ALL_PLANS.find(p => p.name === e.target.value)
                      if (selected) setAmount(selected.cost)
                    }}
                    className="w-full h-20 bg-[#0a0a0f] border-2 border-[#1e1e2e] focus:border-[#76b900] rounded-2xl px-6 text-xl font-bold text-white appearance-none outline-none transition-all cursor-pointer group-hover:border-white/20 shadow-inner"
                    required
                  >
                    <option value="" disabled selected>Elige un producto de inversión...</option>
                    {ALL_PLANS.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name} — {formatCOP(p.cost)} (Suma {formatCOP(p.daily)}/día)
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-500 pointer-events-none group-hover:text-[#76b900] transition-colors" />
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#76b900]" />
                    Inversión requerida
                  </label>
                  <div className="relative overflow-hidden rounded-2xl bg-[#0a0a0f] border border-[#1e1e2e] flex items-center h-24 px-14 group">
                    <span className="text-3xl font-black text-gray-700 mr-2">$</span>
                    <span className="text-5xl font-black text-[#76b900]">
                      {amount ? amount.toLocaleString('es-CO') : "0"}
                    </span>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black p-2 bg-white/5 rounded-lg border border-white/5 text-gray-500 tracking-tighter uppercase">
                      Monto Fijo
                    </div>
                  </div>
                </div>
              </div>

              {amount > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in zoom-in-95 duration-500">
                  <div className="p-6 bg-[#76b900]/5 border border-[#76b900]/10 rounded-2xl">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Rendimiento (5 días)</p>
                    <h4 className="text-2xl font-black text-[#76b900]">+{formatCOP((ALL_PLANS.find(p => p.cost === amount)?.daily || 0) * 5)}</h4>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mb-1">Retorno Mensual</p>
                    <h4 className="text-2xl font-black text-white">~30% Est.</h4>
                  </div>
                </div>
              )}
            </div>

            <Button 
              type="button" 
              className="w-full h-20 text-2xl font-black rounded-3xl shadow-[0_20px_50px_-10px_rgba(118,185,0,0.4)] hover:shadow-[0_25px_60px_-10px_rgba(118,185,0,0.6)] transition-all duration-500 active:scale-95"
              disabled={amount <= 0}
              onClick={() => setStep(2)}
            >
              CONTINUAR AL PAGO <ArrowRight className="ml-3 h-7 w-7 stroke-[4px]" />
            </Button>
          </div>
        )}

        {/* ── PASO 2: PAGO QR ROTATIVO ── */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 space-y-8 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#76b900]/20 blur-[100px] rounded-full" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-[#76b900]/20 rounded-2xl flex items-center justify-center text-[#76b900] shadow-lg">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Escanea y Paga</h3>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-[#76b900]/20 to-transparent border border-[#76b900]/30 rounded-full">
                  <span className="text-xs font-black text-[#76b900] uppercase tracking-widest">Nequi Express</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                <div className="relative group perspective-1000">
                  <div className="absolute -inset-6 bg-[#76b900]/30 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-all duration-1000" />
                    <div className="relative h-72 w-72 bg-white p-6 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-8 border-[#1e1e2e] transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1">
                    <Image 
                      src={paymentConfig?.qr_url || "/placeholder-qr.png"} 
                      alt="Código QR de Pago" 
                      fill 
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#0a0a0f] border border-[#1e1e2e] px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#76b900] animate-pulse" />
                    <p className="text-xs font-black text-white uppercase tracking-widest">QR Rotativo Activo</p>
                  </div>
                </div>

                <div className="flex-1 w-full space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { label: "Canal de Pago", val: paymentConfig?.bank_name || "Nequi Directo", id: "bank" },
                      { label: "ID de Receptor", val: paymentConfig?.account_number || "Cargando...", id: "acc" },
                      { label: "Beneficiario", val: paymentConfig?.account_name || "NVDA CAPITAL CORP", id: "owner" },
                      { label: "Monto Exacto", val: formatCOP(amount), id: "amt", highlight: true },
                    ].map((item) => (
                      <div key={item.id} className="p-5 bg-[#0a0a0f] border border-[#1e1e2e] rounded-2xl group relative overflow-hidden shadow-inner">
                        {item.highlight && <div className="absolute inset-0 bg-gradient-to-r from-[#76b900]/10 to-transparent" />}
                        <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">{item.label}</p>
                        <p className={`font-black tracking-tight transition-all ${item.highlight ? "text-3xl text-[#76b900]" : "text-lg text-white"}`}>{item.val}</p>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.val, item.id)}
                          className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#76b900] transition-colors p-2 hover:bg-white/5 rounded-xl"
                        >
                          {copied === item.id ? <Check className="h-5 w-5 text-[#76b900]" /> : <Copy className="h-5 w-5" />}
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-start gap-4 p-5 bg-[#76b900]/5 rounded-3xl border border-[#76b900]/10">
                    <Info className="h-6 w-6 text-[#76b900] shrink-0 mt-1" />
                    <p className="text-[12px] text-gray-400 leading-snug font-medium">
                      Una vez escaneado, haz clic en el botón de abajo para adjuntar la prueba de pago y finalizar tu solicitud.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="h-16 px-10 font-black rounded-2xl border-[#1e1e2e] hover:bg-white/5 uppercase tracking-widest text-xs" 
                onClick={() => setStep(1)}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Rectificar Plan
              </Button>
              <Button 
                type="button" 
                className="flex-1 h-16 text-xl font-black rounded-2xl shadow-[0_20px_50px_-10px_rgba(118,185,0,0.3)] group"
                onClick={() => {
                  toast.success("Habilitemos la validación final")
                  setStep(3)
                }}
              >
                HE REALIZADO LA TRANSFERENCIA <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        )}

        {/* ── PASO 3: CONFIRMACIÓN ── */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 shadow-lg">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Validación de Transacción</h3>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Referencia Bancaria (Requerido)</label>
                  <Input 
                    name="bankRef" 
                    placeholder="Número de aprobación Nequi" 
                    required 
                    className="h-16 rounded-2xl bg-[#0a0a0f] border-[#1e1e2e] focus:border-blue-500 text-lg font-bold"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-gray-400 uppercase tracking-widest ml-1">Notas de Auditoría (Opcional)</label>
                  <textarea 
                    name="notes"
                    placeholder="Ej: Pago realizado desde Nequi personal..."
                    className="w-full min-h-[140px] rounded-2xl border border-[#1e1e2e] bg-[#0a0a0f] px-6 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="p-5 bg-white/5 border border-white/5 rounded-3xl flex gap-4 items-center">
                <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
                  <History className="h-5 w-5" />
                </div>
                <p className="text-[12px] text-gray-400 leading-tight font-medium">
                  Tu inversión se acreditará una vez confirmada la operación. Tiempo estimado de auditoría: <span className="text-[#76b900] font-black">2-6 HORAS</span>.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="h-16 px-10 font-black rounded-2xl border-[#1e1e2e] hover:bg-white/5 uppercase tracking-widest text-xs" 
                onClick={() => setStep(2)}
              >
                <ArrowLeft className="mr-2 h-5 w-5" /> Volver al QR
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-20 text-2xl font-black rounded-3xl shadow-[0_20px_50px_-10px_rgba(59,130,246,0.3)] bg-blue-600 hover:bg-blue-500 disabled:opacity-50"
                disabled={isPending}
              >
                {isPending ? "PROTEGIENDO TRANSACCIÓN..." : "FINALIZAR DEPÓSITO"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
