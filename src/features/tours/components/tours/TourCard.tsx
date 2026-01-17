"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/core/components/ui/button";
import { Star, Clock, MapPin, Users } from "lucide-react";
import { Tour } from "../../types";

interface TourCardProps {
    data: Tour;
}

export const TourCard = ({ data }: TourCardProps) => {
    return (
        <div className="group flex flex-col bg-white rounded-xl overflow-hidden border border-sand-light hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={data.image}
                    alt="Vietnam Luxury Travel Landscape"
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

                {data.originalPrice && (
                    <div className="absolute top-4 left-4 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full">
                        Save {data.currency}{data.originalPrice - data.price}
                    </div>
                )}

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
                    <div className="font-serif font-bold text-xl text-forest">
                        {data.currency}{data.price}
                    </div>
                    {data.originalPrice && (
                        <div className="text-xs text-jet/40 line-through">
                            {data.currency}{data.originalPrice}
                        </div>
                    )}
                </div>

                <div className="absolute top-4 right-4">
                    <span className={`
            px-2 py-1 text-xs font-bold rounded-full backdrop-blur-sm
            ${data.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : ''}
            ${data.difficulty === 'Moderate' ? 'bg-yellow-100 text-yellow-800' : ''}
            ${data.difficulty === 'Challenging' ? 'bg-red-100 text-red-800' : ''}
          `}>
                        {data.difficulty}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-terracotta" />
                        <span className="text-sm font-medium text-jet/70">{data.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-jet">{data.rating}</span>
                        <span className="text-sm text-jet/50">({data.reviewCount})</span>
                    </div>
                </div>

                <Link href={`/tours/${data.id}`} className="block mb-3">
                    <h3 className="font-serif text-xl font-bold text-jet group-hover:text-terracotta transition-colors line-clamp-2 min-h-[56px]">
                        {data.title}
                    </h3>
                </Link>

                <p className="text-jet/60 text-sm mb-4 line-clamp-2 flex-1">
                    {data.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {data.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-sand-light text-jet text-xs rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-sm text-jet/60">
                        <Clock size={16} />
                        <span>{data.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-forest">
                        {data.category[0]}
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-sand-light">
                    <Link href={`/tours/${data.id}`} className="w-full block">
                        <Button className="w-full bg-gradient-to-r from-forest to-terracotta text-white hover:opacity-90 transition-all font-medium">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};