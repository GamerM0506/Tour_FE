"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";

import { HeroBackground } from "./components/HeroBackground";
import { HeroContent } from "./components/HeroContent";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { HeroProps } from "./types";

export const Hero = ({
  className,
  title,
  subtitle,
  description,
  ctaText,
  imageUrl,
  videoUrl,
  overlayOpacity,
  showScrollIndicator = true
}: HeroProps) => {
  const t = useTranslations("Hero");

  const handleCtaClick = () => {
    console.log("CTA clicked");
  };

  return (
    <section
      id="hero"
      className={cn(
        "relative w-full min-h-screen",
        "flex items-center justify-center",
        "overflow-hidden",
        className
      )}
    >
      <HeroBackground
        imageUrl={imageUrl}
        overlayOpacity={overlayOpacity}
      />
      <HeroContent
        title={title || t("title") || "Discover the Untouched Vietnam"}
        subtitle={subtitle || t("subtitle") || "The Art of Travel"}
        description={description || t("description") || "Trải nghiệm những hành trình độc bản được thiết kế riêng cho tâm hồn yêu tự do và sự tinh tế."}
        ctaText={ctaText || t("ctaText") || "Start Your Journey"}
        onCtaClick={handleCtaClick}
      />

      {showScrollIndicator && <ScrollIndicator />}

      <div className="absolute top-10 left-10 w-32 h-32 border border-sand/10 rounded-full animate-spin-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-sand/5 rounded-full animate-pulse-slow" />
    </section>
  );
};