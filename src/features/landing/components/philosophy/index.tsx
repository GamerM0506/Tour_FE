"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";
import { Leaf, Map, HeartHandshake } from "lucide-react";

import { PhilosophyHeader } from "./components/PhilosophyHeader";
import { FeatureCard } from "./components/FeatureCard";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { PhilosophyProps } from "./types";
import { useRouter } from "@/i18n/routing";

export const Philosophy = ({
  className,
  title,
  subtitle,
  description,
  features
}: PhilosophyProps) => {
  const t = useTranslations("Philosophy");
  const router = useRouter();

  const defaultFeatures = [
    {
      icon: Leaf,
      title: t("features.sustainable.title"),
      desc: t("features.sustainable.desc"),
      accentColor: "forest"
    },
    {
      icon: Map,
      title: t("features.tailorMade.title"),
      desc: t("features.tailorMade.desc"),
      accentColor: "terracotta"
    },
    {
      icon: HeartHandshake,
      title: t("features.authentic.title"),
      desc: t("features.authentic.desc"),
      accentColor: "amber"
    },
  ];

  const featureList = features || defaultFeatures;

  return (
    <section
      id="philosophy"
      className={cn(
        "relative py-4 md:py-12 lg:py-16",
        "bg-gradient-to-b from-sand-light to-sand/30",
        "overflow-hidden",
        className
      )}
    >
      <BackgroundPattern variant="geometric" />

      <div className="container mx-auto px-4 relative z-10">
        <PhilosophyHeader
          subtitle={subtitle}
          title={title}
          description={description}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featureList.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              className="h-full"
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 md:mt-20 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-10 bg-white/50 backdrop-blur-sm rounded-3xl border border-jet/10 shadow-lg">
            <div className="text-left">
              <h3 className="font-serif text-2xl md:text-3xl text-forest mb-2">
                {t("cta.title")}
              </h3>
              <p className="text-jet/60">
                {t("cta.description")}
              </p>
            </div>
            <button
              onClick={() => router.push('/contact')}
              className="px-8 py-4 bg-gradient-to-r from-forest to-terracotta text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {t("cta.button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};