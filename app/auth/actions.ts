'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// ── REGISTRO ──
export async function registerAction(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string
  const referredBy = formData.get('referredBy') as string

  if (!name || !email || !password) {
    return { error: 'Todos los campos son obligatorios' }
  }

  if (password !== confirmPassword) {
    return { error: 'Las contraseñas no coinciden' }
  }

  if (password.length < 8) {
    return { error: 'La contraseña debe tener mínimo 8 caracteres' }
  }

  // Si viene código de referido, validar que existe
  if (referredBy) {
    const { data: referrer } = await supabase
      .from('profiles')
      .select('id')
      .eq('referral_code', referredBy.toUpperCase())
      .single()

    if (!referrer) {
      return { error: 'Código de referido inválido' }
    }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        referred_by: referredBy?.toUpperCase() || null
      }
    }
  })

  if (error) {
    if (error.message.includes('already registered')) {
      return { error: 'Este email ya está registrado' }
    }
    return { error: error.message }
  }

  redirect('/dashboard')
}

// ── LOGIN ──
export async function loginAction(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email y contraseña son requeridos' }
  }

  console.log("🔐 Intentando login para:", email);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("❌ Error de Auth:", error.message);
    return { error: 'Credenciales inválidas. Verifica tu email y contraseña.' }
  }

  console.log("✅ Inicio de sesión exitoso. Usuario:", data.user.id);
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

// ── LOGOUT ──
export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}
