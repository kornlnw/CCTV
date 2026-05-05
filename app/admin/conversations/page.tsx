import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ConversationsPage({ searchParams }: { searchParams: Promise<{ review?: string }> }) {
  const sp = await searchParams;
  const onlyReview = sp.review === "1";
  const convos = await prisma.conversation.findMany({
    where: onlyReview ? { needsReview: true } : {},
    include: { customer: true, messages: { orderBy: { createdAt: "desc" }, take: 1 } },
    orderBy: { lastMessageAt: "desc" },
    take: 50,
  });
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Conversations</h1>
      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left"><tr><th className="p-3">Customer</th><th className="p-3">Last message</th><th className="p-3">Flags</th><th className="p-3">Updated</th></tr></thead>
          <tbody>
            {convos.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.customer.displayName ?? c.customer.name ?? "—"}</td>
                <td className="p-3 truncate max-w-md text-gray-600">{c.messages[0]?.content ?? "—"}</td>
                <td className="p-3">
                  {c.aiPaused && <span className="mr-1 rounded bg-amber-100 px-2 py-0.5 text-xs text-amber-800">AI paused</span>}
                  {c.needsReview && <span className="rounded bg-red-100 px-2 py-0.5 text-xs text-red-800">Review</span>}
                </td>
                <td className="p-3 text-xs text-gray-500">{c.lastMessageAt.toLocaleString()}</td>
              </tr>
            ))}
            {convos.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-500">No conversations</td></tr>}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-gray-500">Per-conversation chat viewer + takeover coming next.</p>
    </div>
  );
}
