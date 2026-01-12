import { cn } from "@/core/utils/cn";
import { Link } from "@/i18n/routing";
import { NavItem as NavItemType } from "../types";
import { ArrowRight } from "lucide-react";
interface NavItemProps {
    item: NavItemType;
    isActive: boolean;
    className?: string;
    variant?: "desktop" | "mobile";
    onClick?: () => void;
}

export const NavItem = ({
    item,
    isActive,
    className,
    variant = "desktop",
    onClick
}: NavItemProps) => {
    const linkProps = {
        href: item.href,
        className: variant === "mobile"
            ? cn("group flex items-center justify-between border-b border-jet/10 pb-4", className)
            : cn(
                "text-sm font-bold tracking-wide uppercase hover:text-terracotta transition-colors relative group",
                isActive ? "text-terracotta" : "text-jet",
                className
            ),
        onClick: onClick
    };

    if (variant === "mobile") {
        return (
            <Link {...linkProps}>
                <span className={cn(
                    "font-serif text-4xl font-medium transition-colors",
                    isActive ? "text-terracotta" : "text-jet group-hover:text-terracotta"
                )}>
                    {item.label}
                </span>
                <ArrowRight className="text-terracotta opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
        );
    }

    return (
        <Link {...linkProps}>
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
        </Link>
    );
};