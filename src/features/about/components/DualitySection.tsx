"use client";

import { Sparkles, Map } from "lucide-react";
import { useTranslations } from "next-intl";

export const DualitySection = () => {
  const t = useTranslations("About.Duality");

  return (
    <section className="py-20 md:py-32 bg-sand-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Random */}
          <div className="relative group p-8 border border-forest/10 rounded-2xl hover:bg-white transition-all duration-500 hover:shadow-xl">
            <div className="w-12 h-12 bg-terracotta/10 text-terracotta rounded-full flex items-center justify-center mb-6">
              <Sparkles size={24} />
            </div>
            <h2 className="font-serif text-4xl text-forest mb-4">{t("random_title")}</h2>
            <p className="text-jet/70 leading-relaxed text-lg">
              {t("random_desc")}
            </p>
          </div>

          {/* Tailored */}
          <div className="relative group p-8 border border-forest/10 rounded-2xl hover:bg-white transition-all duration-500 hover:shadow-xl md:translate-y-12">
            <div className="w-12 h-12 bg-forest/10 text-forest rounded-full flex items-center justify-center mb-6">
              <Map size={24} />
            </div>
            <h2 className="font-serif text-4xl text-forest mb-4">{t("tailored_title")}</h2>
            <p className="text-jet/70 leading-relaxed text-lg">
              {t("tailored_desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};