require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Necesitamos tu Service Role Key para esto.
// Si no la tienes aún, usa la anon por ahora pero fallará si no es admin.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Asegúrate de tener esta clave en .env.local
);

async function createAdmin() {
  const email = 'admin@nvdacapital.co';
  const password = 'AdminNVDA2026#'; // Contraseña definitiva

  console.log(`🚀 Forzando creación de admin: ${email}...`);

  // 1. Crear el usuario en Auth (con email confirmado)
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: 'Super Admin NVDA' }
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log("⚠️ El usuario ya existe. Reseteando contraseña...");
      const { error: resetError } = await supabaseAdmin.auth.admin.updateUserById(
        (await supabaseAdmin.auth.admin.listUsers()).data.users.find(u => u.email === email).id,
        { password: password, email_confirm: true }
      );
      if (resetError) return console.error("❌ Error al resetear:", resetError.message);
      console.log("✅ Contraseña reseteada con éxito.");
    } else {
      return console.error("❌ Error fatal:", error.message);
    }
  } else {
    console.log("✅ Usuario Admin creado con éxito en Auth.");
  }

  // 2. Darle el rango de ADMIN en Profiles usando su ID único
  const userId = data?.user?.id || (await supabaseAdmin.auth.admin.listUsers()).data.users.find(u => u.email === email).id;
  
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({ 
       id: userId,
       email: email, 
       role: 'ADMIN', 
       balance: 5000000, 
       total_invested: 2000000,
       total_returns: 0
    });

  if (profileError) console.error("❌ Error en perfil:", profileError.message);
  else console.log("🏆 Perfil de ADMIN ACTIVADO. ¡Entra YA!");
}

createAdmin();
