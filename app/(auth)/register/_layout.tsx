import { RegisterProvider } from "@/context/RegisterContext";
import { Stack } from "expo-router";
import React from "react";

export default function RegisterLayout() {
  return (
    <RegisterProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="stepTwo" />
        <Stack.Screen name="stepThree" />
      </Stack>
    </RegisterProvider>
  );
}
