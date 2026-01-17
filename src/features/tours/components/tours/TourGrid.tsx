// features/tours/components/TourGrid.tsx
import { cn } from "@/core/utils/cn";
import { TourCard } from "./TourCard";
import { Tour } from "../../types";
import Image from "next/image";
import { Clock, Link, MapPin, Star } from "lucide-react";
import { Button } from "@/core/components/ui/button";

interface TourGridProps {
    tours: Tour[];
    className?: string;
    variant?: 'grid' | 'list';
}

export const TourGrid = ({
    tours,
    className,
    variant = 'grid'
}: TourGridProps) => {
    if (variant === 'list') {
        return (
            <div className={cn("space-y-6", className)}>
                {tours.map((tour) => (
                    <div key={tour.id} className="flex flex-col md:flex-row bg-white rounded-xl overflow-hidden border border-sand-light hover:shadow-xl transition-all duration-300">
                        {/* Image */}
                        <div className="md:w-1/3 aspect-[4/3] relative overflow-hidden">
                            <Image
                                src={tour.image}
                                alt={tour.title}
                                fill
                                className="object-cover transition-transform duration-700 hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            {/* Price badge */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg">
                                <div className="font-serif font-bold text-xl text-forest">
                                    {tour.currency}{tour.price}
                                </div>
                                {tour.originalPrice && (
                                    <div className="text-xs text-jet/40 line-through">
                                        {tour.currency}{tour.originalPrice}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="md:w-2/3 p-6">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={14} className="text-terracotta" />
                                        <span className="text-sm font-medium text-jet/70">{tour.location}</span>
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-jet mb-2">{tour.title}</h3>
                                    <p className="text-jet/60 mb-4 line-clamp-2">{tour.description}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-jet">{tour.rating}</span>
                                    <span className="text-sm text-jet/50">({tour.reviewCount})</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {tour.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-sand-light text-jet text-xs rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-jet/60">
                                    <div className="flex items-center gap-1">
                                        <Clock size={16} />
                                        <span>{tour.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="font-medium">{tour.difficulty}</span>
                                    </div>
                                </div>
                                <Link href={`/tours/${tour.id}`}>
                                    <Button className="bg-forest text-white hover:bg-terracotta">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
            className
        )}>
            {tours.map((tour) => (
                <TourCard key={tour.id} data={tour} />
            ))}
        </div>
    );
};