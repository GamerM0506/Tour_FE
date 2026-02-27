export const authStorage = {
    getToken: () => {
        if (typeof window === "undefined") return null;
        return localStorage.getItem("accessToken");
    },

    setAccessToken: (accessToken: string) => {
        if (typeof window === "undefined") return;
        localStorage.setItem("accessToken", accessToken);
    },

    clearToken: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    }
};