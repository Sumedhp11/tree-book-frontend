import axios from "axios";
import { useContext, useEffect } from "react";
import { AdminAuthContext } from "../layout/AdminAuthProvide"; // Adjust the path as needed

const useApiClient = () => {
  const { authToken, setToken } = useContext(AdminAuthContext);

  const apiClient = axios.create({
    baseURL: "https://tree-book-backend.vercel.app/api",
  });

  useEffect(() => {
    // Request interceptor to add token to headers
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers["authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token expiration
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the token is expired, attempt to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const response = await apiClient(originalRequest);

            if (response.data.accessToken) {
              setToken(response.data.accessToken); // Update the token in context
              originalRequest.headers[
                "authorization"
              ] = `Bearer ${response.data.accessToken}`;
              return apiClient(originalRequest); // Retry the original request with the new token
            }
          } catch (refreshError) {
            // If refreshing fails, log out the user
            localStorage.removeItem("isLogged");
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Clean up the interceptors when the component unmounts
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken, setToken]);

  return apiClient;
};

export default useApiClient;
