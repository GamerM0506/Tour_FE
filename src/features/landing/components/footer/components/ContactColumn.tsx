import { cn } from "@/core/utils/cn";
import { MapPin, Mail, Phone, Clock, MessageSquare } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface ContactColumnProps {
  className?: string;
}

export const ContactColumn = ({ className }: ContactColumnProps) => {
  const t = useTranslations("Footer");

  const contactItems = [
    {
      icon: MapPin,
      content: t("address") || "123 Travel Street, Hanoi, Vietnam",
      href: "#"
    },
    {
      icon: Mail,
      content: "hello@randomtours.com",
      href: "mailto:hello@randomtours.com"
    },
    {
      icon: Phone,
      content: "+84 999 999 999",
      href: "tel:+84999999999"
    },
    {
      icon: Clock,
      content: "Mon - Fri: 8:00 - 18:00",
      subContent: "Sat - Sun: 9:00 - 16:00"
    },
  ];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="text-terracotta" size={18} />
        <h4 className="font-bold uppercase tracking-widest text-sm text-terracotta">
          {t("contact") || "Contact Us"}
        </h4>
      </div>

      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div className={cn(
              "w-10 h-10 rounded-lg",
              "flex items-center justify-center",
              "bg-gradient-to-br from-sand/10 to-transparent",
              "border border-sand/20",
              "group-hover:border-terracotta/50",
              "transition-all duration-300"
            )}>
              <item.icon size={18} className="text-terracotta" />
            </div>
            
            <div className="flex-1">
              {item.href ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-sand/80 hover:text-terracotta",
                    "transition-colors duration-300",
                    "block font-medium"
                  )}
                >
                  {item.content}
                </Link>
              ) : (
                <div className="text-sand/80 font-medium">{item.content}</div>
              )}
              {item.subContent && (
                <div className="text-sand/50 text-sm mt-0.5">{item.subContent}</div>
              )}
            </div>
          </div>
        ))}
      </div>

     <div className="pt-6 border-t border-sand/10">
        <Link
          href="/contact"
          className={cn(
            "inline-flex items-center justify-center",
            "w-full py-3 px-4 rounded-xl",
            "bg-gradient-to-r from-sand/10 to-sand/5",
            "border border-sand/20",
            "text-sand hover:text-terracotta",
            "hover:border-terracotta/50",
            "transition-all duration-300",
            "group"
          )}
        >
          <span className="font-medium">Quick Contact Form</span>
          <MessageSquare size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </div>
  );
};