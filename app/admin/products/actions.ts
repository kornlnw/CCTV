"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9ก-๙]+/g, "-").replace(/^-+|-+$/g, "");
}

function parseFormData(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price") ?? 0);
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const resolution = String(formData.get("resolution") ?? "").trim();
  const featuresRaw = String(formData.get("features") ?? "");
  const features = featuresRaw.split("\n").map((s) => s.trim()).filter(Boolean);
  const stock = Number(formData.get("stock") ?? 0);
  const featured = formData.get("featured") === "on";
  const categoryId = String(formData.get("categoryId") ?? "").trim();
  if (!name || !description || !price || !categoryId) {
    throw new Error("Name, description, price and category are required");
  }
  return {
    name,
    slug: slugInput || slugify(name),
    description,
    price,
    imageUrl: imageUrl || "https://via.placeholder.com/400",
    resolution,
    features,
    stock,
    featured,
    categoryId,
  };
}

export async function createProduct(formData: FormData) {
  await prisma.product.create({ data: parseFormData(formData) });
  revalidatePath("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  await prisma.product.update({ where: { id }, data: parseFormData(formData) });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}

export async function createCategory(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;
  await prisma.category.create({
    data: { name, slug: slugify(name) || `cat-${Date.now()}` },
  });
  revalidatePath("/admin/products");
}
