"use client";

import { Users, Heart, Leaf } from "lucide-react";
import { PromiseCard } from "./PromiseCard";
import { useTranslations } from "next-intl";

export const PromiseSection = () => {
    const t = useTranslations("About.Promise");

    // Định nghĩa key và icon
    const promiseKeys = [
        { key: "small_group", icon: Users },
        { key: "honest", icon: Heart },
        { key: "sustainable", icon: Leaf },
    ];

    return (
        <section className="py-20 container mx-auto px-4">
            <h2 className="text-center font-serif text-3xl md:text-4xl text-forest mb-16">
                {t("title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {promiseKeys.map((item, index) => (
                    <PromiseCard
                        key={index}
                        icon={item.icon}
                        // Gọi t() dựa trên key (items.small_group.title, etc.)
                        title={t(`items.${item.key}.title`)}
                        description={t(`items.${item.key}.desc`)}
                    />
                ))}
            </div>
        </section>
    );
};