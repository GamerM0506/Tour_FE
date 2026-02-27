"use client";

import Image from "next/image";

interface VisualBreakProps {
    imageSrc: string;
    altText?: string;
    height?: string;
}

export const VisualBreak = ({
    imageSrc,
    altText = "Hanoi local food experience",
    height = "h-[60vh] md:h-[80vh]",
}: VisualBreakProps) => {
    return (
        <section className={`relative w-full ${height}`}>
            <Image
                src={imageSrc}
                alt={altText}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1600px"
                quality={80}
            />
        </section>
    );
};