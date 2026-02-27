"use client";

import { cn } from "@/core/utils/cn";
import { Tour } from "../../types";
import { TourCard } from "./TourCard";
import { TourListItem } from "./TourListItem";

interface TourGridProps {
  tours: Tour[];
  className?: string;
  variant?: "grid" | "list";
}

export const TourGrid = ({
  tours,
  className,
  variant = "grid",
}: TourGridProps) => {

  if (variant === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {tours.map((tour) => (
          <TourListItem key={tour.id} data={tour} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr",
        className
      )}
    >
      {tours.map((tour) => (
        <div key={tour.id} className="h-full">
          <TourCard data={tour} />
        </div>
      ))}
    </div>
  );
};