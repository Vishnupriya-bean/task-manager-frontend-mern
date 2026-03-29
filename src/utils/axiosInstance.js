import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn("No access token in localStorage for request", config.url);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const message = error.response.data?.message || error.message;
            if (error.response.status === 401) {
                console.warn(`Unauthorized request; redirecting to login: ${message}`);
                localStorage.removeItem("token");
                // we avoid hard redirect here to keep console visible
                // automatic redirection is handled by router guard (useUserAuth)
            } else if (error.response.status === 500) {
                console.error(`Server Error (${error.response.status}): ${message}`);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
