import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

export async function GET() {
  const email = "admin@nvdacapital.co";
  const password = "Rootlinux";
  
  try {
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

    return NextResponse.json({
      message: "✅ Administrador creado/actualizado correctamente",
      email: admin.email,
      role: admin.role,
      info: "Ahora puedes iniciar sesión con estas credenciales."
    });
  } catch (error: any) {
    return NextResponse.json({
      error: "Error al crear el admin",
      details: error.message
    }, { status: 500 });
  }
}
