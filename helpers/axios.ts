  import { globals } from "@/lib/constants";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { create } from "axios";
  import * as Sentry from "@sentry/react-native";

  const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

  // api constructor
  const api = create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    timeout: 30000,
  });

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
        Sentry.captureException(error);
        if (error.code === "ERR_NETWORK") {
          console.error("No internet or server down");
        } else if (error.response?.status === 401) {
          logout();
          throw new Error("Session expired. Logging out...");
        }

        return Promise.reject(error);
      },
    );
  };

  export default api;
