import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function ViewLayout() {
  return (
    <Stack
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" color="#000" />
          </Pressable>
        ),
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="[propertyId]"
        options={{
          title: "Property details",
        }}
      />
    </Stack>
  );
}
