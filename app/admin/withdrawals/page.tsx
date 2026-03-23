import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import AdminWithdrawalsClient from "./WithdrawalsClient"

export const dynamic = 'force-dynamic'

export default async function AdminWithdrawalsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  const isAdmin = profile?.role?.toUpperCase() === 'ADMIN' || user?.email === 'admin@nvdacapital.co';
  
  if (!isAdmin) return <p className="p-20 text-center text-red-500 font-bold uppercase tracking-widest">Acceso No Autorizado</p>

  const { data: withdrawals } = await supabaseAdmin
    .from('withdrawals')
    .select(`
      *,
      profiles (
        name,
        email
      )
    `)
    .order('created_at', { ascending: false })

  return <AdminWithdrawalsClient withdrawals={withdrawals || []} />
}
