"use client";

import { Leaf } from "lucide-react";

interface SisterBrandSectionProps {
  brandName?: string;
  tagline?: string;
}

export const SisterBrandSection = ({
  brandName = "Lành.Naturals",
  tagline = '"More than a tour — A Cultural Exchange."',
}: SisterBrandSectionProps) => {
  return (
    <section className="bg-forest py-20 md:py-32 text-sand relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta/20 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-sand/20 rounded-full mb-8">
          <Leaf size={16} className="text-sand" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Our Sister Brand
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-6xl mb-8">{brandName}</h2>
        <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light text-sand/80 leading-relaxed mb-12">
          {tagline}
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto text-left">
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
            <p className="text-sand/90 leading-relaxed">
              Inspired by Vietnamese herbal traditions and mindful living.
              {brandName} focuses on clean, thoughtfully crafted snacks and
              herbal teas made from local ingredients.
            </p>
          </div>
          <div className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
            <p className="text-sand/90 leading-relaxed">
              Designed to be gentle on the body and accessible to travelers with
              dietary sensitivities. This shared philosophy influences how we
              think about food, wellness, and care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};