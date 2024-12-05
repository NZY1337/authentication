import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      // Mark the request as a retry
      originalRequest._retry = true;

      // Check if the request URL is not the refresh token endpoint to avoid an infinite loop
      if (error.response?.status === 401 && originalRequest.url === "/auth/refresh-token") {
        // Return a rejected promise silently without logging
        throw new Error(error);
      }
      
      try {
        const response = await axiosInstance.post("/auth/refresh-token");
        console.log(response)
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
