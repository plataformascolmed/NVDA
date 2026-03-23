"use server"
import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

interface InvestmentData {
  planName: string
  amount: number
  dailyReturn: number
  totalReturn: number
  duration: number
}

export async function investInPlanAction(data: InvestmentData) {
  const supabase = await createClient()

  // 1. Verificar sesión
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: "Debes iniciar sesión para invertir." }
  }

  // 2. Obtener balance actual del perfil
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('balance')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    return { success: false, message: "Error al obtener tu saldo actual." }
  }

  // 3. Validar saldo insuficiente
  if (profile.balance < data.amount) {
    return { 
      success: false, 
      message: "Saldo insuficiente. Recarga tu cuenta.",
      code: 'INSUFFICIENT_BALANCE'
    }
  }

  // 4. Calcular fecha final
  const startDate = new Date()
  const endDate = new Date()
  endDate.setDate(startDate.getDate() + data.duration)

  // 5. Iniciar transacción (Insertar inversión y restar saldo)
  try {
    // Insertar inversión
    const { error: investError } = await supabase
      .from('investments')
      .insert({
        user_id: user.id,
        plan_name: data.planName,
        amount_invested: data.amount,
        daily_return: data.dailyReturn,
        total_return: data.totalReturn,
        duration_days: data.duration,
        start_date: startDate.toISOString(),
        end_date: endDate.toISOString(),
        status: 'ACTIVE'
      })

    if (investError) throw investError

    // Restar saldo del perfil
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ balance: profile.balance - data.amount })
      .eq('id', user.id)

    if (updateError) throw updateError

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/planes")

    return { 
      success: true, 
      message: "¡Inversión activada! Tu plan ya está corriendo." 
    }
  } catch (error: any) {
    console.error("Error en inversión:", error)
    return { 
      success: false, 
      message: "Ocurrió un error al procesar la inversión. Inténtalo de nuevo." 
    }
  }
}
