// components/Philosophy/index.tsx
"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";
import { Leaf, Map, HeartHandshake } from "lucide-react";

import { PhilosophyHeader } from "./components/PhilosophyHeader";
import { FeatureCard } from "./components/FeatureCard";
import { BackgroundPattern } from "./components/BackgroundPattern";
import { PhilosophyProps } from "./types";

export const Philosophy = ({ 
  className,
  title,
  subtitle,
  description,
  features
}: PhilosophyProps) => {
  const t = useTranslations("Philosophy");
  
  const defaultFeatures = [
    {
      icon: Leaf,
      title: t("features.sustainable.title") || "Sustainable",
      desc: t("features.sustainable.desc") || "Chúng tôi cam kết du lịch xanh, tôn trọng thiên nhiên và cộng đồng bản địa.",
      accentColor: "forest"
    },
    {
      icon: Map,
      title: t("features.tailorMade.title") || "Tailor-made",
      desc: t("features.tailorMade.desc") || "Mỗi hành trình là một tác phẩm độc bản, được thiết kế riêng theo cá tính của bạn.",
      accentColor: "terracotta"
    },
    {
      icon: HeartHandshake,
      title: t("features.authentic.title") || "Authentic",
      desc: t("features.authentic.desc") || "Kết nối sâu sắc với văn hóa địa phương, tránh xa những điểm đến xô bồ.",
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
          subtitle={subtitle || t("subtitle") || "Our Philosophy"}
          title={title || t("title") || "Không chỉ là du lịch, đó là sự trở về."}
          description={description || t("description") || "Chúng tôi tin rằng sự sang trọng đích thực không nằm ở khách sạn dát vàng, mà nằm ở khoảnh khắc bạn chạm tay vào rêu phong cổ kính, hay hít thở bầu không khí tinh khiết của núi rừng."}
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

        <div className="mt-12 md:mt-20 text-center">
          <div className="inline-flex flex-col md:flex-row items-center gap-6 md:gap-10 p-8 md:p-10 bg-white/50 backdrop-blur-sm rounded-3xl border border-jet/10 shadow-lg">
            <div className="text-left">
              <h3 className="font-serif text-2xl md:text-3xl text-forest mb-2">
                {t("cta.title") || "Ready for an authentic journey?"}
              </h3>
              <p className="text-jet/60">
                {t("cta.description") || "Let's create your personalized Vietnam experience together."}
              </p>
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-forest to-terracotta text-white font-bold rounded-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap">
              {t("cta.button") || "Start Planning"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};