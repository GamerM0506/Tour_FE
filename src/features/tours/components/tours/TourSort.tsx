"use client";

import { cn } from "@/core/utils/cn";
import { Button } from "@/core/components/ui/button";
import { ChevronDown, Grid, List } from "lucide-react";
import { useState } from "react";

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
    const [sortBy, setSortBy] = useState('popular');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const sortOptions = [
        { value: 'popular', label: 'Most Popular' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'price_low', label: 'Price: Low to High' },
        { value: 'price_high', label: 'Price: High to Low' },
        { value: 'duration', label: 'Duration' },
        { value: 'newest', label: 'Newest' },
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
                    {totalTours} {totalTours === 1 ? 'tour' : 'tours'} found
                </span>
                <span className="text-sm text-jet/40">•</span>
                <span className="text-sm text-jet/60">
                    Showing 1-{Math.min(totalTours, 12)} of {totalTours}
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 p-1 bg-sand-light rounded-lg">
                    <Button
                        size="sm"
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        className={cn(
                            "px-3",
                            viewMode === 'grid' && "bg-white text-forest shadow-sm"
                        )}
                        onClick={() => handleViewChange('grid')}
                    >
                        <Grid size={18} />
                    </Button>
                    <Button
                        size="sm"
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        className={cn(
                            "px-3",
                            viewMode === 'list' && "bg-white text-forest shadow-sm"
                        )}
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
                                Sort by: {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-jet/40 pointer-events-none" size={16} />
                </div>
            </div>
        </div>
    );
};