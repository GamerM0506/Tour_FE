import { Edit, Trash2, MapPin, Clock } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import Image from "next/image";
import { Tour, TourStatus } from "@/features/tours/types";

interface TourListItemProps {
    tour: Tour;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TourListItem = ({ tour, onEdit, onDelete }: TourListItemProps) => {
    
    const statusColors = {
        [TourStatus.PUBLISHED]: "bg-green-100 text-green-700 border-green-200",
        [TourStatus.DRAFT]: "bg-gray-100 text-gray-700 border-gray-200",
        [TourStatus.HIDDEN]: "bg-red-100 text-red-700 border-red-200",
    };

    return (
        <div className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all grid grid-cols-12 gap-4 items-center animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="col-span-5 md:col-span-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100">
                    {tour.images && tour.images.length > 0 ? (
                        <Image 
                            src={tour.images[0]} 
                            alt={tour.name} 
                            fill 
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                            <MapPin size={20} />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-forest transition-colors">
                        {tour.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-1">{tour.category}</p>
                    
                    <div className="flex md:hidden items-center gap-2 mt-1">
                         <Badge variant="outline" className={`text-[10px] px-1.5 py-0 h-5 ${statusColors[tour.status]}`}>
                            {tour.status}
                        </Badge>
                        <span className="text-xs font-medium text-terracotta">
                            ${tour.pricing?.basePrice}
                        </span>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex col-span-2">
                <Badge variant="outline" className={`capitalize ${statusColors[tour.status]}`}>
                    {tour.status.toLowerCase()}
                </Badge>
            </div>

            <div className="hidden md:flex col-span-2 flex-col">
                <span className="font-bold text-gray-800">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: tour.pricing?.currency || 'USD' }).format(tour.pricing?.basePrice || 0)}
                </span>
                {tour.pricing?.isFree && <span className="text-xs text-green-600 font-medium">Free Tour</span>}
            </div>

            <div className="hidden md:flex col-span-2 items-center text-gray-500 text-sm">
                <Clock size={14} className="mr-1.5" />
                {tour.durationHours} hours
            </div>

            <div className="col-span-7 md:col-span-2 flex justify-end gap-2 group-hover:opacity-100 transition-opacity">
                <Button 
                    variant="ghost" size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                    onClick={() => onEdit(tour.id)}
                >
                    <Edit size={16} />
                </Button>
                <Button 
                    variant="ghost" size="icon" 
                    className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(tour.id)}
                >
                    <Trash2 size={16} />
                </Button>
            </div>
        </div>
    );
};