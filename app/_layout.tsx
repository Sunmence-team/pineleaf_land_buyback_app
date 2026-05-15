import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

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

// Prevent the splash screen from auto-hiding before we can check the onboarding status.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  useEffect(() => {
    async function setInitialRoute() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        router.push("/(tabs)/profile")
      } catch (e) {
        console.error(
          "Error reading onboarding status, defaulting to onboarding:",
          e,
        );
      } finally {
        // After we decide the route, we can hide the splash screen.
        SplashScreen.hideAsync();
      }
    }

    setInitialRoute();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    quickLight: Quicksand_300Light,
    quickRegular: Quicksand_400Regular,
    quickMedium: Quicksand_500Medium,
    quickSemiBold: Quicksand_600SemiBold,
    quickBold: Quicksand_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider className="font-quickRegular">
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        animated={true}
      />
      <QueryClientProvider client={queryClient}></QueryClientProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}
