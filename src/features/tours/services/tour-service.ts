import axiosClient from "@/core/api/axios-client";
import { Tour, GetToursRequestDto, PaginatedResponse } from "../types";
import { CreateTourFormValues } from "@/features/admin/schemas/tour-schema";

export const tourService = {
    getAdminTours: async (params: GetToursRequestDto) => {
        return await axiosClient.get<any, PaginatedResponse<Tour>>("/tours/admin/all", {
            params,
        });
    },

    createTour: async (data: CreateTourFormValues) => {
        return await axiosClient.post("/tours", data);
    },

    getTourById: async (id: string) => {
        return await axiosClient.get<any, Tour>(`/tours/${id}`);
    },

    updateTour: async ({ id, data }: { id: string; data: CreateTourFormValues }) => {
        return await axiosClient.patch<any, Tour>(`/tours/${id}`, data);
    },

    deleteTour: async (id: string) => {
        return await axiosClient.delete(`/tours/${id}`);
    },

    getPublicTours: async () => {
        const response = await axiosClient.get<any, PaginatedResponse<Tour>>("/tours", {
            params: {
                limit: 10,
            }
        });
        return response.data;
    },

    getTourSlug: async (slug: string) => {
        return await axiosClient.get<any, Tour>(`/tours/${slug}`);
    },
};