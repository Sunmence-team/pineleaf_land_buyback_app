import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import "../global.css";

import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { queryClient } from "@/lib/queryClient";
import {
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";
import { QueryClientProvider } from "@tanstack/react-query";

import Toast from "react-native-toast-message";
import { showErrorToast, toastConfig } from "@/helpers/toast";
import { router } from "expo-router";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://a265f8577f4b5e8f790abf7a01d3115d@o4511461391532032.ingest.de.sentry.io/4511461394874448',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

// Keep splash screen visible until we are explicitly ready to hide it
SplashScreen.preventAutoHideAsync();

function RootLayoutNav({ fontsReady }: { fontsReady: boolean }) {
  const { onboardingStatus, isLoading, token, role } = useAuth();
  const hasNavigated = useRef(false);

  // Combine auth loading states
  const isAuthLoading = isLoading || onboardingStatus === "loading";

  useEffect(() => {
    // CRITICAL: Wait until both fonts and auth state are ready
    if (!fontsReady || isAuthLoading || hasNavigated.current) {
      return;
    }

    const setInitialRoute = async () => {
      try {
        console.log("Onboarding Status:", onboardingStatus);
        console.log("Token exists:", !!token);

        if (onboardingStatus === "complete") {
          if (token) {
            if (role === "user") {
              router.replace("/(tabs)");
            } else {
              showErrorToast("Try to log in via web");
              // Fallback if role is invalid so app isn't stuck
              router.replace("/(auth)/login"); 
            }
          } else {
            router.replace("/(auth)/login");
          }
        } else {
          router.replace("/(onboarding)/stepOne");
        }
        
        hasNavigated.current = true;
      } catch (e) {
        console.error("Error during initial routing:", e);
        router.replace("/(onboarding)/stepOne");
      } finally {
        // Hide splash screen ONLY after the router replacement has triggered
        await SplashScreen.hideAsync();
      }
    };

    setInitialRoute();
  }, [onboardingStatus, isAuthLoading, token, role, fontsReady]);

  // CRITICAL: Block rendering the Stack until the redirect logic fires.
  // This keeps the native splash screen up and prevents app/index from flashing.
  if (!fontsReady || isAuthLoading) {
    return null; 
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default Sentry.wrap(function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    quickLight: Quicksand_300Light,
    quickRegular: Quicksand_400Regular,
    quickMedium: Quicksand_500Medium,
    quickSemiBold: Quicksand_600SemiBold,
    quickBold: Quicksand_700Bold,
  });

  const fontsReady = fontsLoaded || !!error;

  useEffect(() => {
    if (error) console.error("Font loading error:", error);
  }, [error]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider className="font-quickRegular">
          <StatusBar
            backgroundColor={"transparent"}
            translucent={true}
            animated={true}
          />
          <RootLayoutNav fontsReady={fontsReady} />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
});
