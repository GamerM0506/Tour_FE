"use client";

import { cn } from "@/core/utils/cn";
import { HeroBackground } from "./components/HeroBackground";
import { HeroContent } from "./components/HeroContent";
import { ScrollIndicator } from "./components/ScrollIndicator";
import { HeroProps } from "./types";
import { useRouter } from "@/i18n/routing"; // Dùng router của i18n

export const Hero = ({
  className,
  imageUrl,
  overlayOpacity,
  showScrollIndicator = true,
  onCtaClick
}: HeroProps) => {
  const router = useRouter();

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Mặc định chuyển hướng đến trang tours nếu không có hành động cụ thể
      router.push("/tours");
    }
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
        onCtaClick={handleCtaClick}
      />

      {showScrollIndicator && <ScrollIndicator />}

      <div className="absolute top-10 left-10 w-32 h-32 border border-sand/10 rounded-full animate-spin-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-sand/5 rounded-full animate-pulse-slow pointer-events-none" />
    </section>
  );
};