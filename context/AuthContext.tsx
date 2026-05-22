import api from "@/helpers/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import isEqual from "lodash/isEqual";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AUTH_TOKEN_KEY = "authToken";
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
  pin?: string | null;
  my_referral_code: string;
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
  signOut: () => void;
  refreshUser: (token: string) => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [onboardingStatus, setOnboardingStatus] =
    useState<OnboardingStatus>("loading");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  const handleUserResponse = (responseData: any) => {
    // console.log("responseData", responseData)
    const baseUser = responseData?.user;
    const dataObject = responseData?.data;
    // Check if dataObject is an object (not array) and has user property for Investor structure
    const investorData =
      dataObject && !Array.isArray(dataObject) && dataObject.user
        ? dataObject.user
        : null;
    console.log("investorData", investorData);

    if (baseUser && investorData) {
      const {
        id: investorActionId,
        balance: investorBalance,
        ...restOfInvestorData
      } = investorData;
      const {
        user: nestedUser,
        created_at: detailsCreatedAt,
        ...restOfDataObject
      } = dataObject;

      const combinedUser = {
        ...baseUser,
        ...restOfDataObject,
        ...restOfInvestorData,
        investorActionId,
        investorBalance,
      };
      console.log("combinedUser", combinedUser);
      return combinedUser;
    }

    // Fallback for Realtor or basic user where extra data is empty or structured differently
    if (baseUser) {
      return baseUser;
    }

    console.error(
      "Could not find full user data structure in response:",
      responseData,
    );
    return null;
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const [storedToken, onboardingValue, storedRole] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(ONBOARDING_STATUS_KEY),
          AsyncStorage.getItem(CURRENT_ROLE_KEY),
        ]);

        // console.log("Loaded onboarding status:", onboardingValue);
        setOnboardingStatus(
          onboardingValue === "true" ? "complete" : "incomplete",
        );
        setRole(storedRole);

        if (storedToken) {
          const response = await api.get("/refreshUser");
          const combinedUser = handleUserResponse(response.data.data);

          if (combinedUser) {
            setUser(combinedUser);
            setToken(storedToken);
          } else {
            await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
            setToken(null);
          }
        }
      } catch (e: any) {
        console.error("Failed to load initial app state:", e);
        if (e.response && e.response.status === 401) {
          await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
        }
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapAsync();
  }, []);

  const completeOnboarding = useCallback(async () => {
    try {
      console.log("Setting onboarding status to true...");
      await AsyncStorage.setItem(ONBOARDING_STATUS_KEY, "true");
      setOnboardingStatus("complete");
      console.log("Onboarding status set successfully.");
    } catch (e) {
      console.error("Failed to save onboarding status", e);
    }
  }, []);

  const signIn = useCallback(
    async (responseData: User, authToken: string, role: string) => {
      try {

        await AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken);
        await AsyncStorage.setItem(CURRENT_ROLE_KEY, role);
        setToken(authToken);
        setUser(responseData);
        setRole(role);
      } catch (e) {
        console.error("Failed to sign in", e);
        throw new Error("Login failed");
      }
    },
    [],
  );

  const signOut = useCallback(async () => {
    if (token) {
      try {
        await api.put("/logout", token);
      } catch (error) {
        console.error(
          "Logout API call failed, but clearing storage anyway:",
          error,
        );
      }
    }
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    await AsyncStorage.removeItem(CURRENT_ROLE_KEY);
    setToken(null);
    setUser(null);
    setRole(null);
  }, [token]);

  const refreshUser = useCallback(
    async (authToken: string) => {
      if (!authToken) return;

      try {
        const response = await api.get("/refreshUser");
        console.log("Refresh user response:", response.data);
        console.log(
          "Refresh user response:",
          JSON.stringify(response.data, null, 2),
        );
        const combinedUser = handleUserResponse(response.data.data);

        if (combinedUser) {
          setUser((currentUser) => {
            if (!isEqual(currentUser, combinedUser)) {
              return combinedUser;
            }
            return currentUser;
          });
        }
      } catch (err: any) {
        console.error("Error during user refresh:", err);
        if (err.response && err.response.status === 401) {
          signOut();
        }
      }
    },
    [signOut],
  );

  const value = useMemo(
    () => ({
      user,
      token,
      role,
      isLoading,
      isLoggedIn: !!user,
      onboardingStatus,
      signIn,
      signOut,
      setRole,
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
      setRole,
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
