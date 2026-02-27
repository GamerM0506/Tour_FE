"use client";

import Image from "next/image";
import { Edit2, Trash2, Eye, MapPin, Calendar, Users, DollarSign, Star } from "lucide-react";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";

interface AdminTourCardProps {
    tour: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onView?: (id: string) => void;
}

export const AdminTourCard = ({ tour, onEdit, onDelete, onView }: AdminTourCardProps) => {
    const thumbnail = tour.images?.[0] ?? "/images/placeholder.jpg";

    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300 w-full max-w-2xl mx-auto">
            <div className="relative h-40 w-full overflow-hidden">
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt={tour.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 700px"
                        priority
                    />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute top-4 left-4 z-10">
                    <Badge
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider
        ${tour.status === 'PUBLISHED' && 'bg-green-500 hover:bg-green-600'}
        ${tour.status === 'DRAFT' && 'bg-amber-500 hover:bg-amber-600'}
        ${tour.status === 'HIDDEN' && 'bg-red-500 hover:bg-red-600'}
        `}
                    >
                        {tour.status}
                    </Badge>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-1">
                        {tour.title || tour.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                        <MapPin size={16} className="text-terracotta" />
                        <span className="text-sm font-medium">{tour.meetingPoint}</span>
                    </div>
                </div>
            </div>

            <div className="p-6 md:p-8">
                <p className="text-gray-600 mb-6 line-clamp-2 text-base">
                    {tour.description || "No description available for this tour."}
                </p>

                <div className="grid grid-cols-2 gap-3 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 bg-amber-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                            <DollarSign size={14} className="text-amber-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-500 leading-none">Price</p>
                            <p className="font-semibold text-sm text-gray-800">
                                {tour.pricing?.basePrice ?? "N/A"} {tour.pricing?.currency ?? ""}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                            <Users size={14} className="text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-500 leading-none">Bookings</p>
                            <p className="font-semibold text-sm text-gray-800">
                                {tour.bookings ?? 0}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                            <Calendar size={14} className="text-green-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-500 leading-none">Duration</p>
                            <p className="font-semibold text-sm text-gray-800">
                                {tour.durationHours ?? "N/A"}h
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                            <Eye size={14} className="text-purple-600" />
                        </div>
                        <div>
                            <p className="text-[11px] text-gray-500 leading-none">Views</p>
                            <p className="font-semibold text-sm text-gray-800">
                                {tour.views ?? 0}
                            </p>
                        </div>
                    </div>
                </div>


                <div className="mt-4 flex gap-3">
                    {onView && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 h-10 text-sm border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                            onClick={() => onView(tour.id)}
                        >
                            <Eye size={14} className="mr-2" />
                            Preview
                        </Button>
                    )}

                    <Button
                        onClick={() => onEdit(tour.id)}
                        size="sm"
                        className="flex-1 h-10 text-sm bg-forest text-white hover:bg-forest/90"
                    >
                        <Edit2 size={14} className="mr-2" />
                        Edit
                    </Button>
                    <Button
                        onClick={() => onDelete(tour.id)}
                        size="sm"
                        className="flex-1 h-10 text-sm bg-red-600 hover:bg-red-700 text-white"
                    >
                        <Trash2 size={14} className="mr-2" />
                        Delete
                    </Button>
                </div>


                <div className="mt-6 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                        Last updated: {tour.updatedAt ? new Date(tour.updatedAt).toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};