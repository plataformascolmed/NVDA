require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function forceAdminTotal() {
  const email = 'admin@nvdacapital.co';
  const password = 'NVDA_Capital_2026';
  const name = 'Admin NVDA Capital';

  console.log(`🚀 Sincronizando Perfil DEFINITIVO para: ${email}...`);

  const { data: { users } } = await supabaseAdmin.auth.admin.listUsers();
  const userId = users.find(u => u.email === email).id;

  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .upsert({ 
       id: userId,
       email: email, 
       name: name, // ¡AQUÍ ESTÁ LA CLAVE!
       role: 'ADMIN', 
       balance: 10000000, 
       total_invested: 5000000,
       total_returns: 0,
       referral_code: 'NVDA_SUPER_ADMIN'
    });

  if (profileError) {
    console.error("❌ Error en perfil:", profileError.message);
    return;
  }
  
  console.log("🏆 PERFIL DE ADMIN TOTALMENTE ACTIVADO.");
  console.log("------------------------------------------");
  console.log("📧 Email:", email);
  console.log("🔑 Password:", password);
  console.log("🚀 URL: http://localhost:3000/dashboard");
  console.log("------------------------------------------");
}

forceAdminTotal();
