import { DesktopNavProps } from "../types";
import { Compass, MapPin, Users, BookOpen } from "lucide-react";
import { cn } from "@/core/utils/cn";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const iconMap = {
    home: Compass,
    tours: MapPin,
    about: Users,
    journal: BookOpen,
};

export const DesktopNav = ({ navItems, pathname }: DesktopNavProps) => {
    const t = useTranslations("Navigation");

    return (
        <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
                const iconKey = item.key as keyof typeof iconMap;
                const Icon = iconMap[iconKey];
                const isActive = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "group flex items-center gap-3 px-1 py-2",
                            "transition-all duration-300",
                            isActive
                                ? "text-terracotta"
                                : "text-jet hover:text-terracotta"
                        )}
                    >
                        <div className={cn(
                            "relative transition-all duration-300",
                            "group-hover:scale-110"
                        )}>
                            <Icon
                                size={18}
                                strokeWidth={isActive ? 2.5 : 2}
                                className={cn(
                                    "transition-colors duration-300",
                                    isActive
                                        ? "text-terracotta"
                                        : "text-jet/70 group-hover:text-terracotta"
                                )}
                            />
                        </div>

                        <span className="text-sm font-bold tracking-wide uppercase relative">
                            {t(item.key)}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta",
                                "transition-all duration-300",
                                isActive ? "w-full" : "group-hover:w-full"
                            )} />
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
};