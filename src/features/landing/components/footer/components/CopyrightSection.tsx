import { cn } from "@/core/utils/cn";
import Link from "next/link";

interface CopyrightSectionProps {
  className?: string;
}

export const CopyrightSection = ({ className }: CopyrightSectionProps) => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
    { href: "/accessibility", label: "Accessibility" },
  ];

  return (
    <div className={cn(
      "pt-8 border-t border-sand/10",
      "flex flex-col md:flex-row items-center justify-between",
      "gap-4 text-sm text-sand/40",
      className
    )}>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <p>© {currentYear} Random Tailored Tours. All rights reserved.</p>
        <div className="hidden sm:block h-4 w-px bg-sand/10" />
        <p className="flex items-center gap-1">
          Made with
          <span className="text-terracotta animate-pulse">♥</span>
          in Vietnam
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {legalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-terracotta transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-terracotta" />
          <span className="text-sand/60">EN</span>
        </div>
      </div>
    </div>
  );
};