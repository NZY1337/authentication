import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3010/api",
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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Mark the request as a retry to prevent multiple attempts
      originalRequest._retry = true;

      // Avoid infinite loops if the error is on the refresh-token endpoint itself
      if (originalRequest.url === "/auth/refresh-token") {
        // You can suppress the log here to prevent unnecessary output
        return Promise.reject(error); // Reject after refresh fails without logging
      }

      try {
        await axiosInstance.post("/auth/refresh-token");
        // Set the new token in the request headers
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Optionally log here, but prevent it from going to the console if necessary
        // console.log("Error refreshing token:", refreshError); // You can remove this line
        return Promise.reject(refreshError); // Reject the request if token refresh fails
      }
    }

    return Promise.reject(error); // Reject original error, will log as usual
  }
);

export default axiosInstance;
