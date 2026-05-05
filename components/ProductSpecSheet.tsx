type Props = {
  highlight: string;
  details: string[];
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
};

function formatDate(d: Date | string | null | undefined) {
  if (!d) return null;
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return null;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}

export function ProductSpecSheet({
  highlight,
  details,
  createdAt,
  updatedAt,
}: Props) {
  const created = formatDate(createdAt);
  const updated = formatDate(updatedAt);

  return (
    <section className="container-x py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
          <span className="border-b-2 border-slate-900 pb-1">รายละเอียดสินค้า</span>
        </h2>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          <Row label="ไฮไลท์">
            <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
              {highlight}
            </p>
          </Row>

          {(created || updated) && (
            <Row label="ข้อมูล">
              <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2 sm:gap-8">
                {created && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500">ลงสินค้า :</span>
                    <span className="font-medium">{created}</span>
                  </div>
                )}
                {updated && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-slate-500">อัพเดทล่าสุด :</span>
                    <span className="font-medium">{updated}</span>
                  </div>
                )}
              </div>
            </Row>
          )}

          <Row label="รายละเอียดสินค้า">
            <ul className="space-y-1.5 text-sm leading-relaxed text-slate-700 sm:text-base">
              {details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Row>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 py-6 sm:grid-cols-[160px_1fr] sm:gap-8 md:grid-cols-[200px_1fr]">
      <div className="text-sm font-bold text-slate-900 sm:text-base">{label}</div>
      <div>{children}</div>
    </div>
  );
}
