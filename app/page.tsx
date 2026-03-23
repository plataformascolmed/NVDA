import Link from "next/link"
import { ArrowUpRight, BarChart3, ShieldCheck, Zap, ChevronRight, Globe, Play } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-[#76b900]/30 overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex items-center justify-between backdrop-blur-md bg-transparent border-b border-white/[0.05]">
        <div className="flex items-center group cursor-pointer">
          <div className="relative h-[70px] w-[320px] overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="NVDA Logo" 
              fill 
              className="object-contain object-left"
              priority
            />
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Estrategias', 'Resultados', 'Nosotros', 'Soporte'].map((link) => (
            <Link key={link} href="#" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">{link}</Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-bold text-gray-400 hover:text-white px-4 py-2 transition-all">Log in</Link>
          <Link href="/auth/register">
            <button className="bg-[#76b900] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:scale-[1.02] shadow-lg shadow-[#76b900]/10 active:scale-95 transition-all">
              Comenzar ahora
            </button>
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-48 pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-[#76b900]/10 to-transparent blur-3xl rounded-full opacity-30 select-none pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative px-6 md:px-0">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* ── TEXT CONTENT (Z-20) ── */}
            <div className="lg:col-span-7 relative z-20 space-y-8 text-left animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#76b900]/10 border border-[#76b900]/20 backdrop-blur-xl">
                <span className="flex h-2 w-2 rounded-full bg-[#76b900] animate-pulse shadow-[0_0_15px_#76b900]" />
                <span className="text-[10px] font-black text-[#76b900] uppercase tracking-[0.3em] leading-none">Intelligence-Driven Finance</span>
              </div>

              <h1 className="text-6xl md:text-9xl font-extrabold tracking-tighter leading-[0.8] text-white pointer-events-none">
                Invierte en <br/>
                <span className="text-[#76b900] drop-shadow-[0_0_60px_rgba(118,185,0,0.5)]">el Futuro</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 max-w-lg leading-relaxed font-light">
                Gestión de capital inteligente con retornos institucionales y liquidez instantánea.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 font-bold">
                <Link href="/auth/register">
                  <button className="h-16 px-12 bg-[#76b900] text-black rounded-2xl group flex items-center justify-center gap-3 hover:scale-105 hover:shadow-[0_0_50px_rgba(118,185,0,0.5)] active:scale-95 transition-all text-lg uppercase tracking-widest min-w-[240px]">
                    Vincularme <ArrowUpRight className="h-6 w-6 stroke-[3px]" />
                  </button>
                </Link>
                <button className="h-16 px-12 bg-white/[0.03] border border-white/10 text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all text-lg min-w-[240px] backdrop-blur-2xl shadow-xl">
                  Whitepaper
                </button>
              </div>
            </div>

            {/* ── NEON VIDEO IMMERSION (Z-10) ── */}
            <div className="lg:col-span-8 lg:absolute lg:-right-20 lg:top-1/2 lg:-translate-y-1/2 w-full z-10">
              <div className="relative">
                {/* Mega Glow Aura */}
                <div className="absolute -inset-20 bg-[#76b900]/30 blur-[120px] rounded-full opacity-40 animate-pulse" />
                
                {/* Video Container (Straight & Clean) */}
                <div className="relative aspect-video lg:aspect-[16/10] w-full rounded-[60px] overflow-hidden border border-white/10 shadow-3xl bg-black">
                  <video 
                    src="/hero.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000"
                  />
                  
                  {/* Máscara de Degradado para Inmersión */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                  
                  {/* Reflejos de Luz Neón */}
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-[#76b900]/5 blur-3xl rounded-full mix-blend-screen animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS ── */}
      <section className="py-20 px-6 border-y border-white/[0.05] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center italic">
          <div>
            <h4 className="text-4xl font-bold text-white mb-1 tracking-tighter">$14.2B+</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Capital Gestionado</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-white mb-1 tracking-tighter">1,240+</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Inversionistas</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-[#76b900] mb-1 tracking-tighter">22.4%</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Promedio ROI (2024)</p>
          </div>
          <div>
            <h4 className="text-4xl font-bold text-white mb-1 tracking-tighter">100%</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Liquidación Exitosa</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[40px] bg-gradient-to-tr from-[#111118] to-[#16161f] border border-white/[0.05] relative overflow-hidden group">
               <Zap className="h-12 w-12 text-[#76b900] mb-32" />
               <h3 className="text-3xl font-bold text-white mb-4 leading-tight">Liquidez en tiempo real</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Retira tus rendimientos acumulados en cualquier momento sin penalizaciones adicionales.</p>
               <div className="absolute top-10 right-10 h-3 w-3 rounded-full bg-[#76b900] blur-sm opacity-50" />
            </div>

            <div className="p-10 rounded-[40px] bg-gradient-to-tr from-[#111118] to-[#16161f] border border-white/[0.05] relative overflow-hidden">
               <BarChart3 className="h-12 w-12 text-[#76b900] mb-32" />
               <h3 className="text-3xl font-bold text-white mb-4 leading-tight">Analítica Avanzada</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Nuestro panel de control te permite ver el crecimiento de tu capital segundo a segundo.</p>
               <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#76b900]/5 blur-3xl rounded-full" />
            </div>

            <div className="p-10 rounded-[40px] bg-gradient-to-tr from-[#111118] to-[#16161f] border border-white/[0.05] relative overflow-hidden group">
               <ShieldCheck className="h-12 w-12 text-[#76b900] mb-32" />
               <h3 className="text-3xl font-bold text-white mb-4 leading-tight">Seguridad Institucional</h3>
               <p className="text-gray-500 text-sm leading-relaxed">Tus fondos están respaldados por participaciones reales en activos inmobiliarios tangibles.</p>
               <div className="absolute top-1/2 left-0 h-20 w-[1px] bg-gradient-to-b from-transparent via-[#76b900] to-transparent opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-20 px-6 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex flex-col items-center md:items-start space-y-4">
              <div className="flex items-center">
                <div className="relative h-[50px] w-[200px] overflow-hidden">
                  <Image 
                    src="/logo.png" 
                    alt="NVDA Logo" 
                    fill 
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-500">© 2024 NVDA Capital Partners SAS. Todos los derechos reservados.</p>
            </div>

            <div className="flex gap-10">
              <Link href="/about" className="text-xs text-gray-500 hover:text-[#76b900] transition-colors">Nosotros</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-[#76b900] transition-colors">Términos</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-[#76b900] transition-colors">Privacidad</Link>
              <Link href="#" className="text-xs text-gray-500 hover:text-[#76b900] transition-colors">Soporte</Link>
            </div>
        </div>
      </footer>
    </div>
  )
}
