// components/Header/index.tsx - Cập nhật
"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/core/utils/cn";
import { Menu, Search } from "lucide-react";

import { Logo } from "./components/Logo";
import { DesktopNav } from "./components/DesktopNav";
import { MobileMenu } from "./components/MobileMenu";
import { DesktopActions } from "./components/DesktopActions";
import { HeaderProps, NavItem } from "./types";
import { useScrollEffect } from "./hooks/useScrollEffect";
import { useMobileMenu } from "./hooks/useMobileMenu";
import { useState, useEffect } from "react";
import { Button } from "@/core/components/ui/button";
import { IPadNav } from "./components/IPadNav";

export const Header = ({ className }: HeaderProps) => {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useMobileMenu();
  const isScrolled = useScrollEffect(20);

  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setDeviceType('mobile');
      } else if (width >= 768 && width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const navItems: NavItem[] = [
    { label: t("home"), href: "/" },
    { label: t("tours"), href: "/tours" },
    { label: t("about"), href: "/about" },
    { label: t("journal"), href: "/journal" },
  ];

  const isTablet = deviceType === 'tablet';

  return (
    <>
      {/* --- MAIN HEADER --- */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] border-b transition-all duration-300",
          "bg-sand text-jet",
          isScrolled
            ? "py-3 shadow-lg border-jet/10"
            : "py-4 border-transparent",
          isTablet && "py-3",
          className
        )}
      >
        <div className={cn(
          "container mx-auto px-4 flex items-center justify-between",
          isTablet ? "max-w-3xl" : ""
        )}>
          <Logo className={cn(
            isTablet ? "scale-90" : "",
            "transition-transform duration-300"
          )} />

          {deviceType === 'desktop' && (
            <>
              <DesktopNav navItems={navItems} pathname={pathname} />
              <DesktopActions bookNowText={t("book_now")} />
            </>
          )}

          {isTablet && (
            <div className="flex-1 flex items-center justify-between ml-8">
              <IPadNav
                navItems={navItems}
                pathname={pathname}
                bookNowText={t("book_now")}
              />

              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="rounded-full bg-jet text-sand hover:bg-terracotta px-4 py-2 text-xs"
                >
                  {t("book_now")}
                </Button>
              </div>
            </div>
          )}

          {deviceType === 'mobile' && (
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-jet hover:text-terracotta transition-colors"
              aria-label="Open menu"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </header>

      {deviceType === 'mobile' && (
        <MobileMenu
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navItems={navItems}
          pathname={pathname}
        />
      )}
    </>
  );
};