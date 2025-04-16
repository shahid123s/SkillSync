import axios from "axios";
import { toast } from "sonner";

export const reviewerAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REVIEWER_API_URI,
  withCredentials: true,
});

let isRefreshing = false;

reviewerAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('access token expire triggered');
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await reviewerAxiosInstance.post('/refresh-token');
          isRefreshing = false;

          return reviewerAxiosInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;

          toast.info("Please login again");
          localStorage.removeItem("reviewerSession");
          window.location.href = "/reviewer/login";
          return Promise.reject(refreshError);
        }
      }
    }

    if (
      (error.response?.status === 403 &&
        error.response.data.message ===
          "Access denied. You do not have permission to access this resource.") ||
      (error.response.status === 403 &&
        error.response.data.message ===
          "Access denied: Your account has been blocked" &&
        !originalRequest._retry)
    ) {
      localStorage.removeItem("adminSession");
      window.location.href = "/admin/login";
      toast.info("Please login again");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);