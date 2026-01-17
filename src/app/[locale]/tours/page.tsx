"use client";

import { useState, useEffect } from "react";
import { TourHero } from "@/features/tours/components/tours/TourHero";
import { TourFilter } from "@/features/tours/components/tours/TourFilter";
import { TourGrid } from "@/features/tours/components/tours/TourGrid";
import { TourSort } from "@/features/tours/components/tours/TourSort";
import { TourPagination } from "@/features/tours/components/tours/TourPagination";
import { tours as allTours } from "@/features/tours/data/tours";
import { Tour } from "@/features/tours/types";

export default function ToursPage() {
    const [filteredTours, setFilteredTours] = useState<Tour[]>(allTours);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');

    const toursPerPage = 6;

    useEffect(() => {
        let sortedTours = [...allTours];

        switch (sortBy) {
            case 'popular':
                sortedTours.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
            case 'rating':
                sortedTours.sort((a, b) => b.rating - a.rating);
                break;
            case 'price_low':
                sortedTours.sort((a, b) => a.price - b.price);
                break;
            case 'price_high':
                sortedTours.sort((a, b) => b.price - a.price);
                break;
            case 'duration':
                sortedTours.sort((a, b) => b.days - a.days);
                break;
            case 'newest':
                sortedTours.sort((a, b) => parseInt(b.id) - parseInt(a.id));
                break;
        }

        setFilteredTours(sortedTours);
        setCurrentPage(1);
    }, [sortBy]);

    const totalPages = Math.ceil(filteredTours.length / toursPerPage);
    const startIndex = (currentPage - 1) * toursPerPage;
    const endIndex = startIndex + toursPerPage;
    const currentTours = filteredTours.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-sand-light">
            <TourHero />

            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/4">
                        <div className="sticky top-24">
                            <TourFilter />
                            <div className="mt-6 p-4 bg-white/50 rounded-lg border border-sand-light">
                                <h4 className="font-bold text-sm uppercase tracking-wider text-jet mb-3">
                                    Need Help?
                                </h4>
                                <p className="text-sm text-jet/60 mb-3">
                                    Our travel experts are here to help you find the perfect tour.
                                </p>
                                <button className="w-full py-2 bg-forest text-white rounded-lg hover:bg-terracotta transition-colors text-sm font-medium">
                                    Contact Expert
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-3/4">
                        <TourSort
                            totalTours={filteredTours.length}
                            onSortChange={setSortBy}
                            onViewChange={setViewMode}
                            className="mb-6"
                        />

                        <TourGrid
                            tours={currentTours}
                            variant={viewMode}
                            className="mb-8"
                        />

                        {filteredTours.length === 0 && (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🧭</div>
                                <h3 className="font-serif text-2xl text-jet mb-2">No tours found</h3>
                                <p className="text-jet/60 mb-6">
                                    Try adjusting your filters or search terms
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-6 py-3 bg-forest text-white rounded-lg hover:bg-terracotta transition-colors"
                                >
                                    Reset All Filters
                                </button>
                            </div>
                        )}

                        {filteredTours.length > 0 && (
                            <div className="mt-12">
                                <TourPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        )}

                        <div className="mt-16 p-8 bg-gradient-to-r from-forest to-terracotta rounded-2xl text-center text-white">
                            <h3 className="font-serif text-2xl md:text-3xl mb-4">
                                Can't find the perfect tour?
                            </h3>
                            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                                Our travel experts can create a completely customized itinerary just for you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-white text-forest font-medium rounded-lg hover:bg-sand transition-colors">
                                    Customize Your Tour
                                </button>
                                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                                    Schedule Consultation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}