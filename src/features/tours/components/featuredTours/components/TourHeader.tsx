// components/FeaturedTours/components/TourHeader.tsx
import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/utils/cn";
import { ArrowUpRight, Compass } from "lucide-react";

interface TourHeaderProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showViewAllButton?: boolean;
}

export const TourHeader = ({
  className,
  title = "Những hành trình được yêu thích nhất",
  subtitle = "Curated Collections",
  showViewAllButton = true
}: TourHeaderProps) => {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6",
      className
    )}>
      <div className="max-w-3xl">
        {/* Decorative line */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-terracotta to-forest mb-4 rounded-full" />
        
        {/* Subtitle */}
        <div className="flex items-center gap-3 mb-3">
          <Compass className="w-5 h-5 text-terracotta" />
          <span className="text-terracotta text-sm font-bold tracking-[0.3em] uppercase">
            {subtitle}
          </span>
        </div>
        
        {/* Title */}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-jet font-medium leading-tight">
          {title}
        </h2>
        
        {/* Description */}
        <p className="mt-4 text-lg text-jet/60 leading-relaxed max-w-2xl">
          Khám phá những hành trình độc đáo được thiết kế riêng bởi đội ngũ chuyên gia của chúng tôi
        </p>
      </div>
      
      {/* View All Button - Desktop */}
      {showViewAllButton && (
        <Button 
          variant="outline"
          className="hidden md:flex items-center gap-2 border-forest/30 text-forest hover:bg-forest hover:text-sand rounded-full px-8 py-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span className="font-medium">Xem tất cả Tour</span>
          <ArrowUpRight size={18} />
        </Button>
      )}
    </div>
  );
};