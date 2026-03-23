"use client"
import { useState, useTransition } from "react"
import Link from "next/link"
import { loginAction } from "@/app/auth/actions"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { toast } from "react-hot-toast"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const result = await loginAction(formData)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="h-14 w-14 bg-[#76b900] rounded-2xl flex items-center justify-center inline-flex mb-6 rotate-3">
            <span className="text-black font-bold text-3xl">N</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Bienvenido de nuevo</h1>
          <p className="text-gray-500 mt-2">Accede a tu panel de inversión premium</p>
        </div>

        <div className="bg-[#111118] border border-[#1e1e2e] rounded-3xl p-8 shadow-2xl">
          <form action={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Email corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="nombre@empresa.com" 
                  className="pl-11"
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-11 pr-11"
                  required 
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-base font-bold" 
              disabled={isPending}
            >
              {isPending ? "Iniciando sesión..." : "Entrar al Dashboard"}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-gray-500">
              ¿No tienes una cuenta?{" "}
              <Link href="/auth/register" className="text-[#76b900] font-bold hover:underline">
                Regístrate ahora
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
