import { create } from "zustand";
import { User } from "../types/auth-types";
import { authStorage } from "@/core/utils/auth-storage";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    loadUserFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    login: (user, accessToken) => {
        authStorage.setAccessToken(accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        set({ user, isAuthenticated: true });
    },

    logout: () => {
        authStorage.clearToken();
        set({ user: null, isAuthenticated: false });
    },

    loadUserFromStorage: () => {
        if (typeof window === "undefined") return;

        const userStr = localStorage.getItem("user");
        const token = authStorage.getToken();

        if (userStr && token) {
            set({ user: JSON.parse(userStr), isAuthenticated: true });
        }
    },
}));