import { ForgotProvider } from "@/context/ForgotContext";
import { Stack } from "expo-router";
import React from "react";

export default function ForgotLayout() {
  return (
    <ForgotProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="stepTwo" />
        <Stack.Screen name="stepThree" />
      </Stack>
    </ForgotProvider>
  );
}
