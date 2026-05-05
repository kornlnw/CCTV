import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 h-full w-56 border-r bg-white p-4">
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
      </aside>
      <main className="ml-56 p-6">{children}</main>
    </div>
  );
}
