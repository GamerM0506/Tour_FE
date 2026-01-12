import { cn } from "@/core/utils/cn";

interface BackgroundPatternProps {
    className?: string;
    variant?: "default" | "minimal" | "geometric";
}

export const BackgroundPattern = ({
    className,
    variant = "default"
}: BackgroundPatternProps) => {
    if (variant === "minimal") {
        return (
            <>
                <div className={cn(
                    "absolute top-0 left-0 w-full h-px",
                    "bg-gradient-to-r from-transparent via-terracotta/10 to-transparent",
                    className
                )} />
                <div className={cn(
                    "absolute bottom-0 left-0 w-full h-px",
                    "bg-gradient-to-r from-transparent via-forest/10 to-transparent",
                    className
                )} />
            </>
        );
    }

    if (variant === "geometric") {
        return (
            <>
                <div className={cn(
                    "absolute top-1/4 -left-24 w-48 h-48 rounded-full",
                    "bg-terracotta/5 blur-3xl",
                    className
                )} />
                <div className={cn(
                    "absolute bottom-1/4 -right-24 w-64 h-64 rounded-full",
                    "bg-forest/5 blur-3xl",
                    className
                )} />
            </>
        );
    }

    return (
        <>
            <div className={cn(
                "absolute top-0 left-0 w-full h-px",
                "bg-gradient-to-r from-transparent via-forest/10 to-transparent",
                className
            )} />

            <div className={cn(
                "absolute bottom-0 left-0 w-full h-px",
                "bg-gradient-to-r from-transparent via-terracotta/10 to-transparent",
                className
            )} />

            <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-terracotta/10 blur-sm" />
            <div className="absolute bottom-20 right-10 w-8 h-8 rounded-full bg-forest/10 blur-sm" />
        </>
    );
};