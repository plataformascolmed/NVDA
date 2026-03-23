'use server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ALL_PLANS } from '@/lib/plans'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getActivePaymentConfigAction() {
  const { data: configs } = await supabaseAdmin
    .from('payment_configs')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  const { count } = await supabaseAdmin
    .from('deposits')
    .select('*', { count: 'exact', head: true })

  if (!configs || configs.length === 0) return null
  
  const index = (count || 0) % configs.length
  return configs[index]
}

export async function createDepositAction(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const amount = parseFloat(formData.get('amount') as string)
  const bankRef = formData.get('bankRef') as string
  const planName = formData.get('planName') as string
  const notes = formData.get('notes') as string

  if (!amount || amount <= 0) {
    return { error: 'El monto de inversión debe ser mayor a 0' }
  }

  if (!bankRef) {
    return { error: 'El número de referencia bancaria es requerido' }
  }

  const { error } = await supabase
    .from('deposits')
    .insert({
      user_id: user.id,
      amount,
      currency: 'COP',
      status: 'PENDING',
      bank_ref: bankRef,
      plan_name: planName || null,
      notes: notes || null,
    })

  if (error) return { error: 'Error al crear la solicitud: ' + error.message }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=deposit')
}

// ── ADMIN: cambiar estado del depósito ──
export async function updateDepositStatusAction(
  depositId: string,
  status: 'REVIEWING' | 'APPROVED' | 'REJECTED'
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') return { error: 'No autorizado' }

  // Si se aprueba, sumar al balance del usuario
  if (status === 'APPROVED') {
    const { data: deposit } = await supabaseAdmin
      .from('deposits')
      .select('amount, user_id')
      .eq('id', depositId)
      .single()

    if (deposit) {
      const { data: userProfile } = await supabaseAdmin
        .from('profiles')
        .select('balance, total_invested')
        .eq('id', deposit.user_id)
        .single()

      await supabaseAdmin
        .from('profiles')
        .update({
          balance: (userProfile?.balance || 0) + deposit.amount,
        })
        .eq('id', deposit.user_id)

      // 3. Crear el registro de Investment
      const { data: depositWithPlan } = await supabaseAdmin
        .from('deposits')
        .select('plan_name, amount, user_id')
        .eq('id', depositId)
        .single()

      if (depositWithPlan?.plan_name) {
        // Encontrar datos del plan
        const planData = ALL_PLANS.find(p => p.name === depositWithPlan.plan_name)
        if (planData) {
          const startDate = new Date()
          const endDate = new Date()
          endDate.setDate(startDate.getDate() + planData.duration)

          await supabaseAdmin
            .from('investments')
            .insert({
              user_id: deposit.user_id,
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
    }
  }
  const { error } = await supabaseAdmin
    .from('deposits')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', depositId)

  if (error) return { error: 'Error al actualizar estado' }

  revalidatePath('/admin/deposits')
  return { success: true }
}

// ── ADMIN: editar balance manualmente ──
export async function updateUserBalanceAction(
  userId: string,
  balance: number,
  totalInvested: number,
  totalReturns: number
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'No autorizado' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'ADMIN') return { error: 'No autorizado' }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ 
      balance, 
      total_invested: totalInvested, 
      total_returns: totalReturns 
    })
    .eq('id', userId)

  if (error) return { error: 'Error al actualizar balance' }

  revalidatePath('/admin')
  return { success: true }
}
