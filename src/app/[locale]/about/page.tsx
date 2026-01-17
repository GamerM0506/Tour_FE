"use client";

import { DualitySection } from "@/features/about/components/DualitySection";
import { HeroSection } from "@/features/about/components/HeroSection";
import { MethodologySection } from "@/features/about/components/MethodologySection";
import { PromiseSection } from "@/features/about/components/PromiseSection";
import { SisterBrandSection } from "@/features/about/components/SisterBrandSection";
import { VisualBreak } from "@/features/about/components/VisualBreak";


export default function AboutPage() {
  return (
    <div className="bg-sand text-jet overflow-hidden">
      <HeroSection />
      
      <VisualBreak 
        imageSrc="wallhaven_opqtwn.jpg"
        altText="Hanoi local food experience"
      />
      
      <DualitySection />
      
      <MethodologySection 
        imageSrc="wallhaven_opqtwn.jpg"
        imageAlt="Cooking Class"
      />
      
      <SisterBrandSection />
      
      <PromiseSection />
    </div>
  );
}