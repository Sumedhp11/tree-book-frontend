/* eslint-disable react/prop-types */
import axios from "axios";
import { useLayoutEffect, createContext, useState } from "react";

export const AdminAuthContext = createContext(undefined);
const urls = [
  "https://tree-book-backend.vercel.app/api",
  "http://localhost:8080/api",
];
const apiClient = axios.create({
  baseURL: urls[0],
});

const AdminAuthProvider = ({ children }) => {
  const [authToken, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useLayoutEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await apiClient.get("/admin/refresh-token", {
          withCredentials: true,
        });
        console.log(data, "Token refreshed");

        setToken(data.accessToken);
      } catch (error) {
        console.error("Refresh token validation failed:", error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchToken();
  }, [authToken]);
  useLayoutEffect(() => {
    const authInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (authToken && !config._retry) {
          config.headers.token = `${authToken}`;
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
        console.log("refreshToken", error);

        if (
          error.response &&
          error.response.status === 403 &&
          error.response.data.message === "Invalid or expired token" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            const { data } = await apiClient.get("/admin/refresh-token", {
              withCredentials: true,
            });
            console.log(data, "Token refreshed");

            setToken(data.accessToken);

            originalRequest.headers.token = `${data.accessToken}`;
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
