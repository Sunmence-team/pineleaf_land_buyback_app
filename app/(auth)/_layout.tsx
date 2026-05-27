import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
        ),
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="login/index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotten_password" />
      <Stack.Screen name="verify_email/index" />
    </Stack>
  );
}
