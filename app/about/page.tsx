import Link from "next/link"
import { Shield, TrendingUp, Users, Globe, Building2, ChevronRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* ── HERO ── */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-[#1e1e2e]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#76b900]/5 to-transparent pointer-none" />
        <div className="max-w-7xl mx-auto text-center relative">
          <Badge variant="INVESTOR" className="mb-6">NVDA Capital Partners</Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Nuestra Visión Financiera</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Democratizamos el acceso a inversiones de alto rendimiento mediante algoritmos avanzados y gestión de capital proactiva.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="py-24 px-4 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Misión Institucional</h2>
            <p className="text-gray-400 leading-relaxed font-sans text-lg">
              Establecer un estándar de excelencia en la gestión de capital privado en Colombia, ofreciendo a nuestros asociados retornos consistentes superiores al mercado tradicional a través de la diversificación inteligente.
            </p>
          </div>
          <div className="flex gap-6">
            <div className="p-4 bg-[#111118] border border-[#1e1e2e] rounded-2xl flex-1">
              <Shield className="h-6 w-6 text-[#76b900] mb-3" />
              <h4 className="font-bold mb-1">Seguridad</h4>
              <p className="text-xs text-gray-500 italic">Auditoría externa 24/7</p>
            </div>
            <div className="p-4 bg-[#111118] border border-[#1e1e2e] rounded-2xl flex-1">
              <TrendingUp className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="font-bold mb-1">Impacto</h4>
              <p className="text-xs text-gray-500 italic">Crecimiento real</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-[#111118] border border-[#1e1e2e] rounded-[48px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#76b900]/10 to-transparent animate-pulse" />
            <div className="h-full flex flex-col items-center justify-center p-12 text-center">
               <Building2 className="h-20 w-20 text-[#76b900] mb-8" />
               <h4 className="text-2xl font-bold">Sede Principal</h4>
               <p className="text-gray-500 mt-2 font-mono">Medellín, Colombia · El Poblado</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-tr from-[#111118] to-[#16161f] border border-[#1e1e2e] rounded-[40px] p-12 text-center space-y-8">
          <h2 className="text-3xl font-bold">¿Listo para diversificar?</h2>
          <Link href="/auth/register">
            <button className="px-10 py-4 bg-[#76b900] text-black font-bold rounded-2xl text-lg hover:scale-105 transition-all shadow-xl shadow-[#76b900]/20">
              Crear mi portafolio <ChevronRight className="inline-block ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function Badge({ children, variant, className }: any) {
  return (
    <span className={`px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest ${
        variant === 'INVESTOR' ? "bg-[#76b900]/10 text-[#76b900] border-[#76b900]/20" : "bg-white/5 text-gray-500 border-white/10"
    } ${className}`}>
      {children}
    </span>
  )
}
