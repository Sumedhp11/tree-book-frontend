/* eslint-disable react/prop-types */
import axios from "axios";
import { useLayoutEffect, createContext, useState } from "react";

export const AdminAuthContext = createContext(undefined);

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const AdminAuthProvider = ({ children }) => {
  const [authToken, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const authInterceptor = apiClient.interceptors.request.use(
      (config) => {
        console.log("Setting Token", authToken);
        if (authToken && !config._retry) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(authInterceptor);
    };
  }, [authToken]);

  useLayoutEffect(() => {
    const refreshInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.message === "Invalid or expired access token" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            console.log('refreshToken',error);

            const { data } = await axios.get(
              "http://localhost:8080/api/admin/refresh-token",
              { withCredentials: true }
            );
            console.log(data, "Token refreshed");

            // Set new access token
            setToken(data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return apiClient(originalRequest);
          } catch (refreshError) {
            console.error("Refresh token failed:", refreshError);
            setToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.response.eject(refreshInterceptor);
    };
  }, [authToken]);

  return (
    <AdminAuthContext.Provider
      value={{ authToken, setToken, setIsLoading, isLoading, apiClient }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthProvider;
