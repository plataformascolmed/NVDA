"use server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function updateWithdrawStatusAction(
  id: string, 
  status: string, 
  userId: string, 
  amount: number
) {
  try {
    // 1. Actualizar el estado del retiro
    const { error: updateError } = await supabaseAdmin
      .from('withdrawals')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)

    if (updateError) throw updateError

    // 2. Si se CANCELA o RECHAZA, devolver el dinero al balance del usuario
    if (status === 'CANCELLED' || status === 'REJECTED') {
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('balance')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError

      const restoredBalance = (profile?.balance || 0) + amount

      await supabaseAdmin
        .from('profiles')
        .update({ balance: restoredBalance })
        .eq('id', userId)
    }

    revalidatePath("/admin/withdrawals")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("❌ ERROR UPDATE WITHDRAW:", error)
    return { success: false, error: error.message }
  }
}
