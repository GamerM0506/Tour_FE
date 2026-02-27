"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { tourService } from "@/features/tours/services/tour-service";
import { TourHero } from "@/features/tours/components/tours/TourHero";
import { TourFilter } from "@/features/tours/components/tours/TourFilter";
import { TourGrid } from "@/features/tours/components/tours/TourGrid";
import { TourSort } from "@/features/tours/components/tours/TourSort";
import { TourPagination } from "@/features/tours/components/tours/TourPagination";
import { Tour } from "@/features/tours/types";
import { Loader2 } from "lucide-react";

export default function ToursPage() {
    const { data: toursData, isLoading, isError } = useQuery({
        queryKey: ["public-tours"],
        queryFn: tourService.getPublicTours,
    });

    const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');

    const toursPerPage = 6;

    useEffect(() => {
        if (!toursData || !Array.isArray(toursData)) return;

        let sortedTours = [...toursData];
        switch (sortBy) {
            case 'price_low':
                sortedTours.sort((a, b) => (a.pricing?.basePrice || 0) - (b.pricing?.basePrice || 0));
                break;
            case 'price_high':
                sortedTours.sort((a, b) => (b.pricing?.basePrice || 0) - (a.pricing?.basePrice || 0));
                break;
            case 'duration':
                sortedTours.sort((a, b) => (b.durationHours || 0) - (a.durationHours || 0));
                break;
            case 'newest':
                sortedTours.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'popular':
            case 'rating':
                break;
        }

        setFilteredTours(sortedTours);
    }, [toursData, sortBy]);

    const totalPages = Math.ceil(filteredTours.length / toursPerPage);
    const startIndex = (currentPage - 1) * toursPerPage;
    const endIndex = startIndex + toursPerPage;
    const currentTours = filteredTours.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-sand-light">
            <TourHero />

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* SIDEBAR */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24">
                            <TourFilter />
                        </div>
                    </div>

                    {/* MAIN CONTENT */}
                    <div className="lg:w-3/4">
                        <TourSort
                            totalTours={filteredTours.length}
                            onSortChange={setSortBy}
                            onViewChange={setViewMode}
                            className="mb-6"
                        />

                        {/* Loading */}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
                                <Loader2 className="animate-spin text-forest mb-4" size={40} />
                                <p className="text-forest/60 font-medium">Loading amazing journeys...</p>
                            </div>
                        )}

                        {/* Error */}
                        {isError && (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center my-8">
                                <h3 className="text-red-800 font-bold">Oops! Something went wrong</h3>
                                <button onClick={() => window.location.reload()} className="mt-4 underline text-red-600">Reload</button>
                            </div>
                        )}

                        {!isLoading && !isError && (
                            <>
                                <TourGrid
                                    tours={currentTours}
                                    variant={viewMode}
                                />

                                {filteredTours.length > 0 && (
                                    <div className="mt-12">
                                        <TourPagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={setCurrentPage}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}