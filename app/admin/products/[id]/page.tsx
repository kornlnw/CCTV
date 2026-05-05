import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct, deleteProduct } from "../actions";
import { ProductForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!product) notFound();

  async function save(formData: FormData) {
    "use server";
    await updateProduct(id, formData);
    redirect("/admin/products");
  }

  async function remove() {
    "use server";
    await deleteProduct(id);
    redirect("/admin/products");
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit product</h1>
        <Link href="/admin/products" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>
      <ProductForm action={save} product={product} categories={categories} submitLabel="Save changes" />
      <form action={remove} className="mt-6">
        <button className="text-sm text-red-600 hover:underline">Delete this product</button>
      </form>
    </div>
  );
}
