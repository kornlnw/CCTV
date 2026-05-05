import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePackage, togglePackage } from "./actions";

export const dynamic = "force-dynamic";

export default async function PackagesPage() {
  const packages = await prisma.installPackage.findMany({ orderBy: { price: "asc" } });
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Install packages</h1>
        <Link href="/admin/packages/new" className="rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">+ New package</Link>
      </div>
      <p className="mb-4 text-sm text-gray-600">
        Bundles of cameras + NVR + installation. The AI prefers recommending these when a customer's situation matches the <i>Recommended for</i> field.
      </p>
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3"></th><th className="p-3">Name</th><th className="p-3">For</th><th className="p-3">Cameras</th>
              <th className="p-3">Price</th><th className="p-3">Install fee</th>
              <th className="p-3">Status</th><th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  {p.imageUrl ? <img src={p.imageUrl} alt="" className="h-12 w-16 rounded object-cover" /> : <div className="h-12 w-16 rounded bg-gray-100" />}
                </td>
                <td className="p-3"><Link href={`/admin/packages/${p.id}`} className="font-medium text-blue-600 hover:underline">{p.name}</Link><div className="text-xs text-gray-500 max-w-md">{p.description}</div></td>
                <td className="p-3 text-xs">{p.recommendedFor}</td>
                <td className="p-3">{p.cameraCount}</td>
                <td className="p-3">{Number(p.price).toLocaleString()}฿</td>
                <td className="p-3">{Number(p.installationFee).toLocaleString()}฿</td>
                <td className="p-3">
                  <span className={`rounded px-2 py-1 text-xs ${p.active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>
                    {p.active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link href={`/admin/packages/${p.id}`} className="text-blue-600 hover:underline">Edit</Link>
                    <form action={togglePackage.bind(null, p.id)}>
                      <button className="text-gray-700 hover:underline">{p.active ? "Disable" : "Enable"}</button>
                    </form>
                    <form action={deletePackage.bind(null, p.id)}>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {packages.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-gray-500">No packages yet — click "+ New package" or run <code>npm run db:seed</code>.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
