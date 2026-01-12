// components/FeaturedTours/components/ToursGrid.tsx
import { cn } from "@/core/utils/cn";
import { TourCard } from "./TourCard";
import { Tour } from "../types";

interface ToursGridProps {
  tours: Tour[];
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export const ToursGrid = ({ 
  tours, 
  className,
  variant = 'default' 
}: ToursGridProps) => {
  const gridClasses = {
    default: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
    compact: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
    featured: "grid grid-cols-1 lg:grid-cols-2 gap-12"
  };

  return (
    <div className={cn(gridClasses[variant], className)}>
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          tour={tour}
          className={cn(
            variant === 'featured' && "first:lg:col-span-2 first:lg:row-span-2"
          )}
        />
      ))}
    </div>
  );
};