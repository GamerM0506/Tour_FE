import { Link } from "@/i18n/routing";
import { cn } from "@/core/utils/cn";
import { SocialIcons } from "./SocialIcons";
import { Award, Globe } from "lucide-react";
import { useTranslations } from "next-intl"; // Import

interface BrandColumnProps {
    className?: string;
}

export const BrandColumn = ({ className }: BrandColumnProps) => {
    const t = useTranslations("Footer.brand"); // Use namespace
    const tBrand = useTranslations("Brand"); // Lấy tên Brand chung

    return (
        <div className={cn("space-y-6", className)}>
            <div className="space-y-4">
                <Link href="/" className="inline-block group">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-terracotta to-amber-600 flex items-center justify-center">
                            <Globe className="text-white" size={20} />
                        </div>
                        <div>
                            <span className="font-serif text-3xl font-bold uppercase tracking-tighter text-sand block">
                                {tBrand("name")}
                            </span>
                            <span className="text-xs text-sand/40 tracking-widest uppercase">
                                {t("tagline")}
                            </span>
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sand/10 rounded-full">
                        <Award size={14} className="text-terracotta" />
                        <span className="text-xs text-sand/70">{t("since")}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sand/10 rounded-full">
                        <Globe size={14} className="text-terracotta" />
                        <span className="text-xs text-sand/70">{t("tours_count")}</span>
                    </div>
                </div>
            </div>

            <p className="text-sand/60 text-sm leading-relaxed max-w-xs">
                {t("description")}
            </p>

            <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-sand/40 block">
                    {t("follow")}
                </span>
                <SocialIcons variant="default" />
            </div>

            <div className="pt-4 border-t border-sand/10">
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <div className="font-serif text-xl text-terracotta font-bold">5,000+</div>
                        <div className="text-xs text-sand/50">{t("happy_travelers")}</div>
                    </div>
                    <div className="h-8 w-px bg-sand/10" />
                    <div className="text-center">
                        <div className="font-serif text-xl text-terracotta font-bold">98%</div>
                        <div className="text-xs text-sand/50">{t("satisfaction")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};