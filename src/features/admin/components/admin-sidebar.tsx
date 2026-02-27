"use client";

import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/core/utils/cn";
import { LayoutDashboard, Map, Users, Settings, LogOut, FileText } from "lucide-react";
import { authService } from "@/features/auth/services/auth-service";
import { useRouter } from "next/navigation";

export const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    authService.logout();
    router.push("/auth");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Map, label: "Tours Management", href: "/admin/tours" },
    { icon: FileText, label: "Bookings", href: "/admin/bookings" },
    { icon: Users, label: "Customers", href: "/admin/users" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <aside className="w-64 bg-forest text-sand min-h-screen flex flex-col fixed left-0 top-0 bottom-0 shadow-xl z-50">
      
      {/* 1. BRAND LOGO */}
      <div className="h-20 flex items-center px-8 border-b border-sand/10">
        <span className="font-serif text-xl font-bold uppercase tracking-wider">
          Random Admin
        </span>
      </div>

      {/* 2. MENU ITEMS */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group",
                isActive 
                  ? "bg-terracotta text-white shadow-md" 
                  : "hover:bg-sand/10 text-sand/70 hover:text-sand"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. USER & LOGOUT */}
      <div className="p-4 border-t border-sand/10 bg-black/20">
        <div className="flex items-center gap-3 mb-4 px-2">
           <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center font-bold text-terracotta">
             AD
           </div>
           <div>
             <p className="text-sm font-bold">Administrator</p>
             <p className="text-xs text-sand/50">admin@random.com</p>
           </div>
        </div>
        <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-900/50 hover:bg-red-700 text-red-100 py-2 rounded-md transition-colors text-sm font-bold"
        >
            <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};