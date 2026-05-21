import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../global.css";

import { StatusBar, Text, View } from "react-native";
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
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before we can check the onboarding status.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  useEffect(() => {
    async function setInitialRoute() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        router.push("/(tabs)")
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

  const toastConfig = {
    success: ({ text1, text2 }: any) => (
      <View className='flex-row items-center gap-2 bg-primary p-4 rounded-lg w-[90%]'>
        <Ionicons name="checkmark-circle" size={24} color="white" />
        <View>
          <Text className="text-white font-bold">{text1}</Text>
          <Text className="text-white">{text2}</Text>
        </View>
      </View>
    ),
  };


  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>


      <Toast config={toastConfig} bottomOffset={50} />
    </>

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
