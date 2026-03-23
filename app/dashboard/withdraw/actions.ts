"use server"
import { createClient } from "@/lib/supabase/server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export async function createWithdrawAction(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "No autorizado" }

  const amount = Number(formData.get("amount"))
  const bank_name = formData.get("bank_name") as string
  const account_number = formData.get("account_number") as string
  const account_type = formData.get("account_type") as string
  const account_name = formData.get("account_name") as string

  // VALIDACIONES
  if (!amount || amount < 10000) {
    return { error: "El monto mínimo de retiro es $10.000 COP" }
  }

  if (!bank_name || !account_number || !account_name) {
    return { error: "Todos los datos bancarios son obligatorios" }
  }

  // 1. Obtener saldo actual (SALTAR RLS con supabaseAdmin)
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single()

  if (!profile || profile.balance < amount) {
    return { error: "Saldo insuficiente para este retiro" }
  }

  try {
    // 2. Descontar saldo inmediatamente
    const newBalance = profile.balance - amount
    await supabaseAdmin
      .from('profiles')
      .update({ balance: newBalance })
      .eq('id', user.id)

    // 3. Crear solicitud de retiro
    const { error: withdrawError } = await supabaseAdmin
      .from('withdrawals')
      .insert({
        user_id: user.id,
        amount,
        bank_name,
        account_number,
        account_type,
        account_name,
        status: 'PENDING'
      })

    if (withdrawError) throw withdrawError

    revalidatePath("/dashboard")
    return { success: true }
  } catch (err: any) {
    console.error("❌ ERROR RETIRO:", err)
    return { error: "Hubo un problema al procesar tu retiro. Reintenta." }
  }
}
