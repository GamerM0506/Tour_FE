"use client";

import { cn } from "@/core/utils/cn";
import { Button } from "@/core/components/ui/button";
import { Checkbox } from "@/core/components/ui/checkbox";
import { Slider } from "@/core/components/ui/slider";
import { Label } from "@/core/components/ui/label";
import {
    Filter,
    X,
    MapPin,
    Calendar,
    DollarSign,
    TrendingUp,
    Users
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface TourFilterProps {
    className?: string;
    onFilterChange?: (filters: any) => void;
}

export const TourFilter = ({ className, onFilterChange }: TourFilterProps) => {
    const t = useTranslations("Tours.Filter");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [duration, setDuration] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [difficulties, setDifficulties] = useState<string[]>([]);
    const [regions, setRegions] = useState<string[]>([]);

    // Cấu hình options (label lấy từ JSON)
    const durationOptions = [
        { id: "1-3", labelKey: "days_1_3", value: "1-3" },
        { id: "4-7", labelKey: "days_4_7", value: "4-7" },
        { id: "7+", labelKey: "days_7_plus", value: "7+" },
    ];

    const categoryOptions = [
        { id: "adventure", labelKey: "adventure", icon: TrendingUp },
        { id: "luxury", labelKey: "luxury", icon: DollarSign },
        { id: "cultural", labelKey: "cultural", icon: Users },
        { id: "beach", labelKey: "beach", icon: Users },
        { id: "trekking", labelKey: "trekking", icon: TrendingUp },
        { id: "culinary", labelKey: "culinary", icon: Users },
    ];

    const difficultyOptions = [
        { id: "easy", labelKey: "easy" },
        { id: "moderate", labelKey: "moderate" },
        { id: "challenging", labelKey: "challenging" },
    ];

    const regionOptions = [
        { id: "north", labelKey: "north" },
        { id: "central", labelKey: "central" },
        { id: "south", labelKey: "south" },
        { id: "mekong", labelKey: "mekong" },
        { id: "highlands", labelKey: "highlands" },
    ];

    const handleReset = () => {
        setPriceRange([0, 5000]);
        setDuration([]);
        setCategories([]);
        setDifficulties([]);
        setRegions([]);
        onFilterChange?.({
            priceRange: [0, 5000],
            duration: [],
            categories: [],
            difficulties: [],
            regions: [],
        });
    };

    const handleApply = () => {
        onFilterChange?.({
            priceRange,
            duration,
            categories,
            difficulties,
            regions,
        });
    };

    const FilterSection = ({
        title,
        icon: Icon,
        children
    }: {
        title: string;
        icon: any;
        children: React.ReactNode;
    }) => (
        <div className="space-y-4 border-b border-sand-light pb-6 last:border-0">
            <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-terracotta" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-jet">
                    {title}
                </h4>
            </div>
            <div className="space-y-3">
                {children}
            </div>
        </div>
    );

    return (
        <div className={cn(
            "space-y-6 p-6 bg-white border border-sand-light rounded-xl",
            "shadow-sm sticky top-24",
            className
        )}>
            <div className="flex items-center justify-between pb-4 border-b border-sand-light">
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-terracotta" />
                    <h3 className="font-serif text-xl font-bold text-forest">{t("title")}</h3>
                </div>
                <button
                    onClick={handleReset}
                    className="text-xs text-terracotta hover:underline uppercase font-medium flex items-center gap-1"
                >
                    <X className="w-3 h-3" />
                    {t("reset")}
                </button>
            </div>

            <FilterSection title={t("sections.price")} icon={DollarSign}>
                <div className="space-y-4">
                    <Slider
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        min={0}
                        max={5000}
                        step={100}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-jet/60">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}+</span>
                    </div>
                </div>
            </FilterSection>

            <FilterSection title={t("sections.duration")} icon={Calendar}>
                <div className="space-y-2">
                    {durationOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`duration-${option.id}`}
                                checked={duration.includes(option.value)}
                                onCheckedChange={(checked) => {
                                    setDuration(checked ? [...duration, option.value] : duration.filter((d) => d !== option.value));
                                }}
                                className="border-sand-light data-[state=checked]:bg-terracotta data-[state=checked]:border-terracotta"
                            />
                            <Label htmlFor={`duration-${option.id}`} className="text-sm text-jet/80 cursor-pointer font-normal">
                                {t(`options.${option.labelKey}`)}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title={t("sections.style")} icon={Users}>
                <div className="space-y-2">
                    {categoryOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <div key={option.id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`category-${option.id}`}
                                    checked={categories.includes(option.id)}
                                    onCheckedChange={(checked) => {
                                        setCategories(checked ? [...categories, option.id] : categories.filter((c) => c !== option.id));
                                    }}
                                    className="border-sand-light data-[state=checked]:bg-terracotta data-[state=checked]:border-terracotta"
                                />
                                <Label htmlFor={`category-${option.id}`} className="text-sm text-jet/80 cursor-pointer font-normal flex items-center gap-2">
                                    <Icon className="w-3 h-3" />
                                    {t(`options.${option.labelKey}`)}
                                </Label>
                            </div>
                        );
                    })}
                </div>
            </FilterSection>

            <FilterSection title={t("sections.difficulty")} icon={TrendingUp}>
                <div className="space-y-2">
                    {difficultyOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`difficulty-${option.id}`}
                                checked={difficulties.includes(option.id)}
                                onCheckedChange={(checked) => {
                                    setDifficulties(checked ? [...difficulties, option.id] : difficulties.filter((d) => d !== option.id));
                                }}
                                className="border-sand-light data-[state=checked]:bg-terracotta data-[state=checked]:border-terracotta"
                            />
                            <Label
                                htmlFor={`difficulty-${option.id}`}
                                className={cn(
                                    "text-sm cursor-pointer font-normal px-2 py-1 rounded-full",
                                    option.id === 'easy' && "text-green-700 bg-green-50",
                                    option.id === 'moderate' && "text-yellow-700 bg-yellow-50",
                                    option.id === 'challenging' && "text-red-700 bg-red-50"
                                )}
                            >
                                {t(`options.${option.labelKey}`)}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title={t("sections.region")} icon={MapPin}>
                <div className="space-y-2">
                    {regionOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={`region-${option.id}`}
                                checked={regions.includes(option.id)}
                                onCheckedChange={(checked) => {
                                    setRegions(checked ? [...regions, option.id] : regions.filter((r) => r !== option.id));
                                }}
                                className="border-sand-light data-[state=checked]:bg-terracotta data-[state=checked]:border-terracotta"
                            />
                            <Label htmlFor={`region-${option.id}`} className="text-sm text-jet/80 cursor-pointer font-normal">
                                {t(`options.${option.labelKey}`)}
                            </Label>
                        </div>
                    ))}
                </div>
            </FilterSection>

            <Button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-forest to-terracotta text-white hover:opacity-90 transition-all py-6 text-base font-medium"
            >
                {t("apply")}
            </Button>

            {(duration.length > 0 || categories.length > 0 || difficulties.length > 0 || regions.length > 0) && (
                <div className="pt-4 border-t border-sand-light">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-jet/60">{t("active_count")}</span>
                        <span className="font-medium text-forest">
                            {duration.length + categories.length + difficulties.length + regions.length}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};