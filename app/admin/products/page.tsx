import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createCategory, deleteProduct } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProductsAdmin() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link href="/admin/products/new" className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">+ New product</Link>
      </div>

      <details className="mb-4 rounded-lg border bg-white">
        <summary className="cursor-pointer px-4 py-2 text-sm">Categories ({categories.length})</summary>
        <div className="border-t p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c.id} className="rounded-full bg-gray-100 px-3 py-1 text-xs">{c.name}</span>
            ))}
            {categories.length === 0 && <span className="text-sm text-gray-500">No categories yet.</span>}
          </div>
          <form action={createCategory} className="flex gap-2">
            <input name="name" required placeholder="Category name" className="flex-1 rounded border px-3 py-2 text-sm" />
            <button className="rounded bg-gray-900 px-4 py-2 text-sm text-white">Add</button>
          </form>
        </div>
      </details>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr><th className="p-3"></th><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3">Featured</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  {p.imageUrl ? <img src={p.imageUrl} alt="" className="h-12 w-12 rounded object-cover" /> : null}
                </td>
                <td className="p-3"><Link href={`/admin/products/${p.id}`} className="font-medium text-blue-600 hover:underline">{p.name}</Link><div className="text-xs text-gray-500">{p.resolution}</div></td>
                <td className="p-3">{p.category.name}</td>
                <td className="p-3">{Number(p.price).toLocaleString()}฿</td>
                <td className="p-3"><span className={`rounded px-2 py-1 text-xs ${p.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>{p.stock}</span></td>
                <td className="p-3">{p.featured ? "★" : ""}</td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/products/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-gray-500">No products yet. Click "+ New product" or run <code>npm run db:seed</code>.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
