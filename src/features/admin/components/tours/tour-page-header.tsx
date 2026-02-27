import { Download, Plus, Upload } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";

interface TourPageHeaderProps {
    totalTours: number;
    isLoading: boolean;
    onCreate: () => void;
}

export const TourPageHeader = ({ totalTours, isLoading, onCreate }: TourPageHeaderProps) => {
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <h1 className="font-serif text-3xl md:text-4xl text-forest font-bold">Tour Management</h1>
                    <Badge className="bg-forest/10 text-forest hover:bg-forest/20 px-3 py-1">
                        {isLoading ? "..." : totalTours} Tours
                    </Badge>
                </div>
                <p className="text-jet/60 max-w-2xl">
                    Manage your journeys, prices, and availability. Create, edit, and organize tours for your travelers.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Upload size={18} className="mr-2" /> Import
                </Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    <Download size={18} className="mr-2" /> Export
                </Button>
                <Button onClick={onCreate} className="bg-terracotta hover:bg-terracotta/90 text-white rounded-xl px-6 shadow-lg shadow-terracotta/20 transition-all">
                    <Plus size={18} className="mr-2" /> Create Tour
                </Button>
            </div>
        </div>
    );
};