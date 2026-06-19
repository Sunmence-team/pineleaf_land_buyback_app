import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: (props) => props.canGoBack ? (
          <Pressable 
            onPress={() => router.back()} 
            style={{ paddingRight: 15, paddingVertical: 5 }}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </Pressable>
        ) : null,
        headerTitle: "",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="login/index" options={{ headerShown: false, contentStyle: { paddingTop: 40, backgroundColor: "white" } }} />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgotten_password" />
      <Stack.Screen name="verify_email/index" />
      <Stack.Screen name="verify_email/code" />
    </Stack>
  );
}
