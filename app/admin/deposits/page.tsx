import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import AdminDepositsClient from "./DepositsClient"

export const dynamic = 'force-dynamic'

export default async function AdminDepositsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // USAR supabaseAdmin PARA BYPASSEAR RLS
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  const isAdmin = profile?.role?.toUpperCase() === 'ADMIN' || user?.email === 'admin@nvdacapital.co';
  
  if (!isAdmin) return <p className="p-20 text-center text-red-500 font-bold uppercase tracking-widest">Acceso No Autorizado</p>

  // Obtener depósitos con perfiles
  const { data: deposits } = await supabaseAdmin
    .from('deposits')
    .select(`
      *,
      profiles (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  return <AdminDepositsClient deposits={deposits || []} />
}
