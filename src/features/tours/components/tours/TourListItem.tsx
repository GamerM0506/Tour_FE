"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Accessibility, ArrowRight } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Tour } from "../../types";
import { useTranslations, useLocale } from "next-intl";

export const TourListItem = ({ data }: { data: Tour }) => {
  const t = useTranslations("Tours.Card");
  const locale = useLocale();

  const thumbnail = data.images?.[0] || "/images/placeholder-tour.jpg";

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency', currency: data.pricing.currency || 'USD', maximumFractionDigits: 0
  }).format(data.pricing.basePrice);

  return (
    <div className="group flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="md:w-[320px] aspect-[4/3] md:aspect-auto relative shrink-0">
        <Image
          src={thumbnail}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-forest uppercase tracking-wider">
          {data.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-forest transition-colors line-clamp-2 pr-4">
            <Link href={`/tours/${data.slug}`}>{data.name}</Link>
          </h3>
          <div className="text-lg font-bold text-forest shrink-0">
            {data.pricing.isFree ? t("free") : formattedPrice}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-terracotta" />
            <span>{data.durationHours} {t("hours")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={16} className="text-terracotta" />
            <span className="line-clamp-1">{data.meetingPoint}</span>
          </div>
          {data.wheelchairAccessible && (
            <div className="flex items-center gap-1.5 text-green-600">
              <Accessibility size={16} />
              <span>{t("accessible")}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">
          {data.description}
        </p>

        <div className="flex items-center justify-end">
          <Link href={`/tours/${data.slug}`}>
            <Button className="bg-white border-2 border-forest text-forest hover:bg-forest hover:text-white transition-colors">
              {t("view_itinerary")} <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};