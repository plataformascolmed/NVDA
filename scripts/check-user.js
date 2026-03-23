require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkUser() {
  const email = 'admin@nvdacapital.co';
  console.log(`🔎 Buscando email: ${email}...`);

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email);

    if (error) throw error;

    if (data && data.length > 0) {
      console.log("✅ ¡USUARIO ENCONTRADO!");
      console.table(data);
    } else {
      console.log("❌ Usuario NO encontrado en la tabla profiles.");
      console.log("Sugerencia: Revisa los logs de Auth o intenta registrarte de nuevo.");
    }
  } catch (err) {
    console.error("❌ Error al consultar:", err.message);
  }
}

checkUser();
