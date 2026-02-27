"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface MethodologySectionProps {
    imageSrc: string;
    imageAlt?: string;
}

export const MethodologySection = ({
    imageSrc,
    imageAlt,
}: MethodologySectionProps) => {
    const t = useTranslations("About.Methodology");

    return (
        <section className="py-20 md:py-32 container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/2 sticky top-32">
                    <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight mb-8">
                        {t.rich("title", {
                            br: () => <br />
                        })}
                    </h2>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={imageAlt || t("image_alt")}
                            fill
                            priority
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
                            quality={80}
                        />
                    </div>
                </div>

                <div className="lg:w-1/2 space-y-12">
                    <div>
                        <h3 className="font-serif text-2xl text-terracotta mb-4">
                            {t("flexible_title")}
                        </h3>
                        <p className="text-jet/70 text-lg leading-relaxed">
                            {t("flexible_desc")}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-terracotta mb-4">
                            {t("hospitality_title")}
                        </h3>
                        <p className="text-jet/70 text-lg leading-relaxed">
                            {t("hospitality_desc")}
                        </p>

                        <ul className="mt-4 space-y-3">
                            <li className="flex items-center gap-3 text-jet/80">
                                <ShieldCheck className="text-forest" size={20} />
                                {t("list.wheelchair")}
                            </li>
                            <li className="flex items-center gap-3 text-jet/80">
                                <ShieldCheck className="text-forest" size={20} />
                                {t("list.dietary")}
                            </li>
                            <li className="flex items-center gap-3 text-jet/80">
                                <ShieldCheck className="text-forest" size={20} />
                                {t("list.schedule")}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};