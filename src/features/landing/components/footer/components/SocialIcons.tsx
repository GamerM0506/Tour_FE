import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react";
import { cn } from "@/core/utils/cn";
import { SocialLink } from "../types";

const socialLinks: SocialLink[] = [
    { platform: "Facebook", icon: Facebook, url: "https://facebook.com" },
    { platform: "Instagram", icon: Instagram, url: "https://instagram.com" },
    { platform: "LinkedIn", icon: Linkedin, url: "https://linkedin.com" },
    { platform: "YouTube", icon: Youtube, url: "https://youtube.com" },
    { platform: "Twitter", icon: Twitter, url: "https://twitter.com" },
];

interface SocialIconsProps {
    className?: string;
    variant?: "default" | "minimal";
}

export const SocialIcons = ({ className, variant = "default" }: SocialIconsProps) => {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            {socialLinks.map((social) => {
                const Icon = social.icon;

                if (variant === "minimal") {
                    return (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "w-8 h-8 rounded-full",
                                "flex items-center justify-center",
                                "text-sand/60 hover:text-terracotta",
                                "transition-all duration-300",
                                "hover:scale-110"
                            )}
                            aria-label={`Follow us on ${social.platform}`}
                        >
                            <Icon size={16} />
                        </a>
                    );
                }

                return (
                    <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "group relative",
                            "w-10 h-10 rounded-full",
                            "flex items-center justify-center",
                            "border border-sand/20",
                            "bg-gradient-to-br from-sand/5 to-transparent",
                            "hover:border-terracotta/50 hover:bg-terracotta/10",
                            "transition-all duration-500"
                        )}
                        aria-label={`Follow us on ${social.platform}`}
                    >
                        <Icon
                            size={18}
                            className={cn(
                                "text-sand/60",
                                "transition-all duration-300",
                                "group-hover:text-terracotta group-hover:scale-110"
                            )}
                        />
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-jet text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                            {social.platform}
                        </span>
                    </a>
                );
            })}
        </div>
    );
};