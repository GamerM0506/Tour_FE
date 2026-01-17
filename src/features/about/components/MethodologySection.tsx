"use client";

import Image from "next/image";
import { ShieldCheck } from "lucide-react";

interface MethodologySectionProps {
    imageSrc: string;
    imageAlt?: string;
}

export const MethodologySection = ({
    imageSrc,
    imageAlt = "Cooking Class",
}: MethodologySectionProps) => {
    return (
        <section className="py-20 md:py-32 container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
                <div className="lg:w-1/2 sticky top-32">
                    <h2 className="font-serif text-4xl md:text-5xl text-forest leading-tight mb-8">
                        Designed by Locals, <br /> Guided with Care.
                    </h2>
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            priority
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 1024px) 100vw,
                                1600px
                              "
                            quality={80}
                        />
                    </div>
                </div>

                <div className="lg:w-1/2 space-y-12">
                    <div>
                        <h3 className="font-serif text-2xl text-terracotta mb-4">
                            Flexible Tasting Journeys
                        </h3>
                        <p className="text-jet/70 text-lg leading-relaxed">
                            Instead of following a fixed menu, we design flexible journeys
                            that adapt to what you have already tried. Each tour follows a
                            thoughtful progression: appetizers, mains, and dessert, balanced
                            according to traditional Hanoian culinary standards.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-serif text-2xl text-terracotta mb-4">
                            Hospitality for Everyone
                        </h3>
                        <p className="text-jet/70 text-lg leading-relaxed">
                            Hospitality should always feel safe, respectful, and human. That's
                            why:
                        </p>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-center gap-3 text-jet/80">
                                <ShieldCheck className="text-forest" size={20} />
                                All routes are wheelchair-friendly.
                            </li>
                            <li className="flex items-center gap-3 text-jet/80">
                                <ShieldCheck className="text-forest" size={20} />
                                Special care with allergies & dietary restrictions.
                            </li>
                            <li className="flex items-center gap-3 text-jet/80">
                                <ShieldCheck className="text-forest" size={20} />
                                No rushed schedules, no mass tourism.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};