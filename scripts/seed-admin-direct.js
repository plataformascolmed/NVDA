require('dotenv').config();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");

// Con el motor 'library', el script encontrará la URL sola
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando siembra autónoma en Supabase...");
  
  try {
    const hashedPassword = await bcrypt.hash("Rootlinux145#", 12);
    
    const admin = await prisma.user.upsert({
      where: { email: "admin@nvdacapital.co" },
      update: {
        password: hashedPassword,
        role: "ADMIN",
      },
      create: {
        email: "admin@nvdacapital.co",
        name: "Director General NVDA",
        password: hashedPassword,
        role: "ADMIN",
        referralCode: "NVDA_ROOT_" + nanoid(6).toUpperCase(),
        balance: 0,
      },
    });

    console.log("✅ Administrador creado/actualizado correctamente:", admin.email);
  } catch (error) {
    console.error("❌ Error en la siembra:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
