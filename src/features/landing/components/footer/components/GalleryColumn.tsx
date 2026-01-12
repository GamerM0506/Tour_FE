import { cn } from "@/core/utils/cn";
import Image from "next/image";
import { Camera } from "lucide-react";

interface GalleryColumnProps {
  className?: string;
}

export const GalleryColumn = ({ className }: GalleryColumnProps) => {
  const galleryImages = [
    { id: 1, src: "Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg", alt: "Ha Long Bay" },
    { id: 2, src: "Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg", alt: "Sapa Terraces" },
    { id: 3, src: "Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg", alt: "Hoi An Lanterns" },
    { id: 4, src: "Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg", alt: "Mekong Delta" },
    { id: 5, src: "Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg", alt: "Phong Nha Cave" },
    { id: 6, src: "Du-Lich-Vinh-Ha-Long-01_zcblkv.jpg", alt: "Da Lat Flowers" },
  ];

  return (
    <div className={cn(className)}>
      <div className="flex items-center gap-2 mb-6">
        <Camera className="text-terracotta" size={18} />
        <h4 className="font-bold uppercase tracking-widest text-sm text-terracotta">
          From Our Travelers
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className={cn(
              "group relative aspect-square overflow-hidden",
              "rounded-lg cursor-pointer",
              "border border-sand/10 hover:border-terracotta/50",
              "transition-all duration-300"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 33vw, 120px"
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              quality={60}
              loading="lazy"
            />
            <div className={cn(
              "absolute inset-0",
              "bg-gradient-to-br from-terracotta/20 to-forest/20",
              "group-hover:scale-110 transition-transform duration-700"
            )} />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera size={20} className="text-white" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2",
            "text-sand/60 hover:text-terracotta",
            "text-sm font-medium",
            "transition-colors duration-300"
          )}
        >
          <span>#RandomToursVietnam</span>
          <Camera size={14} />
        </a>
      </div>
    </div>
  );
};