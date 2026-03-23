require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function forceAdminFinal() {
  const email = 'admin@nvdacapital.co';
  const password = 'NVDA_Capital_2026';

  console.log(`🚀 Sincronizando Perfil de Super Admin para: ${email}...`);

  // 1. Obtener el ID del usuario de la tabla de Auth
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  if (listError) return console.error("❌ Error al listar usuarios:", listError.message);

  const targetUser = users.find(u => u.email === email);

  if (!targetUser) {
    console.log("⚠️ El usuario no existe en Auth. Creándolo rápidamente...");
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    });
    if (createError) return console.error("❌ Error al crear:", createError.message);
    var userId = newUser.user.id;
  } else {
    console.log("✅ Usuario encontrado en Auth. ID:", targetUser.id);
    var userId = targetUser.id;
    // Forzamos reseteo de clave por si acaso
    await supabaseAdmin.auth.admin.updateUserById(userId, { password, email_confirm: true });
  }

  // 2. Insertar/Actualizar en Profiles con el ID de Auth
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({ 
       id: userId,
       email: email, 
       role: 'ADMIN', 
       balance: 10000000, // Bono de bienvenida para el admin
       total_invested: 2500000,
       total_returns: 0
    });

  if (profileError) {
    console.error("❌ Error en perfil:", profileError.message);
    console.log("💡 Intentando inserción directa sin upsert...");
    await supabaseAdmin.from('profiles').insert({ id: userId, email, role: 'ADMIN' });
  }
  
  console.log("🏆 PERFIL DE ADMIN ACTIVADO CON ÉXITO.");
  console.log("------------------------------------------");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);
  console.log("🚀 REDIRECCIÓN RECOMENDADA: http://localhost:3000/dashboard");
  console.log("------------------------------------------");
}

forceAdminFinal();
