import { cn } from "@/core/utils/cn";
import { Link } from "@/i18n/routing";
import { NavItem as NavItemType } from "../types";
import { Compass, MapPin, Users, BookOpen } from "lucide-react";
import { LangSwitcher } from "../lang-switcher";
import { useTranslations } from "next-intl";

interface IPadNavProps {
  navItems: NavItemType[];
  pathname: string;
  bookNowText: string;
  className?: string;
}

const iconMap = {
  home: Compass,
  tours: MapPin,
  about: Users,
  journal: BookOpen,
};

export const IPadNav = ({
  navItems,
  pathname,
  className
}: IPadNavProps) => {
  const t = useTranslations("Navigation");

  return (
    <div className={cn(
      "hidden md:flex lg:hidden items-center flex-1",
      className
    )}>
      <nav className="flex items-center justify-center gap-3 mx-auto">
        {navItems.map((item) => {
          const Icon = iconMap[item.key];

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-2xl",
                "transition-all duration-300 group min-w-[80px]",
                pathname === item.href
                  ? "bg-terracotta/10 text-terracotta"
                  : "text-jet hover:bg-jet/5 hover:text-terracotta"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                "transition-all duration-300 group-hover:scale-110",
                pathname === item.href
                  ? "bg-terracotta text-sand"
                  : "bg-jet/5 group-hover:bg-terracotta/20"
              )}>
                {Icon && <Icon size={22} strokeWidth={1.5} />}
              </div>
              <span className="text-xs font-bold tracking-wide uppercase whitespace-nowrap">
                {t(item.key)}
              </span>
            </Link>
          );
        })}
      </nav>
      <LangSwitcher isScrolled />
    </div>
  );
};