"use client";

import { cn } from "@/core/utils/cn";
import { Button } from "@/core/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface TourPaginationProps {
    className?: string;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const TourPagination = ({
    className,
    currentPage,
    totalPages,
    onPageChange
}: TourPaginationProps) => {
    const getPageNumbers = (): (number | string)[] => {
        const delta = 2;
        const range: number[] = [];
        const rangeWithDots: (number | string)[] = [];
        let l: number | undefined;

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                range.push(i);
            }
        }

        range.forEach((i) => {
            if (l !== undefined) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        });

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    const pageNumbers = getPageNumbers();

    return (
        <div className={cn("flex items-center justify-center gap-2", className)}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 border-sand-light text-jet hover:bg-forest hover:text-white"
            >
                <ChevronLeft size={16} />
                Previous
            </Button>

            <div className="flex items-center gap-1">
                {pageNumbers.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`dots-${index}`} className="px-3 py-2 text-jet/40">
                                ...
                            </span>
                        );
                    }

                    return (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(Number(page))}
                            className={cn(
                                "min-w-[40px]",
                                currentPage === page
                                    ? "bg-forest text-white"
                                    : "border-sand-light text-jet hover:bg-sand-light"
                            )}
                        >
                            {page}
                        </Button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 border-sand-light text-jet hover:bg-forest hover:text-white"
            >
                Next
                <ChevronRight size={16} />
            </Button>
        </div>
    );
};