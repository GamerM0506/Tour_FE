import { Plus } from "lucide-react";
import { Tour } from "@/features/tours/types";
import { TourListItem } from "./tour-list-item";

interface TourListViewProps {
    tours: Tour[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onCreate: () => void;
}

export const TourListView = ({ tours, onEdit, onDelete, onCreate }: TourListViewProps) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 rounded-lg text-xs font-semibold text-gray-500 uppercase tracking-wider border border-gray-100">
                <div className="col-span-5 md:col-span-4">Tour Info</div>
                <div className="hidden md:block col-span-2">Status</div>
                <div className="hidden md:block col-span-2">Price</div>
                <div className="hidden md:block col-span-2">Duration</div>
                <div className="col-span-7 md:col-span-2 text-right">Actions</div>
            </div>

            {tours.map((tour) => (
                <TourListItem
                    key={tour.id}
                    tour={tour}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

            <div
                onClick={onCreate}
                className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-terracotta hover:border-terracotta/50 hover:bg-terracotta/5 cursor-pointer transition-all bg-gray-50/50 hover:bg-white"
            >
                <Plus size={18} />
                <span className="font-medium">Add New Tour</span>
            </div>
        </div>
    );
};