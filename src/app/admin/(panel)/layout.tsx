import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/Nav";
import { prisma } from "@/lib/db";
import { readSession } from "@/lib/admin/session";

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession();
  if (!session) redirect("/admin/login");

  const [requests, messages] = await Promise.all([
    prisma.producerRequest.count({ where: { status: "new" } }),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return (
    <div className="ad-shell">
      <AdminNav counts={{ requests, messages }} />
      <div className="ad-main">{children}</div>
    </div>
  );
}
