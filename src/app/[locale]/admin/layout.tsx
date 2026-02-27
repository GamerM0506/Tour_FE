import { AdminSidebar } from "@/features/admin/components/admin-sidebar";

export const metadata = {
  title: "Admin Dashboard | Random Tailored Tours",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sand-light flex">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar />

      {/* Nội dung bên phải (đẩy sang phải 64 = 256px để không bị Sidebar che) */}
      <main className="flex-1 ml-64 p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}