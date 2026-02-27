import { cn } from "@/core/utils/cn";
import { FooterLink } from "./FooterLink";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExploreColumnProps {
  className?: string;
}

export const ExploreColumn = ({ className }: ExploreColumnProps) => {
  const tNav = useTranslations("Navigation"); // Dùng lại key của Nav chính
  const tFooter = useTranslations("Footer.explore"); // Key riêng của footer

  const exploreLinks = [
    { href: "/tours", label: tNav("tours") },
    { href: "/destinations", label: tFooter("links.destinations") },
    { href: "/experiences", label: tFooter("links.experiences") },
    { href: "/about", label: tNav("about") },
    { href: "/journal", label: tNav("journal") },
    { href: "/guides", label: tFooter("links.guides") },
  ];

  const companyLinks = [
    { href: "/about", label: tFooter("links.story") },
    { href: "/team", label: tFooter("links.team") },
    { href: "/partners", label: tFooter("links.partners") },
    { href: "/careers", label: tFooter("links.careers") },
    { href: "/press", label: tFooter("links.press") },
    { href: "/contact", label: tFooter("links.contact") },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-8", className)}>
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Compass className="text-terracotta" size={18} />
          <h4 className="font-bold uppercase tracking-widest text-sm text-terracotta">
            {tFooter("title")}
          </h4>
        </div>
        <ul className="space-y-3">
          {exploreLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 rounded-full bg-sand/10 flex items-center justify-center">
            <span className="text-terracotta text-xs font-bold">RT</span>
          </div>
          <h4 className="font-bold uppercase tracking-widest text-sm text-terracotta">
            {tFooter("company_title")}
          </h4>
        </div>
        <ul className="space-y-3">
          {companyLinks.map((link) => (
            <FooterLink key={link.href} href={link.href}>
              {link.label}
            </FooterLink>
          ))}
        </ul>
      </div>
    </div>
  );
};