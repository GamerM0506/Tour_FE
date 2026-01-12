// components/Header/components/MobileMenu.tsx
import { cn } from "@/core/utils/cn";
import { MobileMenuProps } from "../types";
import { X, Compass, MapPin, Users, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { LangSwitcher } from "../lang-switcher";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const iconMap = {
    home: Compass,
    tours: MapPin,
    about: Users,
    journal: BookOpen,
};

export const MobileMenu = ({
    mobileOpen,
    setMobileOpen,
    navItems,
    pathname
}: MobileMenuProps) => {
    const t = useTranslations("Navigation");

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] bg-sand flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                mobileOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex items-center justify-between px-4 py-5 border-b border-jet/10">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-jet/10">
                        <Image
                            src="Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1080x1080_fq0bpa.png"
                            alt="Logo"
                            fill
                            className="object-cover bg-white"
                            sizes="40px"
                        />
                    </div>
                    <span className="font-serif text-xl font-bold uppercase text-jet">Random Tours</span>
                </div>

                <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-full hover:bg-jet/5 transition-colors"
                    aria-label="Close menu"
                >
                    <X size={32} strokeWidth={1.5} className="text-jet" />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 gap-2">
                {navItems.map((item) => {
                    const Icon = iconMap[item.label.toLowerCase() as keyof typeof iconMap];
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "group flex items-center justify-between px-4 py-5 rounded-2xl",
                                "transition-all duration-300",
                                isActive
                                    ? "bg-terracotta/10"
                                    : "hover:bg-jet/5"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-12 h-12 rounded-full flex items-center justify-center",
                                    "transition-all duration-300",
                                    isActive
                                        ? "bg-terracotta text-sand"
                                        : "bg-jet/5 group-hover:bg-terracotta/20"
                                )}>
                                    <Icon size={22} strokeWidth={1.5} />
                                </div>

                                <div className="flex flex-col">
                                    <span className={cn(
                                        "font-serif text-2xl font-medium transition-colors",
                                        isActive ? "text-terracotta" : "text-jet"
                                    )}>
                                        {item.label}
                                    </span>
                                    <span className="text-sm text-jet/60 mt-1">
                                        {t(`${item.label.toLowerCase()}_desc`)}
                                    </span>
                                </div>
                            </div>

                            <ArrowRight className="text-terracotta opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        </Link>
                    );
                })}
            </div>

            <div className="p-8 bg-sand-light border-t border-jet/10 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium uppercase text-jet/60 tracking-widest">
                        Language
                    </span>
                    <LangSwitcher isScrolled={true} />
                </div>

                <Button
                    size="lg"
                    className="w-full rounded-full bg-jet text-sand hover:bg-terracotta text-lg font-serif py-6"
                >
                    {t("book_now")}
                </Button>
            </div>
        </div>
    );
};