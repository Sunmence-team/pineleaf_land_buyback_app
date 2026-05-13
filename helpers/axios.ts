import { globals } from "@/lib/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// api constructor
const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000
})

// interceptor
let requestInterceptor: number;
let responseInterceptor: number;

export const setupInterceptors = (logout: () => void) => {
    if (requestInterceptor !== undefined) {
    api.interceptors.request.eject(requestInterceptor);
    }

    if (responseInterceptor !== undefined) {
    api.interceptors.response.eject(responseInterceptor);
    }

    requestInterceptor = api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem(globals.AUTH_TOKEN_KEY);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
    });

    responseInterceptor = api.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.code === "ERR_NETWORK") {
            console.error("No internet or server down");
        } else if (error.response?.status === 401) {
            logout();
            throw new Error("Session expired. Logging out...");
        }

        return Promise.reject(error);
    }
    );
};

export default api;