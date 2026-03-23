"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function registerUser(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const referralCode = formData.get("referralCode") as string;
    const terms = formData.get("terms") as string;

    if (!name || !email || !password || !confirmPassword) {
      return { error: "Todos los campos son requeridos" };
    }

    if (password !== confirmPassword) {
      return { error: "Las contraseñas no coinciden" };
    }

    if (!terms) {
      return { error: "Debes aceptar los términos y condiciones" };
    }

    // Check if email exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "El correo electrónico ya está registrado" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate unique referral code
    const userReferralCode = nanoid(8).toUpperCase();

    // Check if referred by someone
    let referredBy = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referredBy = referrer.referralCode;
      } else {
        return { error: "El código de referido no es válido" };
      }
    }

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        referralCode: userReferralCode,
        referredBy,
      },
    });

    // Auto-login
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Error al iniciar sesión automáticamente" };
    }
    console.error("Registration error:", error);
    return { error: "Ocurrió un error inesperado durante el registro" };
  }
}

export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales inválidas";
        default:
          return "Algo salió mal al intentar iniciar sesión";
      }
    }
    throw error;
  }
}

export async function createDeposit(userId: string, formData: FormData) {
  try {
    const amount = parseFloat(formData.get("amount") as string);
    const bankRef = formData.get("bankRef") as string;
    const notes = formData.get("notes") as string;
    // const receiptUrl = formData.get("receipt") as File; // In production this would be handled by an upload service

    if (isNaN(amount) || amount <= 0) {
      return { error: "El monto debe ser un número positivo" };
    }

    await prisma.deposit.create({
      data: {
        userId,
        amount,
        bankRef,
        notes,
        status: "PENDING",
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/deposits");
    return { success: true };
  } catch (error) {
    console.error("Deposit creation error:", error);
    return { error: "Error al registrar el depósito" };
  }
}

export async function updateDepositStatus(depositId: string, status: "APPROVED" | "REJECTED" | "REVIEWING") {
  try {
    const deposit = await prisma.deposit.findUnique({
      where: { id: depositId },
      include: { user: true },
    });

    if (!deposit) return { error: "Depósito no encontrado" };

    const oldStatus = deposit.status;

    // Update status
    await prisma.deposit.update({
      where: { id: depositId },
      data: { status },
    });

    // If approved and was not approved before, update user balances
    if (status === "APPROVED" && oldStatus !== "APPROVED") {
      await prisma.user.update({
        where: { id: deposit.userId },
        data: {
          balance: { increment: deposit.amount },
          totalInvested: { increment: deposit.amount },
        },
      });
    }

    revalidatePath("/dashboard");
    revalidatePath("/admin/deposits");
    return { success: true };
  } catch (error) {
    console.error("Deposit update error:", error);
    return { error: "Error al actualizar el estado del depósito" };
  }
}

export async function updateUserBalance(userId: string, data: { balance?: number; totalInvested?: number; totalReturns?: number }) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data,
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Error al actualizar el usuario" };
  }
}
