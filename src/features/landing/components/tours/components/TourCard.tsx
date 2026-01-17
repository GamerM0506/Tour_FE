import Image from "next/image";
import { cn } from "@/core/utils/cn";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, Star, MapPin, Calendar } from "lucide-react";
import { Tour } from "../types";
import { useEffect, useState } from "react"; 

interface TourCardProps {
    tour: Tour;
    className?: string;
}

export const TourCard = ({ tour, className }: TourCardProps) => {
    const [reviewCount, setReviewCount] = useState<string>('');

    useEffect(() => {
        const count = Math.floor(Math.random() * 100) + 50;
        setReviewCount(`${count} reviews`);
    }, []);

    const fixedReviewCount = `${tour.id * 25 + 50} reviews`; 

    return (
        <Link
            href={`/tours/${tour.id}`}
            className={cn(
                "group block w-full",
                "transform transition-all duration-500",
                "hover:-translate-y-1 sm:hover:-translate-y-2",
                className
            )}
        >
            <div className={cn(
                "relative overflow-hidden bg-white",
                "shadow-md hover:shadow-xl transition-shadow duration-500",
                "rounded-lg sm:rounded-2xl",
                "shadow-sm sm:shadow-lg"
            )}>
                <div className={cn(
                    "relative overflow-hidden",
                    "aspect-[3/2] sm:aspect-[3/2]"
                )}>
                    <Image
                        src={tour.image}
                        alt={tour.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 30vw"
                        quality={85}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-sand/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                            <Calendar size={10} className="text-terracotta sm:w-3 sm:h-3" />
                            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-jet">
                                {tour.days}
                            </span>
                        </div>

                        {tour.originalPrice && (
                            <div className="bg-terracotta text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full">
                                -{Math.round((1 - parseInt(tour.price.replace('$', '')) / parseInt(tour.originalPrice.replace('$', ''))) * 100)}%
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                            <MapPin size={12} className="text-sand/80 sm:w-3.5 sm:h-3.5" />
                            <span className="text-xs sm:text-sm text-sand/90 font-medium">{tour.location}</span>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-white font-bold line-clamp-1">
                            {tour.title}
                        </h3>
                    </div>
                </div>

                <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
                        <span className="text-xs font-bold text-terracotta uppercase tracking-widest">
                            {tour.category}
                        </span>
                        <span className={cn(
                            "text-xs font-bold px-2 py-1 rounded-full w-fit",
                            tour.difficulty === 'Easy' && "bg-green-100 text-green-800",
                            tour.difficulty === 'Moderate' && "bg-yellow-100 text-yellow-800",
                            tour.difficulty === 'Challenging' && "bg-red-100 text-red-800"
                        )}>
                            {tour.difficulty}
                        </span>
                    </div>

                    <p className="text-jet/70 text-sm line-clamp-2 mb-3 sm:mb-4">
                        {tour.description}
                    </p>

                    {tour.rating && (
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={12}
                                        className={cn(
                                            "sm:w-3.5 sm:h-3.5",
                                            i < Math.floor(tour.rating!) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                        )}
                                    />
                                ))}
                            </div>
                            <span className="text-xs sm:text-sm text-jet/60">
                                {tour.rating} ({reviewCount || fixedReviewCount})
                            </span>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-jet/10">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <span className="font-serif text-xl sm:text-2xl font-bold text-jet">
                                    {tour.price}
                                </span>
                                {tour.originalPrice && (
                                    <span className="text-xs sm:text-sm text-jet/40 line-through">
                                        {tour.originalPrice}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] sm:text-xs text-jet/50">per person</span>
                        </div>

                        <div className="group-hover:animate-pulse">
                            <div className={cn(
                                "rounded-full bg-gradient-to-r from-terracotta to-forest text-white",
                                "flex items-center justify-center transition-transform duration-300",
                                "group-hover:scale-110 group-hover:rotate-12",
                                "w-10 h-10 sm:w-12 sm:h-12"
                            )}>
                                <ArrowUpRight size={16} className="sm:w-5 sm:h-5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};