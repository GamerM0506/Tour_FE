"use client";

import { useQuery } from "@tanstack/react-query";
import { TourUpdateForm } from "@/features/admin/components/tours/tour-update-form"; // Import component mới
import { tourService } from "@/features/tours/services/tour-service";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

export default function EditTourPage() {
    const params = useParams();
    const id = params.id as string;

    const { data: tour, isLoading, isError } = useQuery({
        queryKey: ["tour", id],
        queryFn: () => tourService.getTourById(id),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <div className="h-[80vh] flex flex-col items-center justify-center text-forest">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p>Loading journey details...</p>
            </div>
        );
    }

    if (isError || !tour) {
        return (
            <div className="h-[50vh] flex items-center justify-center text-red-500">
                Failed to load tour data. Please try again.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <TourUpdateForm tour={tour} />
        </div>
    );
}