import axios, { AxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig to include `_retry`
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
    _retry?: boolean;
  }

const axiosInstance = axios.create({
  baseURL: "https://deployment-sao-plymouth-ecological.trycloudflare.com/api",
  withCredentials: true, // Ensure cookies are sent with the request
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add token to headers if needed, check for expired token here if required
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as AxiosRequestConfigWithRetry;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        if (originalRequest.url === "/auth/refresh-token") {
          return Promise.reject(error);
        }

        try {
          await axiosInstance.post("/auth/refresh-token");
          return axiosInstance(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
      }

        return Promise.reject(error);
    }
);

export default axiosInstance;
