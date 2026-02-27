export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    ME: "/auth/me",
    REFRESH: "/auth/refresh",
  },
  TOURS: {
    LIST: "/tours",
    DETAIL: (id: string) => `/tours/${id}`,
    FEATURED: "/tours/featured",
  },
  USER: {
    PROFILE: "/user/profile",
    UPDATE: "/user/update",
  }
} as const;