import Link from "next/link";
import { redirect } from "next/navigation";
import { createPackage } from "../actions";
import { PackageForm } from "../_form";

export const dynamic = "force-dynamic";

export default async function NewPackagePage() {
  async function action(formData: FormData) {
    "use server";
    await createPackage(formData);
    redirect("/admin/packages");
  }
  return (
    <div className="max-w-3xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">New install package</h1>
        <Link href="/admin/packages" className="text-sm text-blue-600 hover:underline">← Back</Link>
      </div>
      <PackageForm action={action} submitLabel="Create package" />
    </div>
  );
}
