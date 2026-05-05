import Link from "next/link";
import { headers } from "next/headers";
import { logout } from "./logout-action";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const pathname = h.get("x-pathname") ?? "";

  // Login page renders without the admin chrome.
  if (pathname.startsWith("/admin/login")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 flex h-full w-56 flex-col border-r bg-white p-4">
        <div className="mb-6 text-lg font-semibold">CCTV Admin</div>
        <nav className="flex flex-col gap-1 text-sm">
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin">Overview</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/orders">Orders</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/appointments">Appointments</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/conversations">Conversations</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/products">Products</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/packages">Packages</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/promotions">Promotions</Link>
          <Link className="rounded px-3 py-2 hover:bg-gray-100" href="/admin/analytics">Analytics</Link>
        </nav>
        <form action={logout} className="mt-auto pt-4 border-t">
          <button className="w-full rounded px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">Sign out</button>
        </form>
      </aside>
      <main className="ml-56 p-6">{children}</main>
    </div>
  );
}
