import { Plus } from "lucide-react";
import { AdminTourCard } from "@/features/admin/components/tour-management-card";
import { Tour } from "@/features/tours/types";

interface TourGridViewProps {
    tours: Tour[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onCreate: () => void;
}

export const TourGridView = ({ tours, onEdit, onDelete, onCreate }: TourGridViewProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {tours.map((tour) => (
                <AdminTourCard
                    key={tour.id}
                    tour={tour}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

            <div
                onClick={onCreate}
                className="border-2 border-dashed border-gray-300 hover:border-terracotta hover:bg-terracotta/5 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-terracotta transition-all group min-h-[400px] cursor-pointer bg-gray-50/30"
            >
                <div className="w-16 h-16 rounded-full bg-gray-100 group-hover:bg-terracotta/10 flex items-center justify-center mb-4 transition-all">
                    <Plus size={32} className="group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-lg font-bold">Add New</h3>
            </div>
        </div>
    );
};