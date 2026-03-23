require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

async function seedAdmin() {
  console.log("🚀 Iniciando creación de administrador en Supabase...");

  try {
    const adminEmail = 'admin@nvdacapital.co';
    const adminPassword = 'Rootlinux145#';

    // 1. Crear usuario en AUTH
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { name: 'Director General NVDA' }
    });

    if (authError && !authError.message.includes('already registered')) {
      throw authError;
    }

    const userId = authData?.user?.id;
    if (!userId) {
       // Buscar ID si ya existía
       const { data: listData } = await supabase.auth.admin.listUsers();
       const existingUser = listData.users.find(u => u.email === adminEmail);
       if (!existingUser) throw new Error("No se pudo obtener el ID del usuario");
       userId = existingUser.id;
    }

    // 2. Crear/Actualizar en la tabla PROFILES
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        name: 'Director General NVDA',
        email: adminEmail,
        role: 'ADMIN',
        referral_code: 'NVDA_ROOT_MASTER',
        balance: 0,
        total_invested: 0,
        total_returns: 0
      })
      .select();

    if (profileError) throw profileError;

    console.log("✅ Administrador creado con éxito en Auth y DB!");
    console.log("📧 Email:", adminEmail);
    console.log("🔑 Password:", adminPassword);

  } catch (error) {
    console.error("❌ Error en la siembra:", error.message);
  }
}

seedAdmin();
