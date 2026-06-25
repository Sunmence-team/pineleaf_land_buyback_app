import { Stack, router, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
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
import { showErrorToast, showInfoToast, toastConfig } from "@/helpers/toast";
import * as Sentry from '@sentry/react-native';
import { getPendingVerification } from "@/helpers/pendingVerification";
import * as Updates from "expo-updates";

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

SplashScreen.preventAutoHideAsync();

function RootLayoutNav({ fontsReady }: { fontsReady: boolean }) {
  const { onboardingStatus, isLoading, token, role } = useAuth();
  const segments = useSegments();

  const isAuthLoading = isLoading || onboardingStatus === "loading";

  useEffect(() => {
    if (!fontsReady || isAuthLoading) {
      return;
    }

    const setInitialRoute = async () => {
      try {
        console.log("Update ID:", Updates.updateId);
        console.log("Channel:", Updates.channel);
        console.log("Runtime:", Updates.runtimeVersion);
        showInfoToast(`UID: ${Updates.updateId} | CH: ${Updates.channel} | RT: ${Updates.runtimeVersion}`)

        console.log("Onboarding Status:", onboardingStatus);
        console.log("Token exists:", !!token);
        console.log("Segments:", segments);

        if (!token && onboardingStatus === "complete") {
          const pending = await getPendingVerification();
          if (pending) {
            await SplashScreen.hideAsync();
            router.replace({
              pathname: "/(auth)/verify_email/code",
              params: { email: pending.email },
            });
            return;
          }
        }

        const inTabsGroup = segments[0] === "(tabs)" || segments[0] === "(screens)";
        const inAuthGroup = segments[0] === "(auth)";
        const inOnboardingGroup = segments[0] === "(onboarding)";

        if (onboardingStatus === "complete") {
          if (token) {
            if (role === "user") {
              if (!inTabsGroup) {
                router.replace("/(tabs)");
              }
            } else {
              showErrorToast("Try to log in via web");
              if (!inAuthGroup) {
                router.replace("/(auth)/login");
              }
            }
          } else {
            if (!inAuthGroup) {
              router.replace("/(auth)/login");
            }
          }
        } else {
          if (!inOnboardingGroup) {
            router.replace("/(onboarding)/stepOne");
          }
        }
      } catch (e) {
        console.error("Error during initial routing:", e);
        router.replace("/(onboarding)/stepOne");
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    setInitialRoute();
  }, [onboardingStatus, isAuthLoading, token, role, fontsReady, segments]);

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
