"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/core/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/components/ui/dropdown-menu";
import { cn } from "@/core/utils/cn";
import { Check, ChevronDown, Globe } from "lucide-react";

export const LangSwitcher = ({ isScrolled }: { isScrolled: boolean }) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLocale = (nextLocale: "en" | "vi") => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "group flex items-center gap-2 px-3 h-10 transition-all duration-300",
            !isScrolled && "text-sand hover:bg-white/10 hover:text-white",
            isScrolled && "text-jet hover:bg-forest/5 hover:text-forest"
          )}
        >
          <Globe size={18} className="opacity-80" />
          <span className="font-serif font-bold tracking-widest text-xs uppercase">
            {locale}
          </span>
          <ChevronDown
            size={14}
            className="opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40 bg-white border-sand-light">
        <DropdownMenuItem
          onClick={() => changeLocale("vi")}
          className="cursor-pointer flex items-center justify-between font-medium text-jet hover:text-forest focus:text-forest focus:bg-sand-light/50"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">🇻🇳</span>
            <span>Tiếng Việt</span>
          </div>
          {locale === "vi" && <Check size={16} className="text-forest" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => changeLocale("en")}
          className="cursor-pointer flex items-center justify-between font-medium text-jet hover:text-forest focus:text-forest focus:bg-sand-light/50"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg leading-none">🇺🇸</span>
            <span>English</span>
          </div>
          {locale === "en" && <Check size={16} className="text-forest" />}
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};