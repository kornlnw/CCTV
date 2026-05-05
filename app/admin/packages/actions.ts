"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9ก-๙]+/g, "-").replace(/^-+|-+$/g, "");
}

function parse(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const cameraCount = Number(formData.get("cameraCount") ?? 0);
  const recommendedFor = String(formData.get("recommendedFor") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const installationFee = Number(formData.get("installationFee") ?? 0);
  const featuresRaw = String(formData.get("features") ?? "");
  const features = featuresRaw.split("\n").map((s) => s.trim()).filter(Boolean);
  const active = formData.get("active") === "on";
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  if (!name || !description) throw new Error("Name and description are required");
  return {
    name,
    slug: slugInput || slugify(name) || `pkg-${Date.now()}`,
    description,
    cameraCount,
    recommendedFor,
    price,
    installationFee,
    features,
    imageUrl,
    active,
  };
}

export async function createPackage(formData: FormData) {
  await prisma.installPackage.create({ data: parse(formData) });
  revalidatePath("/admin/packages");
}

export async function updatePackage(id: string, formData: FormData) {
  await prisma.installPackage.update({ where: { id }, data: parse(formData) });
  revalidatePath("/admin/packages");
  revalidatePath(`/admin/packages/${id}`);
}

export async function deletePackage(id: string) {
  await prisma.installPackage.delete({ where: { id } });
  revalidatePath("/admin/packages");
}

export async function togglePackage(id: string) {
  const pkg = await prisma.installPackage.findUnique({ where: { id } });
  if (!pkg) return;
  await prisma.installPackage.update({ where: { id }, data: { active: !pkg.active } });
  revalidatePath("/admin/packages");
}
