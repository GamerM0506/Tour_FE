import { cn } from "@/core/utils/cn";
import { Feature } from "../types";
import { useState } from "react";

interface FeatureCardProps {
    feature: Feature;
    index: number;
    className?: string;
}

export const FeatureCard = ({
    feature,
    index,
    className
}: FeatureCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = feature.icon;
    const accentColor = feature.accentColor || "terracotta";

    return (
        <div
            className={cn(
                "group relative",
                "transition-all duration-700 ease-out",
                "hover:-translate-y-2",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "absolute inset-0 rounded-3xl",
                "bg-gradient-to-br from-sand to-sand",
                "transition-all duration-500",
                "group-hover:from-terracotta/5 group-hover:to-forest/5",
                "border border-jet/5",
                "shadow-sm group-hover:shadow-xl",
                "overflow-hidden"
            )}>
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100",
                    "bg-gradient-to-br from-terracotta/10 via-transparent to-forest/10",
                    "transition-opacity duration-500"
                )} />

                <div className={cn(
                    "absolute top-4 left-4 md:top-6 md:left-6",
                    "text-6xl md:text-7xl font-serif font-bold",
                    "text-jet/5 group-hover:text-terracotta/10",
                    "transition-colors duration-500"
                )}>
                    0{index + 1}
                </div>
            </div>

            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col items-center text-center">
                <div className={cn(
                    "relative mb-8",
                    "transition-all duration-500",
                    "group-hover:scale-110 group-hover:-translate-y-1"
                )}>
                    <div className={cn(
                        "absolute inset-0 rounded-full",
                        "border-2 border-jet/10",
                        "transition-all duration-500",
                        "group-hover:border-terracotta/30 group-hover:scale-125"
                    )} />

                    <div className={cn(
                        "relative w-20 h-20 rounded-full",
                        "flex items-center justify-center",
                        "bg-gradient-to-br from-sand to-sand/80",
                        "shadow-inner",
                        "transition-all duration-500",
                        "group-hover:from-terracotta/10 group-hover:to-forest/10",
                        "group-hover:shadow-lg"
                    )}>
                        <Icon
                            size={32}
                            strokeWidth={1.5}
                            className={cn(
                                "text-jet transition-all duration-500",
                                "group-hover:text-terracotta group-hover:scale-110"
                            )}
                        />
                    </div>

                    {[0, 1, 2].map((dot) => (
                        <div
                            key={dot}
                            className={cn(
                                "absolute w-2 h-2 rounded-full bg-terracotta/30",
                                "transition-all duration-700",
                                isHovered ? "opacity-100" : "opacity-0",
                                dot === 0 && "top-0 left-1/2 -translate-x-1/2 -translate-y-2",
                                dot === 1 && "top-1/2 -right-1 -translate-y-1/2",
                                dot === 2 && "bottom-0 left-1/2 -translate-x-1/2 translate-y-2"
                            )}
                            style={{
                                animationDelay: `${dot * 100}ms`
                            }}
                        />
                    ))}
                </div>

                <h3 className={cn(
                    "font-serif text-2xl md:text-3xl text-forest mb-4",
                    "transition-colors duration-500",
                    "group-hover:text-terracotta"
                )}>
                    {feature.title}
                </h3>

                <p className={cn(
                    "text-jet/60 leading-relaxed",
                    "transition-all duration-500",
                    "group-hover:text-jet/80",
                    "flex-1"
                )}>
                    {feature.desc}
                </p>

                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="inline-flex items-center gap-2 text-terracotta font-medium text-sm">
                        <span>Explore more</span>
                        <div className="w-6 h-px bg-terracotta/50 transition-all duration-300 group-hover:w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};