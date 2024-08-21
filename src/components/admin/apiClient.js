// src/hooks/useApiClient.js
import axios from "axios";
import { useContext, useEffect } from "react";
import { AdminAuthContext } from "../layout/AdminAuthProvide"; // Adjust the path as needed

const useApiClient = () => {
  const { authToken } = useContext(AdminAuthContext);

  const apiClient = axios.create({
    baseURL: "https://tree-book-backend.vercel.app/api",
  });

  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (authToken) {
          config.headers["Authorization"] = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem("isLogged");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    // Clean up the interceptors when the component unmounts
    return () => {
      apiClient.interceptors.request.eject(requestInterceptor);
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [authToken]);

  return apiClient;
};

export default useApiClient;
