"use client";

import { cn } from "@/core/utils/cn";
import { Button } from "@/core/components/ui/button";
import { ChevronDown, Grid, List } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface TourSortProps {
    className?: string;
    onSortChange?: (sortBy: string) => void;
    onViewChange?: (view: 'grid' | 'list') => void;
    totalTours?: number;
}

export const TourSort = ({
    className,
    onSortChange,
    onViewChange,
    totalTours = 0
}: TourSortProps) => {
    const t = useTranslations("Tours.Sort");
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const sortOptions = [
        { value: 'popular', labelKey: 'popular' },
        { value: 'rating', labelKey: 'rating' },
        { value: 'price_low', labelKey: 'price_low' },
        { value: 'price_high', labelKey: 'price_high' },
        { value: 'duration', labelKey: 'duration' },
        { value: 'newest', labelKey: 'newest' },
    ];

    const handleSortChange = (value: string) => {
        setSortBy(value);
        onSortChange?.(value);
    };

    const handleViewChange = (mode: 'grid' | 'list') => {
        setViewMode(mode);
        onViewChange?.(mode);
    };

    return (
        <div className={cn(
            "flex flex-col md:flex-row items-start md:items-center justify-between",
            "gap-4 p-4 bg-white rounded-lg border border-sand-light",
            className
        )}>
            <div className="flex items-center gap-2">
                <span className="font-medium text-jet">
                    {/* Sử dụng plural của next-intl */}
                    {t("found", { count: totalTours })}
                </span>
                <span className="text-sm text-jet/40">•</span>
                <span className="text-sm text-jet/60">
                    {t("showing", {
                        from: Math.min(1, totalTours),
                        to: Math.min(totalTours, 12),
                        total: totalTours
                    })}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 p-1 bg-sand-light rounded-lg">
                    <Button
                        size="sm"
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        className={cn("px-3", viewMode === 'grid' && "bg-white text-forest shadow-sm")}
                        onClick={() => handleViewChange('grid')}
                    >
                        <Grid size={18} />
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        className={cn("px-3", viewMode === 'list' && "bg-white text-forest shadow-sm")}
                        onClick={() => handleViewChange('list')}
                    >
                        <List size={18} />
                    </Button>
                </div>

                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className={cn(
                            "appearance-none bg-white border border-sand-light",
                            "rounded-lg py-2 pl-4 pr-10",
                            "text-sm font-medium text-jet",
                            "focus:outline-none focus:ring-2 focus:ring-forest/20",
                            "cursor-pointer"
                        )}
                    >
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {t("label")} {t(`options.${option.labelKey}`)}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-jet/40 pointer-events-none" size={16} />
                </div>
            </div>
        </div>
    );
};