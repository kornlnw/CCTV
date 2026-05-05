import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createProduct } from "../actions";
import { ProductForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  async function action(formData: FormData) {
    "use server";
    await createProduct(formData);
    redirect("/admin/products");
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New product</h1>
        <Link href="/admin/products" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>
      {categories.length === 0 ? (
        <div className="rounded border bg-amber-50 p-4 text-sm text-amber-800">
          Add at least one category first on the <Link href="/admin/products" className="underline">products page</Link>.
        </div>
      ) : (
        <ProductForm action={action} categories={categories} submitLabel="Create product" />
      )}
    </div>
  );
}
