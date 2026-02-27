import { LayoutGrid } from "lucide-react";
import { Badge } from "@/core/components/ui/badge";

interface TourStatsProps {
    stats: {
        total: number;
        published: number;
        draft: number;
        hidden: number;
    };
}

export const TourStats = ({ stats }: TourStatsProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard label="Total Tours" value={stats.total} icon={LayoutGrid} color="blue" />
            <StatCard label="Published" value={stats.published} isBadge badgeColor="bg-green-500" valueColor="text-green-600" />
            <StatCard label="Drafts" value={stats.draft} isBadge badgeColor="bg-amber-500" valueColor="text-amber-600" />
            <StatCard label="Hidden" value={stats.hidden} isBadge badgeColor="bg-gray-500" valueColor="text-gray-600" />
        </div>
    );
};

const StatCard = ({ label, value, icon: Icon, isBadge, badgeColor, valueColor }: any) => (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-2xl font-bold ${valueColor || "text-gray-800"}`}>{value}</p>
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBadge ? badgeColor.replace('bg-', 'bg-').replace('500', '100') : 'bg-blue-100'}`}>
                {isBadge ? (
                    <Badge className={`${badgeColor} w-4 h-4 p-0`} />
                ) : (
                    Icon && <Icon size={20} className="text-blue-600" />
                )}
            </div>
        </div>
    </div>
);