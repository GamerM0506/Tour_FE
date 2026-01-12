import { cn } from "@/core/utils/cn";
import { ChevronDown, Mouse } from "lucide-react";
import { useEffect, useState } from "react";

interface ScrollIndicatorProps {
    className?: string;
    targetId?: string;
}

export const ScrollIndicator = ({
    className,
    targetId = "next-section"
}: ScrollIndicatorProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY < 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToNext = () => {
        if (targetId) {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToNext}
            className={cn(
                "absolute bottom-8 left-1/2 -translate-x-1/2 z-30",
                "group flex flex-col items-center gap-3",
                "text-sand/60 hover:text-sand",
                "transition-all duration-500",
                "animate-float",
                className
            )}
            aria-label="Scroll to next section"
        >
            <div className="relative">
                <Mouse className="w-6 h-6" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-16 border border-sand/20 rounded-full" />
            </div>

            <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase tracking-widest font-medium">
                    Scroll
                </span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </div>

            <div className="absolute -inset-4 border border-sand/10 rounded-full animate-ping-slow" />
        </button>
    );
};