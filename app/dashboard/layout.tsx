import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Toaster } from "react-hot-toast"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  // USAR supabaseAdmin PARA BYPASSEAR RLS Y EVITAR RECURSIÓN
  const { supabaseAdmin } = await import("@/lib/supabase/admin");
  
  let profile = null;
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    
    if (error) {
       console.error("❌ ERROR SUPABASE LEYENDO PERFIL:", error.message);
    } else {
       profile = data;
    }
  } catch (err) {
    console.error("❌ ERROR FATAL LEYENDO PERFIL:", err);
  }

  console.log("🕵️‍♂️ MONITOR | Perfil detectado para ID:", user.id);
  console.log("📊 Datos recibidos:", profile ? `ID: ${profile.id}, ROL: ${profile.role}, BAL: ${profile.balance}` : "¡PERFIL VACÍO!");

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Sidebar user={user} profile={profile} />
      <main className="pl-[260px] min-h-screen">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
