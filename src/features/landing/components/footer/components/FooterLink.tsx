import { Link } from "@/i18n/routing";
import { cn } from "@/core/utils/cn";
import { ChevronRight } from "lucide-react";

interface FooterLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export const FooterLink = ({ href, children, className }: FooterLinkProps) => (
    <li className="group">
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 text-sand/80 hover:text-terracotta",
                "transition-all duration-300 group-hover:translate-x-1",
                "py-1.5",
                className
            )}
        >
            <ChevronRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-terracotta" />
            <span className="font-medium">{children}</span>
        </Link>
    </li>
);