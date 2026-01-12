import { cn } from "@/core/utils/cn";
import { FooterLink } from "./FooterLink";
import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExploreColumnProps {
  className?: string;
}

export const ExploreColumn = ({ className }: ExploreColumnProps) => {
  const t = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");

  const exploreLinks = [
    { href: "/tours", label: t("tours") },
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Experiences" },
    { href: "/about", label: t("about") },
    { href: "/journal", label: t("journal") },
    { href: "/guides", label: "Travel Guides" },
  ];

  const companyLinks = [
    { href: "/about", label: "Our Story" },
    { href: "/team", label: "Our Team" },
    { href: "/partners", label: "Partners" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div className={cn("grid grid-cols-2 gap-8", className)}>
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Compass className="text-terracotta" size={18} />
          <h4 className="font-bold uppercase tracking-widest text-sm text-terracotta">
            {tFooter("explore") || "Explore"}
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
            Company
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