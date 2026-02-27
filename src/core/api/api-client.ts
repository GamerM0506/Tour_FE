export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

async function fetchClient<T>(
    endpoint: string,
    method: RequestMethod,
    body?: any,
    customHeaders: HeadersInit = {}
): Promise<T> {

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...customHeaders,
    };

    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            (headers as any)["Authorization"] = `Bearer ${token}`;
        }
    }

    const config: RequestInit = {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        if (!response.ok) {
            if (response.status === 401) {
                if (typeof window !== "undefined") {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/auth";
                }
            }

            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `API Error: ${response.status}`);
        }
        return await response.json();

    } catch (error: any) {
        console.error("API Call Failed:", error);
        throw error;
    }
}

export const apiClient = {
    get: <T>(url: string) => fetchClient<T>(url, "GET"),
    post: <T>(url: string, body: any) => fetchClient<T>(url, "POST", body),
    put: <T>(url: string, body: any) => fetchClient<T>(url, "PUT", body),
    delete: <T>(url: string) => fetchClient<T>(url, "DELETE"),
};