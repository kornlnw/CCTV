import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { signSession, checkPassword, adminCookieName } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const sp = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const password = String(formData.get("password") ?? "");
    if (!checkPassword(password)) {
      const next = String(formData.get("next") ?? "/admin");
      redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
    }
    const token = signSession();
    const c = await cookies();
    c.set(adminCookieName(), token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect(String(formData.get("next") ?? "/admin"));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form action={login} className="w-full max-w-sm rounded-lg border bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold">CCTV Admin</h1>
        <p className="mb-4 text-sm text-gray-500">Enter the admin password to continue.</p>
        <input type="hidden" name="next" value={sp.next ?? "/admin"} />
        <input
          name="password"
          type="password"
          required
          autoFocus
          placeholder="Password"
          className="w-full rounded border px-3 py-2 text-sm"
        />
        {sp.error && <div className="mt-2 text-xs text-red-600">Wrong password.</div>}
        <button className="mt-4 w-full rounded bg-black py-2 text-sm font-medium text-white hover:bg-gray-800">
          Sign in
        </button>
      </form>
    </div>
  );
}
