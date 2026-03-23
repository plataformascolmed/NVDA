import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import WithdrawClient from "./WithdrawClient"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function WithdrawPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  // USAR supabaseAdmin PARA BYPASSEAR RLS Y OBTENER SALDO SEGURO
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return <WithdrawClient profile={profile} />
}
