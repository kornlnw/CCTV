"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function togglePromo(id: string) {
  const p = await prisma.promotion.findUnique({ where: { id } });
  if (!p) return;
  await prisma.promotion.update({ where: { id }, data: { active: !p.active } });
  revalidatePath("/admin/promotions");
}

export async function updatePromo(id: string, formData: FormData) {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const description = String(formData.get("description") ?? "").trim();
  const type = String(formData.get("type") ?? "FIXED") as "FIXED" | "PERCENT";
  const amount = Number(formData.get("amount") ?? 0);
  const minOrderAmount = Number(formData.get("minOrderAmount") ?? 0);
  const maxDiscountRaw = formData.get("maxDiscount");
  const usageLimitRaw = formData.get("usageLimit");
  const expiresAtRaw = formData.get("expiresAt");
  const active = formData.get("active") === "on";

  if (!code || !description || !amount) {
    throw new Error("Code, description, and amount are required");
  }

  await prisma.promotion.update({
    where: { id },
    data: {
      code,
      description,
      type,
      amount,
      minOrderAmount,
      maxDiscount: maxDiscountRaw ? Number(maxDiscountRaw) : null,
      usageLimit: usageLimitRaw ? Number(usageLimitRaw) : null,
      expiresAt: expiresAtRaw ? new Date(String(expiresAtRaw)) : null,
      active,
    },
  });
  revalidatePath("/admin/promotions");
  revalidatePath(`/admin/promotions/${id}`);
}

export async function deletePromo(id: string) {
  await prisma.promotion.delete({ where: { id } });
  revalidatePath("/admin/promotions");
}

export async function createPromo(formData: FormData) {
  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const description = String(formData.get("description") ?? "").trim();
  const type = String(formData.get("type") ?? "FIXED") as "FIXED" | "PERCENT";
  const amount = Number(formData.get("amount") ?? 0);
  const minOrderAmount = Number(formData.get("minOrderAmount") ?? 0);
  const maxDiscountRaw = formData.get("maxDiscount");
  const usageLimitRaw = formData.get("usageLimit");
  const expiresAtRaw = formData.get("expiresAt");

  if (!code || !description || !amount) {
    throw new Error("Code, description, and amount are required");
  }

  await prisma.promotion.create({
    data: {
      code,
      description,
      type,
      amount,
      minOrderAmount,
      maxDiscount: maxDiscountRaw ? Number(maxDiscountRaw) : null,
      usageLimit: usageLimitRaw ? Number(usageLimitRaw) : null,
      expiresAt: expiresAtRaw ? new Date(String(expiresAtRaw)) : null,
      active: true,
    },
  });
  revalidatePath("/admin/promotions");
}
