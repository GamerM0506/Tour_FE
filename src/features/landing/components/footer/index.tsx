// components/Footer/index.tsx
"use client";

import { cn } from "@/core/utils/cn";

import { NewsletterSection } from "./components/NewsletterSection";
import { BrandColumn } from "./components/BrandColumn";
import { ExploreColumn } from "./components/ExploreColumn";
import { ContactColumn } from "./components/ContactColumn";
import { GalleryColumn } from "./components/GalleryColumn";
import { CopyrightSection } from "./components/CopyrightSection";
import { FooterProps } from "./types";

export const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn(
      "relative bg-forest text-sand",
      "overflow-hidden",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sand/10 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16 pb-10">
        {/* Newsletter Section */}
        <NewsletterSection />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Brand Column - 3 cols */}
          <div className="lg:col-span-4">
            <BrandColumn />
          </div>

          {/* Explore Column - 3 cols */}
          <div className="lg:col-span-3">
            <ExploreColumn />
          </div>

          {/* Contact Column - 3 cols */}
          <div className="lg:col-span-3">
            <ContactColumn />
          </div>

          {/* Gallery Column - 2 cols */}
          <div className="lg:col-span-2">
            <GalleryColumn />
          </div>
        </div>

        {/* Copyright Section */}
        <CopyrightSection />
      </div>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={cn(
          "fixed bottom-8 right-8 z-50",
          "w-12 h-12 rounded-full",
          "bg-gradient-to-r from-terracotta to-amber-600",
          "text-white shadow-xl",
          "flex items-center justify-center",
          "hover:shadow-2xl hover:-translate-y-1",
          "transition-all duration-300",
          "opacity-0 animate-in fade-in slide-in-from-bottom-4 duration-500"
        )}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
};