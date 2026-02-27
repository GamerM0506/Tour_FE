import { Loader2 } from "lucide-react";
import { Tour } from "@/features/tours/types";
import { TourEmptyState } from "./tour-empty-state";
import { TourGridView } from "./tour-grid-view";
import { TourListView } from "./tour-list-view";

interface TourGridProps {
    tours: Tour[];
    isLoading: boolean;
    isError: boolean;
    viewMode: "grid" | "list";
    searchTerm: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onCreate: () => void;
}

export const TourGrid = ({
    tours, isLoading, isError, viewMode, searchTerm, onEdit, onDelete, onCreate
}: TourGridProps) => {
    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center text-forest/50">
                <Loader2 className="animate-spin mb-4" size={40} />
                <p>Loading tours...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-20 text-center text-red-500 bg-red-50 rounded-xl">
                Error loading tours. Please try again.
            </div>
        );
    }

    if (tours.length === 0) {
        return <TourEmptyState searchTerm={searchTerm} onCreate={onCreate} />;
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                    Showing <span className="font-bold">{tours.length}</span> results
                    {searchTerm && <span> for "<span className="font-bold text-forest">{searchTerm}</span>"</span>}
                </p>
            </div>

            {viewMode === "grid" ? (
                <TourGridView 
                    tours={tours} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    onCreate={onCreate} 
                />
            ) : (
                <TourListView 
                    tours={tours} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    onCreate={onCreate} 
                />
            )}
        </div>
    );
};