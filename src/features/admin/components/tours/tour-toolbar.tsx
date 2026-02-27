import { Filter, LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/core/components/ui/tabs";

interface TourToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    activeTab: string;
    onTabChange: (value: string) => void;
    viewMode: "grid" | "list";
    onViewModeChange: (mode: "grid" | "list") => void;
}

export const TourToolbar = ({
    searchTerm,
    onSearchChange,
    activeTab,
    onTabChange,
    viewMode,
    onViewModeChange
}: TourToolbarProps) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            placeholder="Search tours by name..."
                            className="pl-12 h-12 text-base bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-forest/20"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-12 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl px-6">
                        <Filter size={20} className="mr-2" /> Advanced Filters
                    </Button>
                </div>

                <div className="flex items-center gap-3">
                    <Tabs value={activeTab} onValueChange={onTabChange} className="w-auto">
                        <TabsList className="bg-gray-100 p-1 rounded-lg">
                            <TabsTrigger value="all" className="data-[state=active]:bg-white rounded-md px-4">All</TabsTrigger>
                            <TabsTrigger value="published" className="data-[state=active]:bg-white rounded-md px-4">Published</TabsTrigger>
                            <TabsTrigger value="draft" className="data-[state=active]:bg-white rounded-md px-4">Draft</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                        <Button
                            size="icon"
                            onClick={() => onViewModeChange("grid")}
                            className={`
                                    rounded-none
                                    transition-colors
                                    ${viewMode === "grid"
                                    ? "bg-forest text-white hover:bg-forest/90"
                                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"}
                            `}
                        >
                            <LayoutGrid size={20} />
                        </Button>

                        <Button
                            size="icon"
                            onClick={() => onViewModeChange("list")}
                            className={`
                                    rounded-none
                                    transition-colors
                                    ${viewMode === "list"
                                    ? "bg-forest text-white hover:bg-forest/90"
                                    : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"}
                            `}
                        >
                            <List size={20} />
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};