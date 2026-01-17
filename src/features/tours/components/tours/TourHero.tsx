// features/tours/components/TourHero.tsx
"use client";

import { cn } from "@/core/utils/cn";
import { Search, Filter, Map } from "lucide-react";
import { Input } from "@/core/components/ui/input";
import { Button } from "@/core/components/ui/button";

interface TourHeroProps {
  className?: string;
  title?: string;
  description?: string;
  showSearch?: boolean;
}

export const TourHero = ({
  className,
  title = "Discover Vietnam",
  description = "Curated journeys that connect you with authentic experiences",
  showSearch = true
}: TourHeroProps) => {
  return (
    <div className={cn(
      "relative py-16 md:py-24",
      "bg-gradient-to-br from-forest/90 via-forest to-forest/80",
      "text-white overflow-hidden",
      className
    )}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-terracotta/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-sand/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full mb-8">
            <Map size={16} />
            <span className="text-sm font-medium uppercase tracking-widest">
              50+ Unique Destinations
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          {showSearch && (
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-jet/40" size={20} />
                <Input
                  type="text"
                  placeholder="Search destinations, tours, or experiences..."
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-0 shadow-lg bg-white/90 backdrop-blur"
                />
                <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-forest text-white px-6 py-2 rounded-lg hover:bg-terracotta">
                  <Filter size={18} className="mr-2" />
                  Filters
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <span className="text-sm text-white/60">Popular:</span>
                {["Ha Long Bay", "Sapa", "Hoi An", "Mekong", "Da Nang"].map((item) => (
                  <button
                    key={item}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: "500+", label: "Curated Tours" },
            { value: "50+", label: "Destinations" },
            { value: "98%", label: "Satisfaction" },
            { value: "24/7", label: "Support" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};