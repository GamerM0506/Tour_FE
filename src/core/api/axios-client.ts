import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.post(
          `${baseURL}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );
        const { access_token } = res.data;
        localStorage.setItem("accessToken", access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axiosClient(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/auth";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;