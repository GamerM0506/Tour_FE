"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/utils/cn";

export const LangSwitcher = ({ isScrolled }: { isScrolled: boolean }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="ghost"
      onClick={toggleLanguage}
      className={cn(
        "font-serif font-bold tracking-widest text-xs transition-colors hover:bg-transparent",
        isScrolled
          ? "text-jet hover:text-terracotta"
          : "text-sand hover:text-terracotta"
      )}
    >
      {locale === "vi" ? "VN" : "EN"}
      <span className="mx-1 opacity-50">|</span>
      <span className="opacity-50">{locale === "vi" ? "EN" : "VN"}</span>
    </Button>
  );
};