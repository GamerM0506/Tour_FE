"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Button } from "@/core/components/ui/button";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { Tour } from "../../types";
import { useTranslations, useLocale } from "next-intl";

interface TourCardProps {
  data: Tour;
}

export const TourCard = ({ data }: TourCardProps) => {
  const t = useTranslations("Tours.Card");
  const locale = useLocale(); // Lấy ngôn ngữ hiện tại để format số

  const thumbnail = data.images && data.images.length > 0
    ? data.images[0]
    : "/images/placeholder-tour.jpg";

  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: data.pricing.currency || 'USD',
    maximumFractionDigits: 0
  }).format(data.pricing.basePrice);

  return (
    <Link href={`/tours/${data.slug}`} className="block h-full">
      <div className="group h-full flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        {/* --- 1. IMAGE AREA --- */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={thumbnail}
            alt={data.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute top-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm text-forest px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
              {data.category.replace('_', ' ')}
            </span>
          </div>

          {data.pricing.isFree && (
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              {t("free_tag")}
            </div>
          )}
        </div>

        {/* --- 2. CONTENT AREA --- */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-terracotta" />
              <span>{data.durationHours} {t("hours")}</span>
            </div>
            <div className="flex items-center gap-1 line-clamp-1">
              <MapPin size={14} className="text-terracotta" />
              <span>{data.meetingPoint}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-gray-900 group-hover:text-forest transition-colors line-clamp-2 mb-2">
            {data.name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">
            {data.description}
          </p>

          {/* --- 3. FOOTER AREA --- */}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">{t("from")}</span>
              <span className="text-lg font-bold text-forest">
                {data.pricing.isFree ? t("free") : formattedPrice}
              </span>
            </div>

            <Button size="sm" className="bg-forest hover:bg-terracotta text-white rounded-lg gap-2 transition-all shadow-md group-hover:shadow-lg">
              {t("details")}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};