"use client";

import { Leaf } from "lucide-react";
import { useTranslations } from "next-intl";

interface SisterBrandSectionProps {
  brandName?: string;
  tagline?: string;
}

export const SisterBrandSection = ({
  brandName,
  tagline,
}: SisterBrandSectionProps) => {
  const t = useTranslations("About.SisterBrand");

  return (
    <section className="bg-forest py-20 md:py-32 text-sand relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-sand/20 rounded-full mb-8">
          <Leaf size={16} className="text-sand" />
          <span className="text-xs font-bold uppercase tracking-widest">
            {t("badge")}
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-6xl mb-8">
          {brandName || t("brand_name")}
        </h2>
        <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light text-sand/80 leading-relaxed mb-12">
          {tagline || t("tagline")}
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
            <p className="text-sand/90 leading-relaxed">
              {t("desc_1")}
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
            <p className="text-sand/90 leading-relaxed">
              {t("desc_2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};