import { Button } from "@/core/components/ui/button";
import { cn } from "@/core/utils/cn";
import { ArrowRight, Sparkles } from "lucide-react";

interface HeroContentProps {
    title?: string;
    subtitle?: string;
    description?: string;
    ctaText?: string;
    className?: string;
    onCtaClick?: () => void;
}

export const HeroContent = ({
    title = "Discover the Untouched Vietnam",
    subtitle = "The Art of Travel",
    description = "Trải nghiệm những hành trình độc bản được thiết kế riêng cho tâm hồn yêu tự do và sự tinh tế.",
    ctaText = "Start Your Journey",
    className,
    onCtaClick
}: HeroContentProps) => {
    const titleLines = title.split(', ');

    return (
        <div
  className={cn(
    "relative z-20 w-full",
    "container mx-auto px-4",
    "flex flex-col items-center justify-start",
    "min-h-[calc(100vh-80px)]",
    "pt-28 md:pt-32 lg:pt-36",
    "pb-32 md:pb-40",
    "text-center",
    className
  )}
>
            <div className="absolute -inset-x-20 -inset-y-40 bg-gradient-to-r from-terracotta/5 via-transparent to-forest/5 blur-3xl rounded-full" />
            <div className="relative space-y-8 md:space-y-12 max-w-6xl">
                <div className="overflow-hidden">
                    <div className={cn(
                        "inline-flex items-center gap-3",
                        "py-2 px-6 rounded-full",
                        "border border-sand/20 backdrop-blur-md",
                        "bg-gradient-to-r from-sand/5 to-white/5",
                        "animate-in slide-in-from-top-full duration-1000"
                    )}>
                        <Sparkles className="w-4 h-4 text-terracotta animate-pulse" />
                        <span className="text-sand text-sm md:text-base tracking-[0.3em] uppercase font-medium">
                            {subtitle}
                        </span>
                        <Sparkles className="w-4 h-4 text-terracotta animate-pulse" />
                    </div>
                </div>

                <div className="space-y-4 md:space-y-6">
                    <h1 className="font-serif font-bold text-sand tracking-tight leading-none">
                        {titleLines.map((line, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "overflow-hidden",
                                    index === 0 ? "text-6xl md:text-8xl lg:text-9xl" : "text-5xl md:text-7xl lg:text-8xl"
                                )}
                            >
                                <span className={cn(
                                    "block animate-in slide-in-from-bottom-full",
                                    "duration-1000 fill-mode-forwards",
                                    index === 0 ? "delay-300" : "delay-500"
                                )}>
                                    {line}
                                    {index < titleLines.length - 1 && ','}
                                </span>
                            </div>
                        ))}
                    </h1>

                    <div className="relative h-1 w-32 md:w-48 mx-auto overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-terracotta via-sand to-forest animate-slide rounded-full" />
                    </div>
                </div>

                <div className="overflow-hidden max-w-2xl mx-auto">
                    <p className={cn(
                        "text-sand/90 text-lg md:text-xl lg:text-2xl",
                        "font-light leading-relaxed md:leading-loose",
                        "animate-in slide-in-from-bottom-full duration-1000 delay-700 fill-mode-forwards"
                    )}>
                        {description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center pt-4 animate-in fade-in-0 zoom-in-95 duration-1000 delay-1000">
                    <Button
                        size="lg"
                        onClick={onCtaClick}
                        className={cn(
                            "group relative overflow-hidden",
                            "bg-gradient-to-r from-terracotta to-forest",
                            "text-white border-0",
                            "px-10 py-7 md:px-12 md:py-8",
                            "text-base md:text-lg font-medium",
                            "rounded-full",
                            "shadow-2xl hover:shadow-3xl",
                            "transform hover:-translate-y-1",
                            "transition-all duration-500",
                            "hover:from-terracotta/90 hover:to-forest/90"
                        )}
                    >
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />

                        <span className="relative flex items-center gap-3">
                            {ctaText}
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                    </Button>

                    <Button
                        size="lg"
                        variant="outline"
                        className={cn(
                            "border-sand/30 text-sand",
                            "bg-white/5 backdrop-blur-sm",
                            "px-8 py-7",
                            "rounded-full",
                            "hover:bg-sand hover:text-forest",
                            "transition-all duration-500",
                            "hover:border-sand"
                        )}
                    >
                        Explore Tours
                    </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto pt-12 animate-in fade-in duration-1000 delay-1200">
                    {[
                        { value: "500+", label: "Curated Experiences" },
                        { value: "98%", label: "Client Satisfaction" },
                        { value: "15+", label: "Years Excellence" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="font-serif text-3xl md:text-4xl text-sand font-bold">
                                {stat.value}
                            </div>
                            <div className="text-sand/70 text-xs md:text-sm uppercase tracking-wider mt-2">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};