import api, { setupInterceptors } from "@/helpers/axios";
import { globals } from "@/lib/constants";
import { getUserService, logoutService } from "@/services/authServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AUTH_TOKEN_KEY = globals.AUTH_TOKEN_KEY;
const ONBOARDING_STATUS_KEY = "@hasCompletedOnboarding";
const CURRENT_ROLE_KEY = "current_role";

type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  current_role: string;
  created_at: string;
  bank_account_name?: string | null;
  bank_account_number?: string | null;
  bank_name?: string | null;
  bank_code?: string | null;
  role: string;
  investorActionId?: string;
  investorBalance?: number;
};

type OnboardingStatus = "loading" | "complete" | "incomplete";

type AuthContextType = {
  user: User | null;
  token: string | null;
  role: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  onboardingStatus: OnboardingStatus;
  signIn: (user: User, token: string, role: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [onboardingStatus, setOnboardingStatus] =
    useState<OnboardingStatus>("loading");
  const [isBootstrapLoading, setIsBootstrapLoading] = useState(true);

  const queryClient = useQueryClient();

  useEffect(() => {
    setupInterceptors(signOut);
  }, [signOut]);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const [storedToken, onboardingValue, storedRole] = await Promise.all([
          AsyncStorage.getItem(globals.AUTH_TOKEN_KEY),
          AsyncStorage.getItem(globals.ONBOARDING_STATUS_KEY),
          AsyncStorage.getItem(globals.CURRENT_ROLE_KEY),
        ]);

        setToken(storedToken);
        setRole(storedRole);
        setOnboardingStatus(
          onboardingValue === "true" ? "complete" : "incomplete",
        );
      } catch (e) {
        console.error("Failed to load initial app state:", e);
        if (e.response && (e.response.status === 401 || e.response.status === 404)) {
          await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
          setToken(null);
        }
      } finally {
        setIsBootstrapLoading(false);
      }
    };
    bootstrapAsync();
  }, [signOut]);

  const { data: userResponse, isLoading: isUserLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUserService,
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  console.log("userResponse", userResponse)
  const user = userResponse;

  const signIn = useCallback(
    async (userData: User, authToken: string, userRole: string) => {
      try {
        await Promise.all([
          AsyncStorage.setItem(globals.AUTH_TOKEN_KEY, authToken),
          AsyncStorage.setItem(globals.CURRENT_ROLE_KEY, userRole),
        ]);
        setToken(authToken);
        setRole(userRole);
        queryClient.setQueryData(["user"], userData);
      } catch (e) {
        console.error("Failed to sign in", e);
        throw new Error("Login failed");
      }
    },
    [queryClient],
  );

  const signOut = useCallback(async () => {
    try {
      if (token) {
        await logoutService();
      }
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      await Promise.all([
        AsyncStorage.removeItem(globals.AUTH_TOKEN_KEY),
        AsyncStorage.removeItem(globals.CURRENT_ROLE_KEY),
      ]);
      setToken(null);
      setRole(null);
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
    }
  }, [token, queryClient]);

  const refreshUser = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const completeOnboarding = useCallback(async () => {
    try {
      await AsyncStorage.setItem(globals.ONBOARDING_STATUS_KEY, "true");
      setOnboardingStatus("complete");
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  }, []);

  const isLoading = isBootstrapLoading || (!!token && isUserLoading);

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      isLoading,
      isLoggedIn: !!user && !!token,
      onboardingStatus,
      signIn,
      signOut,
      refreshUser,
      completeOnboarding,
    }),
    [
      user,
      token,
      role,
      isLoading,
      onboardingStatus,
      signIn,
      signOut,
      refreshUser,
      completeOnboarding,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
