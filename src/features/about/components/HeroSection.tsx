"use client";

import { useTranslations } from "next-intl";

export const HeroSection = () => {
    const t = useTranslations("About.Hero");

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4">
            <div className="container mx-auto max-w-5xl text-center">
                <span className="text-terracotta text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 block animate-in fade-in slide-in-from-bottom-4">
                    {t("badge")}
                </span>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-forest font-medium leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-6 delay-100">
                    {t("title")} <br />{" "}
                    <span className="italic text-terracotta">
                        {t("title_highlight")}
                    </span>
                </h1>
                <p className="text-lg md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-jet/80 animate-in fade-in slide-in-from-bottom-8 delay-200">
                    {t("description")}
                </p>
            </div>
        </section>
    );
};