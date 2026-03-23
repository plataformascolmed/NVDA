require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function inspectProfiles() {
  console.log("🔍 INSPECCIONANDO TABLA 'profiles'...");
  const { data, error } = await supabaseAdmin.from('profiles').select('*');
  
  if (error) console.error("❌ Error de lectura:", error.message);
  else {
    console.log(`📊 Se encontraron ${data.length} perfiles.`);
    data.forEach(p => {
      console.log(`👤 [${p.id}] | ${p.email} | ROL: ${p.role} | BAL: ${p.balance} | NAME: ${p.name}`);
    });
  }
}

inspectProfiles();
