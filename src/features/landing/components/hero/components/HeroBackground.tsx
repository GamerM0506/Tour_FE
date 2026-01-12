import Image from "next/image";
import { cn } from "@/core/utils/cn";
import { useEffect, useState } from "react";

interface HeroBackgroundProps {
    imageUrl?: string;
    overlayOpacity?: number;
    className?: string;
}

export const HeroBackground = ({
    imageUrl = "wallhaven_opqtwn.jpg",
    overlayOpacity = 0.3,
    className
}: HeroBackgroundProps) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const particlePositions = [
        { left: "10%", top: "20%", delay: "0s", duration: "10s" },
        { left: "30%", top: "40%", delay: "1s", duration: "12s" },
        { left: "50%", top: "60%", delay: "2s", duration: "14s" },
        { left: "70%", top: "80%", delay: "3s", duration: "16s" },
        { left: "90%", top: "30%", delay: "4s", duration: "18s" },
        { left: "20%", top: "70%", delay: "0.5s", duration: "11s" },
        { left: "40%", top: "10%", delay: "1.5s", duration: "13s" },
        { left: "60%", top: "90%", delay: "2.5s", duration: "15s" },
        { left: "80%", top: "50%", delay: "3.5s", duration: "17s" },
        { left: "15%", top: "85%", delay: "0.8s", duration: "19s" },
    ];

    return (
        <div className={cn("absolute inset-0 z-0 overflow-hidden", className)}>
            <div className="absolute inset-0 transform-gpu will-change-transform">
                <Image
                    src={imageUrl}
                    alt="Vietnam Luxury Travel Landscape"
                    fill
                    priority
                    className="object-cover scale-105"
                    sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 100vw,
    1600px
  "
                    quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/60 to-forest/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-sand/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-forest/10 via-transparent to-forest/10" />
                <div className="absolute inset-0 opacity-30 animate-pulse-slow">
                    <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-terracotta/20 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-sand/20 to-transparent rounded-full blur-3xl" />
                </div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wMiIvPjwvc3ZnPg==')] opacity-10" />
            </div>
            {isClient && (
                <div className="absolute inset-0 overflow-hidden">
                    {particlePositions.map((pos, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-sand/20 rounded-full animate-float"
                            style={{
                                left: pos.left,
                                top: pos.top,
                                animationDelay: pos.delay,
                                animationDuration: pos.duration
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};