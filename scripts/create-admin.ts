import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@nvdacapital.co";
  const password = "Rootlinux";
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  
  // Referral code for admin
  const referralCode = "ADMIN-MASTER-" + nanoid(4).toUpperCase();

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      email,
      name: "Administrador General",
      password: hashedPassword,
      role: "ADMIN",
      referralCode,
    },
  });

  console.log("✅ Administrador creado/actualizado correctamente:");
  console.log(`📧 Email: ${admin.email}`);
  console.log(`🔑 Contraseña: ${password}`);
  console.log(`👤 Rol: ${admin.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
