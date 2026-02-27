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
import { useTranslations } from "next-intl";

export default function ToursPage() {
    const t = useTranslations("Tours"); 

    const { data: apiTours, isLoading, isError } = useQuery({
        queryKey: ["public-tours"],
        queryFn: tourService.getPublicTours,
    });

    const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('popular');

    const toursPerPage = 6;

    useEffect(() => {
        if (!apiTours || !Array.isArray(apiTours)) return;

        let sortedTours = [...apiTours];

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
    }, [apiTours, sortBy]);

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
                            <div className="mt-6 p-4 bg-white/50 rounded-lg border border-sand-light">
                                <h4 className="font-bold text-sm uppercase tracking-wider text-jet mb-3">
                                    {t("Sidebar.help_title")}
                                </h4>
                                <p className="text-sm text-jet/60 mb-3">
                                    {t("Sidebar.help_desc")}
                                </p>
                                <button className="w-full py-2 bg-forest text-white rounded-lg hover:bg-terracotta transition-colors text-sm font-medium">
                                    {t("Sidebar.contact_btn")}
                                </button>
                            </div>
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

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center py-20 min-h-[400px]">
                                <Loader2 className="animate-spin text-forest mb-4" size={40} />
                                <p className="text-forest/60 font-medium">{t("Status.loading")}</p>
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className="bg-red-50 border border-red-100 rounded-xl p-8 text-center my-8">
                                <h3 className="text-red-800 font-bold text-lg mb-2">{t("Status.error_title")}</h3>
                                <p className="text-red-600 mb-4">{t("Status.error_desc")}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    {t("Status.reload_btn")}
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        {!isLoading && !isError && (
                            <>
                                <TourGrid
                                    tours={currentTours}
                                    variant={viewMode}
                                    className="mb-8"
                                />

                                {filteredTours.length === 0 && (
                                    <div className="text-center py-16">
                                        <div className="text-6xl mb-4">🧭</div>
                                        <h3 className="font-serif text-2xl text-jet mb-2">{t("Status.empty_title")}</h3>
                                        <p className="text-jet/60 mb-6">
                                            {t("Status.empty_desc")}
                                        </p>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="px-6 py-3 bg-forest text-white rounded-lg hover:bg-terracotta transition-colors"
                                        >
                                            {t("Status.reset_filters_btn")}
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
                            </>
                        )}

                        <div className="mt-16 p-8 bg-gradient-to-r from-forest to-terracotta rounded-2xl text-center text-white">
                            <h3 className="font-serif text-2xl md:text-3xl mb-4">
                                {t("CTA.title")}
                            </h3>
                            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                                {t("CTA.desc")}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-8 py-3 bg-white text-forest font-medium rounded-lg hover:bg-sand transition-colors">
                                    {t("CTA.customize_btn")}
                                </button>
                                <button className="px-8 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
                                    {t("CTA.schedule_btn")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}