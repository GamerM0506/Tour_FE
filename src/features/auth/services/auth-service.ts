// src/features/auth/services/auth-service.ts
import axiosClient from "@/core/api/axios-client"; // Import cái mới
import { ENDPOINTS } from "@/core/api/endpoints";
import { LoginPayload, RegisterPayload, AuthResponse } from "../types/auth-types";

export const authService = {
    login: async (payload: LoginPayload) => {
        return await axiosClient.post<any, AuthResponse>(ENDPOINTS.AUTH.LOGIN, payload);
    },

    register: async (payload: RegisterPayload) => {
        return await axiosClient.post<any, AuthResponse>(ENDPOINTS.AUTH.REGISTER, payload);
    },

    verifyEmail: async (token: string) => {
        return await axiosClient.get<any, { message: string }>("/auth/verify",   { params: { token } });
    },

    logout: () => {
        // Gọi API Logout trên server nếu cần
        // axiosClient.post('/auth/logout'); 
    }
};