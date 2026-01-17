// components/FeaturedTours/index.tsx
"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/core/utils/cn";
import { Button } from "@/core/components/ui/button";
import { ArrowUpRight } from "lucide-react";

import { TourHeader } from "./components/TourHeader";
import { ToursGrid } from "./components/ToursGrid";
import { tours } from "./data/tours";
import { FeaturedToursProps } from "./types";

export const FeaturedTours = ({
  className,
  title,
  subtitle,
  showViewAllButton = true,
  limit = 6
}: FeaturedToursProps) => {
  const t = useTranslations("FeaturedTours");
  
  const displayedTours = tours.slice(0, limit);

  return (
    <section 
      id="featured-tours"
      className={cn(
        "relative py-20 md:py-32 lg:py-40",
        "bg-gradient-to-b from-sand/30 to-sand/10",
        "overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-terracotta/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-forest/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <TourHeader
          title={title || t("title") || "Những hành trình được yêu thích nhất"}
          subtitle={subtitle || t("subtitle") || "Curated Collections"}
          showViewAllButton={showViewAllButton}
        />

        <ToursGrid tours={displayedTours} />

        {showViewAllButton && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              className="md:hidden w-full rounded-full py-6 border-forest/30 text-forest hover:bg-forest hover:text-sand"
            >
              Xem tất cả Tour
            </Button>
            
            <div className="hidden md:flex items-center justify-center gap-8 mt-16">
              <div className="text-center">
                <div className="font-serif text-5xl font-bold text-terracotta">50+</div>
                <div className="text-sm text-jet/60 uppercase tracking-wider mt-2">Unique Tours</div>
              </div>
              <Button
                className="rounded-full bg-gradient-to-r from-terracotta to-forest text-white px-10 py-6 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex items-center gap-3 font-medium text-lg">
                  Explore All Tours
                  <ArrowUpRight size={20} />
                </span>
              </Button>
              <div className="text-center">
                <div className="font-serif text-5xl font-bold text-forest">98%</div>
                <div className="text-sm text-jet/60 uppercase tracking-wider mt-2">Satisfaction</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-20 pt-20 border-t border-jet/10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-jet mb-6">
              Can't find what you're looking for?
            </h3>
            <p className="text-lg text-jet/60 mb-8">
              Our travel experts can create a completely customized itinerary just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="rounded-full bg-jet text-sand px-8 py-6 hover:bg-terracotta">
                Contact Our Expert
              </Button>
              <Button variant="outline" className="rounded-full border-jet/30 text-jet px-8 py-6 hover:border-terracotta hover:text-terracotta">
                Schedule a Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};