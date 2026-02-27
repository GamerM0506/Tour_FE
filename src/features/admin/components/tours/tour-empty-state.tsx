import { Plus, Search } from "lucide-react";
import { Button } from "@/core/components/ui/button";

interface TourEmptyStateProps {
    searchTerm?: string;
    onCreate?: () => void;
}

export const TourEmptyState = ({ searchTerm, onCreate }: TourEmptyStateProps) => {
    return (
        <div className="col-span-full bg-white rounded-2xl border border-gray-200 p-16 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-400" />
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3">
                {searchTerm ? "No tours found" : "No tours available"}
            </h3>

            <p className="text-gray-600 max-w-md mx-auto mb-6">
                {searchTerm ? (
                    <span>
                        No results match "<span className="font-bold text-forest">{searchTerm}</span>".
                        <br />Try adjusting your filters or search term.
                    </span>
                ) : (
                    "You haven't created any tours yet. Start your journey by adding your first tour."
                )}
            </p>

            <Button
                onClick={onCreate}
                className="bg-terracotta hover:bg-terracotta/90 text-white shadow-lg shadow-terracotta/20"
            >
                <Plus size={18} className="mr-2" /> Create New Tour
            </Button>
        </div>
    );
};