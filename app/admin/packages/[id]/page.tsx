import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePackage, deletePackage } from "../actions";
import { PackageForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await prisma.installPackage.findUnique({ where: { id } });
  if (!pkg) notFound();

  async function save(formData: FormData) {
    "use server";
    await updatePackage(id, formData);
    redirect("/admin/packages");
  }
  async function remove() {
    "use server";
    await deletePackage(id);
    redirect("/admin/packages");
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit package</h1>
        <Link href="/admin/packages" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>
      <PackageForm action={save} pkg={pkg} submitLabel="Save changes" />
      <form action={remove} className="mt-6">
        <button className="text-sm text-red-600 hover:underline">Delete this package</button>
      </form>
    </div>
  );
}
