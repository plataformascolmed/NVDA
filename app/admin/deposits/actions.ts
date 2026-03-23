"use server"
import { supabaseAdmin } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"
import { ALL_PLANS } from "@/lib/plans"

export async function updateDepositStatusAction(
  id: string, 
  status: string, 
  userId: string, 
  amount: number
) {
  try {
    // 1. Obtener detalles del depósito antes de actualizar
    const { data: deposit, error: fetchError } = await supabaseAdmin
      .from('deposits')
      .select('*, profiles(referred_by)')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError

    // 2. Actualizar el estado del depósito
    const { error: updateError } = await supabaseAdmin
      .from('deposits')
      .update({ status })
      .eq('id', id)

    if (updateError) throw updateError

    // 3. Lógica de Aprobación
    if (status === 'COMPLETED') {
      // 3.1. Obtener perfil para actualizar balance
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) throw profileError

      const newBalance = (profile?.balance || 0) + amount
      const newTotalInvested = (profile?.total_invested || 0) + amount

      await supabaseAdmin
        .from('profiles')
        .update({ balance: newBalance, total_invested: newTotalInvested })
        .eq('id', userId)

      // 3.2. Crear el registro de Investment si aplica
      if (deposit.plan_name) {
        const planData = ALL_PLANS.find(p => p.name === deposit.plan_name)
        if (planData) {
          const startDate = new Date()
          const endDate = new Date()
          endDate.setDate(startDate.getDate() + planData.duration)

          await supabaseAdmin
            .from('investments')
            .insert({
              user_id: userId,
              plan_name: planData.name,
              amount_invested: planData.cost,
              daily_return: planData.daily,
              total_return: planData.total,
              duration_days: planData.duration,
              start_date: startDate.toISOString(),
              end_date: endDate.toISOString(),
              status: 'ACTIVE'
            })
        }
      }

      // 3.3. Lógica de Referidos (Bono del 10% por el primer depósito del referido)
      const { count: previousDeposits } = await supabaseAdmin
        .from('deposits')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'COMPLETED')
        .neq('id', id) // Excluir el actual

      if (previousDeposits === 0 && profile.referred_by) {
        // Es el primer depósito y tiene un referente
        const bonus = amount * 0.10 // 10% de bono
        
        // Encontrar al dueño del código de referido
        const { data: referrer } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('referral_code', profile.referred_by)
          .single()

        if (referrer) {
          // Agregar bono al balance del referente
          await supabaseAdmin
            .from('profiles')
            .update({ balance: (referrer.balance || 0) + bonus })
            .eq('id', referrer.id)

          // Registrar en la tabla de referidos
          await supabaseAdmin
            .from('referrals')
            .update({ status: 'COMPLETED', bonus: bonus })
            .eq('owner_id', referrer.id)
            .eq('referred_email', profile.email)
        }
      }
    }

    revalidatePath("/admin/deposits")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: any) {
    console.error("❌ ERROR UPDATE DEPOSIT:", error)
    return { success: false, error: error.message }
  }
}
