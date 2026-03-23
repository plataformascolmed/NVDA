"use client"
import { useState, useTransition } from "react"
import Link from "next/link"
import { registerAction } from "@/app/auth/actions"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { toast } from "react-hot-toast"
import { User, Mail, Lock, Gift, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function RegisterPage() {
  const [isPending, startTransition] = useTransition()
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  async function handleSubmit(formData: FormData) {
    if (!acceptedTerms) {
      toast.error("Debes aceptar los términos y condiciones")
      return
    }
    
    startTransition(async () => {
      const result = await registerAction(formData)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <div className="h-14 w-14 bg-[#76b900] rounded-2xl flex items-center justify-center inline-flex mb-6 -rotate-3">
            <span className="text-black font-bold text-3xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Crea tu cuenta premium</h1>
          <p className="text-gray-500 mt-2">Únete a la elite de NVDA Capital Partners</p>
        </div>

        <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 shadow-2xl">
          <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Nombre completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input name="name" placeholder="Ej: John Doe" className="pl-11" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input name="email" type="email" placeholder="john@example.com" className="pl-11" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Contraseña (min 8 car.)</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input name="password" type="password" placeholder="••••••••" className="pl-11" required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Confirmar contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input name="confirmPassword" type="password" placeholder="••••••••" className="pl-11" required />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Código de referido (opcional)</label>
              <div className="relative">
                <Gift className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input name="referredBy" placeholder="Ej: NVDA_ABCD" className="pl-11 uppercase" />
              </div>
            </div>

            <div className="md:col-span-2 flex items-start gap-3 p-4 bg-white/[0.02] border border-[#1e1e2e] rounded-xl">
              <button 
                type="button"
                onClick={() => setAcceptedTerms(!acceptedTerms)}
                className={cn(
                  "mt-0.5 h-5 w-5 rounded border transition-colors flex items-center justify-center shrink-0",
                  acceptedTerms ? "bg-[#76b900] border-[#76b900]" : "bg-[#0a0a0f] border-[#1e1e2e]"
                )}
              >
                {acceptedTerms && <CheckCircle2 className="h-4 w-4 text-black" />}
              </button>
              <p className="text-xs text-gray-400 leading-relaxed">
                Acepto que NVDA Capital Partners gestione mis fondos bajo los términos de inversión de alto rendimiento y entiendo los riesgos asociados.
              </p>
            </div>

            <Button 
              type="submit" 
              className="md:col-span-2 h-12 text-base font-bold" 
              disabled={isPending}
            >
              {isPending ? "Creando cuenta..." : "Comenzar a invertir"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="text-[#76b900] font-bold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
